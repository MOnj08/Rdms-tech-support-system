// ═══════════════════════════════════════════════════════════════════════════
// RDMS – PETC & PMVIC Support Dashboard  |  app.js
// ═══════════════════════════════════════════════════════════════════════════

const API = '';  // same origin

// ─── State ──────────────────────────────────────────────────────────────────
let currentPage = 'overview';
let charts = {};
let currentTime = new Date();

// ─── Boot ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderShell();
  navigate('overview');
  startClock();
});

// ─── Clock ───────────────────────────────────────────────────────────────────
function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}
function updateClock() {
  currentTime = new Date();
  const el = document.getElementById('live-clock');
  if (el) el.textContent = currentTime.toLocaleString('en-PH', { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' });
}

// ─── Shell ───────────────────────────────────────────────────────────────────
function renderShell() {
  document.getElementById('app').innerHTML = `
  <div id="header">
    <div class="header-top">
      <div class="header-logo">
        <div class="logo-icon"><i class="fas fa-shield-alt" style="color:#fff"></i></div>
        <h1>RDMS – <span>PETC &amp; PMVIC Support Dashboard</span></h1>
        <span class="year-badge">2026</span>
      </div>
      <nav class="nav-tabs">
        <button class="nav-tab active" data-page="overview" onclick="navigate('overview')">
          <i class="fas fa-th-large"></i> Overview
        </button>
        <button class="nav-tab" data-page="petc" onclick="navigate('petc')">
          <i class="fas fa-car"></i> PETC Clients
        </button>
        <button class="nav-tab" data-page="pmvic" onclick="navigate('pmvic')">
          <i class="fas fa-cog"></i> PMVIC Clients
        </button>
        <button class="nav-tab" data-page="tickets" onclick="navigate('tickets')">
          <i class="fas fa-ticket-alt"></i> Support Tickets
        </button>
        <button class="nav-tab" data-page="analytics" onclick="navigate('analytics')">
          <i class="fas fa-chart-line"></i> Analytics
        </button>
      </nav>
    </div>
    <div class="live-ticker">
      <!-- Fixed left: LIVE badge -->
      <div class="ticker-left">
        <span class="live-badge">● LIVE</span>
      </div>
      <!-- Scrolling track -->
      <div class="ticker-track">
        <div class="ticker-belt" id="ticker-belt">
          <!-- Set A -->
          <span class="ticker-item"><span class="dot" style="background:#00e676"></span>Remote monitoring enabled: <strong id="tk-petc-active">—</strong> centers</span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#2196f3"></span>PETC regions covered: <strong>16 regions nationwide</strong></span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#ffc107"></span>Resolved tickets: <strong id="tk-resolved">—</strong> resolved</span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#00e676"></span>System status: <strong style="color:#00e676">All core services running</strong></span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#00bcd4"></span>RDMS Dashboard: 2026 – Live monitoring active</span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#2196f3"></span>PETC Clients: <strong id="tk-petc-total">—</strong> centers</span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#9c27b0"></span>PMVIC Clients: <strong id="tk-pmvic-total">—</strong> centers</span>
          <span class="ticker-sep">◆</span>
          <!-- Set B (duplicate for seamless loop) -->
          <span class="ticker-item"><span class="dot" style="background:#00e676"></span>Remote monitoring enabled: <strong id="tk-petc-active-2">—</strong> centers</span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#2196f3"></span>PETC regions covered: <strong>16 regions nationwide</strong></span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#ffc107"></span>Resolved tickets: <strong id="tk-resolved-2">—</strong> resolved</span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#00e676"></span>System status: <strong style="color:#00e676">All core services running</strong></span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#00bcd4"></span>RDMS Dashboard: 2026 – Live monitoring active</span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#2196f3"></span>PETC Clients: <strong id="tk-petc-total-2">—</strong> centers</span>
          <span class="ticker-sep">◆</span>
          <span class="ticker-item"><span class="dot" style="background:#9c27b0"></span>PMVIC Clients: <strong id="tk-pmvic-total-2">—</strong> centers</span>
          <span class="ticker-sep">◆</span>
        </div>
      </div>
      <!-- Fixed right: clock -->
      <div class="ticker-right">
        <span class="ticker-time" id="live-clock"></span>
      </div>
    </div>
    <div class="secondary-ticker">
      <div class="secondary-track">
        <div class="secondary-belt">
          <!-- Set A -->
          <div class="secondary-items">
            <span class="stat-chip"><i class="fas fa-circle" style="color:#00e676;font-size:8px"></i>&nbsp;Total Clients: <span id="sc-total">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#2196f3;font-size:8px"></i>&nbsp;PETC Centers: <span id="sc-petc">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#9c27b0;font-size:8px"></i>&nbsp;PMVIC Centers: <span id="sc-pmvic">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#00e676;font-size:8px"></i>&nbsp;Active PETC: <span id="sc-petc-active">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#ff9800;font-size:8px"></i>&nbsp;Suspended/No-Op: <span id="sc-susp">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#ffc107;font-size:8px"></i>&nbsp;Open Tickets: <span id="sc-open-tickets">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#f44336;font-size:8px"></i>&nbsp;Critical Issues: <span id="sc-critical">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#00bcd4;font-size:8px"></i>&nbsp;PMVIC Phase 1: <span id="sc-p1">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#26c6da;font-size:8px"></i>&nbsp;PMVIC Phase 2: <span id="sc-p2">—</span></span>
          </div>
          <!-- Set B (duplicate for seamless loop) -->
          <div class="secondary-items">
            <span class="stat-chip"><i class="fas fa-circle" style="color:#00e676;font-size:8px"></i>&nbsp;Total Clients: <span id="sc-total-2">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#2196f3;font-size:8px"></i>&nbsp;PETC Centers: <span id="sc-petc-2">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#9c27b0;font-size:8px"></i>&nbsp;PMVIC Centers: <span id="sc-pmvic-2">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#00e676;font-size:8px"></i>&nbsp;Active PETC: <span id="sc-petc-active-2">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#ff9800;font-size:8px"></i>&nbsp;Suspended/No-Op: <span id="sc-susp-2">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#ffc107;font-size:8px"></i>&nbsp;Open Tickets: <span id="sc-open-tickets-2">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#f44336;font-size:8px"></i>&nbsp;Critical Issues: <span id="sc-critical-2">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#00bcd4;font-size:8px"></i>&nbsp;PMVIC Phase 1: <span id="sc-p1-2">—</span></span>
            <span class="stat-chip"><i class="fas fa-circle" style="color:#26c6da;font-size:8px"></i>&nbsp;PMVIC Phase 2: <span id="sc-p2-2">—</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="main-content"></div>
  <div class="toast-container" id="toasts"></div>
  `;
}

// ─── Navigate ────────────────────────────────────────────────────────────────
function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.page === page));
  Object.values(charts).forEach(c => { try { c.destroy(); } catch(e){} });
  charts = {};
  const mc = document.getElementById('main-content');
  mc.innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';

  if (page === 'overview') renderOverview();
  else if (page === 'petc') renderPetcPage();
  else if (page === 'pmvic') renderPmvicPage();
  else if (page === 'tickets') renderTicketsPage();
  else if (page === 'analytics') renderAnalyticsPage();
}

