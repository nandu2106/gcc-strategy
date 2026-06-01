import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Brain,
  ShieldCheck,
  Users,
  TrendingUp,
  Wallet,
  Target,
  GraduationCap,
  Bot,
  Code2,
  Building2,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ClipboardList,
  BarChart3,
} from "lucide-react";

const tabs = [
  "Executive Dashboard",
  "Strategy",
  "Personas",
  "Tools & Cost",
  "Use Cases",
  "KPI / KRA",
  "Governance",
  "Training",
  "Roadmap",
];

const adoptionData = [
  { month: "M1", active: 12, trained: 18, champions: 8 },
  { month: "M2", active: 24, trained: 32, champions: 18 },
  { month: "M3", active: 38, trained: 48, champions: 35 },
  { month: "M4", active: 52, trained: 63, champions: 58 },
  { month: "M5", active: 65, trained: 76, champions: 82 },
  { month: "M6", active: 74, trained: 84, champions: 110 },
  { month: "M9", active: 82, trained: 91, champions: 140 },
  { month: "M12", active: 88, trained: 96, champions: 160 },
];

const personaData = [
  { persona: "Developers", users: 2000, adoption: 78, productivity: 28 },
  { persona: "Support", users: 650, adoption: 74, productivity: 26 },
  { persona: "Sales", users: 1200, adoption: 69, productivity: 18 },
  { persona: "Finance", users: 300, adoption: 61, productivity: 22 },
  { persona: "HR", users: 250, adoption: 67, productivity: 24 },
  { persona: "Leadership", users: 150, adoption: 82, productivity: 20 },
  { persona: "Non-Tech", users: 2500, adoption: 55, productivity: 14 },
];

const costData = [
  { tool: "M365 Copilot", users: 3000, monthly: 2500, annual: 90000000 },
  { tool: "Gemini Code Assist", users: 1200, monthly: 1600, annual: 23040000 },
  { tool: "Claude Enterprise", users: 400, monthly: 8000, annual: 38400000 },
  { tool: "ChatGPT Enterprise", users: 350, monthly: 5000, annual: 21000000 },
  { tool: "Copilot Studio", users: 20, monthly: 16000, annual: 3840000 },
  { tool: "ServiceNow AI", users: 500, monthly: 2200, annual: 13200000 },
];

const roiData = [
  { quarter: "Q1", investment: 1.1, benefit: 1.4, roi: 1.3 },
  { quarter: "Q2", investment: 2.0, benefit: 4.2, roi: 2.1 },
  { quarter: "Q3", investment: 3.0, benefit: 8.5, roi: 2.8 },
  { quarter: "Q4", investment: 4.0, benefit: 16.8, roi: 4.2 },
];

const useCaseData = [
  { name: "Incident Summary", hours: 18000, risk: "Low", maturity: 88 },
  { name: "Code Assist", hours: 76000, risk: "Medium", maturity: 74 },
  { name: "Proposal Drafting", hours: 22000, risk: "Low", maturity: 69 },
  { name: "RCA Generation", hours: 14000, risk: "Medium", maturity: 62 },
  { name: "Finance Analysis", hours: 12000, risk: "High", maturity: 51 },
  { name: "HR Policy Assistant", hours: 9000, risk: "Medium", maturity: 58 },
];

const maturityData = [
  { name: "Governance", value: 72 },
  { name: "Security", value: 78 },
  { name: "Adoption", value: 68 },
  { name: "Training", value: 75 },
  { name: "ROI", value: 64 },
];

const roadmap = [
  { phase: "0-30 Days", title: "Discover & Control", items: ["Baseline AI usage", "Identify shadow AI", "Create AI policy", "Define personas"] },
  { phase: "30-60 Days", title: "Pilot & Prove", items: ["Launch 5 pilots", "Train champions", "Measure hours saved", "Risk review"] },
  { phase: "60-90 Days", title: "Scale", items: ["License expansion", "AI Academy", "Executive dashboard", "Tool rationalization"] },
  { phase: "90-180 Days", title: "Industrialize", items: ["AI CoE", "Agentic workflows", "FinOps", "KPI-linked adoption"] },
];

