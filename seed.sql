-- Seed Data for RDMS Technical Support System

-- PETC Clients
INSERT OR IGNORE INTO petc_clients (center_name, authorization_number, region, province, city, address, status, contact_person, contact_number, email, accreditation_date, expiry_date) VALUES
('Air Master Emission Center - Molino', 'R4A-2023-001', 'R4A', 'Cavite', 'Bacoor', 'Molino Blvd, Bacoor, Cavite', 'Active', 'Juan dela Cruz', '0917-123-4567', 'airmasteremission@email.com', '2023-01-15', '2026-01-14'),
('JPV Emission Testing Corp.', 'R7-2003-03-008', 'R7', 'Bohol', 'Tagbilaran', 'Tagbilaran City, Bohol', 'Suspended', 'Jose Villanueva', '0918-234-5678', 'jpv@email.com', '2003-03-08', '2026-03-07'),
('7 Archangels ETC Tanza', 'R4A-2022-015', 'R4A', 'Cavite', 'Tanza', 'Tanza, Cavite', 'No Operation', 'Maria Santos', '0919-345-6789', '7archangels@email.com', '2022-06-10', '2025-06-09'),
('IPV ETC Bais', 'R7-2021-022', 'R7', 'Negros Oriental', 'Bais', 'Bais City, Negros Oriental', 'No Operation', 'Ignacio Perez', '0920-456-7890', 'ipvetc@email.com', '2021-09-20', '2024-09-19'),
('SHEMA ETC Naic', 'R4A-2023-031', 'R4A', 'Cavite', 'Naic', 'Naic, Cavite', 'No Operation', 'Sheryl Mendoza', '0921-567-8901', 'shema@email.com', '2023-02-28', '2026-02-27'),
('Metro Manila ETC Taguig', 'NCR-2022-005', 'NCR', 'Metro Manila', 'Taguig', 'BGC, Taguig City', 'Active', 'Robert Lim', '0922-678-9012', 'mmetc@email.com', '2022-03-15', '2025-03-14'),
('Laguna Emission Center', 'R4A-2021-008', 'R4A', 'Laguna', 'Calamba', 'Calamba City, Laguna', 'Active', 'Ana Reyes', '0923-789-0123', 'laguna@email.com', '2021-11-01', '2024-10-31'),
('Cebu Emission Testing', 'R7-2023-012', 'R7', 'Cebu', 'Cebu City', 'Cebu City', 'Active', 'Pedro Garcia', '0924-890-1234', 'cebuetc@email.com', '2023-04-20', '2026-04-19'),
('Davao Emission Center', 'R11-2022-018', 'R11', 'Davao del Sur', 'Davao City', 'Davao City', 'Active', 'Elena Torres', '0925-901-2345', 'davao@email.com', '2022-07-12', '2025-07-11'),
('Iloilo Emission Testing Corp', 'R6-2021-003', 'R6', 'Iloilo', 'Iloilo City', 'Iloilo City', 'Active', 'Carlos Flores', '0926-012-3456', 'iloilo@email.com', '2021-05-05', '2024-05-04'),
('Batangas ETC', 'R4A-2023-045', 'R4A', 'Batangas', 'Batangas City', 'Batangas City', 'Active', 'Liza Ramos', '0927-123-4560', 'batangas@email.com', '2023-08-01', '2026-07-31'),
('Pampanga Emission Center', 'R3-2022-009', 'R3', 'Pampanga', 'San Fernando', 'San Fernando, Pampanga', 'Active', 'Manuel Cruz', '0928-234-5671', 'pampanga@email.com', '2022-10-15', '2025-10-14'),
('Bulacan ETC', 'R3-2021-014', 'R3', 'Bulacan', 'Malolos', 'Malolos, Bulacan', 'Active', 'Nora Bautista', '0929-345-6782', 'bulacan@email.com', '2021-12-20', '2024-12-19'),
('Quezon Province ETC', 'R4A-2022-027', 'R4A', 'Quezon', 'Lucena', 'Lucena City, Quezon', 'Active', 'Oscar Villanueva', '0930-456-7893', 'qpetc@email.com', '2022-04-25', '2025-04-24'),
('Rizal Emission Testing', 'NCR-2023-011', 'NCR', 'Rizal', 'Antipolo', 'Antipolo City, Rizal', 'Active', 'Patricia Domingo', '0931-567-8904', 'rizaletc@email.com', '2023-06-30', '2026-06-29');

