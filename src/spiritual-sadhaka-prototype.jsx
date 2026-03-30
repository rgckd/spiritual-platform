import { useState } from "react";

// ─── TOKEN SYSTEM (shared with p-admin) ─────────────────────────────────────
const t = {
  surface0: "#F5EDD8",
  surface1: "#FDF6E8",
  surface2: "#FFFCF5",
  ink1: "#1C1208",
  ink2: "#3D2B10",
  ink3: "#7A5C32",
  ink4: "#B89A6A",
  border1: "#D4B483",
  border2: "#E8D4A8",
  border3: "#C4974A",
  vermillion: "#C1440E",
  vermillionHover: "#A3380B",
  vermillionSoft: "#F5E8E2",
  success: "#4A7C59",
  successSoft: "#EAF2EC",
  warning: "#8B6914",
  warningSoft: "#FBF4E0",
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ic = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  study: "M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  note: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  progress: "M18 20V10 M12 20V4 M6 20v-6",
  mic: "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 01-14 0v-2 M12 19v4 M8 23h8",
  play: "M5 3l14 9-14 9V3z",
  pause: "M6 4h4v16H6z M14 4h4v16h-4z",
  chevronRight: "M9 18l6-6-6-6",
  chevronDown: "M6 9l6 6 6-6",
  chevronLeft: "M15 18l-6-6 6-6",
  check: "M20 6L9 17l-5-5",
  plus: "M12 5v14 M5 12h14",
  close: "M18 6L6 18 M6 6l12 12",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  bookmark: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
  community: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
  plan: "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  back: "M19 12H5 M12 19l-7-7 7-7",
  volume: "M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 010 14.14 M15.54 8.46a5 5 0 010 7.07",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  thread: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  sun: "M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 17a5 5 0 100-10 5 5 0 000 10z",
};

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
const Badge = ({ children, variant = "default", small }) => {
  const styles = {
    default: { bg: tokens?.surface0 || t.surface0, color: t.ink3, border: t.border2 },
    level: { bg: t.vermillionSoft, color: t.vermillion, border: "#D4A898" },
    success: { bg: t.successSoft, color: t.success, border: "#C8DFD0" },
    warning: { bg: t.warningSoft, color: t.warning, border: "#E8D48A" },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: small ? "1px 6px" : "2px 8px",
      borderRadius: 4, fontSize: small ? 10 : 11, fontWeight: 600,
      letterSpacing: "0.04em",
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>{children}</span>
  );
};

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
const BottomNav = ({ active, setActive }) => {
  const items = [
    { id: "home", label: "Home", icon: ic.home },
    { id: "study", label: "Study", icon: ic.study },
    { id: "notes", label: "Notes", icon: ic.note },
    { id: "progress", label: "Progress", icon: ic.progress },
  ];
  return (
    <div style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: 390, background: t.surface1,
      borderTop: `1px solid ${t.border2}`,
      display: "flex", zIndex: 50,
      paddingBottom: 8,
    }}>
      {items.map(item => (
        <button key={item.id} onClick={() => setActive(item.id)} style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
          gap: 4, padding: "10px 0 4px",
          background: "transparent", border: "none", cursor: "pointer",
          fontFamily: "inherit",
        }}>
          <Icon d={item.icon} size={18}
            color={active === item.id ? t.vermillion : t.ink4} />
          <span style={{
            fontSize: 9, fontWeight: active === item.id ? 700 : 500,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: active === item.id ? t.vermillion : t.ink4,
          }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── COMPANION STRIP ─────────────────────────────────────────────────────────
const CompanionStrip = ({ message, onTap }) => (
  <div onClick={onTap} style={{
    position: "fixed", bottom: 65, left: "50%", transform: "translateX(-50%)",
    width: 358, zIndex: 40,
    background: t.ink2, borderRadius: 12,
    padding: "10px 16px",
    display: "flex", alignItems: "center", gap: 10,
    cursor: "pointer", boxShadow: "0 4px 20px rgba(28,18,8,0.2)",
  }}>
    <div style={{
      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
      background: t.vermillion,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 800, color: t.surface1,
    }}>ॐ</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontSize: 11, color: "rgba(253,246,232,0.6)",
        letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2,
      }}>Companion</div>
      <div style={{
        fontSize: 12, color: t.surface1, lineHeight: 1.4,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>{message}</div>
    </div>
    <Icon d={ic.chevronRight} size={14} color="rgba(253,246,232,0.4)" />
  </div>
);

// ─── COMPANION DIALOGUE OVERLAY ──────────────────────────────────────────────
const CompanionOverlay = ({ onClose, mode = "recap" }) => {
  const [step, setStep] = useState(0);
  const [recording, setRecording] = useState(false);
  const [answered, setAnswered] = useState(false);

  const recapSteps = [
    {
      type: "recap",
      text: "Welcome back, Arjun. Three days since we last sat together.",
      sub: "You were midway through the Adhyasa Bhashyam — on the question of superimposition on the Self.",
      action: "Continue here",
      alt: "Remind me what I noted",
    },
    {
      type: "insight",
      text: "Two sadhakas in your parampara have been sitting with a similar question.",
      sub: "Whether the witness itself can be an object of awareness. A thread worth a moment.",
      action: "Show me",
      alt: "Later",
    },
    {
      type: "broadcast",
      text: "Your teacher has shared a note on the upcoming Satsanga.",
      sub: "Saturday, April 4 — discussion on Mandukya Upanishad. Brief, worth reading.",
      action: "Read now",
      alt: "Skip",
    },
    {
      type: "plan",
      text: "Ready to begin? I've kept your place.",
      sub: "Shall I suggest something for today — or do you know what you'd like to do?",
      action: "Suggest something",
      alt: "I know what I want",
    },
  ];

  const assessSteps = [
    {
      type: "intro",
      text: "I'm going to share a situation with you.",
      sub: "There is no right or wrong answer — I want to understand how you are seeing it. Take your time.",
      action: "I'm ready",
    },
    {
      type: "scenario",
      text: "A man wakes from a dream. In the dream, he was afraid — his heart was racing, his breath short. He wakes and realizes it was a dream. But for a moment, the fear lingers.",
      sub: "What would you say is happening here — and what does it tell us about the relationship between the waker and the dreamer?",
      showInput: true,
    },
    {
      type: "probe",
      text: "You said the fear was real in the moment of experience.",
      sub: "Let me ask — who noticed that the dream was a dream? Was it the dreamer?",
      showInput: true,
    },
    {
      type: "synthesis",
      text: "What you've described shows a clear grasp of the mechanics of adhyasa.",
      sub: "The one thread worth carrying forward: who is the witness across the three states? That question will deepen as you move into Mandukya.",
      action: "Save this thread",
      alt: "Return to study",
    },
  ];

  const steps = mode === "recap" ? recapSteps : assessSteps;
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const typeColors = {
    recap: t.ink3,
    insight: t.warning,
    broadcast: t.success,
    plan: t.vermillion,
    intro: t.ink3,
    scenario: t.ink2,
    probe: t.ink2,
    synthesis: t.success,
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(28,18,8,0.7)",
      display: "flex", alignItems: "flex-end",
      backdropFilter: "blur(4px)",
    }}>
      <div style={{
        width: "100%", maxWidth: 390, margin: "0 auto",
        background: t.surface1,
        borderRadius: "20px 20px 0 0",
        padding: "28px 24px 40px",
        minHeight: 380,
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: t.vermillion,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, color: t.surface1,
            }}>ॐ</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.ink1 }}>Companion</div>
              <div style={{ fontSize: 10, color: typeColors[current.type], fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {mode === "recap" ? ["Returning", "Insight", "Broadcast", "Plan"][step] : ["Beginning", "Scenario", "Probing", "Reflection"][step]}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <Icon d={ic.close} size={18} color={t.ink4} />
          </button>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 2, borderRadius: 2,
              background: i <= step ? t.vermillion : t.border2,
              transition: "background 0.3s ease",
            }} />
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 16, fontWeight: 600, color: t.ink1,
            lineHeight: 1.6, marginBottom: 12,
          }}>{current.text}</div>
          <div style={{
            fontSize: 13, color: t.ink3,
            lineHeight: 1.7, marginBottom: 20,
            fontStyle: "italic",
          }}>{current.sub}</div>

          {current.showInput && (
            <div style={{ marginBottom: 16 }}>
              {!answered ? (
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => setRecording(!recording)}
                    style={{
                      width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                      background: recording ? t.vermillion : t.vermillionSoft,
                      border: `2px solid ${recording ? t.vermillion : "#D4A898"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                    }}>
                    <Icon d={ic.mic} size={18} color={recording ? t.surface1 : t.vermillion} />
                  </button>
                  <div style={{
                    flex: 1, padding: "12px 14px", borderRadius: 10,
                    background: t.surface0, border: `1px solid ${t.border2}`,
                    fontSize: 13, color: recording ? t.ink3 : t.ink4,
                    fontStyle: "italic", lineHeight: 1.5,
                    display: "flex", alignItems: "center",
                  }}>
                    {recording ? "Listening..." : "Speak your response, or type here..."}
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: "12px 14px", borderRadius: 10,
                  background: t.successSoft, border: `1px solid #C8DFD0`,
                  fontSize: 13, color: t.ink2, lineHeight: 1.6,
                }}>
                  "The fear lingered because the waker's awareness was temporarily superimposed on the dreamer's experience — the memory of the emotion persisted even after the object of fear had dissolved..."
                </div>
              )}
              {!answered && recording && (
                <button onClick={() => { setRecording(false); setAnswered(true); }} style={{
                  marginTop: 10, width: "100%", padding: "10px",
                  borderRadius: 8, background: t.vermillion, border: "none",
                  color: t.surface1, fontSize: 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                }}>Done — submit response</button>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        {(current.action || isLast) && (
          <div style={{ display: "flex", gap: 10 }}>
            {current.action && (
              <button onClick={() => isLast ? onClose() : setStep(s => s + 1)} style={{
                flex: 1, padding: "13px",
                background: t.vermillion, border: "none", borderRadius: 10,
                color: t.surface1, fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}>{current.action}</button>
            )}
            {current.alt && (
              <button onClick={() => isLast ? onClose() : setStep(s => s + 1)} style={{
                flex: current.action ? 0 : 1,
                padding: "13px 16px",
                background: t.surface0, border: `1px solid ${t.border1}`, borderRadius: 10,
                color: t.ink3, fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
              }}>{current.alt}</button>
            )}
            {current.showInput && answered && (
              <button onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))} style={{
                flex: 1, padding: "13px",
                background: t.vermillion, border: "none", borderRadius: 10,
                color: t.surface1, fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}>Continue</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
const HomeScreen = ({ onOpenCompanion, onNavigate }) => {
  const levelDots = [1, 2, 3, 4, 5];
  const currentLevel = 2;

  return (
    <div style={{ padding: "20px 20px 140px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: t.ink4, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
            Advaita Vedanta
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.ink1, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Namaste, Arjun
          </div>
          <div style={{ fontSize: 13, color: t.ink3, marginTop: 4, fontStyle: "italic" }}>
            3 days since your last session
          </div>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: t.vermillionSoft, border: `1.5px solid #D4A898`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 700, color: t.vermillion,
        }}>A</div>
      </div>

      {/* Level card */}
      <div style={{
        background: t.ink2, borderRadius: 16, padding: "18px 20px",
        marginBottom: 20,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(253,246,232,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Current Level</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: t.surface1 }}>Practitioner</div>
            <div style={{ fontSize: 12, color: "rgba(253,246,232,0.6)", fontStyle: "italic" }}>साधक</div>
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center", paddingTop: 4 }}>
            {levelDots.map(d => (
              <div key={d} style={{
                width: d === currentLevel ? 20 : 8,
                height: 8, borderRadius: 4,
                background: d <= currentLevel ? t.vermillion : "rgba(253,246,232,0.2)",
                transition: "width 0.3s ease",
              }} />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: "rgba(253,246,232,0.5)" }}>Level progress</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(253,246,232,0.8)" }}>68%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "rgba(253,246,232,0.15)" }}>
            <div style={{ width: "68%", height: "100%", borderRadius: 2, background: t.vermillion }} />
          </div>
        </div>
        <div style={{ fontSize: 11, color: "rgba(253,246,232,0.5)" }}>
          3 of 4 required concepts progressing well
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: t.ink4, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Begin
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Continue Reading", sub: "Adhyasa Bhashyam", icon: ic.study, action: () => onNavigate("reading") },
            { label: "Plan My Day", sub: "30 min available", icon: ic.plan, action: () => onOpenCompanion("plan") },
            { label: "Add a Note", sub: "Voice or text", icon: ic.note, action: () => onNavigate("notes") },
            { label: "Satsanga", sub: "2 new threads", icon: ic.community, action: () => onNavigate("community") },
          ].map(item => (
            <button key={item.label} onClick={item.action} style={{
              padding: "14px", borderRadius: 12, textAlign: "left",
              background: t.surface1, border: `1px solid ${t.border2}`,
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <Icon d={item.icon} size={18} color={t.vermillion} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.ink1 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: t.ink4, marginTop: 2 }}>{item.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div style={{ fontSize: 10, color: t.ink4, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Recently
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { text: "Adhyasa Bhashyam", sub: "Left off at opening argument", type: "text", time: "3 days ago" },
            { text: "Note on superimposition", sub: "Connected to Tattva Bodha notes", type: "note", time: "3 days ago" },
            { text: "Intro to Advaita — Talk 4", sub: "Completed, 42 min", type: "audio", time: "5 days ago" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, padding: "12px 14px",
              background: t.surface1, border: `1px solid ${t.border2}`,
              borderRadius: 10, cursor: "pointer",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: t.surface0, border: `1px solid ${t.border2}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon d={item.type === "note" ? ic.note : item.type === "audio" ? ic.volume : ic.study}
                  size={14} color={t.ink3} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.ink1 }}>{item.text}</div>
                <div style={{ fontSize: 11, color: t.ink4, marginTop: 2 }}>{item.sub}</div>
              </div>
              <div style={{ fontSize: 10, color: t.ink4, whiteSpace: "nowrap", paddingTop: 2 }}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── STUDY SCREEN ─────────────────────────────────────────────────────────────
const StudyScreen = ({ onNavigate }) => {
  const [view, setView] = useState("list");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showNotePrompt, setShowNotePrompt] = useState(false);
  const [selectedPassage, setSelectedPassage] = useState(null);

  const texts = [
    { title: "Adhyasa Bhashyam", author: "Adi Shankaracharya", level: "Level 2", progress: 42, type: "text", lang: "Sanskrit + English" },
    { title: "Bhagavad Gita — Summary", level: "Level 2", progress: 100, type: "text", lang: "English", complete: true },
    { title: "Intro to Advaita — Talk Series", level: "Level 1", progress: 80, type: "audio", lang: "English" },
    { title: "Upadesa Sara", author: "Ramana Maharshi", level: "Level 2", progress: 0, type: "text", lang: "Sanskrit + English" },
    { title: "Vivekachudamani Commentary", level: "Level 2", progress: 0, type: "video", lang: "Hindi" },
  ];

  const passage = {
    title: "Adhyasa Bhashyam",
    chapter: "Opening Argument",
    verse: null,
    text: [
      { id: 1, content: "It is a matter not requiring any proof that the object and the subject, whose respective natures are the not-Self and the Self, and which are opposed to each other as much as darkness and light are, cannot be identified with each other." },
      { id: 2, content: "Nor can their respective attributes be identified with each other. Consequently, it follows that there can be no superimposition of the object, whose nature is the not-Self, upon the subject, whose nature is pure consciousness—" },
      { id: 3, content: "nor of the subject upon the object. Nevertheless, owing to an absence of discrimination between these attributes, which are absolutely disparate in nature, there continues the natural human behaviour consisting of superimposing the universe, which is a product of ignorance, on the pure Ātman, as also of superimposing Ātman with its properties on the universe." },
    ],
  };

  if (view === "reading") {
    return (
      <div style={{ paddingBottom: 140 }}>
        {/* Reading header */}
        <div style={{
          padding: "16px 20px 12px",
          background: t.surface1, borderBottom: `1px solid ${t.border2}`,
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <button onClick={() => setView("list")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Icon d={ic.back} size={18} color={t.ink3} />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.ink1 }}>{passage.title}</div>
              <div style={{ fontSize: 11, color: t.ink4 }}>{passage.chapter}</div>
            </div>
            <button onClick={() => setAudioPlaying(!audioPlaying)} style={{
              width: 34, height: 34, borderRadius: "50%",
              background: audioPlaying ? t.vermillion : t.surface0,
              border: `1px solid ${audioPlaying ? t.vermillion : t.border1}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <Icon d={audioPlaying ? ic.pause : ic.play} size={14}
                color={audioPlaying ? t.surface1 : t.ink3} />
            </button>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: t.border2 }}>
            <div style={{ width: "42%", height: "100%", borderRadius: 2, background: t.vermillion }} />
          </div>
        </div>

        {/* Reading content */}
        <div style={{ padding: "24px 24px 0" }}>
          {passage.text.map((p, i) => (
            <div key={p.id}>
              <div
                onClick={() => setSelectedPassage(selectedPassage === p.id ? null : p.id)}
                style={{
                  padding: "4px 0",
                  cursor: "pointer",
                  borderRadius: 4,
                  background: selectedPassage === p.id ? t.vermillionSoft : "transparent",
                  transition: "background 0.15s ease",
                }}
              >
                <p style={{
                  fontSize: 15, lineHeight: 1.9, color: t.ink1,
                  margin: "0 0 16px 0",
                  padding: selectedPassage === p.id ? "8px 10px" : "0",
                  borderLeft: selectedPassage === p.id ? `3px solid ${t.vermillion}` : "3px solid transparent",
                  transition: "all 0.15s ease",
                }}>{p.content}</p>
              </div>

              {selectedPassage === p.id && (
                <div style={{
                  margin: "0 0 20px 0",
                  padding: "12px 14px",
                  background: t.surface0, borderRadius: 10,
                  border: `1px solid ${t.border2}`,
                }}>
                  <div style={{ fontSize: 11, color: t.ink4, marginBottom: 10, letterSpacing: "0.04em" }}>ADD A NOTE TO THIS PASSAGE</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setShowNotePrompt(true)} style={{
                      flex: 1, display: "flex", alignItems: "center", gap: 6,
                      padding: "8px 12px", borderRadius: 8,
                      background: t.vermillionSoft, border: `1px solid #D4A898`,
                      color: t.vermillion, fontSize: 12, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit",
                    }}>
                      <Icon d={ic.mic} size={13} color={t.vermillion} />
                      Voice note
                    </button>
                    <button style={{
                      flex: 1, display: "flex", alignItems: "center", gap: 6,
                      padding: "8px 12px", borderRadius: 8,
                      background: t.surface1, border: `1px solid ${t.border1}`,
                      color: t.ink3, fontSize: 12, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit",
                    }}>
                      <Icon d={ic.note} size={13} color={t.ink3} />
                      Type note
                    </button>
                  </div>
                  {showNotePrompt && (
                    <div style={{
                      marginTop: 10, padding: "10px 12px", borderRadius: 8,
                      background: t.successSoft, border: `1px solid #C8DFD0`,
                      fontSize: 12, color: t.ink2, lineHeight: 1.6,
                    }}>
                      <div style={{ fontSize: 10, color: t.success, fontWeight: 700, marginBottom: 4, letterSpacing: "0.04em" }}>NOTE SAVED · Tagged: adhyasa, superimposition, ātman</div>
                      "The separation of witness and witnessed is the key. Darkness and light cannot coexist — how then can Self and not-Self be confused? Yet they are, constantly."
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Prior note surface */}
          <div style={{
            padding: "14px 16px", borderRadius: 12,
            background: t.warningSoft, border: `1px solid #E8D48A`,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 10, color: t.warning, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 6 }}>
              ◆ COMPANION NOTICED · You've noted adhyasa before
            </div>
            <div style={{ fontSize: 12, color: t.ink2, lineHeight: 1.6, marginBottom: 8 }}>
              From Tattva Bodha, 3 months ago: <span style={{ fontStyle: "italic" }}>"Superimposition feels abstract here — not sure what is being superimposed on what."</span>
            </div>
            <div style={{ fontSize: 11, color: t.ink4 }}>Compare with your understanding now ↗</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 20px 140px" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: t.ink1, marginBottom: 4, letterSpacing: "-0.02em" }}>Study</div>
      <div style={{ fontSize: 12, color: t.ink3, marginBottom: 20 }}>Level 2 — Practitioner · 3 texts remaining</div>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px", borderRadius: 10,
        background: t.surface1, border: `1px solid ${t.border2}`,
        marginBottom: 20,
      }}>
        <Icon d={ic.search} size={15} color={t.ink4} />
        <span style={{ fontSize: 13, color: t.ink4, fontStyle: "italic" }}>Search texts, concepts...</span>
      </div>

      {/* Current level */}
      <div style={{ fontSize: 10, color: t.ink4, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
        Level 2 — Practitioner
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {texts.filter(tx => tx.level === "Level 2").map(tx => (
          <button key={tx.title} onClick={() => setView("reading")} style={{
            display: "flex", gap: 12, padding: "14px",
            background: t.surface1, border: `1px solid ${t.border2}`,
            borderRadius: 12, textAlign: "left", cursor: "pointer",
            fontFamily: "inherit",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: tx.complete ? t.successSoft : t.surface0,
              border: `1px solid ${tx.complete ? "#C8DFD0" : t.border2}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {tx.complete
                ? <Icon d={ic.check} size={15} color={t.success} />
                : <Icon d={tx.type === "audio" ? ic.volume : tx.type === "video" ? ic.play : ic.study} size={15} color={t.ink3} />
              }
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: tx.complete ? t.ink4 : t.ink1, marginBottom: 3 }}>{tx.title}</div>
              {tx.author && <div style={{ fontSize: 11, color: t.ink4, marginBottom: 5, fontStyle: "italic" }}>{tx.author}</div>}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 3, borderRadius: 2, background: t.border2 }}>
                  <div style={{ width: `${tx.progress}%`, height: "100%", borderRadius: 2, background: tx.complete ? t.success : t.vermillion }} />
                </div>
                <span style={{ fontSize: 10, color: t.ink4 }}>{tx.progress}%</span>
              </div>
            </div>
            <Icon d={ic.chevronRight} size={14} color={t.ink4} />
          </button>
        ))}
      </div>

      {/* Explore */}
      <div style={{ fontSize: 10, color: t.ink4, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
        Explore Other Levels
      </div>
      {["Level 1", "Level 3"].map(lvl => (
        <div key={lvl} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 14px", borderRadius: 10,
          background: t.surface1, border: `1px solid ${t.border2}`,
          marginBottom: 8, cursor: "pointer",
        }}>
          <div style={{ fontSize: 13, color: t.ink2, fontWeight: 500 }}>{lvl}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge small>{lvl === "Level 1" ? "Complete" : "Locked"}</Badge>
            <Icon d={ic.chevronRight} size={13} color={t.ink4} />
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── NOTES SCREEN ─────────────────────────────────────────────────────────────
const NotesScreen = () => {
  const [concept, setConcept] = useState("adhyasa");

  const concepts = ["adhyasa", "viveka", "maya", "ātman", "brahman"];

  const notes = {
    adhyasa: [
      {
        source: "Tattva Bodha, Ch. 1", date: "Jan 12, 2026", level: "Level 1",
        text: "Superimposition feels abstract here — not sure what is being superimposed on what.",
        tags: ["adhyasa", "superimposition"],
      },
      {
        source: "Bhagavad Gita, Ch. 3", date: "Feb 8, 2026", level: "Level 2",
        text: "Beginning to see how the doer-identity is the primary superimposition. The Gita addresses this through karma yoga — action without the sense of being the agent.",
        tags: ["adhyasa", "karma yoga", "doer-identity"],
      },
      {
        source: "Adhyasa Bhashyam, Opening", date: "Mar 27, 2026", level: "Level 2",
        text: "Now I see — the separation of witness and witnessed is the key. Darkness and light cannot coexist. How then can Self and not-Self be confused? Yet they are, constantly.",
        tags: ["adhyasa", "witness", "superimposition", "ātman"],
      },
    ],
  };

  return (
    <div style={{ padding: "20px 20px 140px" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: t.ink1, marginBottom: 4, letterSpacing: "-0.02em" }}>Notes</div>
      <div style={{ fontSize: 12, color: t.ink3, marginBottom: 20 }}>Your understanding, connected across texts</div>

      {/* Concept filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {concepts.map(c => (
          <button key={c} onClick={() => setConcept(c)} style={{
            padding: "6px 14px", borderRadius: 20, flexShrink: 0,
            background: concept === c ? t.ink2 : t.surface1,
            border: `1px solid ${concept === c ? t.ink2 : t.border2}`,
            color: concept === c ? t.surface1 : t.ink3,
            fontSize: 12, fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit", fontStyle: "italic",
          }}>{c}</button>
        ))}
      </div>

      {/* Arc header */}
      <div style={{
        padding: "12px 16px", borderRadius: 10,
        background: t.vermillionSoft, border: `1px solid #D4A898`,
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, color: t.vermillion, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 4 }}>
          YOUR ARC ON '{concept.toUpperCase()}'
        </div>
        <div style={{ fontSize: 12, color: t.ink2, lineHeight: 1.6 }}>
          3 notes across 3 texts · Level 1 → Level 2 · 74 days
        </div>
      </div>

      {/* Notes timeline */}
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 15, top: 0, bottom: 0, width: 1,
          background: t.border2,
        }} />
        {(notes[concept] || []).map((note, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
              background: i === (notes[concept].length - 1) ? t.vermillion : t.surface1,
              border: `2px solid ${i === (notes[concept].length - 1) ? t.vermillion : t.border1}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700,
              color: i === (notes[concept].length - 1) ? t.surface1 : t.ink4,
              zIndex: 1,
            }}>{i + 1}</div>
            <div style={{
              flex: 1, padding: "14px 16px", borderRadius: 12,
              background: t.surface1, border: `1px solid ${t.border2}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.ink2 }}>{note.source}</div>
                  <div style={{ fontSize: 10, color: t.ink4 }}>{note.date} · {note.level}</div>
                </div>
              </div>
              <div style={{
                fontSize: 13, color: t.ink1, lineHeight: 1.7,
                fontStyle: "italic", marginBottom: 10,
              }}>"{note.text}"</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {note.tags.map(tag => (
                  <span key={tag} style={{
                    padding: "2px 8px", borderRadius: 4, fontSize: 10,
                    background: t.surface0, color: t.ink4,
                    border: `1px solid ${t.border2}`, fontStyle: "italic",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New note */}
      <div style={{
        padding: "14px 16px", borderRadius: 12,
        background: t.surface1, border: `1.5px dashed ${t.border1}`,
        display: "flex", gap: 12, alignItems: "center",
        cursor: "pointer",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: t.vermillionSoft, border: `1px solid #D4A898`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon d={ic.mic} size={16} color={t.vermillion} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.ink2 }}>Add a reflection on {concept}</div>
          <div style={{ fontSize: 11, color: t.ink4 }}>Voice or text — tagged automatically</div>
        </div>
      </div>
    </div>
  );
};

// ─── PROGRESS SCREEN ──────────────────────────────────────────────────────────
const ProgressScreen = () => {
  const concepts = [
    { name: "adhyasa", status: "progressing", notes: 3, assessed: 2 },
    { name: "viveka", status: "progressing", notes: 5, assessed: 3 },
    { name: "vairagya", status: "revisit", notes: 2, assessed: 1 },
    { name: "maya", status: "progressing", notes: 4, assessed: 2 },
    { name: "ātman", status: "progressing", notes: 6, assessed: 4 },
    { name: "brahman", status: "not started", notes: 0, assessed: 0 },
    { name: "nididhyasana", status: "not started", notes: 1, assessed: 0 },
  ];

  const statusStyle = {
    "progressing": { color: t.success, bg: t.successSoft, border: "#C8DFD0", label: "Progressing" },
    "revisit": { color: t.warning, bg: t.warningSoft, border: "#E8D48A", label: "Revisit" },
    "not started": { color: t.ink4, bg: t.surface0, border: t.border2, label: "Not started" },
  };

  return (
    <div style={{ padding: "20px 20px 140px" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: t.ink1, marginBottom: 4, letterSpacing: "-0.02em" }}>Progress</div>
      <div style={{ fontSize: 12, color: t.ink3, marginBottom: 20 }}>Level 2 · 68% complete · 31 days active</div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Sessions", value: "24" },
          { label: "Hours", value: "18.4" },
          { label: "Notes", value: "31" },
        ].map(s => (
          <div key={s.label} style={{
            padding: "14px 12px", borderRadius: 12, textAlign: "center",
            background: t.surface1, border: `1px solid ${t.border2}`,
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.ink1, letterSpacing: "-0.03em" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: t.ink4, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Level progress */}
      <div style={{
        padding: "16px", borderRadius: 12,
        background: t.ink2, marginBottom: 20,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.surface1 }}>Level 2 — Practitioner</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.vermillion }}>68%</div>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "rgba(253,246,232,0.15)", marginBottom: 10 }}>
          <div style={{ width: "68%", height: "100%", borderRadius: 3, background: t.vermillion }} />
        </div>
        <div style={{ fontSize: 11, color: "rgba(253,246,232,0.5)" }}>
          3 of 4 concepts progressing well · vairagya needs revisit
        </div>
      </div>

      {/* Concept map */}
      <div style={{ fontSize: 10, color: t.ink4, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
        Concept Assessment
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {concepts.map(c => {
          const s = statusStyle[c.status];
          return (
            <div key={c.name} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px", borderRadius: 10,
              background: t.surface1, border: `1px solid ${t.border2}`,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.ink1, fontStyle: "italic" }}>{c.name}</div>
                <div style={{ fontSize: 10, color: t.ink4, marginTop: 2 }}>
                  {c.notes} notes · {c.assessed} assessments
                </div>
              </div>
              <span style={{
                padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700,
                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                letterSpacing: "0.04em",
              }}>{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Thread to carry forward */}
      <div style={{
        marginTop: 20, padding: "14px 16px", borderRadius: 12,
        background: t.vermillionSoft, border: `1px solid #D4A898`,
      }}>
        <div style={{ fontSize: 10, color: t.vermillion, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 6 }}>
          THREAD TO CARRY FORWARD
        </div>
        <div style={{ fontSize: 13, color: t.ink2, lineHeight: 1.6, fontStyle: "italic" }}>
          "Who is the witness across the three states of waking, dream, and deep sleep? That question will deepen as you enter Mandukya Upanishad."
        </div>
        <div style={{ fontSize: 11, color: t.ink4, marginTop: 6 }}>From your last manana session · Mar 27</div>
      </div>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [companionOpen, setCompanionOpen] = useState(false);
  const [companionMode, setCompanionMode] = useState("recap");

  const companionMessages = {
    home: "You were midway through Adhyasa Bhashyam — shall we pick up where you left off?",
    study: "Tap a passage to add a note — or ask me a question about what you're reading.",
    notes: "Your understanding of adhyasa has deepened across 3 texts. Want to see the arc?",
    progress: "One thread open from your last session — the witness across the three states.",
  };

  const screenComponents = {
    home: <HomeScreen
      onOpenCompanion={(mode) => { setCompanionMode(mode || "recap"); setCompanionOpen(true); }}
      onNavigate={setActiveScreen}
    />,
    study: <StudyScreen onNavigate={setActiveScreen} />,
    notes: <NotesScreen />,
    progress: <ProgressScreen />,
  };

  return (
    <div style={{
      width: 390, margin: "0 auto", minHeight: "100vh",
      background: t.surface0,
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Texture */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.02,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='1' height='1' fill='%231C1208'/%3E%3C/svg%3E\")",
      }} />

      {/* Status bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        padding: "10px 20px 0",
        background: t.surface1, borderBottom: `1px solid ${t.border2}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 5,
            background: t.vermillion,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 800, color: t.surface1,
          }}>ॐ</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: t.ink2 }}>Spiritual</span>
        </div>
        <div style={{ fontSize: 11, color: t.ink4, fontStyle: "italic" }}>Advaita Vedanta</div>
        <button onClick={() => { setCompanionMode("assess"); setCompanionOpen(true); }} style={{
          padding: "5px 12px", borderRadius: 20,
          background: t.vermillionSoft, border: `1px solid #D4A898`,
          fontSize: 11, fontWeight: 700, color: t.vermillion,
          cursor: "pointer", fontFamily: "inherit",
        }}>Manana</button>
      </div>

      {/* Screen content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {screenComponents[activeScreen]}
      </div>

      {/* Companion strip */}
      <CompanionStrip
        message={companionMessages[activeScreen]}
        onTap={() => { setCompanionMode("recap"); setCompanionOpen(true); }}
      />

      {/* Bottom nav */}
      <BottomNav active={activeScreen} setActive={setActiveScreen} />

      {/* Companion overlay */}
      {companionOpen && (
        <CompanionOverlay
          mode={companionMode}
          onClose={() => setCompanionOpen(false)}
        />
      )}
    </div>
  );
}