const kpiRows = [
  {
    kra: "Adoption",
    kpi: "Monthly Active AI Users",
    formula: "Active AI users / Licensed users × 100",
    target: "75% by Month 6, 88% by Month 12",
    owner: "AI Adoption Lead",
    cadence: "Monthly",
  },
  {
    kra: "Productivity",
    kpi: "Hours Saved",
    formula: "Baseline time - AI-assisted time × task volume",
    target: "250,000 hours annually",
    owner: "Business Function Heads",
    cadence: "Monthly",
  },
  {
    kra: "Financial Value",
    kpi: "AI ROI",
    formula: "Value created / AI investment",
    target: "3x by Q3, 5x by Q4",
    owner: "AI FinOps Lead",
    cadence: "Quarterly",
  },
  {
    kra: "Engineering Acceleration",
    kpi: "Developer Cycle-Time Reduction",
    formula: "Pre-AI cycle time vs post-AI cycle time",
    target: "25% reduction",
    owner: "Engineering VP",
    cadence: "Monthly",
  },
  {
    kra: "Support Efficiency",
    kpi: "Ticket Handling Time Reduction",
    formula: "AHT before AI vs AHT after AI",
    target: "30% reduction",
    owner: "IT Support Director",
    cadence: "Weekly",
  },
  {
    kra: "Risk & Compliance",
    kpi: "Policy Violation Rate",
    formula: "AI policy violations / AI interactions",
    target: "Less than 1%",
    owner: "CISO / Legal",
    cadence: "Monthly",
  },
  {
    kra: "Capability Building",
    kpi: "Training Completion",
    formula: "Users trained / Target users × 100",
    target: "95% by Month 12",
    owner: "AI Academy Lead",
    cadence: "Monthly",
  },
];

const tools = [
  { name: "Microsoft 365 Copilot", fit: "Knowledge workers, HR, Finance, Sales", cost: "₹2,500/user/month", control: "High", risk: "Low-Medium" },
  { name: "Gemini Code Assist", fit: "Developers, DevOps, SRE", cost: "₹1,600/user/month", control: "Medium", risk: "Medium" },
  { name: "Claude Enterprise", fit: "Strategy, architecture, research", cost: "₹8,000/user/month", control: "High", risk: "Medium" },
  { name: "ChatGPT Enterprise", fit: "Business innovation, analysis, content", cost: "₹5,000/user/month", control: "High", risk: "Medium" },
  { name: "Copilot Studio", fit: "Internal bots and workflows", cost: "₹16,000/environment/month", control: "High", risk: "Medium" },
  { name: "ServiceNow AI", fit: "ITSM, incident, knowledge, support", cost: "₹2,200/user/month", control: "High", risk: "Low-Medium" },
];

const personas = [
  { icon: Code2, title: "Developers", users: "2,000", tools: "Gemini Code Assist, GitHub Copilot, Claude", outcomes: "Faster code, tests, docs, reviews" },
  { icon: Bot, title: "Support Staff", users: "650", tools: "ServiceNow AI, Copilot Studio", outcomes: "Ticket summaries, RCA drafts, KB answers" },
  { icon: Users, title: "Non-Tech Employees", users: "2,500", tools: "M365 Copilot, ChatGPT Enterprise", outcomes: "Email, documents, meetings, analysis" },
  { icon: Building2, title: "Leadership", users: "150", tools: "Claude, ChatGPT Enterprise", outcomes: "Strategy, board notes, decision briefs" },
];

