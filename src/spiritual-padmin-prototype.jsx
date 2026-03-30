import { useState } from "react";

// ─── TOKEN SYSTEM ───────────────────────────────────────────────────────────
const tokens = {
  // Surfaces — parchment hierarchy
  surface0: "#F5EDD8",   // page base — aged parchment
  surface1: "#FDF6E8",   // card surface — lighter parchment
  surface2: "#FFFCF5",   // elevated — near white warm
  // Ink hierarchy
  ink1: "#1C1208",       // primary — near black warm
  ink2: "#3D2B10",       // secondary — dark brown
  ink3: "#7A5C32",       // tertiary — medium brown
  ink4: "#B89A6A",       // muted — light brown
  // Borders
  border1: "#D4B483",    // standard — ochre
  border2: "#E8D4A8",    // soft — pale ochre
  border3: "#C4974A",    // emphasis — deep ochre
  // Brand
  vermillion: "#C1440E", // primary action — terracotta
  vermillionHover: "#A3380B",
  vermillionSoft: "#F5E8E2",
  // Semantic
  success: "#4A7C59",
  successSoft: "#EAF2EC",
  warning: "#8B6914",
  warningSoft: "#FBF4E0",
  // Gap indicator
  gap: "#E8D4A8",
  filled: "#C4974A",
};

// ─── ICON COMPONENTS ────────────────────────────────────────────────────────
const Icon = ({ path, size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const Icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  corpus: "M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  curriculum: "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  broadcast: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  check: "M20 6L9 17l-5-5",
  plus: "M12 5v14 M5 12h14",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  chevronRight: "M9 18l6-6-6-6",
  chevronDown: "M6 9l6 6 6-6",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",
  audio: "M9 18V5l12-2v13 M6 21a3 3 0 100-6 3 3 0 000 6z M18 19a3 3 0 100-6 3 3 0 000 6z",
  video: "M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z",
  alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
  publish: "M5 12h14 M12 5l7 7-7 7",
  draft: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
};

// ─── SHARED COMPONENTS ──────────────────────────────────────────────────────
const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: { bg: tokens.surface0, color: tokens.ink3, border: tokens.border2 },
    success: { bg: tokens.successSoft, color: tokens.success, border: "#C8DFD0" },
    warning: { bg: tokens.warningSoft, color: tokens.warning, border: "#E8D48A" },
    draft: { bg: tokens.surface0, color: tokens.ink4, border: tokens.border2 },
    published: { bg: tokens.successSoft, color: tokens.success, border: "#C8DFD0" },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "2px 8px",
      borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>{children}</span>
  );
};

const Button = ({ children, variant = "primary", onClick, icon, small }) => {
  const [hovered, setHovered] = useState(false);
  const styles = {
    primary: {
      bg: hovered ? tokens.vermillionHover : tokens.vermillion,
      color: "#FDF6E8", border: "none",
    },
    secondary: {
      bg: hovered ? tokens.surface0 : tokens.surface1,
      color: tokens.ink2, border: `1px solid ${tokens.border1}`,
    },
    ghost: {
      bg: "transparent",
      color: hovered ? tokens.ink2 : tokens.ink3,
      border: "none",
    },
  };
  const s = styles[variant] || styles.primary;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: small ? "5px 12px" : "8px 16px",
        borderRadius: 6, fontSize: small ? 12 : 13, fontWeight: 600,
        cursor: "pointer", transition: "all 0.15s ease",
        background: s.bg, color: s.color, border: s.border || "none",
        fontFamily: "inherit",
      }}
    >
      {icon && <Icon path={Icons[icon]} size={small ? 13 : 14} color={s.color} />}
      {children}
    </button>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{
    background: tokens.surface1,
    border: `1px solid ${tokens.border2}`,
    borderRadius: 10,
    padding: 20,
    ...style,
  }}>{children}</div>
);

const SectionLabel = ({ children }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", color: tokens.ink4, marginBottom: 12,
  }}>{children}</div>
);

const Divider = () => (
  <div style={{ borderTop: `1px solid ${tokens.border2}`, margin: "16px 0" }} />
);

