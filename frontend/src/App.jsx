import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// ─── ICONS ──────────────────────────────────────────────────────
const I = {
  Dashboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Tender: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Vendor: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  PO: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/></svg>,
  Chart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Bot: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V5"/><circle cx="12" cy="3" r="2"/><circle cx="9" cy="14" r="1.5" fill="currentColor"/><circle cx="15" cy="14" r="1.5" fill="currentColor"/></svg>,
  Gavel: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M14.5 2L18 5.5 7.5 16H4v-3.5L14.5 2z"/><path d="M2 22h20"/></svg>,
  Gear: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Onboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
  Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20,6 9,17 4,12"/></svg>,
  ArrowUp: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5,12 12,5 19,12"/></svg>,
  ArrowDown: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19,12 12,19 5,12"/></svg>,
  Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Fire: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>,
  Alert: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Globe: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  Upload: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Menu: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Dollar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  File: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
};

// ─── COUNTRY COMPLIANCE DATABASE ────────────────────────────────
const CC = {
  MY: { name: "Malaysia", flag: "🇲🇾", cap: "MYR 100K (License) / MYR 10K (Reg)", local: [
    { n: "PETRONAS License (Upstream)", d: "Mandatory for upstream O&G supply via PLMS portal", req: true },
    { n: "PETRONAS Registration (Downstream)", d: "Required for downstream sector — PETRONAS subsidiaries only", req: true },
    { n: "SWEC Classification", d: "Standardized Work & Equipment Category code — General or Strategic", req: true },
    { n: "DOSH OSHA 1994 Compliance", d: "Dept of Occupational Safety & Health — workplace safety", req: true },
    { n: "DOE Environmental Quality Act", d: "Department of Environment — EIA, waste, emissions", req: true },
    { n: "SSM Company Registration", d: "Companies Commission of Malaysia (Suruhanjaya Syarikat Malaysia)", req: true },
    { n: "CIDB Registration (G1-G7)", d: "Construction Industry Development Board grading", req: false },
    { n: "Bumiputera Status Certificate", d: "TERAJU/PUNB verification for Bumi-reserved tenders", req: false },
    { n: "SIRIM Certification", d: "Standards & Industrial Research Institute Malaysia", req: false },
    { n: "NIOSH Safety Passport", d: "National Institute of Occupational Safety & Health", req: false },
  ]},
  SG: { name: "Singapore", flag: "🇸🇬", cap: "SGD 1 (Pte Ltd minimum)", local: [
    { n: "ACRA Business Registration", d: "Accounting & Corporate Regulatory Authority", req: true },
    { n: "WSH Act Compliance", d: "Workplace Safety & Health Act — Ministry of Manpower", req: true },
    { n: "NEA Environmental Permit", d: "National Environment Agency — pollution control", req: true },
    { n: "MPA Marine License", d: "Maritime & Port Authority for offshore operations", req: false },
    { n: "BCA Registration", d: "Building & Construction Authority — if construction involved", req: false },
    { n: "bizSAFE Certification", d: "WSH Council program — Level 1 to Star", req: false },
  ]},
  ID: { name: "Indonesia", flag: "🇮🇩", cap: "IDR 10B (upstream services)", local: [
    { n: "SKK Migas Vendor Registration", d: "Special Task Force for Upstream O&G — mandatory", req: true },
    { n: "TKDN Local Content Certificate", d: "Tingkat Komponen Dalam Negeri requirement", req: true },
    { n: "NIB Business License (OSS)", d: "Nomor Induk Berusaha via Online Single Submission", req: true },
    { n: "K3 Safety Certification", d: "Keselamatan & Kesehatan Kerja — Kemenaker", req: true },
    { n: "AMDAL / UKL-UPL", d: "Environmental Impact Assessment — KLHK", req: true },
    { n: "IUJP Service Permit", d: "Izin Usaha Jasa Penunjang for service companies", req: false },
  ]},
  AE: { name: "UAE", flag: "🇦🇪", cap: "AED 150,000 (LLC)", local: [
    { n: "ADNOC ICV Certificate", d: "In-Country Value — mandatory for ADNOC tenders", req: true },
    { n: "DED / ADGM Trade License", d: "Dept of Economic Dev / Abu Dhabi Global Market", req: true },
    { n: "OSHAD Compliance", d: "Abu Dhabi Occupational Safety & Health System", req: true },
    { n: "Estidama Rating", d: "Sustainability rating for Abu Dhabi projects", req: false },
    { n: "EAD Environmental Permit", d: "Environment Agency Abu Dhabi", req: false },
  ]},
  US: { name: "United States", flag: "🇺🇸", cap: "Varies by state", local: [
    { n: "OSHA 29 CFR Compliance", d: "Occupational Safety & Health Administration — all operations", req: true },
    { n: "EPA Environmental Permits", d: "Environmental Protection Agency — air, water, waste", req: true },
    { n: "BSEE Compliance", d: "Bureau of Safety & Environmental Enforcement — offshore", req: true },
    { n: "State O&G Commission Permit", d: "State-level (Texas RRC, NDIC, COGCC, etc.)", req: true },
    { n: "PHMSA Pipeline Regulations", d: "Pipeline & Hazardous Materials Safety Administration", req: false },
    { n: "ISNetworld / Veriforce", d: "Contractor pre-qualification platforms", req: false },
  ]},
  NO: { name: "Norway", flag: "🇳🇴", cap: "NOK 30,000 (AS)", local: [
    { n: "PSA NORSOK Compliance", d: "Petroleum Safety Authority — NORSOK standards", req: true },
    { n: "Achilles JQS Registration", d: "Joint Qualification System — Nordic O&G supplier DB", req: true },
    { n: "HSE Framework Regulation", d: "Rammeforskriften — comprehensive HSE requirements", req: true },
    { n: "Brønnøysund Registration", d: "Norwegian business registry", req: true },
    { n: "Norwegian Environment Agency", d: "Miljødirektoratet — emissions and discharge permits", req: false },
  ]},
  GB: { name: "United Kingdom", flag: "🇬🇧", cap: "GBP 1 (Ltd)", local: [
    { n: "HSE UK Compliance", d: "Health & Safety Executive — offshore safety regulations", req: true },
    { n: "NSTA Registration", d: "North Sea Transition Authority — licensing", req: true },
    { n: "Companies House Registration", d: "UK company incorporation", req: true },
    { n: "EA Environmental Permit", d: "Environment Agency — discharge and emissions", req: true },
    { n: "FPAL / Achilles UVDB", d: "First Point Assessment — supplier pre-qualification", req: false },
  ]},
  AU: { name: "Australia", flag: "🇦🇺", cap: "AUD 1 (Pty Ltd)", local: [
    { n: "NOPSEMA Compliance", d: "National Offshore Petroleum Safety & Environmental Mgmt", req: true },
    { n: "ASIC Business Registration", d: "Australian Securities & Investments Commission", req: true },
    { n: "WHS Act Compliance", d: "Work Health & Safety Act — state/territory based", req: true },
    { n: "EPBC Act Approval", d: "Environment Protection & Biodiversity Conservation", req: true },
    { n: "ISNetworld Australia", d: "Contractor pre-qualification", req: false },
  ]},
};