function formatINR(value) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl bg-white shadow-sm border border-slate-200 p-5 ${className}`}>{children}</div>;
}

function Metric({ icon: Icon, label, value, note }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          <p className="text-xs text-slate-500 mt-2">{note}</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-100"><Icon className="w-6 h-6 text-slate-700" /></div>
      </div>
    </Card>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-slate-900 text-white"><Icon className="w-5 h-5" /></div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <p className="text-slate-600 mt-2">{subtitle}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <Card className="h-[360px]">
      <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="h-[290px]">{children}</div>
    </Card>
  );
}

export default function AIAdoptionPortal() {
  const [active, setActive] = useState(tabs[0]);
  const annualCost = useMemo(() => costData.reduce((a, b) => a + b.annual, 0), []);
  const annualBenefit = 168000000;
  const roi = (annualBenefit / annualCost).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <p className="uppercase tracking-[0.35em] text-xs text-slate-300">Model N Enterprise AI Adoption</p>
                <h1 className="text-4xl lg:text-5xl font-black mt-3">Chief AI Adoption Office</h1>
                <p className="text-slate-300 mt-3 max-w-3xl">A multi-tab operating model to govern, adopt, measure, and scale enterprise AI tools across developers, support, business users, leadership, and non-tech teams.</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 p-5 min-w-[260px]">
                <p className="text-slate-300 text-sm">North Star</p>
                <p className="text-2xl font-bold mt-1">20% productivity uplift</p>
                <p className="text-xs text-slate-300 mt-2">Measured through use-case baselines, active usage, hours saved, and business outcome conversion.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${active === tab ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {active === "Executive Dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <SectionTitle icon={Gauge} title="Executive Dashboard" subtitle="CTO / CIO / VP view of adoption, investment, risk, ROI, and productivity value." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              <Metric icon={Users} label="Target Users" value="8,000" note="Enterprise-wide eligible population" />
              <Metric icon={TrendingUp} label="Active Adoption" value="74%" note="Month 6 active usage target achieved" />
              <Metric icon={Wallet} label="Annual AI Cost" value={formatINR(annualCost)} note="Licenses + platforms, sample model" />
              <Metric icon={Target} label="Projected ROI" value={`${roi}x`} note="Based on productivity value created" />
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
              <ChartCard title="Adoption, Training, and Champion Growth">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={adoptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="active" name="Active Usage %" strokeWidth={3} />
                    <Line type="monotone" dataKey="trained" name="Trained %" strokeWidth={3} />
                    <Line type="monotone" dataKey="champions" name="AI Champions" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Investment vs Value Created">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis label={{ value: "₹ Crores", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="investment" name="Investment ₹Cr" strokeWidth={2} />
                    <Area type="monotone" dataKey="benefit" name="Value ₹Cr" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
              {maturityData.map((m) => (
                <Card key={m.name}>
                  <div className="flex justify-between items-center mb-2"><h3 className="font-semibold">{m.name}</h3><span className="font-bold">{m.value}%</span></div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-900 rounded-full" style={{ width: `${m.value}%` }} /></div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {active === "Strategy" && (
          <div className="space-y-6">
            <SectionTitle icon={Brain} title="Enterprise AI Adoption Strategy" subtitle="The strategy starts with outcomes, not tools. Tools are selected only after persona, data, risk, and value mapping." />
            <div className="grid lg:grid-cols-4 gap-5">
              {[
                ["1", "Business Outcomes", "Define CTO-level outcomes: productivity, software velocity, support efficiency, customer response, and cost optimization."],
                ["2", "Persona Segmentation", "Classify employees into developers, support, sales, HR, finance, leadership, and non-tech workers."],
                ["3", "Use-Case Portfolio", "Create a prioritized backlog of approved AI use cases with baseline effort, expected gain, and risk level."],
                ["4", "Govern & Scale", "Establish AI CoE, controls, academy, champions, KPIs, ROI, and quarterly steering reviews."],
              ].map(([n, t, d]) => (
                <Card key={n}>
                  <div className="text-4xl font-black text-slate-200">{n}</div>
                  <h3 className="font-bold text-lg mt-2">{t}</h3>
                  <p className="text-sm text-slate-600 mt-2">{d}</p>
                </Card>
              ))}
            </div>
            <Card>
              <h3 className="font-bold text-xl mb-3">AI Adoption Operating Model</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-slate-100"><b>AI Steering Committee</b><p className="mt-1 text-slate-600">CTO, CIO, CISO, Legal, HR, Finance, Business Heads.</p></div>
                <div className="p-4 rounded-xl bg-slate-100"><b>AI Center of Excellence</b><p className="mt-1 text-slate-600">Platform, policy, training, FinOps, measurement, and adoption enablement.</p></div>
                <div className="p-4 rounded-xl bg-slate-100"><b>Business AI Champions</b><p className="mt-1 text-slate-600">1 champion per 50 users; discovers and validates use cases.</p></div>
                <div className="p-4 rounded-xl bg-slate-100"><b>AI Product Owners</b><p className="mt-1 text-slate-600">Own each AI tool, roadmap, licensing, value reporting, and controls.</p></div>
              </div>
            </Card>
          </div>
        )}

        {active === "Personas" && (
          <div className="space-y-6">
            <SectionTitle icon={Users} title="User Personas and Adoption Segmentation" subtitle="Different user groups need different AI tools, controls, enablement, and success measures." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {personas.map((p) => {
                const Icon = p.icon;
                return <Card key={p.title}><Icon className="w-7 h-7" /><h3 className="font-bold text-lg mt-3">{p.title}</h3><p className="text-sm text-slate-500">Users: {p.users}</p><p className="text-sm mt-3"><b>Tools:</b> {p.tools}</p><p className="text-sm mt-2"><b>Outcomes:</b> {p.outcomes}</p></Card>;
              })}
            </div>
            <ChartCard title="Persona Adoption and Productivity Uplift">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={personaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="persona" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="adoption" name="Adoption %" />
                  <Bar dataKey="productivity" name="Productivity Uplift %" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {active === "Tools & Cost" && (
          <div className="space-y-6">
            <SectionTitle icon={Wallet} title="AI Tool Catalog and Cost Model" subtitle="A rationalized multi-tool strategy prevents shadow AI and maps tools to user classes." />
            <div className="overflow-x-auto rounded-2xl border bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-100"><tr><th className="p-3 text-left">Tool</th><th className="p-3 text-left">Best Fit</th><th className="p-3 text-left">Approx Cost</th><th className="p-3 text-left">Control</th><th className="p-3 text-left">Risk</th></tr></thead>
                <tbody>{tools.map((t) => <tr key={t.name} className="border-t"><td className="p-3 font-semibold">{t.name}</td><td className="p-3">{t.fit}</td><td className="p-3">{t.cost}</td><td className="p-3">{t.control}</td><td className="p-3">{t.risk}</td></tr>)}</tbody>
              </table>
            </div>
            <ChartCard title="Annual Cost by Tool">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tool" />
                  <YAxis tickFormatter={(v) => `${v / 10000000}Cr`} />
                  <Tooltip formatter={(v) => formatINR(v)} />
                  <Bar dataKey="annual" name="Annual Cost" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {active === "Use Cases" && (
          <div className="space-y-6">
            <SectionTitle icon={Lightbulb} title="Use Case Portfolio" subtitle="Every use case should have baseline effort, expected productivity gain, risk rating, owner, and measurable outcome." />
            <div className="grid lg:grid-cols-2 gap-5">
              <ChartCard title="Annual Hours Saved by Use Case">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={useCaseData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={130} />
                    <Tooltip />
                    <Bar dataKey="hours" name="Hours Saved" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Use Case Maturity">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={useCaseData} dataKey="maturity" nameKey="name" innerRadius={60} outerRadius={100} label>
                      {useCaseData.map((_, i) => <Cell key={i} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {useCaseData.map((u) => <Card key={u.name}><h3 className="font-bold">{u.name}</h3><p className="text-sm text-slate-600 mt-2">Annual hours saved: <b>{u.hours.toLocaleString("en-IN")}</b></p><p className="text-sm text-slate-600">Risk: <b>{u.risk}</b></p><p className="text-sm text-slate-600">Maturity: <b>{u.maturity}%</b></p></Card>)}
            </div>
          </div>
        )}

        {active === "KPI / KRA" && (
          <div className="space-y-6">
            <SectionTitle icon={ClipboardList} title="KPI and KRA Measurement Model" subtitle="This is how the AI Adoption Office proves impact to CTO, CIO, CFO, CISO, and business leaders." />
            <div className="grid lg:grid-cols-3 gap-5">
              <Metric icon={CheckCircle2} label="KRA 1" value="Adoption" note="Are people actually using AI every month?" />
              <Metric icon={BarChart3} label="KRA 2" value="Value" note="Are we saving hours, money, or cycle time?" />
              <Metric icon={ShieldCheck} label="KRA 3" value="Trust" note="Are we reducing data, legal, and compliance risk?" />
            </div>
            <div className="overflow-x-auto rounded-2xl border bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-100"><tr><th className="p-3 text-left">KRA</th><th className="p-3 text-left">KPI</th><th className="p-3 text-left">Measurement Formula</th><th className="p-3 text-left">Target</th><th className="p-3 text-left">Owner</th><th className="p-3 text-left">Cadence</th></tr></thead>
                <tbody>{kpiRows.map((r) => <tr key={r.kpi} className="border-t align-top"><td className="p-3 font-semibold">{r.kra}</td><td className="p-3">{r.kpi}</td><td className="p-3">{r.formula}</td><td className="p-3">{r.target}</td><td className="p-3">{r.owner}</td><td className="p-3">{r.cadence}</td></tr>)}</tbody>
              </table>
            </div>
            <Card>
              <h3 className="font-bold text-lg">How to Measure Productivity Correctly</h3>
              <div className="grid md:grid-cols-4 gap-4 mt-4 text-sm">
                <div className="p-4 bg-slate-100 rounded-xl"><b>1. Baseline</b><p className="mt-1 text-slate-600">Measure task time before AI. Example: RCA draft takes 90 minutes.</p></div>
                <div className="p-4 bg-slate-100 rounded-xl"><b>2. AI Assisted</b><p className="mt-1 text-slate-600">Measure task time after AI. Example: RCA draft takes 30 minutes.</p></div>
                <div className="p-4 bg-slate-100 rounded-xl"><b>3. Volume</b><p className="mt-1 text-slate-600">Multiply saving by task frequency. Example: 60 minutes × 500 RCAs.</p></div>
                <div className="p-4 bg-slate-100 rounded-xl"><b>4. Value</b><p className="mt-1 text-slate-600">Convert hours to value using loaded employee cost or business value.</p></div>
              </div>
            </Card>
          </div>
        )}

        {active === "Governance" && (
          <div className="space-y-6">
            <SectionTitle icon={ShieldCheck} title="Governance, Risk, and Control" subtitle="Governance must enable adoption, not block it. The model should approve safe use cases quickly and stop risky ones early." />
            <div className="grid md:grid-cols-3 gap-5">
              <Card><AlertTriangle className="w-7 h-7" /><h3 className="font-bold mt-3">Data Risk</h3><p className="text-sm text-slate-600 mt-2">Classify Public, Internal, Confidential, Restricted. Block PII, secrets, credentials, source-code leakage where needed.</p></Card>
              <Card><ShieldCheck className="w-7 h-7" /><h3 className="font-bold mt-3">Tool Approval</h3><p className="text-sm text-slate-600 mt-2">Each tool needs security review, legal review, DPA, audit logging, admin controls, and retention assessment.</p></Card>
              <Card><ClipboardList className="w-7 h-7" /><h3 className="font-bold mt-3">Use Case Review</h3><p className="text-sm text-slate-600 mt-2">Low-risk use cases fast-track. High-risk use cases require architecture, security, legal, and business approval.</p></Card>
            </div>
            <Card>
              <h3 className="font-bold text-lg">AI Governance RACI</h3>
              <div className="grid md:grid-cols-5 gap-3 mt-4 text-sm">
                {[
                  ["CTO", "Vision, funding, executive sponsorship"],
                  ["CISO", "Security controls, DLP, risk acceptance"],
                  ["Legal", "Contracts, IP, privacy, regulatory risk"],
                  ["AI CoE", "Standards, platform, measurement, adoption"],
                  ["Business", "Use cases, value proof, process ownership"],
                ].map(([r, d]) => <div key={r} className="p-4 rounded-xl bg-slate-100"><b>{r}</b><p className="mt-1 text-slate-600">{d}</p></div>)}
              </div>
            </Card>
          </div>
        )}

        {active === "Training" && (
          <div className="space-y-6">
            <SectionTitle icon={GraduationCap} title="AI Academy and Adoption Enablement" subtitle="Training should be persona-based, use-case-led, and continuously reinforced through champions." />
            <div className="grid md:grid-cols-4 gap-5">
              {[
                ["Level 1", "AI User", "2 hours", "Prompting, security, Copilot basics"],
                ["Level 2", "AI Power User", "4 hours", "Advanced prompts, reusable workflows"],
                ["Level 3", "AI Builder", "8 hours", "Copilot Studio, agents, APIs"],
                ["Level 4", "AI Champion", "16 hours", "Change management, governance, coaching"],
              ].map(([level, title, time, detail]) => <Card key={level}><p className="text-sm text-slate-500">{level}</p><h3 className="font-bold text-xl">{title}</h3><p className="text-sm mt-2">Duration: <b>{time}</b></p><p className="text-sm text-slate-600 mt-2">{detail}</p></Card>)}
            </div>
            <ChartCard title="Training Completion Journey">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={adoptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="trained" name="Training Completion %" strokeWidth={3} />
                  <Line dataKey="active" name="Active Usage %" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {active === "Roadmap" && (
          <div className="space-y-6">
            <SectionTitle icon={Target} title="180-Day AI Adoption Roadmap" subtitle="A practical execution roadmap for the IT VP or Chief AI Adoption Officer." />
            <div className="grid lg:grid-cols-4 gap-5">
              {roadmap.map((r) => <Card key={r.phase}><p className="text-sm font-semibold text-slate-500">{r.phase}</p><h3 className="text-xl font-bold mt-2">{r.title}</h3><ul className="mt-4 space-y-2 text-sm text-slate-600">{r.items.map((i) => <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" />{i}</li>)}</ul></Card>)}
            </div>
            <Card>
              <h3 className="font-bold text-lg">Board-Level Success Criteria by Day 180</h3>
              <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
                <div className="p-4 rounded-xl bg-slate-100"><b>Adoption</b><p className="mt-1 text-slate-600">70%+ active AI usage across licensed users.</p></div>
                <div className="p-4 rounded-xl bg-slate-100"><b>Value</b><p className="mt-1 text-slate-600">₹8 Cr+ measurable productivity value created.</p></div>
                <div className="p-4 rounded-xl bg-slate-100"><b>Control</b><p className="mt-1 text-slate-600">Approved AI tool catalog, policy, DLP controls, and monthly governance forum.</p></div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
