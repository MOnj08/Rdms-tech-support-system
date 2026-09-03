-- RDMS Technical Support System - Initial Schema

-- PETC Clients Table
CREATE TABLE IF NOT EXISTS petc_clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  center_name TEXT NOT NULL,
  authorization_number TEXT UNIQUE NOT NULL,
  region TEXT NOT NULL,
  province TEXT,
  city TEXT NOT NULL,
  address TEXT,
  status TEXT NOT NULL DEFAULT 'Active' CHECK(status IN ('Active', 'No Operation', 'Suspended')),
  contact_person TEXT,
  contact_number TEXT,
  email TEXT,
  accreditation_date TEXT,
  expiry_date TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- PMVIC Clients Table
CREATE TABLE IF NOT EXISTS pmvic_clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  center_name TEXT NOT NULL,
  authorization_number TEXT UNIQUE NOT NULL,
  region TEXT NOT NULL,
  province TEXT,
  city TEXT NOT NULL,
  address TEXT,
  phase TEXT NOT NULL DEFAULT 'Phase 1' CHECK(phase IN ('Phase 1', 'Phase 2')),
  machine_brand TEXT NOT NULL DEFAULT 'ACTIA' CHECK(machine_brand IN ('ACTIA', 'CARTEC', 'UNIMETAL', 'COSPER', 'BEISSBARTH', 'ROMSACTIA')),
  status TEXT NOT NULL DEFAULT 'Active' CHECK(status IN ('Active', 'No Operation', 'Suspended')),
  contact_person TEXT,
  contact_number TEXT,
  email TEXT,
  accreditation_date TEXT,
  expiry_date TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Support Tickets Table
CREATE TABLE IF NOT EXISTS support_tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  client_type TEXT NOT NULL CHECK(client_type IN ('PETC', 'PMVIC')),
  client_id INTEGER NOT NULL,
  client_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('Network/Connectivity', 'Hardware Failure', 'Software Issue', 'Calibration', 'Power Issue', 'Other')),
  priority TEXT NOT NULL DEFAULT 'Medium' CHECK(priority IN ('Low', 'Medium', 'High', 'Critical')),
  status TEXT NOT NULL DEFAULT 'Open' CHECK(status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
  assigned_to TEXT,
  resolution_notes TEXT,
  opened_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  resolved_at DATETIME,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_petc_region ON petc_clients(region);
CREATE INDEX IF NOT EXISTS idx_petc_status ON petc_clients(status);
CREATE INDEX IF NOT EXISTS idx_pmvic_region ON pmvic_clients(region);
CREATE INDEX IF NOT EXISTS idx_pmvic_status ON pmvic_clients(status);
CREATE INDEX IF NOT EXISTS idx_pmvic_phase ON pmvic_clients(phase);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_client ON support_tickets(client_type, client_id);