-- PMVIC Clients
INSERT OR IGNORE INTO pmvic_clients (center_name, authorization_number, region, province, city, address, phase, machine_brand, status, contact_person, contact_number, email, accreditation_date, expiry_date) VALUES
('AutoCheck MVI Center - BGC', 'PMVIC-NCR-2024-001', 'NCR', 'Metro Manila', 'Taguig', 'BGC, Taguig City', 'Phase 1', 'ACTIA', 'Active', 'James Tan', '0932-678-9015', 'autocheck@email.com', '2024-01-10', '2027-01-09'),
('SafeDrive Inspection Center', 'PMVIC-R4A-2024-002', 'R4A', 'Cavite', 'Imus', 'Imus City, Cavite', 'Phase 1', 'UNIMETAL', 'Active', 'Grace Ocampo', '0933-789-0126', 'safedrive@email.com', '2024-02-15', '2027-02-14'),
('Metro PMVIC Station', 'PMVIC-NCR-2024-003', 'NCR', 'Metro Manila', 'Makati', 'Makati City', 'Phase 2', 'ACTIA', 'Active', 'Henry Lim', '0934-890-1237', 'metropmvic@email.com', '2024-03-20', '2027-03-19'),
('Laguna Vehicle Inspection', 'PMVIC-R4A-2024-004', 'R4A', 'Laguna', 'Santa Rosa', 'Santa Rosa City, Laguna', 'Phase 1', 'CARTEC', 'Active', 'Irene Medina', '0935-901-2348', 'lagunavi@email.com', '2024-04-25', '2027-04-24'),
('Cebu PMVIC Hub', 'PMVIC-R7-2024-005', 'R7', 'Cebu', 'Cebu City', 'Cebu City', 'Phase 1', 'UNIMETAL', 'Active', 'Jose Navarro', '0936-012-3459', 'cebupmvic@email.com', '2024-05-30', '2027-05-29'),
('Davao Inspection Station', 'PMVIC-R11-2024-006', 'R11', 'Davao del Sur', 'Davao City', 'Davao City', 'Phase 1', 'ACTIA', 'Active', 'Karen Santos', '0937-123-4560', 'davaopis@email.com', '2024-06-15', '2027-06-14'),
('Pampanga PMVIC Center', 'PMVIC-R3-2024-007', 'R3', 'Pampanga', 'Angeles', 'Angeles City, Pampanga', 'Phase 2', 'COSPER', 'Active', 'Leo Reyes', '0938-234-5671', 'pampangapmvic@email.com', '2024-07-20', '2027-07-19'),
('QC Vehicle Inspection', 'PMVIC-NCR-2024-008', 'NCR', 'Metro Manila', 'Quezon City', 'Quezon City', 'Phase 1', 'ACTIA', 'Active', 'Mia Cruz', '0939-345-6782', 'qcvi@email.com', '2024-08-25', '2027-08-24'),
('Batangas PMVIC', 'PMVIC-R4A-2024-009', 'R4A', 'Batangas', 'Batangas City', 'Batangas City', 'Phase 1', 'BEISSBARTH', 'Active', 'Noel Garcia', '0940-456-7893', 'batangaspmvic@email.com', '2024-09-10', '2027-09-09'),
('Bulacan MVI Station', 'PMVIC-R3-2024-010', 'R3', 'Bulacan', 'Meycauayan', 'Meycauayan, Bulacan', 'Phase 1', 'ROMSACTIA', 'Active', 'Olivia Torres', '0941-567-8904', 'bulacanmvi@email.com', '2024-10-15', '2027-10-14');

-- Support Tickets
INSERT OR IGNORE INTO support_tickets (ticket_number, title, description, client_type, client_id, client_name, category, priority, status, assigned_to, opened_at) VALUES
('TKT-001', 'Network Connectivity Issue', 'Cannot connect to RDMS server for daily uploads', 'PETC', 1, 'Air Master Emission Center - Molino', 'Network/Connectivity', 'High', 'Open', 'Tech Team A', '2026-08-28 09:00:00'),
('TKT-002', 'PMVIC Machine Calibration Failure', 'Calibration readings are off by 15%', 'PMVIC', 2, 'SafeDrive Inspection Center', 'Calibration', 'Critical', 'Open', 'Tech Team B', '2026-08-29 10:30:00'),
('TKT-003', 'Printer not working', 'Certificate printer is not printing properly', 'PETC', 6, 'Metro Manila ETC Taguig', 'Hardware Failure', 'Medium', 'In Progress', 'Tech Team A', '2026-08-30 14:00:00'),
('TKT-004', 'Software update required', 'System needs latest RDMS firmware update', 'PMVIC', 3, 'Metro PMVIC Station', 'Software Issue', 'Low', 'Resolved', 'Tech Team C', '2026-08-25 08:00:00'),
('TKT-005', 'PETC Network outage - Cebu', 'Complete network outage at Cebu center', 'PETC', 8, 'Cebu Emission Testing', 'Network/Connectivity', 'Critical', 'In Progress', 'Tech Team B', '2026-09-01 07:30:00'),
('TKT-006', 'Power fluctuation issue', 'UPS unit failing causing intermittent shutdowns', 'PMVIC', 4, 'Laguna Vehicle Inspection', 'Power Issue', 'High', 'Open', 'Tech Team A', '2026-09-02 11:00:00'),
('TKT-007', 'Data sync error', 'Test results not uploading to central server', 'PETC', 9, 'Davao Emission Center', 'Software Issue', 'Medium', 'Resolved', 'Tech Team C', '2026-08-20 13:00:00');