// ─── Fetch helper ─────────────────────────────────────────────────────────────
async function api(path, opts = {}) {
  const r = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  });
  return r.json();
}

// ═══════════════════════════════════════════════════════════════════════════
// OVERVIEW PAGE
// ═══════════════════════════════════════════════════════════════════════════
async function renderOverview() {
  const stats = await api('/api/stats');
  updateTickerStats(stats);

  const mc = document.getElementById('main-content');
  const suspAlerts = stats.alerts.suspended.map(s =>
    `<div class="alert-item alert-red"><i class="fas fa-ban"></i><span><strong>Suspended:</strong> ${s.center_name} – Auth ${s.authorization_number}</span></div>`
  ).join('');
  const noOpNames = stats.alerts.no_operation.map(s => s.center_name).join(' – ');
  const noOpCount = stats.pmvic.no_operation || stats.petc.no_operation;

  mc.innerHTML = `
  <!-- KPI Row -->
  <div class="kpi-grid">
    <div class="kpi-card blue">
      <div class="kpi-icon"><i class="fas fa-building"></i></div>
      <div class="kpi-value">${stats.combined_total}</div>
      <div class="kpi-label">Total Clients</div>
      <div class="kpi-sub">PETC + PMVIC combined</div>
    </div>
    <div class="kpi-card green">
      <div class="kpi-icon"><i class="fas fa-check-circle"></i></div>
      <div class="kpi-value">${stats.petc.active}</div>
      <div class="kpi-label">Active PETC</div>
      <div class="kpi-sub">Out of ${stats.petc.total} centers</div>
    </div>
    <div class="kpi-card orange">
      <div class="kpi-icon"><i class="fas fa-ticket-alt"></i></div>
      <div class="kpi-value">${stats.tickets.open}</div>
      <div class="kpi-label">Open Tickets</div>
      <div class="kpi-sub">Across all issue types</div>
    </div>
    <div class="kpi-card red">
      <div class="kpi-icon"><i class="fas fa-exclamation-circle"></i></div>
      <div class="kpi-value">${stats.tickets.critical}</div>
      <div class="kpi-label">Critical Issues</div>
      <div class="kpi-sub">Immediate action needed</div>
    </div>
    <div class="kpi-card cyan">
      <div class="kpi-icon"><i class="fas fa-car-side"></i></div>
      <div class="kpi-value">${stats.pmvic.phase1}</div>
      <div class="kpi-label">PMVIC Phase 1</div>
      <div class="kpi-sub">Emission testing centers</div>
    </div>
    <div class="kpi-card purple">
      <div class="kpi-icon"><i class="fas fa-tools"></i></div>
      <div class="kpi-value">${stats.pmvic.phase2}</div>
      <div class="kpi-label">PMVIC Phase 2</div>
      <div class="kpi-sub">Motor vehicle insp. centers</div>
    </div>
  </div>

  <!-- Charts Row -->
  <div class="dash-grid">
    <!-- PETC Status Donut -->
    <div class="widget">
      <div class="widget-header">
        <div class="widget-title"><i class="fas fa-chart-pie"></i> PETC STATUS BREAKDOWN</div>
        <div class="chart-toggle">
          <button class="chart-btn active" id="donut-btn" onclick="switchPetcChart('donut')">Donut</button>
          <button class="chart-btn" id="bar-btn" onclick="switchPetcChart('bar')">Bar</button>
        </div>
      </div>
      <div class="widget-body" style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">
        <div style="flex:0 0 160px;height:160px;position:relative">
          <canvas id="petc-donut"></canvas>
        </div>
        <div class="donut-legend" style="flex:1;min-width:120px">
          <div class="legend-item">
            <div class="legend-label"><div class="legend-dot" style="background:#00e676"></div>Active</div>
            <div class="legend-value">${stats.petc.active}</div>
          </div>
          <div class="legend-item">
            <div class="legend-label"><div class="legend-dot" style="background:#ff9800"></div>No Operation</div>
            <div class="legend-value">${stats.petc.no_operation}</div>
          </div>
          <div class="legend-item">
            <div class="legend-label"><div class="legend-dot" style="background:#f44336"></div>Suspended</div>
            <div class="legend-value">${stats.petc.suspended}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- PMVIC Machine Brands Bar -->
    <div class="widget">
      <div class="widget-header">
        <div class="widget-title"><i class="fas fa-microchip"></i> PMVIC MACHINE BRANDS</div>
      </div>
      <div class="widget-body" style="height:200px">
        <canvas id="pmvic-brands"></canvas>
      </div>
    </div>
  </div>

  <!-- Regions + Alerts Row -->
  <div class="dash-grid">
    <!-- Top Regions -->
    <div class="widget">
      <div class="widget-header">
        <div class="widget-title"><i class="fas fa-map-marker-alt"></i> TOP REGIONS – PETC DISTRIBUTION</div>
      </div>
      <div class="widget-body" id="regions-chart"></div>
    </div>

    <!-- Smart Alerts -->
    <div class="widget">
      <div class="widget-header">
        <div class="widget-title"><i class="fas fa-bell"></i> SMART ALERTS</div>
        <span class="widget-badge" style="background:rgba(244,67,54,0.2);color:#f44336;border:1px solid rgba(244,67,54,0.4)">
          ${(stats.alerts.suspended.length + (stats.petc.no_operation > 0 ? 1 : 0) + (stats.tickets.critical > 0 ? 1 : 0) + 1)} ALERTS
        </span>
      </div>
      <div class="widget-body">
        ${suspAlerts}
        ${stats.petc.no_operation > 0 ? `
        <div class="alert-item alert-orange">
          <i class="fas fa-exclamation-triangle"></i>
          <span><strong>No operation (${stats.petc.no_operation} centers):</strong> ${noOpNames}</span>
        </div>` : ''}
        ${stats.tickets.critical > 0 ? `
        <div class="alert-item alert-purple">
          <i class="fas fa-wrench"></i>
          <span><strong>${stats.tickets.critical} critical ticket${stats.tickets.critical > 1 ? 's' : ''} unresolved</strong> – PMVIC machine calibration failure + PETC network outage</span>
        </div>` : ''}
        <div class="alert-item alert-blue">
          <i class="fas fa-info-circle"></i>
          <span>${stats.pmvic.total} PMVIC centers tracked across Phase 1 &amp; 2 with ${stats.pmvic_brands.length} machine brands</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Tickets -->
  <div class="widget">
    <div class="widget-header">
      <div class="widget-title"><i class="fas fa-history"></i> RECENT TICKETS</div>
      <a class="view-all" onclick="navigate('tickets')">View all <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="widget-body" id="recent-tickets-list">
      ${stats.recent_tickets.length === 0 ? '<div class="empty-state"><i class="fas fa-ticket-alt"></i><p>No tickets found</p></div>' :
        stats.recent_tickets.map(t => `
        <div class="ticket-item">
          <span class="ticket-id">${t.ticket_number}</span>
          <div class="ticket-info">
            <div class="ticket-title">${escHtml(t.title)}</div>
            <div class="ticket-sub">${escHtml(t.client_name)} · ${t.category} · ${t.client_type}</div>
          </div>
          <div class="ticket-badges">
            ${priorityBadge(t.priority)} ${statusBadge(t.status)}
          </div>
        </div>`).join('')}
    </div>
  </div>
  `;

  // Draw charts
  drawPetcDonut(stats.petc);
  drawPmvicBrands(stats.pmvic_brands);
  drawRegions(stats.top_regions_petc);

  // Store data for chart toggling
  window._petcStats = stats.petc;
}