const INTL = [
  { n: "ISO 9001:2015", d: "Quality Management Systems", cat: "Quality", req: true },
  { n: "ISO 14001:2015", d: "Environmental Management Systems", cat: "Environment", req: true },
  { n: "ISO 45001:2018", d: "Occupational Health & Safety Management", cat: "HSE", req: true },
  { n: "API Spec Q1 / Q2", d: "American Petroleum Institute Quality Programs", cat: "O&G Quality", req: true },
  { n: "ISO 29001:2020", d: "Quality for Petroleum & Natural Gas Industries", cat: "O&G Quality", req: false },
  { n: "ISO 50001:2018", d: "Energy Management Systems", cat: "Energy", req: false },
  { n: "ISO/IEC 27001:2022", d: "Information Security Management", cat: "Security", req: false },
  { n: "API RP 75", d: "Safety & Environmental Mgmt System — Offshore", cat: "HSE", req: false },
  { n: "ASME Standards", d: "Boiler & Pressure Vessel Code — fabrication", cat: "Engineering", req: false },
  { n: "DNV GL Certification", d: "Classification & risk management — marine/offshore", cat: "Marine", req: false },
  { n: "IOGP Standards (JIP33)", d: "Standardized procurement specifications", cat: "Procurement", req: false },
  { n: "IMCA Guidelines", d: "International Marine Contractors Association", cat: "Marine", req: false },
  { n: "NACE / AMPP Standards", d: "Corrosion management & protective coatings", cat: "Engineering", req: false },
  { n: "GHS Compliance", d: "Globally Harmonized System — chemical classification", cat: "Chemical", req: false },
  { n: "ILO MLC 2006", d: "Maritime Labour Convention — seafarer welfare", cat: "Labour", req: false },
];

