import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

// ─── Helper: generate ticket number ─────────────────────────────────────────
async function nextTicketNumber(db: D1Database): Promise<string> {
  const row = await db.prepare('SELECT COUNT(*) as cnt FROM support_tickets').first<{ cnt: number }>()
  const num = (row?.cnt ?? 0) + 1
  return `TKT-${String(num).padStart(3, '0')}`
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ═══════════════════════════════════════════════════════════════════════════
app.get('/api/stats', async (c) => {
  const db = c.env.DB
  const [petcTotal, petcActive, petcNoOp, petcSusp,
         pmvicTotal, pmvicP1, pmvicP2,
         openTickets, criticalTickets,
         resolvedTickets] = await Promise.all([
    db.prepare('SELECT COUNT(*) as n FROM petc_clients').first<{ n: number }>(),
    db.prepare("SELECT COUNT(*) as n FROM petc_clients WHERE status='Active'").first<{ n: number }>(),
    db.prepare("SELECT COUNT(*) as n FROM petc_clients WHERE status='No Operation'").first<{ n: number }>(),
    db.prepare("SELECT COUNT(*) as n FROM petc_clients WHERE status='Suspended'").first<{ n: number }>(),
    db.prepare('SELECT COUNT(*) as n FROM pmvic_clients').first<{ n: number }>(),
    db.prepare("SELECT COUNT(*) as n FROM pmvic_clients WHERE phase='Phase 1'").first<{ n: number }>(),
    db.prepare("SELECT COUNT(*) as n FROM pmvic_clients WHERE phase='Phase 2'").first<{ n: number }>(),
    db.prepare("SELECT COUNT(*) as n FROM support_tickets WHERE status IN ('Open','In Progress')").first<{ n: number }>(),
    db.prepare("SELECT COUNT(*) as n FROM support_tickets WHERE priority='Critical' AND status IN ('Open','In Progress')").first<{ n: number }>(),
    db.prepare("SELECT COUNT(*) as n FROM support_tickets WHERE status='Resolved'").first<{ n: number }>(),
  ])

  const pmvicBrands = await db.prepare(
    "SELECT machine_brand, COUNT(*) as count FROM pmvic_clients GROUP BY machine_brand ORDER BY count DESC"
  ).all()

  const topRegionsPetc = await db.prepare(
    "SELECT region, COUNT(*) as count FROM petc_clients GROUP BY region ORDER BY count DESC LIMIT 10"
  ).all()

  const topRegionsPmvic = await db.prepare(
    "SELECT region, COUNT(*) as count FROM pmvic_clients GROUP BY region ORDER BY count DESC LIMIT 10"
  ).all()

  const recentTickets = await db.prepare(
    "SELECT * FROM support_tickets ORDER BY opened_at DESC LIMIT 5"
  ).all()

  const suspendedAlert = await db.prepare(
    "SELECT center_name, authorization_number, region FROM petc_clients WHERE status='Suspended' LIMIT 3"
  ).all()

  const noOpAlert = await db.prepare(
    "SELECT center_name FROM petc_clients WHERE status='No Operation' LIMIT 5"
  ).all()

  return c.json({
    petc: {
      total: petcTotal?.n ?? 0,
      active: petcActive?.n ?? 0,
      no_operation: petcNoOp?.n ?? 0,
      suspended: petcSusp?.n ?? 0,
    },
    pmvic: {
      total: pmvicTotal?.n ?? 0,
      phase1: pmvicP1?.n ?? 0,
      phase2: pmvicP2?.n ?? 0,
    },
    combined_total: (petcTotal?.n ?? 0) + (pmvicTotal?.n ?? 0),
    tickets: {
      open: openTickets?.n ?? 0,
      critical: criticalTickets?.n ?? 0,
      resolved: resolvedTickets?.n ?? 0,
    },
    pmvic_brands: pmvicBrands.results,
    top_regions_petc: topRegionsPetc.results,
    top_regions_pmvic: topRegionsPmvic.results,
    recent_tickets: recentTickets.results,
    alerts: {
      suspended: suspendedAlert.results,
      no_operation: noOpAlert.results,
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// PETC CLIENTS CRUD
// ═══════════════════════════════════════════════════════════════════════════
app.get('/api/petc', async (c) => {
  const db = c.env.DB
  const { search, status, region, page = '1', limit = '20' } = c.req.query()
  const offset = (parseInt(page) - 1) * parseInt(limit)

  let where = 'WHERE 1=1'
  const params: string[] = []

  if (search) {
    where += ' AND (center_name LIKE ? OR authorization_number LIKE ? OR city LIKE ?)'
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }
  if (status) { where += ' AND status=?'; params.push(status) }
  if (region) { where += ' AND region=?'; params.push(region) }

  const countRow = await db.prepare(`SELECT COUNT(*) as n FROM petc_clients ${where}`).bind(...params).first<{ n: number }>()
  const rows = await db.prepare(`SELECT * FROM petc_clients ${where} ORDER BY center_name ASC LIMIT ? OFFSET ?`).bind(...params, parseInt(limit), offset).all()

  return c.json({ data: rows.results, total: countRow?.n ?? 0, page: parseInt(page), limit: parseInt(limit) })
})

app.get('/api/petc/:id', async (c) => {
  const db = c.env.DB
  const row = await db.prepare('SELECT * FROM petc_clients WHERE id=?').bind(c.req.param('id')).first()
  if (!row) return c.json({ error: 'Not found' }, 404)
  return c.json(row)
})

app.post('/api/petc', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  const { center_name, authorization_number, region, province, city, address, status, contact_person, contact_number, email, accreditation_date, expiry_date, notes } = body

  if (!center_name || !authorization_number || !region || !city) {
    return c.json({ error: 'Required fields missing' }, 400)
  }

  try {
    const result = await db.prepare(
      `INSERT INTO petc_clients (center_name, authorization_number, region, province, city, address, status, contact_person, contact_number, email, accreditation_date, expiry_date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(center_name, authorization_number, region, province ?? null, city, address ?? null, status ?? 'Active', contact_person ?? null, contact_number ?? null, email ?? null, accreditation_date ?? null, expiry_date ?? null, notes ?? null).run()
    return c.json({ id: result.meta.last_row_id, message: 'PETC client created' }, 201)
  } catch (e: any) {
    if (e.message?.includes('UNIQUE')) return c.json({ error: 'Authorization number already exists' }, 409)
    return c.json({ error: e.message }, 500)
  }
})

app.put('/api/petc/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  const { center_name, authorization_number, region, province, city, address, status, contact_person, contact_number, email, accreditation_date, expiry_date, notes } = body

  const existing = await db.prepare('SELECT id FROM petc_clients WHERE id=?').bind(id).first()
  if (!existing) return c.json({ error: 'Not found' }, 404)

  try {
    await db.prepare(
      `UPDATE petc_clients SET center_name=?, authorization_number=?, region=?, province=?, city=?, address=?, status=?, contact_person=?, contact_number=?, email=?, accreditation_date=?, expiry_date=?, notes=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
    ).bind(center_name, authorization_number, region, province ?? null, city, address ?? null, status ?? 'Active', contact_person ?? null, contact_number ?? null, email ?? null, accreditation_date ?? null, expiry_date ?? null, notes ?? null, id).run()
    return c.json({ message: 'PETC client updated' })
  } catch (e: any) {
    if (e.message?.includes('UNIQUE')) return c.json({ error: 'Authorization number already exists' }, 409)
    return c.json({ error: e.message }, 500)
  }
})

app.delete('/api/petc/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const existing = await db.prepare('SELECT id FROM petc_clients WHERE id=?').bind(id).first()
  if (!existing) return c.json({ error: 'Not found' }, 404)
  await db.prepare('DELETE FROM petc_clients WHERE id=?').bind(id).run()
  return c.json({ message: 'PETC client deleted' })
})

// ═══════════════════════════════════════════════════════════════════════════
// PMVIC CLIENTS CRUD
// ═══════════════════════════════════════════════════════════════════════════
app.get('/api/pmvic', async (c) => {
  const db = c.env.DB
  const { search, status, region, phase, machine_brand, page = '1', limit = '20' } = c.req.query()
  const offset = (parseInt(page) - 1) * parseInt(limit)

  let where = 'WHERE 1=1'
  const params: string[] = []

  if (search) {
    where += ' AND (center_name LIKE ? OR authorization_number LIKE ? OR city LIKE ?)'
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }
  if (status) { where += ' AND status=?'; params.push(status) }
  if (region) { where += ' AND region=?'; params.push(region) }
  if (phase) { where += ' AND phase=?'; params.push(phase) }
  if (machine_brand) { where += ' AND machine_brand=?'; params.push(machine_brand) }

  const countRow = await db.prepare(`SELECT COUNT(*) as n FROM pmvic_clients ${where}`).bind(...params).first<{ n: number }>()
  const rows = await db.prepare(`SELECT * FROM pmvic_clients ${where} ORDER BY center_name ASC LIMIT ? OFFSET ?`).bind(...params, parseInt(limit), offset).all()

  return c.json({ data: rows.results, total: countRow?.n ?? 0, page: parseInt(page), limit: parseInt(limit) })
})

app.get('/api/pmvic/:id', async (c) => {
  const db = c.env.DB
  const row = await db.prepare('SELECT * FROM pmvic_clients WHERE id=?').bind(c.req.param('id')).first()
  if (!row) return c.json({ error: 'Not found' }, 404)
  return c.json(row)
})

app.post('/api/pmvic', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  const { center_name, authorization_number, region, province, city, address, phase, machine_brand, status, contact_person, contact_number, email, accreditation_date, expiry_date, notes } = body

  if (!center_name || !authorization_number || !region || !city || !phase || !machine_brand) {
    return c.json({ error: 'Required fields missing' }, 400)
  }

  try {
    const result = await db.prepare(
      `INSERT INTO pmvic_clients (center_name, authorization_number, region, province, city, address, phase, machine_brand, status, contact_person, contact_number, email, accreditation_date, expiry_date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(center_name, authorization_number, region, province ?? null, city, address ?? null, phase, machine_brand, status ?? 'Active', contact_person ?? null, contact_number ?? null, email ?? null, accreditation_date ?? null, expiry_date ?? null, notes ?? null).run()
    return c.json({ id: result.meta.last_row_id, message: 'PMVIC client created' }, 201)
  } catch (e: any) {
    if (e.message?.includes('UNIQUE')) return c.json({ error: 'Authorization number already exists' }, 409)
    return c.json({ error: e.message }, 500)
  }
})

app.put('/api/pmvic/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  const { center_name, authorization_number, region, province, city, address, phase, machine_brand, status, contact_person, contact_number, email, accreditation_date, expiry_date, notes } = body

  const existing = await db.prepare('SELECT id FROM pmvic_clients WHERE id=?').bind(id).first()
  if (!existing) return c.json({ error: 'Not found' }, 404)

  try {
    await db.prepare(
      `UPDATE pmvic_clients SET center_name=?, authorization_number=?, region=?, province=?, city=?, address=?, phase=?, machine_brand=?, status=?, contact_person=?, contact_number=?, email=?, accreditation_date=?, expiry_date=?, notes=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
    ).bind(center_name, authorization_number, region, province ?? null, city, address ?? null, phase, machine_brand, status ?? 'Active', contact_person ?? null, contact_number ?? null, email ?? null, accreditation_date ?? null, expiry_date ?? null, notes ?? null, id).run()
    return c.json({ message: 'PMVIC client updated' })
  } catch (e: any) {
    if (e.message?.includes('UNIQUE')) return c.json({ error: 'Authorization number already exists' }, 409)
    return c.json({ error: e.message }, 500)
  }
})

app.delete('/api/pmvic/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const existing = await db.prepare('SELECT id FROM pmvic_clients WHERE id=?').bind(id).first()
  if (!existing) return c.json({ error: 'Not found' }, 404)
  await db.prepare('DELETE FROM pmvic_clients WHERE id=?').bind(id).run()
  return c.json({ message: 'PMVIC client deleted' })
})

// ═══════════════════════════════════════════════════════════════════════════
// SUPPORT TICKETS CRUD
// ═══════════════════════════════════════════════════════════════════════════
app.get('/api/tickets', async (c) => {
  const db = c.env.DB
  const { search, status, priority, client_type, page = '1', limit = '20' } = c.req.query()
  const offset = (parseInt(page) - 1) * parseInt(limit)

  let where = 'WHERE 1=1'
  const params: string[] = []

  if (search) {
    where += ' AND (title LIKE ? OR ticket_number LIKE ? OR client_name LIKE ?)'
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }
  if (status) { where += ' AND status=?'; params.push(status) }
  if (priority) { where += ' AND priority=?'; params.push(priority) }
  if (client_type) { where += ' AND client_type=?'; params.push(client_type) }

  const countRow = await db.prepare(`SELECT COUNT(*) as n FROM support_tickets ${where}`).bind(...params).first<{ n: number }>()
  const rows = await db.prepare(`SELECT * FROM support_tickets ${where} ORDER BY opened_at DESC LIMIT ? OFFSET ?`).bind(...params, parseInt(limit), offset).all()

  return c.json({ data: rows.results, total: countRow?.n ?? 0, page: parseInt(page), limit: parseInt(limit) })
})

app.get('/api/tickets/:id', async (c) => {
  const db = c.env.DB
  const row = await db.prepare('SELECT * FROM support_tickets WHERE id=?').bind(c.req.param('id')).first()
  if (!row) return c.json({ error: 'Not found' }, 404)
  return c.json(row)
})

app.post('/api/tickets', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  const { title, description, client_type, client_id, client_name, category, priority, assigned_to } = body

  if (!title || !client_type || !client_id || !client_name || !category) {
    return c.json({ error: 'Required fields missing' }, 400)
  }

  const ticket_number = await nextTicketNumber(db)

  const result = await db.prepare(
    `INSERT INTO support_tickets (ticket_number, title, description, client_type, client_id, client_name, category, priority, status, assigned_to)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Open', ?)`
  ).bind(ticket_number, title, description ?? null, client_type, client_id, client_name, category, priority ?? 'Medium', assigned_to ?? null).run()

  return c.json({ id: result.meta.last_row_id, ticket_number, message: 'Ticket created' }, 201)
})

app.put('/api/tickets/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  const { title, description, category, priority, status, assigned_to, resolution_notes } = body

  const existing = await db.prepare('SELECT id FROM support_tickets WHERE id=?').bind(id).first()
  if (!existing) return c.json({ error: 'Not found' }, 404)

  const resolved_at = status === 'Resolved' || status === 'Closed' ? 'CURRENT_TIMESTAMP' : null

  await db.prepare(
    `UPDATE support_tickets SET title=?, description=?, category=?, priority=?, status=?, assigned_to=?, resolution_notes=?, ${resolved_at ? 'resolved_at=CURRENT_TIMESTAMP,' : ''} updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).bind(title, description ?? null, category, priority, status, assigned_to ?? null, resolution_notes ?? null, id).run()

  return c.json({ message: 'Ticket updated' })
})

app.delete('/api/tickets/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const existing = await db.prepare('SELECT id FROM support_tickets WHERE id=?').bind(id).first()
  if (!existing) return c.json({ error: 'Not found' }, 404)
  await db.prepare('DELETE FROM support_tickets WHERE id=?').bind(id).run()
  return c.json({ message: 'Ticket deleted' })
})

// ─── Serve main HTML for all routes ─────────────────────────────────────────
app.get('*', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RDMS – PETC & PMVIC Support Dashboard</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<link rel="stylesheet" href="/static/style.css">
</head>
<body>
<div id="app"></div>
<script src="/static/app.js"></script>
</body>
</html>`)
})

export default app