function updateTickerStats(s) {
  // Set A
  setText('tk-petc-active', s.petc.active);
  setText('tk-resolved', s.tickets.resolved);
  setText('tk-petc-total', s.petc.total);
  setText('tk-pmvic-total', s.pmvic.total);
  setText('sc-total', s.combined_total);
  setText('sc-petc', s.petc.total);
  setText('sc-pmvic', s.pmvic.total);
  setText('sc-petc-active', s.petc.active);
  setText('sc-susp', s.petc.suspended + s.petc.no_operation);
  setText('sc-open-tickets', s.tickets.open);
  setText('sc-critical', s.tickets.critical);
  setText('sc-p1', s.pmvic.phase1);
  setText('sc-p2', s.pmvic.phase2);
  // Set B (duplicated belt for seamless loop)
  setText('tk-petc-active-2', s.petc.active);
  setText('tk-resolved-2', s.tickets.resolved);
  setText('tk-petc-total-2', s.petc.total);
  setText('tk-pmvic-total-2', s.pmvic.total);
  setText('sc-total-2', s.combined_total);
  setText('sc-petc-2', s.petc.total);
  setText('sc-pmvic-2', s.pmvic.total);
  setText('sc-petc-active-2', s.petc.active);
  setText('sc-susp-2', s.petc.suspended + s.petc.no_operation);
  setText('sc-open-tickets-2', s.tickets.open);
  setText('sc-critical-2', s.tickets.critical);
  setText('sc-p1-2', s.pmvic.phase1);
  setText('sc-p2-2', s.pmvic.phase2);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── Chart helpers ─────────────────────────────────────────────────────────────
function drawPetcDonut(petc) {
  const ctx = document.getElementById('petc-donut');
  if (!ctx) return;
  if (charts['petc-donut']) charts['petc-donut'].destroy();
  charts['petc-donut'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Active', 'No Operation', 'Suspended'],
      datasets: [{
        data: [petc.active, petc.no_operation, petc.suspended],
        backgroundColor: ['#00e676', '#ff9800', '#f44336'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      cutout: '72%',
      plugins: { legend: { display: false }, tooltip: { enabled: true } }
    }
  });
}

function drawPetcBar(petc) {
  const ctx = document.getElementById('petc-donut');
  if (!ctx) return;
  if (charts['petc-donut']) charts['petc-donut'].destroy();
  charts['petc-donut'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Active', 'No Operation', 'Suspended'],
      datasets: [{
        data: [petc.active, petc.no_operation, petc.suspended],
        backgroundColor: ['#00e676', '#ff9800', '#f44336'],
        borderRadius: 6, borderWidth: 0
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7a9abc' } },
        y: { grid: { display: false }, ticks: { color: '#7a9abc' } }
      }
    }
  });
}

window.switchPetcChart = function(type) {
  document.getElementById('donut-btn').classList.toggle('active', type === 'donut');
  document.getElementById('bar-btn').classList.toggle('active', type === 'bar');
  const wrap = document.querySelector('#petc-donut').parentElement;
  if (type === 'donut') {
    wrap.style.height = '160px';
    drawPetcDonut(window._petcStats);
  } else {
    wrap.style.height = '160px';
    drawPetcBar(window._petcStats);
  }
};

function drawPmvicBrands(brands) {
  const ctx = document.getElementById('pmvic-brands');
  if (!ctx) return;
  if (charts['pmvic-brands']) charts['pmvic-brands'].destroy();
  const colors = ['#2196f3', '#00bcd4', '#ffc107', '#f44336', '#9c27b0', '#ff9800'];
  charts['pmvic-brands'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: brands.map(b => b.machine_brand),
      datasets: [{
        data: brands.map(b => b.count),
        backgroundColor: colors.slice(0, brands.length),
        borderRadius: 6, borderWidth: 0
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#7a9abc', font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7a9abc', stepSize: 2 } }
      }
    }
  });
}