// ─── TOP NAV ────────────────────────────────────────────────────────────────
const TopNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "setup", label: "Setup", icon: "settings" },
    { id: "corpus", label: "Corpus", icon: "corpus" },
    { id: "curriculum", label: "Curriculum", icon: "curriculum" },
    { id: "broadcasts", label: "Broadcasts", icon: "broadcast" },
  ];

  return (
    <div style={{
      background: tokens.surface1,
      borderBottom: `1px solid ${tokens.border1}`,
      padding: "0 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: tokens.vermillion,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "#FDF6E8", fontSize: 14, fontWeight: 800 }}>ॐ</span>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: tokens.ink1, letterSpacing: "-0.02em" }}>Spiritual</div>
          <div style={{ fontSize: 10, color: tokens.ink4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Advaita Vedanta</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "12px 16px",
              background: "transparent", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? tokens.vermillion : tokens.ink3,
              borderBottom: activeTab === tab.id ? `2px solid ${tokens.vermillion}` : "2px solid transparent",
              transition: "all 0.15s ease",
              fontFamily: "inherit",
            }}
          >
            <Icon path={Icons[tab.icon]} size={14} color={activeTab === tab.id ? tokens.vermillion : tokens.ink4} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* P-Admin identity */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Badge variant="success">Live</Badge>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: tokens.ink2 }}>Arjun Sharma</div>
          <div style={{ fontSize: 10, color: tokens.ink4 }}>Parampara Admin</div>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: tokens.vermillionSoft,
          border: `1.5px solid ${tokens.border3}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: tokens.vermillion,
        }}>A</div>
      </div>
    </div>
  );
};

// ─── SETUP TAB ──────────────────────────────────────────────────────────────
const SetupTab = () => {
  const [color, setColor] = useState(tokens.vermillion);
  const colors = [tokens.vermillion, "#7B4FA6", "#2E7D5A", "#1A5C8A", "#8B6914"];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {/* Identity */}
      <Card>
        <SectionLabel>Parampara Identity</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Parampara Name", value: "Advaita Vedanta" },
            { label: "Subdomain", value: "advaita.spiritual.app" },
            { label: "Short Description", value: "Non-dual inquiry in the tradition of Adi Shankaracharya" },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize: 11, fontWeight: 600, color: tokens.ink4, marginBottom: 5, letterSpacing: "0.04em" }}>{f.label}</div>
              <div style={{
                padding: "8px 12px", borderRadius: 6, fontSize: 13,
                background: tokens.surface0, border: `1px solid ${tokens.border2}`,
                color: tokens.ink2,
              }}>{f.value}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Branding */}
      <Card>
        <SectionLabel>Branding</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: tokens.ink4, marginBottom: 5, letterSpacing: "0.04em" }}>Primary Color</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {colors.map(c => (
                <div key={c} onClick={() => setColor(c)} style={{
                  width: 24, height: 24, borderRadius: "50%", background: c,
                  cursor: "pointer",
                  border: color === c ? `2px solid ${tokens.ink1}` : `2px solid transparent`,
                  outline: color === c ? `2px solid ${tokens.surface1}` : "none",
                }} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: tokens.ink4, marginBottom: 5, letterSpacing: "0.04em" }}>Welcome Message</div>
            <div style={{
              padding: "10px 12px", borderRadius: 6, fontSize: 12,
              background: tokens.surface0, border: `1px solid ${tokens.border2}`,
              color: tokens.ink2, lineHeight: 1.6, fontStyle: "italic",
            }}>
              "This space is offered in the spirit of the Guru-Shishya parampara. May your study here be sincere, your inquiry deep, and your understanding of Advaita gradually ripen into direct recognition."
            </div>
          </div>
        </div>
      </Card>

      {/* Language Config */}
      <Card>
        <SectionLabel>Language Configuration</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { lang: "English", code: "EN", active: true },
            { lang: "Hindi", code: "HI", active: true },
            { lang: "Tamil", code: "TA", active: false },
            { lang: "Sanskrit (terminology only)", code: "SA", active: true },
          ].map(l => (
            <div key={l.lang} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 12px", borderRadius: 6,
              background: l.active ? tokens.successSoft : tokens.surface0,
              border: `1px solid ${l.active ? "#C8DFD0" : tokens.border2}`,
            }}>
              <div style={{ fontSize: 13, color: tokens.ink2, fontWeight: 500 }}>{l.lang}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: tokens.ink4, letterSpacing: "0.06em" }}>{l.code}</span>
                {l.active && <Icon path={Icons.check} size={13} color={tokens.success} />}
              </div>
            </div>
          ))}
          <Button variant="secondary" icon="plus" small>Add Language</Button>
        </div>
      </Card>

      {/* Access */}
      <Card>
        <SectionLabel>Sadhaka Access</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Open Registration", desc: "Anyone can join via subdomain", active: false },
            { label: "Invite Only", desc: "P-Admin sends invitations", active: true },
            { label: "Both", desc: "Open + priority invite access", active: false },
          ].map(opt => (
            <div key={opt.label} style={{
              display: "flex", gap: 12, padding: "10px 12px", borderRadius: 6,
              background: opt.active ? tokens.vermillionSoft : tokens.surface0,
              border: `1px solid ${opt.active ? "#D4A898" : tokens.border2}`,
              cursor: "pointer",
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: "50%", marginTop: 1, flexShrink: 0,
                background: opt.active ? tokens.vermillion : tokens.surface1,
                border: `2px solid ${opt.active ? tokens.vermillion : tokens.border1}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {opt.active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FDF6E8" }} />}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: tokens.ink2 }}>{opt.label}</div>
                <div style={{ fontSize: 11, color: tokens.ink4, marginTop: 2 }}>{opt.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" icon="draft" small>Save Draft</Button>
          <Button variant="primary" icon="publish" small>Publish Changes</Button>
        </div>
      </Card>
    </div>
  );
};

// ─── CORPUS TAB ─────────────────────────────────────────────────────────────
const CorpusTab = () => {
  const [selected, setSelected] = useState(null);

  const gapMap = [
    { darshana: "Nyaya", base: 8, parampara: 2, pct: 25 },
    { darshana: "Vaisheshika", base: 6, parampara: 0, pct: 0 },
    { darshana: "Samkhya", base: 10, parampara: 3, pct: 30 },
    { darshana: "Yoga", base: 12, parampara: 5, pct: 42 },
    { darshana: "Mimamsa", base: 8, parampara: 1, pct: 12 },
    { darshana: "Vedanta", base: 24, parampara: 18, pct: 75 },
  ];

  const content = [
    { title: "Tattva Bodha", type: "text", level: "Level 1", lang: "Sanskrit + English", status: "published", concepts: ["viveka", "vairagya", "pancha kosha"] },
    { title: "Adhyasa Bhashyam — Shankara", type: "text", level: "Level 2", lang: "Sanskrit", status: "published", concepts: ["adhyasa", "superimposition", "brahman"] },
    { title: "Introduction to Advaita — Talk Series", type: "audio", level: "Level 1", lang: "English", status: "published", concepts: ["advaita", "maya", "jiva"] },
    { title: "Vivekachudamani — Chapter Commentary", type: "video", level: "Level 2", lang: "Hindi", status: "draft", concepts: ["viveka", "mumukshutva"] },
    { title: "Mandukya Upanishad with Karika", type: "text", level: "Level 3", lang: "Sanskrit + English", status: "draft", concepts: ["turiya", "avastha traya", "AUM"] },
  ];

  const typeIcon = { text: "file", audio: "audio", video: "video" };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Gap Map */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <SectionLabel>Corpus Coverage Map</SectionLabel>
              <div style={{ fontSize: 12, color: tokens.ink3 }}>Parampara content over Shad Darshanas base layer</div>
            </div>
            <Button variant="secondary" icon="upload" small>Upload Content</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {gapMap.map(g => (
              <div key={g.darshana} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 100, fontSize: 12, fontWeight: 600, color: tokens.ink2 }}>{g.darshana}</div>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: tokens.surface0, border: `1px solid ${tokens.border2}`, overflow: "hidden" }}>
                  <div style={{
                    width: `${g.pct}%`, height: "100%", borderRadius: 4,
                    background: g.pct > 60 ? tokens.filled : g.pct > 20 ? tokens.warning : tokens.border1,
                    transition: "width 0.3s ease",
                  }} />
                </div>
                <div style={{ width: 80, fontSize: 11, color: tokens.ink4, textAlign: "right" }}>
                  {g.parampara} of {g.base} texts
                </div>
                {g.pct === 0 && <Icon path={Icons.alert} size={13} color={tokens.warning} />}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
            {[
              { color: tokens.filled, label: "Well covered (60%+)" },
              { color: tokens.warning, label: "Partial (20–60%)" },
              { color: tokens.border1, label: "Base layer filling gap" },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                <span style={{ fontSize: 10, color: tokens.ink4 }}>{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Content List */}
        <Card style={{ padding: 0 }}>
          <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${tokens.border2}` }}>
            <SectionLabel>Parampara Corpus</SectionLabel>
          </div>
          {content.map((item, i) => (
            <div
              key={item.title}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                padding: "14px 20px",
                borderBottom: i < content.length - 1 ? `1px solid ${tokens.border2}` : "none",
                cursor: "pointer",
                background: selected === i ? tokens.surface0 : "transparent",
                transition: "background 0.1s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 6, flexShrink: 0,
                  background: tokens.surface0, border: `1px solid ${tokens.border2}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon path={Icons[typeIcon[item.type]]} size={14} color={tokens.ink3} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: tokens.ink1 }}>{item.title}</span>
                    <Badge variant={item.status}>{item.status}</Badge>
                  </div>
                  <div style={{ display: "flex", gap: 12, fontSize: 11, color: tokens.ink4 }}>
                    <span>{item.level}</span>
                    <span>·</span>
                    <span>{item.lang}</span>
                    <span>·</span>
                    <span style={{ textTransform: "capitalize" }}>{item.type}</span>
                  </div>
                  {selected === i && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 11, color: tokens.ink4, marginBottom: 6 }}>Concepts tagged:</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {item.concepts.map(c => (
                          <span key={c} style={{
                            padding: "2px 8px", borderRadius: 4, fontSize: 11,
                            background: tokens.vermillionSoft, color: tokens.vermillion,
                            border: `1px solid #D4A898`, fontStyle: "italic",
                          }}>{c}</span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        {item.status === "draft"
                          ? <Button variant="primary" icon="publish" small>Publish</Button>
                          : <Button variant="secondary" icon="draft" small>Unpublish</Button>
                        }
                        <Button variant="ghost" icon="eye" small>Preview as Sadhaka</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Upload Panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card>
          <SectionLabel>Add Content</SectionLabel>
          <div style={{
            border: `2px dashed ${tokens.border1}`,
            borderRadius: 8, padding: 24,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            background: tokens.surface0, cursor: "pointer",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: tokens.vermillionSoft, border: `1px solid #D4A898`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon path={Icons.upload} size={18} color={tokens.vermillion} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: tokens.ink2, marginBottom: 4 }}>Drop texts, audio or video</div>
              <div style={{ fontSize: 11, color: tokens.ink4 }}>PDF, MP3, MP4 or paste a YouTube link</div>
            </div>
            <Button variant="secondary" small>Browse Files</Button>
          </div>

          <Divider />

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: tokens.ink4, marginBottom: 8, letterSpacing: "0.04em" }}>OR PASTE A LINK</div>
            <div style={{
              display: "flex", gap: 8,
            }}>
              <div style={{
                flex: 1, padding: "8px 12px", borderRadius: 6, fontSize: 12,
                background: tokens.surface0, border: `1px solid ${tokens.border2}`,
                color: tokens.ink4,
              }}>https://youtube.com/watch?v=...</div>
              <Button variant="primary" icon="plus" small>Add</Button>
            </div>
          </div>
        </Card>

        <Card>
          <SectionLabel>Corpus Stats</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Total content items", value: "23" },
              { label: "Published", value: "18" },
              { label: "Drafts", value: "5" },
              { label: "Base layer supplements", value: "34" },
              { label: "Sadhakas engaging daily", value: "12" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: tokens.ink3 }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: tokens.ink1 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── CURRICULUM TAB ─────────────────────────────────────────────────────────
const CurriculumTab = () => {
  const [expandedLevel, setExpandedLevel] = useState(1);

  const levels = [
    {
      num: 1, en: "Seeker", sa: "मुमुक्षु", threshold: 70,
      texts: ["Tattva Bodha", "Bhaja Govindam", "Atma Bodha"],
      sadhakas: 8, complete: 3,
      desc: "Foundational texts establishing viveka and vairagya. Introduction to Vedantic terminology and core prakriyas.",
    },
    {
      num: 2, en: "Practitioner", sa: "साधक", threshold: 75,
      texts: ["Bhagavad Gita (Summary)", "Upadesa Sara", "Adhyasa Bhashyam"],
      sadhakas: 5, complete: 1,
      desc: "Moving from intellectual understanding to direct inquiry. Shankara's foundational arguments introduced.",
    },
    {
      num: 3, en: "Accomplished", sa: "सिद्ध", threshold: 80,
      texts: ["Mandukya Upanishad with Karika", "Drk Drishya Viveka", "Ashtavakra Gita"],
      sadhakas: 2, complete: 0,
      desc: "Direct Upanishadic inquiry. The three states and turiya examined through Gaudapada's Karika.",
    },
    {
      num: 4, en: "Advanced", sa: "परमसिद्ध", threshold: 85,
      texts: ["Brahma Sutras (1–4)"],
      sadhakas: 1, complete: 0,
      desc: "Systematic Vedanta through Vyasa's aphorisms with Shankara's Bhashyam.",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ padding: "14px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <SectionLabel>Progression Path</SectionLabel>
              <div style={{ fontSize: 12, color: tokens.ink3 }}>4 levels configured · Advaita Vedanta parampara</div>
            </div>
            <Button variant="secondary" icon="eye" small>Preview as Sadhaka</Button>
          </div>
        </Card>

        {levels.map(level => (
          <Card key={level.num} style={{ padding: 0, overflow: "hidden" }}>
            <div
              onClick={() => setExpandedLevel(expandedLevel === level.num ? null : level.num)}
              style={{
                padding: "14px 20px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 14,
                background: expandedLevel === level.num ? tokens.surface0 : tokens.surface1,
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: tokens.vermillionSoft, border: `1.5px solid #D4A898`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: tokens.vermillion }}>L{level.num}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: tokens.ink1 }}>{level.en}</span>
                  <span style={{ fontSize: 12, color: tokens.ink4, fontStyle: "italic" }}>{level.sa}</span>
                </div>
                <div style={{ fontSize: 11, color: tokens.ink4, marginTop: 2 }}>
                  {level.texts.length} texts · {level.sadhakas} sadhakas · {level.complete} advanced
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: tokens.ink4, letterSpacing: "0.04em" }}>THRESHOLD</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: tokens.ink2 }}>{level.threshold}%</div>
                </div>
                <Icon
                  path={expandedLevel === level.num ? Icons.chevronDown : Icons.chevronRight}
                  size={14} color={tokens.ink4}
                />
              </div>
            </div>

            {expandedLevel === level.num && (
              <div style={{ padding: "16px 20px", borderTop: `1px solid ${tokens.border2}` }}>
                <div style={{ fontSize: 12, color: tokens.ink3, marginBottom: 14, lineHeight: 1.6 }}>{level.desc}</div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: tokens.ink4, marginBottom: 8, letterSpacing: "0.04em" }}>REQUIRED TEXTS</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {level.texts.map(t => (
                      <div key={t} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "7px 12px", borderRadius: 6,
                        background: tokens.surface0, border: `1px solid ${tokens.border2}`,
                      }}>
                        <Icon path={Icons.file} size={13} color={tokens.ink4} />
                        <span style={{ fontSize: 12, color: tokens.ink2, flex: 1 }}>{t}</span>
                        <Icon path={Icons.check} size={13} color={tokens.success} />
                      </div>
                    ))}
                    <button style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "7px 12px", borderRadius: 6, cursor: "pointer",
                      background: "transparent", border: `1px dashed ${tokens.border1}`,
                      fontSize: 12, color: tokens.ink4, fontFamily: "inherit",
                    }}>
                      <Icon path={Icons.plus} size={13} color={tokens.ink4} />
                      Add text from corpus
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: tokens.ink4, marginBottom: 6, letterSpacing: "0.04em" }}>COMPREHENSION THRESHOLD</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input
                        type="range" min="50" max="100" defaultValue={level.threshold}
                        style={{ flex: 1, accentColor: tokens.vermillion }}
                      />
                      <span style={{ fontSize: 13, fontWeight: 700, color: tokens.ink2, minWidth: 36 }}>{level.threshold}%</span>
                    </div>
                  </div>
                  <Button variant="secondary" small>Save Level</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Sadhaka progress panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card>
          <SectionLabel>Sadhaka Progress</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { name: "Meera V.", level: "Level 2", progress: 68, days: 24 },
              { name: "Rajan K.", level: "Level 1", progress: 91, days: 45 },
              { name: "Sunita P.", level: "Level 3", progress: 34, days: 12 },
              { name: "Anil T.", level: "Level 2", progress: 55, days: 31 },
              { name: "Priya M.", level: "Level 1", progress: 78, days: 18 },
            ].map(s => (
              <div key={s.name} style={{ padding: "10px 12px", borderRadius: 6, background: tokens.surface0, border: `1px solid ${tokens.border2}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: tokens.ink2 }}>{s.name}</span>
                  <Badge>{s.level}</Badge>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 4, borderRadius: 2, background: tokens.border2 }}>
                    <div style={{
                      width: `${s.progress}%`, height: "100%", borderRadius: 2,
                      background: s.progress > 70 ? tokens.filled : tokens.border3,
                    }} />
                  </div>
                  <span style={{ fontSize: 10, color: tokens.ink4, minWidth: 28 }}>{s.progress}%</span>
                </div>
                <div style={{ fontSize: 10, color: tokens.ink4, marginTop: 4 }}>{s.days} days active</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel>Study Mode Weights</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Syllabus", value: 60 },
              { label: "Concept depth", value: 25 },
              { label: "Community", value: 15 },
            ].map(w => (
              <div key={w.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: tokens.ink3 }}>{w.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: tokens.ink2 }}>{w.value}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: tokens.border2 }}>
                  <div style={{ width: `${w.value}%`, height: "100%", borderRadius: 2, background: tokens.filled }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── BROADCASTS TAB ──────────────────────────────────────────────────────────
const BroadcastsTab = () => {
  const [composing, setComposing] = useState(false);
  const [type, setType] = useState("announcement");

  const broadcasts = [
    {
      title: "Monthly Satsanga — Adhyasa Discussion",
      type: "event", sent: "Mar 24, 2026",
      received: 16, opened: 12, clicked: 9,
    },
    {
      title: "New Commentary Added: Mandukya Upanishad",
      type: "content", sent: "Mar 18, 2026",
      received: 16, opened: 14, clicked: 11,
    },
    {
      title: "Guidance for the month of Chaitra",
      type: "announcement", sent: "Mar 12, 2026",
      received: 16, opened: 10, clicked: null,
    },
    {
      title: "Class Recording: Vivekachudamani Verses 1–20",
      type: "content", sent: "Mar 5, 2026",
      received: 16, opened: 15, clicked: 13,
    },
  ];

  const typeColors = {
    announcement: { bg: tokens.warningSoft, color: tokens.warning, border: "#E8D48A" },
    content: { bg: tokens.vermillionSoft, color: tokens.vermillion, border: "#D4A898" },
    event: { bg: tokens.successSoft, color: tokens.success, border: "#C8DFD0" },
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Compose */}
        {!composing ? (
          <Card style={{ padding: "14px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, color: tokens.ink3 }}>Share guidance, new content, or an upcoming class with your sadhakas.</div>
              <Button variant="primary" icon="plus" onClick={() => setComposing(true)}>New Broadcast</Button>
            </div>
          </Card>
        ) : (
          <Card>
            <SectionLabel>Compose Broadcast</SectionLabel>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["announcement", "content", "event"].map(t => {
                const s = typeColors[t];
                return (
                  <button key={t} onClick={() => setType(t)} style={{
                    padding: "6px 14px", borderRadius: 6, cursor: "pointer",
                    fontSize: 12, fontWeight: 600, textTransform: "capitalize",
                    fontFamily: "inherit",
                    background: type === t ? s.bg : tokens.surface0,
                    color: type === t ? s.color : tokens.ink4,
                    border: `1px solid ${type === t ? s.border : tokens.border2}`,
                  }}>{t}</button>
                );
              })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: tokens.ink4, marginBottom: 5, letterSpacing: "0.04em" }}>TITLE</div>
                <div style={{
                  padding: "8px 12px", borderRadius: 6, fontSize: 13,
                  background: tokens.surface0, border: `1px solid ${tokens.border2}`,
                  color: tokens.ink4,
                }}>e.g. "New talk on nididhyasana added"</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: tokens.ink4, marginBottom: 5, letterSpacing: "0.04em" }}>MESSAGE</div>
                <div style={{
                  padding: "10px 12px", borderRadius: 6, fontSize: 12,
                  background: tokens.surface0, border: `1px solid ${tokens.border2}`,
                  color: tokens.ink4, height: 72, lineHeight: 1.6,
                }}>Write your message here — or record a voice note...</div>
              </div>
              {type === "event" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {["Date + Time", "Link (Zoom / YouTube)"].map(f => (
                    <div key={f}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: tokens.ink4, marginBottom: 5, letterSpacing: "0.04em" }}>{f.toUpperCase()}</div>
                      <div style={{
                        padding: "8px 12px", borderRadius: 6, fontSize: 12,
                        background: tokens.surface0, border: `1px solid ${tokens.border2}`,
                        color: tokens.ink4,
                      }}>—</div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="primary" icon="broadcast">Send to All Sadhakas</Button>
                <Button variant="secondary">Schedule</Button>
                <Button variant="ghost" onClick={() => setComposing(false)}>Cancel</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Past Broadcasts */}
        <Card style={{ padding: 0 }}>
          <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${tokens.border2}` }}>
            <SectionLabel>Sent Broadcasts</SectionLabel>
          </div>
          {broadcasts.map((b, i) => {
            const s = typeColors[b.type];
            return (
              <div key={b.title} style={{
                padding: "14px 20px",
                borderBottom: i < broadcasts.length - 1 ? `1px solid ${tokens.border2}` : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: tokens.ink1 }}>{b.title}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.06em",
                        background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                      }}>{b.type}</span>
                      <span style={{ fontSize: 11, color: tokens.ink4 }}>{b.sent}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  {[
                    { label: "Received", value: b.received },
                    { label: "Opened", value: b.opened },
                    ...(b.clicked !== null ? [{ label: "Clicked", value: b.clicked }] : []),
                  ].map(stat => (
                    <div key={stat.label}>
                      <div style={{ fontSize: 10, color: tokens.ink4, letterSpacing: "0.04em" }}>{stat.label.toUpperCase()}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: tokens.ink1 }}>{stat.value}</div>
                      <div style={{ fontSize: 10, color: tokens.ink4 }}>
                        {Math.round((stat.value / b.received) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Summary Panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card>
          <SectionLabel>Community Overview</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Total sadhakas", value: "16" },
              { label: "Active this week", value: "11" },
              { label: "Avg. session length", value: "34 min" },
              { label: "Broadcasts sent (30d)", value: "4" },
              { label: "Avg. open rate", value: "76%" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${tokens.border2}` }}>
                <span style={{ fontSize: 12, color: tokens.ink3 }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: tokens.ink1 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel>Recent Community Activity</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { text: "Active discussion on adhyasa in Satsanga group", time: "2h ago", hot: true },
              { text: "3 sadhakas completed Level 1 assessment this week", time: "1d ago", hot: false },
              { text: "New insight on maya shared by community member", time: "2d ago", hot: false },
            ].map((a, i) => (
              <div key={i} style={{
                padding: "10px 12px", borderRadius: 6,
                background: a.hot ? tokens.vermillionSoft : tokens.surface0,
                border: `1px solid ${a.hot ? "#D4A898" : tokens.border2}`,
              }}>
                <div style={{ fontSize: 12, color: tokens.ink2, lineHeight: 1.5, marginBottom: 4 }}>{a.text}</div>
                <div style={{ fontSize: 10, color: tokens.ink4 }}>{a.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("corpus");

  const tabComponents = {
    setup: <SetupTab />,
    corpus: <CorpusTab />,
    curriculum: <CurriculumTab />,
    broadcasts: <BroadcastsTab />,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: tokens.surface0,
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      {/* Subtle texture overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='1' height='1' fill='%231C1208'/%3E%3C/svg%3E\")",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Page header */}
        <div style={{
          padding: "20px 32px 0",
          borderBottom: `1px solid ${tokens.border2}`,
          background: tokens.surface1,
        }}>
          <div style={{ fontSize: 11, color: tokens.ink4, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
            {activeTab === "setup" && "Configure your parampara's identity, branding and access"}
            {activeTab === "corpus" && "Manage your teachings — texts, audio and video"}
            {activeTab === "curriculum" && "Define the progression path for your sadhakas"}
            {activeTab === "broadcasts" && "Share guidance and announcements with your community"}
          </div>
        </div>

        {/* Main content */}
        <div style={{ padding: "24px 32px 48px" }}>
          {tabComponents[activeTab]}
        </div>
      </div>
    </div>
  );
}