// ─── UTILITIES ──────────────────────────────────────────────────
const cn = (...c) => c.filter(Boolean).join(" ");
const Badge = ({ children, v = "default" }) => {
  const m = { default:"bg-stone-100 text-stone-600", success:"bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", warning:"bg-amber-50 text-amber-700 ring-1 ring-amber-200", danger:"bg-red-50 text-red-700 ring-1 ring-red-200", info:"bg-sky-50 text-sky-700 ring-1 ring-sky-200", purple:"bg-violet-50 text-violet-700 ring-1 ring-violet-200", live:"bg-red-500 text-white animate-pulse" };
  return <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-md ${m[v]||m.default}`}>{children}</span>;
};
const SB = (s) => { const m={Open:"success",Evaluation:"warning",Awarded:"info",Closed:"default",Active:"success","Under Review":"warning",Approved:"success",Pending:"warning",Delivered:"info","In Transit":"purple",Resolved:"success",Investigating:"warning",High:"danger",Medium:"warning",Low:"success"}; return <Badge v={m[s]||"default"}>{s}</Badge>; };

const Stat = ({icon,label,value,change,up,color="bg-orange-50 text-orange-600"}) => (
  <div className="bg-white rounded-xl border border-stone-200/80 p-4 hover:shadow-sm transition-shadow">
    <div className="flex items-start justify-between">
      <div><p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">{label}</p><p className="text-xl font-bold text-stone-800 mt-1">{value}</p>
        {change && <div className={cn("flex items-center gap-1 mt-1.5 text-[11px] font-medium",up?"text-emerald-600":"text-red-500")}>{up?<I.ArrowUp />:<I.ArrowDown />}{change}</div>}
      </div>
      <div className={cn("p-2 rounded-lg",color)}>{icon}</div>
    </div>
  </div>
);

const Spark = ({data,color="#ea580c"}) => {
  const mx=Math.max(...data),mn=Math.min(...data),r=mx-mn||1;
  const pts=data.map((v,i)=>`${4+(i/(data.length-1))*192},${52-((v-mn)/r)*44}`).join(" ");
  return <svg viewBox="0 0 200 56" className="w-full h-14"><defs><linearGradient id={`g${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".18"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs><polygon points={`4,52 ${pts} 196,52`} fill={`url(#g${color.slice(1)})`}/><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
};

const StatValue = ({ value, loading }) => (loading ? "..." : value);

// ─── ONBOARDING PAGE ────────────────────────────────────────────
const OnboardingPage = () => {
  const [role,setRole]=useState(null);
  const [step,setStep]=useState(0);
  const [co,setCo]=useState("MY");
  const [form,setForm]=useState({});
  const [ci,setCi]=useState({});
  const [cl,setCl]=useState({});
  const [up,setUp]=useState({});

  const cc=CC[co];
  const ti=(n)=>setCi(p=>({...p,[n]:!p[n]}));
  const tl=(n)=>setCl(p=>({...p,[n]:!p[n]}));
  const tu=(n)=>setUp(p=>({...p,[n]:!p[n]}));

  const iReq=INTL.filter(s=>s.req), iOpt=INTL.filter(s=>!s.req);
  const lReq=cc?.local.filter(s=>s.req)||[], lOpt=cc?.local.filter(s=>!s.req)||[];
  const tot=iReq.length+lReq.length;
  const done=iReq.filter(s=>ci[s.n]).length+lReq.filter(s=>cl[s.n]).length;
  const pct=tot>0?Math.round((done/tot)*100):0;

  if(!role) return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center"><h2 className="text-xl font-bold text-stone-800">Welcome to EIAAW Procure</h2><p className="text-sm text-stone-500 mt-1">Select your registration type to begin onboarding</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[{id:"buyer",title:"Buyer / Operator",desc:"O&G operator, EPC contractor, or procurement entity publishing tenders and managing vendors",icon:"🏢",feat:["Publish RFQ / RFP / RFI","Manage vendor database","Approve POs & payments","HSE compliance oversight"]},
          {id:"supplier",title:"Supplier / Vendor",desc:"Service provider, equipment supplier, or contractor bidding on O&G tenders",icon:"🔧",feat:["Register & qualify","Browse & bid on tenders","Submit invoices & docs","Track PO & payment status"]}
        ].map(r=>(
          <button key={r.id} onClick={()=>{setRole(r.id);setStep(0)}} className="text-left p-5 rounded-xl border-2 border-stone-200 bg-white hover:border-orange-400 hover:shadow-md transition-all group">
            <div className="text-3xl mb-3">{r.icon}</div>
            <h3 className="text-base font-bold text-stone-800 group-hover:text-orange-600 transition-colors">{r.title}</h3>
            <p className="text-xs text-stone-500 mt-1">{r.desc}</p>
            <ul className="mt-3 space-y-1">{r.feat.map(f=><li key={f} className="flex items-center gap-2 text-xs text-stone-600"><span className="text-emerald-500"><I.Check /></span>{f}</li>)}</ul>
          </button>
        ))}
      </div>
    </div>
  );

  const steps = role==="buyer"
    ? ["Company Profile","Country & Regulations","Compliance Checklist","Upload Documents","Review & Submit"]
    : ["Company Profile","Country & Regulations","International Standards","Local Compliance","Upload Documents","Review & Submit"];

  const docs = [
    "Company Registration Certificate",
    "Latest 2-Year Audited Financial Statements",
    "Tax Clearance / Compliance Letter",
    ...(co==="MY"?["PETRONAS License/Registration Certificate","SWEC Classification Letter"]:[]),
    ...(co==="SG"?["ACRA BizFile Certificate","bizSAFE Certificate"]:[]),
    ...(co==="ID"?["NIB Business License","SKK Migas Registration","TKDN Certificate"]:[]),
    ...(co==="AE"?["Trade License","ADNOC ICV Certificate"]:[]),
    ...(co==="US"?["State O&G Commission Permit","OSHA Safety Records"]:[]),
    ...(co==="NO"?["Achilles JQS Certificate","Brønnøysund Registration"]:[]),
    ...(co==="GB"?["Companies House Certificate","FPAL Registration"]:[]),
    ...(co==="AU"?["ASIC Certificate","NOPSEMA Compliance Evidence"]:[]),
    "ISO 9001 Certificate","ISO 14001 Certificate","ISO 45001 Certificate",
    "HSE Policy Document","Insurance Certificates (Public Liability, WC)",
    "Bank Guarantee / Reference Letter","Company Profile / Capability Statement",
    "Key Personnel CVs (PM, HSE Manager)",
  ];

  const ComplianceList = ({items,checked,toggle,label,reqLabel}) => (
    <div className="space-y-2">
      <p className={cn("text-[11px] font-semibold uppercase tracking-wider",reqLabel==="Required"?"text-red-600":"text-stone-400")}>{label}</p>
      {items.map(s=>(
        <label key={s.n} className={cn("flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all",checked[s.n]?"bg-emerald-50 border-emerald-200":"bg-white border-stone-200 hover:border-stone-300")}>
          <input type="checkbox" checked={!!checked[s.n]} onChange={()=>toggle(s.n)} className="mt-0.5 accent-orange-500"/>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-stone-800">{s.n}</span>
              <Badge v={s.req?"danger":"info"}>{s.req?"Required":"Optional"}</Badge>
              {s.cat && <Badge>{s.cat}</Badge>}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">{s.d}</p>
          </div>
        </label>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-stone-800">{role==="buyer"?"Buyer":"Supplier"} Onboarding</h2><p className="text-xs text-stone-500">Step {step+1} of {steps.length}: {steps[step]}</p></div>
        <button onClick={()=>{setRole(null);setStep(0)}} className="text-xs text-stone-400 hover:text-stone-600">← Role selection</button>
      </div>

      <div className="flex items-center gap-1">{steps.map((_,i)=><div key={i} className={cn("h-1.5 rounded-full flex-1 transition-colors",i<=step?"bg-orange-500":"bg-stone-200")}/>)}</div>
      <div className="flex gap-1.5 flex-wrap">{steps.map((s,i)=><button key={s} onClick={()=>setStep(i)} className={cn("px-2.5 py-1 text-[11px] rounded-md font-medium transition-colors",i===step?"bg-orange-500 text-white":i<step?"bg-orange-50 text-orange-600":"bg-stone-100 text-stone-400")}>{i<step?"✓ ":""}{s}</button>)}</div>

      <div className="bg-white rounded-xl border border-stone-200/80 p-6">
        {steps[step]==="Company Profile" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-700">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{l:"Registered Company Name",p:"e.g. PetroServ Engineering Sdn Bhd"},{l:"Registration Number",p:"e.g. SSM: 201901012345"},{l:"Tax ID / GST",p:"e.g. MY-12345678"},{l:"Year of Incorporation",p:"e.g. 2015"},{l:"Paid-up Capital",p:"e.g. MYR 500,000"},{l:"Number of Employees",p:"e.g. 120"},{l:"Primary Business",p:"e.g. Drilling services"},{l:"Contact Email",p:"procurement@company.com"}].map(f=>(
                <div key={f.l}><label className="block text-xs font-medium text-stone-500 mb-1">{f.l}</label><input className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400" placeholder={f.p}/></div>
              ))}
            </div>
            {role==="supplier" && <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">O&G Service Categories</label>
              <div className="flex flex-wrap gap-2">
                {["Drilling Services","Subsea & ROV","Marine & Offshore","Fabrication & Construction","Chemicals & Fluids","PPE & Safety","Pipeline Services","Inspection & NDT","E&I","Catering & Camp","IT & Digital","Environmental","Logistics","Engineering Consultancy"].map(c=>(
                  <button key={c} onClick={()=>setForm(p=>({...p,[c]:!p[c]}))} className={cn("px-2.5 py-1 text-[11px] rounded-md border font-medium transition-colors",form[c]?"bg-orange-50 text-orange-700 border-orange-300":"bg-white text-stone-500 border-stone-200 hover:border-stone-300")}>{c}</button>
                ))}
              </div>
            </div>}
          </div>
        )}

        {steps[step]==="Country & Regulations" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-700">Country of {role==="buyer"?"Operation":"Registration"}</h3>
            <p className="text-xs text-stone-500">Compliance requirements auto-load based on country. International O&G standards apply globally.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(CC).map(([k,c])=>(
                <button key={k} onClick={()=>setCo(k)} className={cn("p-3 rounded-xl border-2 text-left transition-all",co===k?"border-orange-400 bg-orange-50 shadow-sm":"border-stone-200 bg-white hover:border-stone-300")}>
                  <div className="text-2xl">{c.flag}</div>
                  <p className="text-xs font-bold text-stone-700 mt-1">{c.name}</p>
                  <p className="text-[10px] text-stone-400">{c.local.filter(s=>s.req).length} mandatory / {c.local.length} total</p>
                </button>
              ))}
            </div>
            {cc && <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <h4 className="text-xs font-bold text-stone-700 mb-1">{cc.flag} {cc.name} — Overview</h4>
              <p className="text-[11px] text-stone-500">Min. capital: <span className="font-semibold text-stone-700">{cc.cap}</span></p>
            </div>}
          </div>
        )}

        {(steps[step]==="Compliance Checklist"||steps[step]==="International Standards") && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-700">International O&G Standards</h3>
              <div className="flex items-center gap-2"><div className="w-20 h-2 rounded-full bg-stone-200"><div className="h-full rounded-full bg-orange-500 transition-all" style={{width:`${pct}%`}}/></div><span className="text-[11px] font-semibold text-stone-500">{pct}%</span></div>
            </div>
            <ComplianceList items={iReq} checked={ci} toggle={ti} label="Mandatory — All O&G vendors globally" reqLabel="Required" />
            <ComplianceList items={iOpt} checked={ci} toggle={ti} label="Recommended — Strengthens profile" reqLabel="Optional" />
            {steps[step]==="Compliance Checklist" && cc && <>
              <hr className="border-stone-200"/>
              <h3 className="text-sm font-bold text-stone-700">{cc.flag} {cc.name} — Local Compliance</h3>
              <ComplianceList items={cc.local} checked={cl} toggle={tl} label={`${cc.name} regulatory requirements`} reqLabel="Required" />
            </>}
          </div>
        )}

        {steps[step]==="Local Compliance" && cc && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-700">{cc.flag} {cc.name} — Local Requirements</h3>
              <span className="text-[11px] font-semibold text-stone-500">{lReq.filter(s=>cl[s.n]).length}/{lReq.length} mandatory done</span>
            </div>
            {cc.cap && <div className="p-3 rounded-lg bg-amber-50 border border-amber-200"><p className="text-xs font-semibold text-amber-800">Min. Capital: {cc.cap}</p></div>}
            <ComplianceList items={lReq} checked={cl} toggle={tl} label="Mandatory" reqLabel="Required" />
            {lOpt.length>0 && <ComplianceList items={lOpt} checked={cl} toggle={tl} label="Optional / Conditional" reqLabel="Optional" />}
          </div>
        )}

        {steps[step]==="Upload Documents" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-700">Required Documents</h3>
            <p className="text-xs text-stone-500">PDF, JPG, PNG — max 10MB each</p>
            <div className="space-y-1.5">{docs.map(doc=>(
              <div key={doc} className={cn("flex items-center justify-between p-2.5 rounded-lg border transition-all",up[doc]?"bg-emerald-50 border-emerald-200":"bg-white border-stone-200")}>
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <button onClick={()=>tu(doc)} className={cn("w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors",up[doc]?"bg-emerald-500 border-emerald-500 text-white":"border-stone-300")}>{up[doc]&&<I.Check />}</button>
                  <span className="text-xs text-stone-700 truncate">{doc}</span>
                </div>
                <button onClick={()=>tu(doc)} className={cn("flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md border shrink-0 transition-colors",up[doc]?"bg-emerald-100 text-emerald-700 border-emerald-200":"bg-stone-50 text-stone-500 border-stone-200 hover:bg-orange-50 hover:text-orange-600")}>
                  {up[doc]?<><I.Check /> Done</>:<><I.Upload /> Upload</>}
                </button>
              </div>
            ))}</div>
          </div>
        )}

        {steps[step]==="Review & Submit" && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-stone-700">Application Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-center"><p className="text-2xl font-bold text-orange-600">{pct}%</p><p className="text-[11px] text-stone-500">Compliance</p></div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-center"><p className="text-2xl font-bold text-stone-800">{Object.values(up).filter(Boolean).length}</p><p className="text-[11px] text-stone-500">Docs Uploaded</p></div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-center"><p className="text-lg font-bold text-stone-800">{cc?.flag} {cc?.name}</p><p className="text-[11px] text-stone-500">Country</p></div>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <h4 className="text-xs font-bold text-orange-800 mb-2">International Standards ({Object.values(ci).filter(Boolean).length}/{INTL.length})</h4>
              <div className="flex flex-wrap gap-1">{INTL.map(s=><span key={s.n} className={cn("px-2 py-0.5 text-[10px] font-medium rounded",ci[s.n]?"bg-emerald-100 text-emerald-700":"bg-stone-100 text-stone-400 line-through")}>{s.n}</span>)}</div>
            </div>
            <div className="p-4 rounded-lg bg-sky-50 border border-sky-200">
              <h4 className="text-xs font-bold text-sky-800 mb-2">Local — {cc?.name} ({Object.values(cl).filter(Boolean).length}/{cc?.local.length||0})</h4>
              <div className="flex flex-wrap gap-1">{(cc?.local||[]).map(s=><span key={s.n} className={cn("px-2 py-0.5 text-[10px] font-medium rounded",cl[s.n]?"bg-emerald-100 text-emerald-700":"bg-stone-100 text-stone-400 line-through")}>{s.n}</span>)}</div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-amber-600 mt-0.5"><I.Alert /></span>
              <p className="text-[11px] text-amber-700">Application reviewed within 5-7 business days. Incomplete documentation may delay approval.</p>
            </div>
            <button className="w-full py-3 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm">Submit Application for Review</button>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0} className={cn("px-5 py-2 text-xs font-semibold rounded-lg border transition-colors",step===0?"border-stone-200 text-stone-300 cursor-not-allowed":"border-stone-300 text-stone-600 hover:bg-stone-50")}>← Previous</button>
        {step<steps.length-1 && <button onClick={()=>setStep(step+1)} className="px-5 py-2 text-xs font-semibold rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors">Next Step →</button>}
      </div>
    </div>
  );
};

