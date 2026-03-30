insert into tenders (id, t, cat, st, dl, bgt, bids, hse, urg) values
  ('TDR-2026-0041', 'Supply of Drilling Mud & Chemicals', 'Upstream - Drilling', 'Open', '2026-04-15', 'MYR 2.4M', 7, 'PETRONAS HSE', 'high'),
  ('TDR-2026-0040', 'Platform Structural Maintenance', 'Upstream - Maintenance', 'Open', '2026-04-22', 'MYR 8.75M', 4, 'DOSH + OSHA', 'medium'),
  ('TDR-2026-0039', 'Subsea Pipeline Inspection (ROV)', 'Upstream - Subsea', 'Evaluation', '2026-03-28', 'MYR 5.2M', 6, 'IMCA', 'high'),
  ('TDR-2026-0038', 'PPE & Safety Equipment Procurement', 'HSE - Safety', 'Open', '2026-04-30', 'MYR 680K', 12, 'SIRIM MS', 'low'),
  ('TDR-2026-0037', 'Gas Compression System Overhaul', 'Midstream - Processing', 'Awarded', '2026-03-10', 'MYR 12.3M', 3, 'API 618', 'high'),
  ('TDR-2026-0036', 'Tank Farm Cleaning & Sludge Disposal', 'Downstream - Storage', 'Evaluation', '2026-03-25', 'MYR 1.95M', 5, 'DOE', 'medium')
on conflict (id) do update set
  t = excluded.t,
  cat = excluded.cat,
  st = excluded.st,
  dl = excluded.dl,
  bgt = excluded.bgt,
  bids = excluded.bids,
  hse = excluded.hse,
  urg = excluded.urg;

insert into vendors (id, nm, cat, rt, hse, st, co, certs, prj) values
  ('V-1001', 'PetroServ Engineering Sdn Bhd', 'Drilling Services', 4.7, 94, 'Active', 'MY', array['ISO 9001','ISO 14001','PETRONAS License'], 23),
  ('V-1002', 'AsiaPac Subsea Solutions', 'Subsea & ROV', 4.5, 91, 'Active', 'SG', array['IMCA','ISO 45001','DNV'], 18),
  ('V-1003', 'GlobalChem Industries', 'Chemicals & Fluids', 4.2, 87, 'Active', 'MY', array['SIRIM','ISO 9001','GHS'], 31),
  ('V-1004', 'TechFab Steel Structures', 'Fabrication', 4.0, 82, 'Under Review', 'MY', array['AWS D1.1','ASME','CIDB G7'], 14),
  ('V-1005', 'OceanGuard Safety Supplies', 'PPE & Safety', 4.8, 96, 'Active', 'MY', array['SIRIM MS','EN 166','ISO 9001'], 45),
  ('V-1006', 'Nordic Marine Services AS', 'Marine & Offshore', 4.3, 89, 'Active', 'NO', array['DNV GL','ISM Code','MLC 2006'], 12)
on conflict (id) do update set
  nm = excluded.nm,
  cat = excluded.cat,
  rt = excluded.rt,
  hse = excluded.hse,
  st = excluded.st,
  co = excluded.co,
  certs = excluded.certs,
  prj = excluded.prj;

insert into purchase_orders (id, vn, d, a, st, dt) values
  ('PO-2026-0112', 'PetroServ Engineering', 'Drill pipe rental', 'MYR 340K', 'Approved', '2026-03-15'),
  ('PO-2026-0111', 'GlobalChem Industries', 'Barite & Bentonite Q2', 'MYR 128.5K', 'Pending', '2026-03-14'),
  ('PO-2026-0110', 'OceanGuard Safety', 'H2S detectors & gas monitors', 'MYR 89.2K', 'Delivered', '2026-03-01'),
  ('PO-2026-0109', 'TechFab Steel', 'Pipe supports & structural steel', 'MYR 567K', 'In Transit', '2026-02-28')
on conflict (id) do update set
  vn = excluded.vn,
  d = excluded.d,
  a = excluded.a,
  st = excluded.st,
  dt = excluded.dt;

insert into hse_incidents (id, tp, d, site, dt, sv, st) values
  ('HSE-041', 'Near Miss', 'Dropped object from crane during lifting', 'Platform Alpha', '2026-03-28', 'Medium', 'Investigating'),
  ('HSE-040', 'Environmental', 'Minor hydraulic oil spill on deck', 'FPSO Bunga Raya', '2026-03-25', 'Low', 'Resolved'),
  ('HSE-038', 'Permit Violation', 'Hot work without gas-free certificate', 'Platform Bravo', '2026-03-18', 'High', 'Open'),
  ('HSE-037', 'LTI', 'Hand injury during valve replacement', 'Gas Plant Duyong', '2026-03-10', 'High', 'Closed')
on conflict (id) do update set
  tp = excluded.tp,
  d = excluded.d,
  site = excluded.site,
  dt = excluded.dt,
  sv = excluded.sv,
  st = excluded.st;
