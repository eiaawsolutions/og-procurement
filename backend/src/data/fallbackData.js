export const fallbackTenders = [
  {
    id: "TDR-2026-0041",
    t: "Supply of Drilling Mud & Chemicals",
    cat: "Upstream - Drilling",
    st: "Open",
    dl: "2026-04-15",
    bgt: "MYR 2.4M",
    bids: 7,
    hse: "PETRONAS HSE",
    urg: "high"
  },
  {
    id: "TDR-2026-0040",
    t: "Platform Structural Maintenance",
    cat: "Upstream - Maintenance",
    st: "Open",
    dl: "2026-04-22",
    bgt: "MYR 8.75M",
    bids: 4,
    hse: "DOSH + OSHA",
    urg: "medium"
  }
];

export const fallbackVendors = [
  {
    id: "V-1001",
    nm: "PetroServ Engineering Sdn Bhd",
    cat: "Drilling Services",
    rt: 4.7,
    hse: 94,
    st: "Active",
    co: "MY",
    certs: ["ISO 9001", "ISO 14001", "PETRONAS License"],
    prj: 23
  },
  {
    id: "V-1002",
    nm: "AsiaPac Subsea Solutions",
    cat: "Subsea & ROV",
    rt: 4.5,
    hse: 91,
    st: "Active",
    co: "SG",
    certs: ["IMCA", "ISO 45001", "DNV"],
    prj: 18
  }
];

export const fallbackPurchaseOrders = [
  {
    id: "PO-2026-0112",
    vn: "PetroServ Engineering",
    d: "Drill pipe rental",
    a: "MYR 340K",
    st: "Approved",
    dt: "2026-03-15"
  },
  {
    id: "PO-2026-0111",
    vn: "GlobalChem Industries",
    d: "Barite & Bentonite Q2",
    a: "MYR 128.5K",
    st: "Pending",
    dt: "2026-03-14"
  }
];

export const fallbackHseIncidents = [
  {
    id: "HSE-041",
    tp: "Near Miss",
    d: "Dropped object from crane during lifting",
    site: "Platform Alpha",
    dt: "2026-03-28",
    sv: "Medium",
    st: "Investigating"
  },
  {
    id: "HSE-040",
    tp: "Environmental",
    d: "Minor hydraulic oil spill on deck",
    site: "FPSO Bunga Raya",
    dt: "2026-03-25",
    sv: "Low",
    st: "Resolved"
  }
];