// ─── DASHBOARD ──────────────────────────────────────────────────
const Dash = ({go,tenders,hseIncidents,loading}) => (
  <div className="space-y-5">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Stat icon={<I.Tender />} label="Active Tenders" value={<StatValue value={String(tenders.length)} loading={loading} />} change="3 new this week" up color="bg-orange-50 text-orange-600"/>
      <Stat icon={<I.Vendor />} label="Vendors" value="248" change="+12 this month" up color="bg-sky-50 text-sky-600"/>
      <Stat icon={<I.Dollar />} label="Spend (Q1)" value="MYR 42.3M" change="8.2% vs Q4" up color="bg-emerald-50 text-emerald-600"/>
      <Stat icon={<I.Shield />} label="HSE Alerts" value={<StatValue value={String(hseIncidents.length)} loading={loading} />} change="Latest incident feed" up color="bg-violet-50 text-violet-600"/>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-stone-200/80 p-5">
        <div className="flex items-center justify-between mb-3"><div><h3 className="text-sm font-bold text-stone-700">Procurement Spend</h3><p className="text-[11px] text-stone-400">Monthly (MYR M)</p></div><Badge v="success">+15.3% YoY</Badge></div>
        <Spark data={[12,15,18,14,22,19,25,23,28,32,29,35]}/>
      </div>
      <div className="bg-white rounded-xl border border-stone-200/80 p-5">
        <div className="flex items-center justify-between mb-3"><div><h3 className="text-sm font-bold text-stone-700">e-Bidding Savings</h3><p className="text-[11px] text-stone-400">Monthly (MYR M)</p></div><Badge v="success">MYR 12.4M saved</Badge></div>
        <Spark data={[3,2,5,4,6,8,7,9,11,10,13,12]} color="#10b981"/>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200/80 p-5">
        <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-stone-700">Recent Tenders</h3><button onClick={()=>go("tenders")} className="text-[11px] text-orange-600 font-semibold hover:underline">View All</button></div>
        <div className="space-y-2">{tenders.slice(0,4).map(t=>(
          <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer">
            <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="text-[10px] font-mono text-stone-400">{t.id}</span>{SB(t.st)}{t.urg==="high"&&<span className="text-red-500"><I.Fire /></span>}</div><p className="text-xs font-semibold text-stone-800 mt-1 truncate">{t.t}</p></div>
            <div className="text-right ml-3 shrink-0"><p className="text-xs font-bold text-stone-700">{t.bgt}</p><p className="text-[10px] text-stone-400">{t.bids} bids</p></div>
          </div>
        ))}</div>
      </div>
      <div className="bg-white rounded-xl border border-stone-200/80 p-5">
        <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-stone-700">HSE Alerts</h3><button onClick={()=>go("hse")} className="text-[11px] text-orange-600 font-semibold hover:underline">View All</button></div>
        <div className="space-y-2">{hseIncidents.slice(0,3).map(h=>(
          <div key={h.id} className="p-3 rounded-lg bg-stone-50"><div className="flex items-center gap-2 mb-1">{SB(h.sv)}<span className="text-[10px] font-mono text-stone-400">{h.id}</span></div><p className="text-[11px] font-medium text-stone-700">{h.d}</p><p className="text-[10px] text-stone-400 mt-0.5">{h.site}</p></div>
        ))}</div>
        <div className="mt-3 flex items-center gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0"><circle cx="30" cy="30" r="24" fill="none" stroke="#d1d5db" strokeWidth="6"/><circle cx="30" cy="30" r="24" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray={`${94.2/100*150.8} 150.8`} strokeLinecap="round" transform="rotate(-90 30 30)"/><text x="30" y="33" textAnchor="middle" className="fill-stone-800 font-bold" style={{fontSize:"12px"}}>94.2</text></svg>
          <div><p className="text-[11px] font-semibold text-stone-700">HSE Score</p><p className="text-[10px] text-stone-500">247 safe days</p></div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl border border-orange-200 p-5">
      <div className="flex items-start gap-3"><div className="p-2 rounded-lg bg-orange-50"><span className="text-orange-500"><I.Bot /></span></div>
        <div><h3 className="text-sm font-bold text-stone-700 flex items-center gap-2">AI Insights <Badge v="warning">BETA</Badge></h3>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-stone-600"><span className="font-semibold text-amber-600">Price Alert:</span> Drilling chemicals up 12% — consider advance Q3 procurement</p>
            <p className="text-xs text-stone-600"><span className="font-semibold text-emerald-600">Savings:</span> 3 vendors below budget on TDR-0041 — MYR 340K potential</p>
            <p className="text-xs text-stone-600"><span className="font-semibold text-sky-600">Risk:</span> TechFab Steel HSE dropped 5pts — recommend review</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── OTHER PAGES (Tender, Vendor, HSE, PO, Auction, Analytics, AI, Settings) ─
const TenderPg = ({ tenders, onCreated }) => {
  const [f,setF]=useState("All");
  const [view,setView]=useState("list");      // list | create | detail
  const [selTender,setSelTender]=useState(null);
  const [saving,setSaving]=useState(false);
  const [form,setForm]=useState({t:"",cat:"Upstream - Drilling",st:"Open",dl:"",bgt:"",hse:"",urg:"medium"});

  const ls=f==="All"?tenders:tenders.filter(t=>t.st===f);

  const categories=["Upstream - Drilling","Upstream - Maintenance","Upstream - Subsea","Midstream - Processing","Downstream - Storage","HSE - Safety"];
  const urgencies=["low","medium","high"];
  const statuses=["Open","Evaluation","Awarded","Closed"];

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const nextId = `TDR-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9000)+1000)}`;
      const payload = { id: nextId, ...form, bids: 0 };
      const res = await fetch(`${API_BASE_URL}/tenders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Failed to create tender");
      setForm({t:"",cat:"Upstream - Drilling",st:"Open",dl:"",bgt:"",hse:"",urg:"medium"});
      setView("list");
      if (onCreated) onCreated();
    } catch { /* error already visible via UI state */ } finally { setSaving(false); }
  };

  if (view === "create") return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={()=>setView("list")} className="text-stone-400 hover:text-stone-600 transition-colors">&larr;</button>
        <h2 className="text-lg font-bold text-stone-800">Create Tender</h2>
      </div>
      <form onSubmit={handleCreate} className="bg-white rounded-xl border border-stone-200/80 p-6 space-y-4 max-w-2xl">
        <div><label className="block text-[11px] font-semibold text-stone-500 mb-1">Title *</label><input required value={form.t} onChange={e=>setForm({...form,t:e.target.value})} className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="e.g. Supply of Drilling Mud & Chemicals" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-[11px] font-semibold text-stone-500 mb-1">Category *</label><select required value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300">{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div><label className="block text-[11px] font-semibold text-stone-500 mb-1">Status</label><select value={form.st} onChange={e=>setForm({...form,st:e.target.value})} className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300">{statuses.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-[11px] font-semibold text-stone-500 mb-1">Deadline *</label><input required type="date" value={form.dl} onChange={e=>setForm({...form,dl:e.target.value})} className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" /></div>
          <div><label className="block text-[11px] font-semibold text-stone-500 mb-1">Budget *</label><input required value={form.bgt} onChange={e=>setForm({...form,bgt:e.target.value})} className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="e.g. MYR 2.4M" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-[11px] font-semibold text-stone-500 mb-1">HSE Standard</label><input value={form.hse} onChange={e=>setForm({...form,hse:e.target.value})} className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="e.g. PETRONAS HSE" /></div>
          <div><label className="block text-[11px] font-semibold text-stone-500 mb-1">Urgency</label><select value={form.urg} onChange={e=>setForm({...form,urg:e.target.value})} className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300">{urgencies.map(u=><option key={u} value={u}>{u.charAt(0).toUpperCase()+u.slice(1)}</option>)}</select></div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50">{saving ? "Saving..." : <><I.Plus /> Create Tender</>}</button>
          <button type="button" onClick={()=>setView("list")} className="px-5 py-2 text-xs font-semibold text-stone-500 bg-stone-100 rounded-lg hover:bg-stone-200">Cancel</button>
        </div>
      </form>
    </div>
  );

  if (view === "detail" && selTender) return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={()=>{setView("list");setSelTender(null);}} className="text-stone-400 hover:text-stone-600 transition-colors">&larr;</button>
        <h2 className="text-lg font-bold text-stone-800">Tender Details</h2>
      </div>
      <div className="bg-white rounded-xl border border-stone-200/80 p-6 max-w-2xl space-y-5">
        <div className="flex items-center justify-between"><span className="text-xs font-mono text-stone-400">{selTender.id}</span><div className="flex items-center gap-2">{selTender.urg==="high"&&<span className="px-1.5 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 rounded">URGENT</span>}{SB(selTender.st)}</div></div>
        <h3 className="text-base font-bold text-stone-800">{selTender.t}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {l:"Category",v:selTender.cat},
            {l:"Budget",v:selTender.bgt},
            {l:"Deadline",v:selTender.dl},
            {l:"Bids Received",v:selTender.bids},
            {l:"HSE Standard",v:selTender.hse||"—"},
            {l:"Urgency",v:selTender.urg ? selTender.urg.charAt(0).toUpperCase()+selTender.urg.slice(1) : "—"},
          ].map(r=>(
            <div key={r.l} className="p-3 rounded-lg bg-stone-50">
              <p className="text-[10px] font-semibold text-stone-400 uppercase mb-1">{r.l}</p>
              <p className="text-sm font-semibold text-stone-700">{r.v}</p>
            </div>
          ))}
        </div>
        <div className="pt-2"><button onClick={()=>{setView("list");setSelTender(null);}} className="px-5 py-2 text-xs font-semibold text-stone-500 bg-stone-100 rounded-lg hover:bg-stone-200">Back to List</button></div>
      </div>
    </div>
  );

  return (
  <div className="space-y-4">
    <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-stone-800">Tender Management</h2><button onClick={()=>setView("create")} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600"><I.Plus /> Create Tender</button></div>
    <div className="flex gap-2 flex-wrap">{["All","Open","Evaluation","Awarded","Closed"].map(s=><button key={s} onClick={()=>setF(s)} className={cn("px-3 py-1.5 text-[11px] font-medium rounded-lg",f===s?"bg-orange-500 text-white":"bg-stone-100 text-stone-500 hover:bg-stone-200")}>{s}</button>)}</div>
    <div className="bg-white rounded-xl border border-stone-200/80 overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-stone-50">{["ID","Title","Category","Status","Budget","Bids","Deadline","HSE",""].map(h=><th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
    <tbody className="divide-y divide-stone-100">{ls.map(t=><tr key={t.id} className="hover:bg-stone-50"><td className="px-4 py-3 text-xs font-mono text-stone-400">{t.id}</td><td className="px-4 py-3"><div className="flex items-center gap-1.5">{t.urg==="high"&&<span className="text-red-500"><I.Fire /></span>}<span className="text-xs font-semibold text-stone-800">{t.t}</span></div></td><td className="px-4 py-3 text-xs text-stone-500">{t.cat}</td><td className="px-4 py-3">{SB(t.st)}</td><td className="px-4 py-3 text-xs font-semibold text-stone-700">{t.bgt}</td><td className="px-4 py-3 text-xs text-stone-500">{t.bids}</td><td className="px-4 py-3 text-xs text-stone-500">{t.dl}</td><td className="px-4 py-3 text-[10px] text-stone-400">{t.hse}</td><td className="px-4 py-3"><button onClick={()=>{setSelTender(t);setView("detail");}} className="text-orange-500 hover:text-orange-700"><I.Eye /></button></td></tr>)}</tbody></table></div></div>
  </div>);
};
const VendorPg = ({ vendors }) => { const [sel,setSel]=useState(null); const CN={MY:"Malaysia",SG:"Singapore",NO:"Norway"}; return (
  <div className="space-y-4">
    <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-stone-800">Vendor Management</h2><button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600"><I.Plus /> Register Vendor</button></div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{vendors.map(v=>(
      <div key={v.id} onClick={()=>setSel(sel===v.id?null:v.id)} className={cn("bg-white rounded-xl border p-4 cursor-pointer transition-all",sel===v.id?"border-orange-400 shadow-md":"border-stone-200 hover:shadow-sm")}>
        <div className="flex items-start justify-between mb-3"><div><p className="text-sm font-bold text-stone-800">{v.nm}</p><p className="text-[11px] text-stone-500">{v.cat}</p></div>{SB(v.st)}</div>
        <div className="grid grid-cols-3 gap-2 mb-3">{[{l:"Rating",v:v.rt},{l:"HSE",v:v.hse,c:v.hse>=90?"text-emerald-600":"text-amber-600"},{l:"Projects",v:v.prj}].map(s=><div key={s.l} className="text-center p-2 rounded-lg bg-stone-50"><p className={cn("text-base font-bold text-stone-800",s.c)}>{s.v}</p><p className="text-[9px] text-stone-400">{s.l}</p></div>)}</div>
        <div className="flex flex-wrap gap-1">{v.certs.map(c=><span key={c} className="px-1.5 py-0.5 text-[10px] font-medium text-stone-500 bg-stone-100 rounded">{c}</span>)}</div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-stone-400"><I.Globe />{CN[v.co]||v.co} · {v.id}</div>
        {sel===v.id && <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">{[{l:"Delivery",v:92},{l:"Quality",v:88},{l:"HSE",v:v.hse},{l:"Docs",v:85}].map(m=><div key={m.l}><div className="flex justify-between text-[10px] mb-0.5"><span className="text-stone-500">{m.l}</span><span className="font-semibold text-stone-700">{m.v}%</span></div><div className="h-1.5 rounded-full bg-stone-200"><div className={cn("h-full rounded-full",m.v>=90?"bg-emerald-500":"bg-amber-500")} style={{width:`${m.v}%`}}/></div></div>)}</div>}
      </div>
    ))}</div>
  </div>);};

const HSEPg = ({ incidents }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-stone-800">HSE Compliance</h2><button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"><I.Alert /> Report Incident</button></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Stat icon={<I.Shield />} label="Safe Days" value="247" change="Since last LTI" up color="bg-emerald-50 text-emerald-600"/>
      <Stat icon={<I.Alert />} label="Open Incidents" value="3" color="bg-red-50 text-red-600"/>
      <Stat icon={<I.Check />} label="PTW Active" value="18" up color="bg-amber-50 text-amber-600"/>
      <Stat icon={<I.File />} label="Expiring Certs" value="7" color="bg-violet-50 text-violet-600"/>
    </div>
    <div className="bg-white rounded-xl border border-stone-200/80 p-5"><h3 className="text-sm font-bold text-stone-700 mb-3">Compliance Matrix</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">{[{r:"PETRONAS HSE",s:96,ok:1},{r:"DOSH OSHA 1994",s:94,ok:1},{r:"DOE Environmental",s:91,ok:1},{r:"API Standards",s:93,ok:1},{r:"CIDB Standards",s:87,ok:0},{r:"IMO / MARPOL",s:89,ok:1}].map(r=>(
        <div key={r.r} className={cn("p-3 rounded-lg border",r.ok?"bg-emerald-50 border-emerald-200":"bg-amber-50 border-amber-200")}><div className="flex justify-between mb-1"><span className={cn("text-[10px] font-semibold",r.ok?"text-emerald-600":"text-amber-600")}>{r.ok?"Compliant":"Review Due"}</span><span className={cn("text-sm font-bold",r.ok?"text-emerald-600":"text-amber-600")}>{r.s}%</span></div><p className="text-[11px] font-medium text-stone-700">{r.r}</p></div>
      ))}</div>
    </div>
    <div className="bg-white rounded-xl border border-stone-200/80 overflow-hidden"><table className="w-full"><thead><tr className="bg-stone-50">{["ID","Type","Description","Site","Severity","Status","Date"].map(h=><th key={h} className="text-left px-4 py-2 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
    <tbody className="divide-y divide-stone-100">{incidents.map(h=><tr key={h.id} className="hover:bg-stone-50"><td className="px-4 py-3 text-xs font-mono text-stone-400">{h.id}</td><td className="px-4 py-3 text-xs text-stone-600">{h.tp}</td><td className="px-4 py-3 text-xs text-stone-600 max-w-xs truncate">{h.d}</td><td className="px-4 py-3 text-xs text-stone-500">{h.site}</td><td className="px-4 py-3">{SB(h.sv)}</td><td className="px-4 py-3">{SB(h.st)}</td><td className="px-4 py-3 text-xs text-stone-400">{h.dt}</td></tr>)}</tbody></table></div>
  </div>
);

const POPg = ({ purchaseOrders }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-stone-800">Purchase Orders</h2><button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600"><I.Plus /> Create PO</button></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Stat icon={<I.PO />} label="Active POs" value="34" change="+5" up color="bg-orange-50 text-orange-600"/>
      <Stat icon={<I.Clock />} label="Pending" value="8" color="bg-amber-50 text-amber-600"/>
      <Stat icon={<I.Check />} label="Delivered" value="21" change="94% on-time" up color="bg-emerald-50 text-emerald-600"/>
      <Stat icon={<I.Dollar />} label="PO Value" value="MYR 4.8M" up color="bg-sky-50 text-sky-600"/>
    </div>
    <div className="bg-white rounded-xl border border-stone-200/80 overflow-hidden"><table className="w-full"><thead><tr className="bg-stone-50">{["PO #","Vendor","Description","Amount","Status","Date",""].map(h=><th key={h} className="text-left px-4 py-2 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
    <tbody className="divide-y divide-stone-100">{purchaseOrders.map(p=><tr key={p.id} className="hover:bg-stone-50"><td className="px-4 py-3 text-xs font-mono text-orange-600">{p.id}</td><td className="px-4 py-3 text-xs font-semibold text-stone-800">{p.vn}</td><td className="px-4 py-3 text-xs text-stone-500">{p.d}</td><td className="px-4 py-3 text-xs font-semibold text-stone-700">{p.a}</td><td className="px-4 py-3">{SB(p.st)}</td><td className="px-4 py-3 text-xs text-stone-400">{p.dt}</td><td className="px-4 py-3"><button className="text-orange-500"><I.Eye /></button></td></tr>)}</tbody></table></div>
    <div className="bg-white rounded-xl border border-stone-200/80 p-5"><h3 className="text-sm font-bold text-stone-700 mb-3">Approval Workflow</h3>
      <div className="flex items-center gap-1 overflow-x-auto pb-2">{["Requisition","Budget Check","HOD","Procurement","Finance","GM","PO Issued"].map((s,i)=>(
        <div key={s} className="flex items-center gap-1.5 shrink-0"><div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold",i<4?"bg-orange-500 text-white":"bg-stone-200 text-stone-400")}>{i<4?<I.Check />:i+1}</div><span className={cn("text-[10px] font-medium",i<4?"text-stone-700":"text-stone-400")}>{s}</span>{i<6&&<div className={cn("w-6 h-0.5",i<3?"bg-orange-500":"bg-stone-200")}/>}</div>
      ))}</div>
    </div>
  </div>
);

const AuctionPg = () => { const [t,setT]=useState(3847); useEffect(()=>{const iv=setInterval(()=>setT(p=>p>0?p-1:0),1000);return()=>clearInterval(iv)},[]);
  const bids=[{r:1,v:"PetroServ Engineering",a:"MYR 2,180,000",sv:"9.2%"},{r:2,v:"GlobalChem Industries",a:"MYR 2,210,000",sv:"7.9%"},{r:3,v:"Nordic Marine Services",a:"MYR 2,280,000",sv:"5.0%"},{r:4,v:"AsiaPac Subsea",a:"MYR 2,350,000",sv:"2.1%"}];
  return (<div className="space-y-4"><h2 className="text-lg font-bold text-stone-800">Reverse Auction</h2>
    <div className="bg-white rounded-xl border-2 border-red-200 p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4"><div><Badge v="live">● LIVE</Badge><h3 className="text-sm font-bold text-stone-800 mt-1">TDR-2026-0041 — Drilling Mud & Chemicals</h3><p className="text-[11px] text-stone-500">Budget: MYR 2.4M · 4 bidders · Round 3</p></div>
        <div className="text-center px-5 py-3 rounded-xl bg-stone-50 border border-stone-200"><p className="text-[10px] text-stone-400 uppercase">Time Left</p><p className="text-2xl font-mono font-bold text-red-600">{String(Math.floor(t/60)).padStart(2,"0")}:{String(t%60).padStart(2,"0")}</p></div></div>
      <div className="space-y-2">{bids.map(b=>(<div key={b.r} className={cn("flex items-center justify-between p-3 rounded-lg border",b.r===1?"bg-emerald-50 border-emerald-200":"bg-stone-50 border-stone-200")}><div className="flex items-center gap-3"><span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",b.r===1?"bg-emerald-500 text-white":"bg-stone-300 text-white")}>{b.r}</span><span className="text-xs font-semibold text-stone-800">{b.v}</span></div><div className="text-right"><p className={cn("text-sm font-bold",b.r===1?"text-emerald-600":"text-stone-700")}>{b.a}</p><p className="text-[10px] text-emerald-600">{b.sv} saved</p></div></div>))}</div>
    </div>
  </div>);};

const AnalyticsPg = ({ vendors }) => (
  <div className="space-y-4"><h2 className="text-lg font-bold text-stone-800">Spend Analytics</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Stat icon={<I.Dollar />} label="Spend YTD" value="MYR 42.3M" change="+8.2%" up color="bg-orange-50 text-orange-600"/>
      <Stat icon={<I.Chart />} label="Savings" value="MYR 12.4M" change="22.7%" up color="bg-emerald-50 text-emerald-600"/>
      <Stat icon={<I.Tender />} label="Tenders" value="87" up color="bg-sky-50 text-sky-600"/>
      <Stat icon={<I.Vendor />} label="Vendors" value="248" up color="bg-violet-50 text-violet-600"/>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-stone-200/80 p-5"><h3 className="text-sm font-bold text-stone-700 mb-3">Spend by Category</h3>
        {[{l:"Drilling",v:35,c:"bg-orange-500"},{l:"Subsea & Marine",v:22,c:"bg-sky-500"},{l:"Maintenance",v:18,c:"bg-emerald-500"},{l:"Chemicals",v:12,c:"bg-violet-500"},{l:"HSE & Safety",v:8,c:"bg-amber-500"},{l:"Others",v:5,c:"bg-stone-400"}].map(c=>(
          <div key={c.l} className="mb-2.5"><div className="flex justify-between text-xs mb-1"><span className="text-stone-600 font-medium">{c.l}</span><span className="text-stone-400">{c.v}%</span></div><div className="h-2 rounded-full bg-stone-100"><div className={cn("h-full rounded-full",c.c)} style={{width:`${c.v}%`}}/></div></div>
        ))}</div>
      <div className="bg-white rounded-xl border border-stone-200/80 p-5"><h3 className="text-sm font-bold text-stone-700 mb-3">Vendor HSE Ranking</h3>
        <div className="space-y-2">{[...vendors].sort((a,b)=>b.hse-a.hse).map((v,i)=>(
          <div key={v.id} className="flex items-center gap-3 p-2 rounded-lg bg-stone-50"><span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold",i===0?"bg-amber-400 text-white":"bg-stone-200 text-stone-500")}>{i+1}</span><div className="flex-1"><p className="text-xs font-medium text-stone-700 truncate">{v.nm}</p></div><span className={cn("text-xs font-bold",v.hse>=90?"text-emerald-600":"text-amber-600")}>{v.hse}</span></div>
        ))}</div>
      </div>
    </div>
  </div>
);

const AIPg = () => { const [msg,setMsg]=useState(""); const [chat,setChat]=useState([{r:"bot",t:"Welcome! I help find O&G vendors, check compliance, and analyse pricing."}]);
  const send=()=>{if(!msg.trim())return;setChat(p=>[...p,{r:"user",t:msg},{r:"bot",t:`Analysing "${msg}"...\n\nFound 4 pre-qualified vendors. Top: PetroServ Engineering (HSE 94, 23 projects).\n\nSend RFQ invitations?`}]);setMsg("")};
  return (<div className="space-y-4"><h2 className="text-lg font-bold text-stone-800">AI Procurement Tools</h2>
    <div className="bg-white rounded-xl border border-stone-200/80 overflow-hidden">
      <div className="px-4 py-2 border-b border-stone-100 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/><span className="text-[11px] font-semibold text-stone-600">Sourcing Bot — Online</span></div>
      <div className="h-72 overflow-y-auto p-4 space-y-2.5">{chat.map((m,i)=><div key={i} className={cn("flex",m.r==="user"?"justify-end":"justify-start")}><div className={cn("max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap",m.r==="user"?"bg-orange-500 text-white":"bg-stone-100 text-stone-700")}>{m.t}</div></div>)}</div>
      <div className="px-4 py-2.5 border-t border-stone-100 flex gap-2"><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} className="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30" placeholder="Ask anything..."/><button onClick={send} className="px-4 py-2 text-xs font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600">Send</button></div>
    </div>
  </div>);};

const SettingsPg = () => (<div className="space-y-4"><h2 className="text-lg font-bold text-stone-800">Settings</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{[{t:"Company Profile",d:"SSM, PETRONAS license",i:<I.Globe />},{t:"Users & Roles",d:"Permissions, departments",i:<I.Vendor />},{t:"Approval Workflows",d:"Multi-level chains",i:<I.PO />},{t:"HSE Config",d:"Safety standards, PTW",i:<I.Shield />},{t:"Notifications",d:"Email, SMS, WhatsApp",i:<I.Bell />},{t:"ERP Integration",d:"SAP, Oracle, Sage",i:<I.Gear />},{t:"Audit Trail",d:"Full activity log",i:<I.File />},{t:"Branding",d:"Logo, white-label",i:<I.Fire />}].map(s=>(
    <div key={s.t} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-200 hover:border-orange-300 hover:shadow-sm transition-all cursor-pointer group"><div className="p-2 rounded-lg bg-stone-50 text-stone-500 group-hover:text-orange-500 group-hover:bg-orange-50 transition-colors">{s.i}</div><div><p className="text-sm font-bold text-stone-700 group-hover:text-orange-600 transition-colors">{s.t}</p><p className="text-[11px] text-stone-400">{s.d}</p></div></div>
  ))}</div>
</div>);

// ─── MAIN ───────────────────────────────────────────────────────
export default function App() {
  const [pg,setPg]=useState("dashboard");
  const [sb,setSb]=useState(false);
  const [tenders, setTenders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [hseIncidents, setHseIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResource = useCallback(async (path) => {
    const response = await fetch(`${API_BASE_URL}/${path}`);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const payload = await response.json();
    return Array.isArray(payload.data) ? payload.data : [];
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [nextTenders, nextVendors, nextPurchaseOrders, nextIncidents] = await Promise.all([
        fetchResource("tenders"),
        fetchResource("vendors"),
        fetchResource("purchase-orders"),
        fetchResource("hse-incidents")
      ]);

      setTenders(nextTenders);
      setVendors(nextVendors);
      setPurchaseOrders(nextPurchaseOrders);
      setHseIncidents(nextIncidents);
    } catch (_error) {
      setTenders([]);
      setVendors([]);
      setPurchaseOrders([]);
      setHseIncidents([]);
    } finally {
      setLoading(false);
    }
  }, [fetchResource]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const nav=[
    {id:"dashboard",l:"Dashboard",i:<I.Dashboard />},
    {id:"onboarding",l:"Onboarding",i:<I.Onboard />,b:"NEW"},
    {id:"tenders",l:"Tenders",i:<I.Tender />,b:"14"},
    {id:"vendors",l:"Vendors",i:<I.Vendor />},
    {id:"hse",l:"HSE",i:<I.Shield />,b:"3"},
    {id:"po",l:"Purchase Orders",i:<I.PO />},
    {id:"auction",l:"Reverse Auction",i:<I.Gavel />,b:"LIVE"},
    {id:"analytics",l:"Analytics",i:<I.Chart />},
    {id:"ai",l:"AI Tools",i:<I.Bot />},
    {id:"settings",l:"Settings",i:<I.Gear />},
  ];

  const pages={dashboard:<Dash go={setPg} tenders={tenders} hseIncidents={hseIncidents} loading={loading} />,onboarding:<OnboardingPage />,tenders:<TenderPg tenders={tenders} onCreated={loadData} />,vendors:<VendorPg vendors={vendors} />,hse:<HSEPg incidents={hseIncidents} />,po:<POPg purchaseOrders={purchaseOrders} />,auction:<AuctionPg />,analytics:<AnalyticsPg vendors={vendors} />,ai:<AIPg />,settings:<SettingsPg />};

  return (
    <div className="flex h-screen bg-stone-50 text-stone-800 overflow-hidden" style={{fontFamily:"'Source Sans 3','Nunito Sans',system-ui,sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      {sb&&<div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={()=>setSb(false)}/>}

      <aside className={cn("fixed lg:static inset-y-0 left-0 z-50 w-60 bg-white border-r border-stone-200 flex flex-col transform transition-transform duration-300",sb?"translate-x-0":"-translate-x-full lg:translate-x-0")}>
        <div className="px-4 py-3.5 border-b border-stone-200"><div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity=".3"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <div><h1 className="text-sm font-extrabold text-stone-800 tracking-tight">EIAAW Procure</h1><p className="text-[9px] text-stone-400 font-medium">O&G eProcurement Platform</p></div>
        </div></div>

        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">{nav.map(n=>(
          <button key={n.id} onClick={()=>{setPg(n.id);setSb(false)}} className={cn("w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all group",pg===n.id?"bg-orange-50 text-orange-600":"text-stone-500 hover:bg-stone-50 hover:text-stone-700")}>
            <span className={cn("transition-colors",pg===n.id?"text-orange-500":"text-stone-400 group-hover:text-stone-500")}>{n.i}</span>
            <span className="text-[12px] font-semibold flex-1">{n.l}</span>
            {n.b&&<span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded",n.b==="LIVE"?"bg-red-500 text-white animate-pulse":n.b==="NEW"?"bg-orange-500 text-white":"bg-stone-200 text-stone-500")}>{n.b}</span>}
          </button>
        ))}</nav>

        <div className="px-3 py-3 border-t border-stone-200"><div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-[10px] font-bold text-white">A</div>
          <div><p className="text-[11px] font-bold text-stone-700">Amos</p><p className="text-[9px] text-stone-400">Procurement Admin</p></div>
        </div></div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-4 lg:px-5 py-2.5 border-b border-stone-200 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={()=>setSb(true)} className="lg:hidden text-stone-400"><I.Menu /></button>
            <div className="hidden sm:flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5"><span className="text-stone-400"><I.Search /></span><input className="bg-transparent text-sm text-stone-700 placeholder-stone-400 focus:outline-none w-48 lg:w-64" placeholder="Search tenders, vendors, POs..."/></div>
          </div>
          <div className="flex items-center gap-3"><span className="text-[11px] text-stone-400 hidden sm:block">{new Date().toLocaleDateString("en-MY",{weekday:"long",day:"numeric",month:"short",year:"numeric"})}</span><button className="relative text-stone-400 hover:text-stone-600"><I.Bell /><span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500"/></button></div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-5">{pages[pg]}</main>
      </div>
    </div>
  );
}