function drawRegions(regions) {
  const el = document.getElementById('regions-chart');
  if (!el || !regions.length) return;
  const max = regions[0]?.count || 1;
  el.innerHTML = regions.map(r => `
    <div class="hbar-item">
      <div class="hbar-label">
        <span>${r.region}</span>
        <span>${r.count}</span>
      </div>
      <div class="hbar-track">
        <div class="hbar-fill" style="width:${(r.count/max)*100}%"></div>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════════════════
// PETC CLIENTS PAGE
// ═══════════════════════════════════════════════════════════════════════════
let petcState = { page: 1, search: '', status: '', region: '', data: [], total: 0 };

async function renderPetcPage() {
  const mc = document.getElementById('main-content');
  mc.innerHTML = `
  <div class="page-header">
    <div class="page-title"><i class="fas fa-car"></i> PETC Clients</div>
    <button class="btn btn-primary" onclick="openPetcModal()">
      <i class="fas fa-plus"></i> Add PETC Client
    </button>
  </div>
  <div class="filters-bar">
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input type="text" id="petc-search" placeholder="Search center name, auth number..." oninput="petcFilter()">
    </div>
    <select class="filter-select" id="petc-status" onchange="petcFilter()">
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="No Operation">No Operation</option>
      <option value="Suspended">Suspended</option>
    </select>
    <select class="filter-select" id="petc-region" onchange="petcFilter()">
      <option value="">All Regions</option>
      ${['NCR','CAR','R1','R2','R3','R4A','R4B','R5','R6','R7','R8','R9','R10','R11','R12','CARAGA','BARMM'].map(r => `<option value="${r}">${r}</option>`).join('')}
    </select>
  </div>
  <div class="data-table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Center Name</th>
          <th>Auth Number</th>
          <th>Region</th>
          <th>City</th>
          <th>Status</th>
          <th>Contact</th>
          <th>Expiry</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="petc-tbody">
        <tr><td colspan="8"><div class="loading"><div class="spinner"></div> Loading...</div></td></tr>
      </tbody>
    </table>
    <div class="pagination" id="petc-pagination"></div>
  </div>
  `;
  await loadPetcData();
}

let petcSearchTimer;
function petcFilter() {
  clearTimeout(petcSearchTimer);
  petcSearchTimer = setTimeout(async () => {
    petcState.page = 1;
    petcState.search = document.getElementById('petc-search').value;
    petcState.status = document.getElementById('petc-status').value;
    petcState.region = document.getElementById('petc-region').value;
    await loadPetcData();
  }, 300);
}

async function loadPetcData() {
  const { page, search, status, region } = petcState;
  const params = new URLSearchParams({ page, limit: 15, search, status, region });
  const res = await api(`/api/petc?${params}`);
  petcState.data = res.data;
  petcState.total = res.total;

  const tbody = document.getElementById('petc-tbody');
  if (!tbody) return;

  if (!res.data.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-car"></i><p>No PETC clients found</p></div></td></tr>`;
  } else {
    tbody.innerHTML = res.data.map(c => `
    <tr>
      <td><strong>${escHtml(c.center_name)}</strong></td>
      <td><code style="color:var(--accent-cyan);font-size:11px">${escHtml(c.authorization_number)}</code></td>
      <td><span class="badge badge-blue">${c.region}</span></td>
      <td>${escHtml(c.city)}</td>
      <td>${statusBadgePetc(c.status)}</td>
      <td style="font-size:11px;color:var(--text-secondary)">${c.contact_number || '—'}</td>
      <td style="font-size:11px;color:var(--text-muted)">${c.expiry_date || '—'}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-secondary btn-sm" onclick="viewPetcClient(${c.id})" title="View"><i class="fas fa-eye"></i></button>
          <button class="btn btn-primary btn-sm" onclick="editPetcClient(${c.id})" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deletePetcClient(${c.id},'${escAttr(c.center_name)}')" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
  }

  renderPagination('petc-pagination', res.total, page, 15, (p) => { petcState.page = p; loadPetcData(); });
}

function statusBadgePetc(s) {
  if (s === 'Active') return `<span class="badge badge-green">Active</span>`;
  if (s === 'No Operation') return `<span class="badge badge-orange">No Op</span>`;
  return `<span class="badge badge-red">Suspended</span>`;
}

// ── PETC Modal ────────────────────────────────────────────────────────────────
window.openPetcModal = function(data = null) {
  const isEdit = !!data;
  showModal(`
  <div class="modal-header">
    <div class="modal-title"><i class="fas fa-car"></i> ${isEdit ? 'Edit' : 'Add'} PETC Client</div>
    <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body">
    <form id="petc-form" onsubmit="savePetcClient(event,${data?.id || 'null'})">
      <div class="form-grid">
        <div class="form-group full-width">
          <label class="form-label">Center Name <span class="required">*</span></label>
          <input class="form-control" name="center_name" required placeholder="e.g. Air Master Emission Center" value="${data?.center_name || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Authorization Number <span class="required">*</span></label>
          <input class="form-control" name="authorization_number" required placeholder="e.g. R4A-2023-001" value="${data?.authorization_number || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Status <span class="required">*</span></label>
          <select class="form-control" name="status" required>
            ${['Active','No Operation','Suspended'].map(s => `<option value="${s}" ${data?.status===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Region <span class="required">*</span></label>
          <select class="form-control" name="region" required>
            ${['NCR','CAR','R1','R2','R3','R4A','R4B','R5','R6','R7','R8','R9','R10','R11','R12','CARAGA','BARMM'].map(r => `<option value="${r}" ${data?.region===r?'selected':''}>${r}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Province</label>
          <input class="form-control" name="province" placeholder="Province" value="${data?.province || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">City <span class="required">*</span></label>
          <input class="form-control" name="city" required placeholder="City/Municipality" value="${data?.city || ''}">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Address</label>
          <input class="form-control" name="address" placeholder="Complete address" value="${data?.address || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Contact Person</label>
          <input class="form-control" name="contact_person" placeholder="Name" value="${data?.contact_person || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Contact Number</label>
          <input class="form-control" name="contact_number" placeholder="09XX-XXX-XXXX" value="${data?.contact_number || ''}">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Email</label>
          <input class="form-control" type="email" name="email" placeholder="email@example.com" value="${data?.email || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Accreditation Date</label>
          <input class="form-control" type="date" name="accreditation_date" value="${data?.accreditation_date || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Expiry Date</label>
          <input class="form-control" type="date" name="expiry_date" value="${data?.expiry_date || ''}">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Notes</label>
          <textarea class="form-control" name="notes" placeholder="Additional notes...">${data?.notes || ''}</textarea>
        </div>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="document.getElementById('petc-form').requestSubmit()">
      <i class="fas fa-save"></i> ${isEdit ? 'Update' : 'Create'} Client
    </button>
  </div>
  `);
};

window.savePetcClient = async function(e, id) {
  e.preventDefault();
  const form = e.target;
  const body = Object.fromEntries(new FormData(form).entries());
  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/petc/${id}` : '/api/petc';
  const res = await api(url, { method, body: JSON.stringify(body) });
  if (res.error) return showToast(res.error, 'error');
  showToast(id ? 'PETC client updated!' : 'PETC client created!', 'success');
  closeModal();
  loadPetcData();
};

window.viewPetcClient = async function(id) {
  const d = await api(`/api/petc/${id}`);
  showModal(`
  <div class="modal-header">
    <div class="modal-title"><i class="fas fa-car"></i> PETC Client Details</div>
    <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div>
        <div style="font-size:17px;font-weight:700">${escHtml(d.center_name)}</div>
        <code style="color:var(--accent-cyan);font-size:12px">${d.authorization_number}</code>
        <span style="margin-left:8px">${statusBadgePetc(d.status)}</span>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">Region</div><div class="detail-value">${d.region}</div></div>
      <div class="detail-item"><div class="detail-label">Province</div><div class="detail-value">${d.province||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">City</div><div class="detail-value">${d.city}</div></div>
      <div class="detail-item"><div class="detail-label">Address</div><div class="detail-value">${d.address||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Contact Person</div><div class="detail-value">${d.contact_person||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Contact Number</div><div class="detail-value">${d.contact_number||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Email</div><div class="detail-value">${d.email||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Accreditation Date</div><div class="detail-value">${d.accreditation_date||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Expiry Date</div><div class="detail-value">${d.expiry_date||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Created</div><div class="detail-value">${fmtDate(d.created_at)}</div></div>
    </div>
    ${d.notes ? `<div style="margin-top:14px"><div class="detail-label">Notes</div><div style="margin-top:4px;padding:10px;background:var(--bg-input);border-radius:7px;font-size:12px">${escHtml(d.notes)}</div></div>` : ''}
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
    <button class="btn btn-primary" onclick="closeModal();editPetcClient(${id})"><i class="fas fa-edit"></i> Edit</button>
  </div>
  `);
};

window.editPetcClient = async function(id) {
  const d = await api(`/api/petc/${id}`);
  openPetcModal(d);
};

window.deletePetcClient = function(id, name) {
  showConfirm(`Delete "${name}"?`, 'This action cannot be undone.', async () => {
    const res = await api(`/api/petc/${id}`, { method: 'DELETE' });
    if (res.error) return showToast(res.error, 'error');
    showToast('PETC client deleted', 'success');
    loadPetcData();
  });
};

// ═══════════════════════════════════════════════════════════════════════════
// PMVIC CLIENTS PAGE
// ═══════════════════════════════════════════════════════════════════════════
let pmvicState = { page: 1, search: '', status: '', region: '', phase: '', machine_brand: '', data: [], total: 0 };

async function renderPmvicPage() {
  const mc = document.getElementById('main-content');
  mc.innerHTML = `
  <div class="page-header">
    <div class="page-title"><i class="fas fa-cog"></i> PMVIC Clients</div>
    <button class="btn btn-primary" onclick="openPmvicModal()">
      <i class="fas fa-plus"></i> Add PMVIC Client
    </button>
  </div>
  <div class="filters-bar">
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input type="text" id="pmvic-search" placeholder="Search center name, auth number..." oninput="pmvicFilter()">
    </div>
    <select class="filter-select" id="pmvic-status" onchange="pmvicFilter()">
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="No Operation">No Operation</option>
      <option value="Suspended">Suspended</option>
    </select>
    <select class="filter-select" id="pmvic-phase" onchange="pmvicFilter()">
      <option value="">All Phases</option>
      <option value="Phase 1">Phase 1</option>
      <option value="Phase 2">Phase 2</option>
    </select>
    <select class="filter-select" id="pmvic-brand" onchange="pmvicFilter()">
      <option value="">All Brands</option>
      ${['ACTIA','CARTEC','UNIMETAL','COSPER','BEISSBARTH','ROMSACTIA'].map(b => `<option value="${b}">${b}</option>`).join('')}
    </select>
    <select class="filter-select" id="pmvic-region" onchange="pmvicFilter()">
      <option value="">All Regions</option>
      ${['NCR','CAR','R1','R2','R3','R4A','R4B','R5','R6','R7','R8','R9','R10','R11','R12','CARAGA','BARMM'].map(r => `<option value="${r}">${r}</option>`).join('')}
    </select>
  </div>
  <div class="data-table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Center Name</th>
          <th>Auth Number</th>
          <th>Region</th>
          <th>Phase</th>
          <th>Machine Brand</th>
          <th>Status</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="pmvic-tbody">
        <tr><td colspan="8"><div class="loading"><div class="spinner"></div> Loading...</div></td></tr>
      </tbody>
    </table>
    <div class="pagination" id="pmvic-pagination"></div>
  </div>
  `;
  await loadPmvicData();
}

let pmvicSearchTimer;
function pmvicFilter() {
  clearTimeout(pmvicSearchTimer);
  pmvicSearchTimer = setTimeout(async () => {
    pmvicState.page = 1;
    pmvicState.search = document.getElementById('pmvic-search').value;
    pmvicState.status = document.getElementById('pmvic-status').value;
    pmvicState.phase = document.getElementById('pmvic-phase').value;
    pmvicState.machine_brand = document.getElementById('pmvic-brand').value;
    pmvicState.region = document.getElementById('pmvic-region').value;
    await loadPmvicData();
  }, 300);
}

async function loadPmvicData() {
  const { page, search, status, region, phase, machine_brand } = pmvicState;
  const params = new URLSearchParams({ page, limit: 15, search, status, region, phase, machine_brand });
  const res = await api(`/api/pmvic?${params}`);
  pmvicState.data = res.data;
  pmvicState.total = res.total;

  const tbody = document.getElementById('pmvic-tbody');
  if (!tbody) return;

  if (!res.data.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-cog"></i><p>No PMVIC clients found</p></div></td></tr>`;
  } else {
    tbody.innerHTML = res.data.map(c => `
    <tr>
      <td><strong>${escHtml(c.center_name)}</strong></td>
      <td><code style="color:var(--accent-cyan);font-size:11px">${escHtml(c.authorization_number)}</code></td>
      <td><span class="badge badge-blue">${c.region}</span></td>
      <td><span class="badge ${c.phase==='Phase 1'?'badge-cyan':'badge-purple'}">${c.phase}</span></td>
      <td><span class="badge badge-yellow">${c.machine_brand}</span></td>
      <td>${statusBadgePetc(c.status)}</td>
      <td>${escHtml(c.city)}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-secondary btn-sm" onclick="viewPmvicClient(${c.id})" title="View"><i class="fas fa-eye"></i></button>
          <button class="btn btn-primary btn-sm" onclick="editPmvicClient(${c.id})" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deletePmvicClient(${c.id},'${escAttr(c.center_name)}')" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
  }

  renderPagination('pmvic-pagination', res.total, page, 15, (p) => { pmvicState.page = p; loadPmvicData(); });
}

// ── PMVIC Modal ──────────────────────────────────────────────────────────────
window.openPmvicModal = function(data = null) {
  const isEdit = !!data;
  showModal(`
  <div class="modal-header">
    <div class="modal-title"><i class="fas fa-cog"></i> ${isEdit ? 'Edit' : 'Add'} PMVIC Client</div>
    <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body">
    <form id="pmvic-form" onsubmit="savePmvicClient(event,${data?.id || 'null'})">
      <div class="form-grid">
        <div class="form-group full-width">
          <label class="form-label">Center Name <span class="required">*</span></label>
          <input class="form-control" name="center_name" required placeholder="e.g. AutoCheck MVI Center" value="${data?.center_name || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Authorization Number <span class="required">*</span></label>
          <input class="form-control" name="authorization_number" required placeholder="e.g. PMVIC-NCR-2024-001" value="${data?.authorization_number || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Status <span class="required">*</span></label>
          <select class="form-control" name="status" required>
            ${['Active','No Operation','Suspended'].map(s => `<option value="${s}" ${data?.status===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Phase <span class="required">*</span></label>
          <select class="form-control" name="phase" required>
            ${['Phase 1','Phase 2'].map(p => `<option value="${p}" ${data?.phase===p?'selected':''}>${p}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Machine Brand <span class="required">*</span></label>
          <select class="form-control" name="machine_brand" required>
            ${['ACTIA','CARTEC','UNIMETAL','COSPER','BEISSBARTH','ROMSACTIA'].map(b => `<option value="${b}" ${data?.machine_brand===b?'selected':''}>${b}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Region <span class="required">*</span></label>
          <select class="form-control" name="region" required>
            ${['NCR','CAR','R1','R2','R3','R4A','R4B','R5','R6','R7','R8','R9','R10','R11','R12','CARAGA','BARMM'].map(r => `<option value="${r}" ${data?.region===r?'selected':''}>${r}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Province</label>
          <input class="form-control" name="province" placeholder="Province" value="${data?.province || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">City <span class="required">*</span></label>
          <input class="form-control" name="city" required placeholder="City/Municipality" value="${data?.city || ''}">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Address</label>
          <input class="form-control" name="address" placeholder="Complete address" value="${data?.address || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Contact Person</label>
          <input class="form-control" name="contact_person" placeholder="Name" value="${data?.contact_person || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Contact Number</label>
          <input class="form-control" name="contact_number" placeholder="09XX-XXX-XXXX" value="${data?.contact_number || ''}">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Email</label>
          <input class="form-control" type="email" name="email" placeholder="email@example.com" value="${data?.email || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Accreditation Date</label>
          <input class="form-control" type="date" name="accreditation_date" value="${data?.accreditation_date || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Expiry Date</label>
          <input class="form-control" type="date" name="expiry_date" value="${data?.expiry_date || ''}">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Notes</label>
          <textarea class="form-control" name="notes" placeholder="Additional notes...">${data?.notes || ''}</textarea>
        </div>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="document.getElementById('pmvic-form').requestSubmit()">
      <i class="fas fa-save"></i> ${isEdit ? 'Update' : 'Create'} Client
    </button>
  </div>
  `);
};

window.savePmvicClient = async function(e, id) {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(e.target).entries());
  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/pmvic/${id}` : '/api/pmvic';
  const res = await api(url, { method, body: JSON.stringify(body) });
  if (res.error) return showToast(res.error, 'error');
  showToast(id ? 'PMVIC client updated!' : 'PMVIC client created!', 'success');
  closeModal();
  loadPmvicData();
};

window.viewPmvicClient = async function(id) {
  const d = await api(`/api/pmvic/${id}`);
  showModal(`
  <div class="modal-header">
    <div class="modal-title"><i class="fas fa-cog"></i> PMVIC Client Details</div>
    <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div>
        <div style="font-size:17px;font-weight:700">${escHtml(d.center_name)}</div>
        <code style="color:var(--accent-cyan);font-size:12px">${d.authorization_number}</code>
        <span style="margin-left:8px">${statusBadgePetc(d.status)}</span>
        <span style="margin-left:4px"><span class="badge ${d.phase==='Phase 1'?'badge-cyan':'badge-purple'}">${d.phase}</span></span>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">Machine Brand</div><div class="detail-value"><span class="badge badge-yellow">${d.machine_brand}</span></div></div>
      <div class="detail-item"><div class="detail-label">Region</div><div class="detail-value">${d.region}</div></div>
      <div class="detail-item"><div class="detail-label">Province</div><div class="detail-value">${d.province||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">City</div><div class="detail-value">${d.city}</div></div>
      <div class="detail-item"><div class="detail-label">Contact Person</div><div class="detail-value">${d.contact_person||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Contact Number</div><div class="detail-value">${d.contact_number||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Email</div><div class="detail-value">${d.email||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Expiry Date</div><div class="detail-value">${d.expiry_date||'—'}</div></div>
    </div>
    ${d.notes ? `<div style="margin-top:14px"><div class="detail-label">Notes</div><div style="margin-top:4px;padding:10px;background:var(--bg-input);border-radius:7px;font-size:12px">${escHtml(d.notes)}</div></div>` : ''}
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
    <button class="btn btn-primary" onclick="closeModal();editPmvicClient(${id})"><i class="fas fa-edit"></i> Edit</button>
  </div>
  `);
};

window.editPmvicClient = async function(id) {
  const d = await api(`/api/pmvic/${id}`);
  openPmvicModal(d);
};

window.deletePmvicClient = function(id, name) {
  showConfirm(`Delete "${name}"?`, 'This action cannot be undone.', async () => {
    const res = await api(`/api/pmvic/${id}`, { method: 'DELETE' });
    if (res.error) return showToast(res.error, 'error');
    showToast('PMVIC client deleted', 'success');
    loadPmvicData();
  });
};

// ═══════════════════════════════════════════════════════════════════════════
// SUPPORT TICKETS PAGE
// ═══════════════════════════════════════════════════════════════════════════
let ticketsState = { page: 1, search: '', status: '', priority: '', client_type: '', data: [], total: 0 };

async function renderTicketsPage() {
  const mc = document.getElementById('main-content');
  mc.innerHTML = `
  <div class="page-header">
    <div class="page-title"><i class="fas fa-ticket-alt"></i> Support Tickets</div>
    <button class="btn btn-primary" onclick="openTicketModal()">
      <i class="fas fa-plus"></i> New Ticket
    </button>
  </div>
  <div class="filters-bar">
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input type="text" id="tk-search" placeholder="Search ticket, center name..." oninput="ticketsFilter()">
    </div>
    <select class="filter-select" id="tk-status" onchange="ticketsFilter()">
      <option value="">All Status</option>
      <option value="Open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="Resolved">Resolved</option>
      <option value="Closed">Closed</option>
    </select>
    <select class="filter-select" id="tk-priority" onchange="ticketsFilter()">
      <option value="">All Priorities</option>
      <option value="Critical">Critical</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    <select class="filter-select" id="tk-type" onchange="ticketsFilter()">
      <option value="">All Types</option>
      <option value="PETC">PETC</option>
      <option value="PMVIC">PMVIC</option>
    </select>
  </div>
  <div class="data-table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Ticket #</th>
          <th>Title</th>
          <th>Client</th>
          <th>Type</th>
          <th>Category</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="tickets-tbody">
        <tr><td colspan="9"><div class="loading"><div class="spinner"></div> Loading...</div></td></tr>
      </tbody>
    </table>
    <div class="pagination" id="tickets-pagination"></div>
  </div>
  `;
  await loadTicketsData();
}

let tkSearchTimer;
function ticketsFilter() {
  clearTimeout(tkSearchTimer);
  tkSearchTimer = setTimeout(async () => {
    ticketsState.page = 1;
    ticketsState.search = document.getElementById('tk-search').value;
    ticketsState.status = document.getElementById('tk-status').value;
    ticketsState.priority = document.getElementById('tk-priority').value;
    ticketsState.client_type = document.getElementById('tk-type').value;
    await loadTicketsData();
  }, 300);
}

async function loadTicketsData() {
  const { page, search, status, priority, client_type } = ticketsState;
  const params = new URLSearchParams({ page, limit: 15, search, status, priority, client_type });
  const res = await api(`/api/tickets?${params}`);
  ticketsState.data = res.data;
  ticketsState.total = res.total;

  const tbody = document.getElementById('tickets-tbody');
  if (!tbody) return;

  if (!res.data.length) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-ticket-alt"></i><p>No tickets found</p></div></td></tr>`;
  } else {
    tbody.innerHTML = res.data.map(t => `
    <tr>
      <td><code style="color:var(--accent-blue);font-size:11px">${t.ticket_number}</code></td>
      <td style="max-width:200px"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(t.title)}</div></td>
      <td style="max-width:160px;font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(t.client_name)}</td>
      <td><span class="badge ${t.client_type==='PETC'?'badge-blue':'badge-purple'}">${t.client_type}</span></td>
      <td style="font-size:11px;color:var(--text-secondary)">${t.category}</td>
      <td>${priorityBadge(t.priority)}</td>
      <td>${statusBadge(t.status)}</td>
      <td style="font-size:11px;color:var(--text-muted)">${fmtDate(t.opened_at)}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-secondary btn-sm" onclick="viewTicket(${t.id})" title="View"><i class="fas fa-eye"></i></button>
          <button class="btn btn-primary btn-sm" onclick="editTicket(${t.id})" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteTicket(${t.id},'${escAttr(t.ticket_number)}')" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
  }

  renderPagination('tickets-pagination', res.total, page, 15, (p) => { ticketsState.page = p; loadTicketsData(); });
}

// ── Ticket Modal ──────────────────────────────────────────────────────────────
window.openTicketModal = function(data = null) {
  const isEdit = !!data;
  showModal(`
  <div class="modal-header">
    <div class="modal-title"><i class="fas fa-ticket-alt"></i> ${isEdit ? 'Edit' : 'New'} Support Ticket</div>
    <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body">
    <form id="ticket-form" onsubmit="saveTicket(event,${data?.id || 'null'})">
      <div class="form-grid">
        <div class="form-group full-width">
          <label class="form-label">Title <span class="required">*</span></label>
          <input class="form-control" name="title" required placeholder="Brief description of the issue" value="${data?.title || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Client Type <span class="required">*</span></label>
          <select class="form-control" name="client_type" required onchange="loadClientOptions(this.value)" ${isEdit?'disabled':''}>
            <option value="">Select Type</option>
            <option value="PETC" ${data?.client_type==='PETC'?'selected':''}>PETC</option>
            <option value="PMVIC" ${data?.client_type==='PMVIC'?'selected':''}>PMVIC</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Client Name <span class="required">*</span></label>
          <input class="form-control" name="client_name" required placeholder="Center name" value="${data?.client_name || ''}">
        </div>
        <input type="hidden" name="client_id" value="${data?.client_id || '1'}">
        <div class="form-group">
          <label class="form-label">Category <span class="required">*</span></label>
          <select class="form-control" name="category" required>
            ${['Network/Connectivity','Hardware Failure','Software Issue','Calibration','Power Issue','Other'].map(c => `<option value="${c}" ${data?.category===c?'selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Priority</label>
          <select class="form-control" name="priority">
            ${['Low','Medium','High','Critical'].map(p => `<option value="${p}" ${(data?.priority===p || (!data && p==='Medium'))?'selected':''}>${p}</option>`).join('')}
          </select>
        </div>
        ${isEdit ? `
        <div class="form-group">
          <label class="form-label">Status</label>
          <select class="form-control" name="status">
            ${['Open','In Progress','Resolved','Closed'].map(s => `<option value="${s}" ${data?.status===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>` : ''}
        <div class="form-group">
          <label class="form-label">Assigned To</label>
          <input class="form-control" name="assigned_to" placeholder="Technician or team" value="${data?.assigned_to || ''}">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Description</label>
          <textarea class="form-control" name="description" placeholder="Detailed description of the issue...">${data?.description || ''}</textarea>
        </div>
        ${isEdit ? `
        <div class="form-group full-width">
          <label class="form-label">Resolution Notes</label>
          <textarea class="form-control" name="resolution_notes" placeholder="Steps taken to resolve the issue...">${data?.resolution_notes || ''}</textarea>
        </div>` : ''}
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="document.getElementById('ticket-form').requestSubmit()">
      <i class="fas fa-save"></i> ${isEdit ? 'Update' : 'Create'} Ticket
    </button>
  </div>
  `);
};

window.saveTicket = async function(e, id) {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(e.target).entries());
  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/tickets/${id}` : '/api/tickets';
  const res = await api(url, { method, body: JSON.stringify(body) });
  if (res.error) return showToast(res.error, 'error');
  showToast(id ? 'Ticket updated!' : `Ticket ${res.ticket_number} created!`, 'success');
  closeModal();
  loadTicketsData();
};

window.viewTicket = async function(id) {
  const t = await api(`/api/tickets/${id}`);
  showModal(`
  <div class="modal-header">
    <div class="modal-title"><i class="fas fa-ticket-alt"></i> Ticket ${t.ticket_number}</div>
    <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      <code style="color:var(--accent-blue)">${t.ticket_number}</code>
      ${priorityBadge(t.priority)} ${statusBadge(t.status)}
      <span class="badge ${t.client_type==='PETC'?'badge-blue':'badge-purple'}">${t.client_type}</span>
    </div>
    <div style="font-size:16px;font-weight:700;margin-bottom:4px">${escHtml(t.title)}</div>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:14px">${escHtml(t.client_name)}</div>
    <div class="detail-grid" style="margin-bottom:12px">
      <div class="detail-item"><div class="detail-label">Category</div><div class="detail-value">${t.category}</div></div>
      <div class="detail-item"><div class="detail-label">Assigned To</div><div class="detail-value">${t.assigned_to||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Opened</div><div class="detail-value">${fmtDate(t.opened_at)}</div></div>
      <div class="detail-item"><div class="detail-label">Resolved</div><div class="detail-value">${t.resolved_at ? fmtDate(t.resolved_at) : '—'}</div></div>
    </div>
    ${t.description ? `<div style="margin-bottom:12px"><div class="detail-label">Description</div><div style="margin-top:4px;padding:10px;background:var(--bg-input);border-radius:7px;font-size:12px">${escHtml(t.description)}</div></div>` : ''}
    ${t.resolution_notes ? `<div><div class="detail-label">Resolution Notes</div><div style="margin-top:4px;padding:10px;background:var(--bg-input);border-radius:7px;font-size:12px">${escHtml(t.resolution_notes)}</div></div>` : ''}
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
    <button class="btn btn-primary" onclick="closeModal();editTicket(${id})"><i class="fas fa-edit"></i> Edit</button>
  </div>
  `);
};

window.editTicket = async function(id) {
  const d = await api(`/api/tickets/${id}`);
  openTicketModal(d);
};

window.deleteTicket = function(id, num) {
  showConfirm(`Delete ticket ${num}?`, 'This action cannot be undone.', async () => {
    const res = await api(`/api/tickets/${id}`, { method: 'DELETE' });
    if (res.error) return showToast(res.error, 'error');
    showToast('Ticket deleted', 'success');
    loadTicketsData();
  });
};

// ═══════════════════════════════════════════════════════════════════════════
// ANALYTICS PAGE
// ═══════════════════════════════════════════════════════════════════════════
async function renderAnalyticsPage() {
  const stats = await api('/api/stats');
  const mc = document.getElementById('main-content');
  mc.innerHTML = `
  <div class="page-header">
    <div class="page-title"><i class="fas fa-chart-line"></i> Analytics</div>
  </div>

  <!-- Summary KPIs -->
  <div class="kpi-grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));margin-bottom:20px">
    <div class="kpi-card blue">
      <div class="kpi-icon"><i class="fas fa-building"></i></div>
      <div class="kpi-value">${stats.combined_total}</div>
      <div class="kpi-label">Total Centers</div>
    </div>
    <div class="kpi-card green">
      <div class="kpi-icon"><i class="fas fa-check"></i></div>
      <div class="kpi-value">${stats.petc.active}</div>
      <div class="kpi-label">Active PETC</div>
    </div>
    <div class="kpi-card cyan">
      <div class="kpi-icon"><i class="fas fa-cog"></i></div>
      <div class="kpi-value">${stats.pmvic.total}</div>
      <div class="kpi-label">Total PMVIC</div>
    </div>
    <div class="kpi-card orange">
      <div class="kpi-icon"><i class="fas fa-ticket-alt"></i></div>
      <div class="kpi-value">${stats.tickets.open}</div>
      <div class="kpi-label">Open Tickets</div>
    </div>
    <div class="kpi-card red">
      <div class="kpi-icon"><i class="fas fa-exclamation"></i></div>
      <div class="kpi-value">${stats.tickets.critical}</div>
      <div class="kpi-label">Critical</div>
    </div>
    <div class="kpi-card purple">
      <div class="kpi-icon"><i class="fas fa-check-double"></i></div>
      <div class="kpi-value">${stats.tickets.resolved}</div>
      <div class="kpi-label">Resolved</div>
    </div>
  </div>

  <!-- 3-column charts -->
  <div class="dash-grid-3" style="margin-bottom:16px">
    <div class="widget">
      <div class="widget-header"><div class="widget-title"><i class="fas fa-chart-pie"></i> PETC Status</div></div>
      <div class="widget-body" style="height:200px"><canvas id="an-petc-status"></canvas></div>
    </div>
    <div class="widget">
      <div class="widget-header"><div class="widget-title"><i class="fas fa-chart-pie"></i> PMVIC Phase Split</div></div>
      <div class="widget-body" style="height:200px"><canvas id="an-pmvic-phase"></canvas></div>
    </div>
    <div class="widget">
      <div class="widget-header"><div class="widget-title"><i class="fas fa-microchip"></i> Machine Brands</div></div>
      <div class="widget-body" style="height:200px"><canvas id="an-brands"></canvas></div>
    </div>
  </div>

  <!-- 2-column charts -->
  <div class="dash-grid">
    <div class="widget">
      <div class="widget-header"><div class="widget-title"><i class="fas fa-map-marker-alt"></i> PETC by Region</div></div>
      <div class="widget-body" style="height:260px"><canvas id="an-regions-petc"></canvas></div>
    </div>
    <div class="widget">
      <div class="widget-header"><div class="widget-title"><i class="fas fa-map-marker-alt"></i> PMVIC by Region</div></div>
      <div class="widget-body" style="height:260px"><canvas id="an-regions-pmvic"></canvas></div>
    </div>
  </div>
  `;

  // Draw analytics charts
  const chartDefaults = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#7a9abc', font: { size: 11 } } } }
  };

  // PETC status pie
  charts['an-petc-status'] = new Chart(document.getElementById('an-petc-status'), {
    type: 'pie',
    data: {
      labels: ['Active', 'No Operation', 'Suspended'],
      datasets: [{ data: [stats.petc.active, stats.petc.no_operation, stats.petc.suspended], backgroundColor: ['#00e676','#ff9800','#f44336'], borderWidth: 0 }]
    },
    options: { ...chartDefaults }
  });

  // PMVIC phase doughnut
  charts['an-pmvic-phase'] = new Chart(document.getElementById('an-pmvic-phase'), {
    type: 'doughnut',
    data: {
      labels: ['Phase 1', 'Phase 2'],
      datasets: [{ data: [stats.pmvic.phase1, stats.pmvic.phase2], backgroundColor: ['#00bcd4','#9c27b0'], borderWidth: 0 }]
    },
    options: { ...chartDefaults, cutout: '65%' }
  });

  // Brands
  charts['an-brands'] = new Chart(document.getElementById('an-brands'), {
    type: 'bar',
    data: {
      labels: stats.pmvic_brands.map(b => b.machine_brand),
      datasets: [{ data: stats.pmvic_brands.map(b => b.count), backgroundColor: ['#2196f3','#00bcd4','#ffc107','#f44336','#9c27b0','#ff9800'], borderRadius: 6, borderWidth: 0 }]
    },
    options: { ...chartDefaults, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#7a9abc', font:{size:10} } }, y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7a9abc' } } } }
  });

  // PETC by region
  const pr = stats.top_regions_petc;
  charts['an-regions-petc'] = new Chart(document.getElementById('an-regions-petc'), {
    type: 'bar',
    data: { labels: pr.map(r => r.region), datasets: [{ data: pr.map(r => r.count), backgroundColor: 'rgba(33,150,243,0.7)', borderRadius: 5, borderWidth: 0 }] },
    options: { ...chartDefaults, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7a9abc' } }, y: { grid: { display: false }, ticks: { color: '#7a9abc', font:{size:11} } } } }
  });

  // PMVIC by region
  const pmr = stats.top_regions_pmvic;
  charts['an-regions-pmvic'] = new Chart(document.getElementById('an-regions-pmvic'), {
    type: 'bar',
    data: { labels: pmr.map(r => r.region), datasets: [{ data: pmr.map(r => r.count), backgroundColor: 'rgba(156,39,176,0.7)', borderRadius: 5, borderWidth: 0 }] },
    options: { ...chartDefaults, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7a9abc' } }, y: { grid: { display: false }, ticks: { color: '#7a9abc', font:{size:11} } } } }
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// UI UTILITIES
// ═══════════════════════════════════════════════════════════════════════════
function priorityBadge(p) {
  const map = { 'Critical': 'badge-red', 'High': 'badge-orange', 'Medium': 'badge-yellow', 'Low': 'badge-gray' };
  return `<span class="badge ${map[p]||'badge-gray'}">${p}</span>`;
}

function statusBadge(s) {
  const map = { 'Open': 'badge-orange', 'In Progress': 'badge-blue', 'Resolved': 'badge-green', 'Closed': 'badge-gray' };
  return `<span class="badge ${map[s]||'badge-gray'}">${s}</span>`;
}

function fmtDate(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-PH', { year:'numeric', month:'short', day:'numeric' }); }
  catch(e) { return d; }
}

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function escAttr(s) {
  if (!s) return '';
  return String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;');
}

function renderPagination(containerId, total, currentPg, limit, onPageChange) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const totalPages = Math.ceil(total / limit);
  const start = Math.min((currentPg - 1) * limit + 1, total);
  const end = Math.min(currentPg * limit, total);

  if (total === 0) { el.innerHTML = ''; return; }

  let pages = '';
  const range = 2;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPg - range && i <= currentPg + range)) {
      pages += `<button class="page-btn ${i === currentPg ? 'active' : ''}" onclick="(${onPageChange})(${i})">${i}</button>`;
    } else if (i === currentPg - range - 1 || i === currentPg + range + 1) {
      pages += `<span style="color:var(--text-muted);padding:0 4px;display:flex;align-items:center">…</span>`;
    }
  }

  el.innerHTML = `
  <span class="page-info">Showing ${start}–${end} of ${total} records</span>
  <div class="page-btns">
    <button class="page-btn" ${currentPg <= 1 ? 'disabled' : ''} onclick="(${onPageChange})(${currentPg - 1})"><i class="fas fa-chevron-left"></i></button>
    ${pages}
    <button class="page-btn" ${currentPg >= totalPages ? 'disabled' : ''} onclick="(${onPageChange})(${currentPg + 1})"><i class="fas fa-chevron-right"></i></button>
  </div>
  `;
}

// ── Modal system ──────────────────────────────────────────────────────────────
function showModal(html) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `<div class="modal">${html}</div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
}

window.closeModal = function() {
  const el = document.getElementById('modal-overlay');
  if (el) el.remove();
};

// ── Confirm dialog ────────────────────────────────────────────────────────────
function showConfirm(title, message, onConfirm) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `
  <div class="confirm-modal">
    <div class="confirm-icon"><i class="fas fa-trash-alt"></i></div>
    <div style="font-size:17px;font-weight:700;margin-bottom:8px">${title}</div>
    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:24px">${message}</div>
    <div style="display:flex;justify-content:center;gap:10px">
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" id="confirm-ok"><i class="fas fa-trash"></i> Delete</button>
    </div>
  </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('confirm-ok').onclick = () => { closeModal(); onConfirm(); };
}

// ── Toast notifications ───────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const tc = document.getElementById('toasts');
  if (!tc) return;
  const t = document.createElement('div');
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fas ${icons[type]}"></i> ${escHtml(msg)}`;
  tc.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}
