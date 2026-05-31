import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Footer from "./Footer";


const T = {
  bg:         "#F5E6C8",   // warm wheat background
  bgCard:     "#FDF3DC",   // lighter wheat for cards
  bgDeep:     "#EDD9A3",   // deeper wheat for accents
  accent:     "#E07B2A",   // rich orange (primary)
  accentDark: "#B85C10",   // deep burnt orange
  accentLight:"#F4A44A",   // light orange
  yellow:     "#F5C518",   // vivid yellow
  yellowLight:"#FDE882",   // pale yellow
  yellowDeep: "#C9970A",   // golden yellow
  text:       "#7A2E00",   // dark burnt orange text
  textMid:    "#B05010",   // mid orange text
  textLight:  "#C4832A",   // light orange text
  border:     "#E8C87A",   // warm yellow border
  borderDark: "#D4A43A",   // stronger border
  white:      "#FFFBF0",   // warm white
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const BigNote = ({ animate }) => (
  <div style={{
    background: T.white,
    border: `1px solid ${T.borderDark}`,
    borderRadius: 20,
    padding: "2rem 2.5rem",
    maxWidth: 420,
    width: "100%",
    position: "relative",
    boxShadow: `0 24px 64px rgba(224,123,42,0.15)`,
    transform: animate ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
    opacity: animate ? 1 : 0,
    transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s",
  }}>
    <div style={{
      position: "absolute", left: 0, top: 0, bottom: 0,
      width: 5,
      background: `linear-gradient(180deg, ${T.yellow}, ${T.accent})`,
      borderRadius: "4px 0 0 4px"
    }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[T.accent, T.yellow, T.yellowDeep].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: T.textLight, letterSpacing: "0.06em" }}>Today, 2:34 PM</span>
    </div>
    <p style={{ fontSize: 17, fontWeight: 600, color: T.text, marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif" }}>
      Meeting with design team
    </p>
    {[100, 80, 100, 60, 90].map((w, i) => (
      <div key={i} style={{
        height: 8, borderRadius: 4,
        background: i % 2 === 0 ? T.yellowLight : T.bgDeep,
        width: `${w}%`, marginBottom: 8
      }} />
    ))}
    <div style={{ marginTop: 16, fontSize: 13, color: T.accent, fontStyle: "italic" }}>
      ✦ Summarize key action items →
    </div>
    <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
      <span style={{ fontSize: 11, padding: "3px 12px", borderRadius: 999, background: T.yellowLight, color: T.yellowDeep, fontWeight: 600 }}>Work</span>
      <span style={{ fontSize: 11, padding: "3px 12px", borderRadius: 999, background: "#FDDCB0", color: T.accentDark, fontWeight: 600 }}>🔴 High priority</span>
      <span style={{ fontSize: 11, padding: "3px 12px", borderRadius: 999, background: T.bgDeep, color: T.text, fontWeight: 600 }}>Q3</span>
    </div>
  </div>
);

const FeatureCards = ({ visible }) => {
  const cards = [
    { label: "Today's capture", title: "Product roadmap Q3",    tag: "Planning", tagBg: T.yellowLight, tagColor: T.yellowDeep },
    { label: "Recently edited", title: "Weekly standup notes",   tag: "Team",     tagBg: "#FDDCB0",    tagColor: T.accentDark },
    { label: "Pinned",          title: "Personal goals 2025",    tag: "Personal", tagBg: T.bgDeep,     tagColor: T.text       },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 360 }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          background: T.white,
          border: `1px solid ${T.border}`,
          borderRadius: 16,
          padding: "1.1rem 1.4rem",
          transform: visible ? "translateX(0)" : "translateX(60px)",
          opacity: visible ? 1 : 0,
          transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.12}s`,
          boxShadow: `0 2px 12px rgba(224,123,42,0.08)`,
        }}>
          <p style={{ fontSize: 11, color: T.textLight, marginBottom: 5, letterSpacing: "0.06em" }}>{c.label}</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 8 }}>{c.title}</p>
          <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 999, background: c.tagBg, color: c.tagColor, fontWeight: 600 }}>{c.tag}</span>
        </div>
      ))}
    </div>
  );
};

const AIChat = ({ visible }) => (
  <div style={{
    background: T.bgCard,
    border: `1px solid ${T.border}`,
    borderRadius: 20,
    padding: "1.5rem",
    maxWidth: 360,
    width: "100%",
    transform: visible ? "translateX(0)" : "translateX(-60px)",
    opacity: visible ? 1 : 0,
    transition: "all 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
  }}>
    <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.yellowLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>📝</div>
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: "12px 12px 12px 2px", padding: "10px 14px", fontSize: 13, color: T.textMid, lineHeight: 1.5 }}>
        Summarize my meeting notes and list action items
      </div>
    </div>
    <div style={{ display: "flex", gap: 10, flexDirection: "row-reverse" }}>
      <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>✦</div>
      <div style={{ background: T.accent, border: "none", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 13, color: "#fff", lineHeight: 1.7 }}>
        Here are 3 action items:<br />
        1. Finalize wireframes by Friday<br />
        2. Share API docs with backend team<br />
        3. Schedule follow-up for Monday
      </div>
    </div>
  </div>
);

const PriorityCards = ({ visible }) => {
  const cards = [
    { level: "High",   emoji: "🔴", items: ["Launch checklist","Client proposal","Bug report"],    bg: "#FDDCB0", border: T.accentLight, text: T.accentDark,  label: T.accent     },
    { level: "Medium", emoji: "🟡", items: ["Weekly review","Team updates","Research notes"],      bg: T.yellowLight, border: T.yellow, text: T.yellowDeep,  label: T.yellowDeep },
    { level: "Low",    emoji: "🟢", items: ["Reading list","Ideas log","Reference docs"],          bg: T.bgDeep,  border: T.borderDark,  text: T.text,        label: T.textMid    },
  ];
  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 680 }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          background: c.bg,
          border: `1px solid ${c.border}`,
          borderRadius: 16,
          padding: "1.4rem 1.6rem",
          flex: "1 1 180px",
          minWidth: 160,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          opacity: visible ? 1 : 0,
          transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.14}s`,
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: c.label, marginBottom: 12 }}>{c.emoji} {c.level}</p>
          {c.items.map((item, j) => (
            <p key={j} style={{ fontSize: 13, color: c.text, marginBottom: 6, lineHeight: 1.5 }}>· {item}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function NotesLanding() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [featRef, featVisible] = useInView();
  const [aiRef,   aiVisible]   = useInView();
  const [priRef,  priVisible]  = useInView();
  const [ctaRef,  ctaVisible]  = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const sectionStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 2rem",
    position: "relative",
  };

  const divider = (
    <div style={{ height: 1, background: T.border, maxWidth: 680, margin: "0 auto" }} />
  );

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: T.bg, color: T.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        button { cursor: pointer; font-family: inherit; }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes floatNote { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(1deg)} }
      `}</style>

    
      <section style={{ ...sectionStyle, flexDirection: "column", textAlign: "center", gap: "2.5rem" }}>

        {/* decorative blobs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: T.yellowLight, opacity: 0.4, filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 160, height: 160, borderRadius: "50%", background: "#FDDCB0", opacity: 0.5, filter: "blur(50px)", pointerEvents: "none" }} />

        <div style={{
          transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          opacity: heroVisible ? 1 : 0,
          transition: "all 0.7s ease 0.1s",
          position: "relative", zIndex: 1,
        }}>
         
          <h1 style={{ fontSize: "clamp(2.8rem,7vw,5rem)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, lineHeight: 1.08, marginBottom: "1.2rem", letterSpacing: "-0.02em", color: T.text }}>
            Notes that think<br />
            <span style={{ color: T.accent }}>with you</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: T.textMid, maxWidth: 440, margin: "0 auto 2rem", lineHeight: 1.75 }}>
            Capture ideas, organize thoughts, and let AI turn your notes into action — all in one place.
          </p>
        <Link to="/signup" style={{ textDecoration: "none" }}>
    <button style={{
      background: T.accent,
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "12px 28px",
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: "0.02em",
      boxShadow: `0 4px 20px rgba(224,123,42,0.35)`,
      cursor: "pointer",
    }}>
      Get started free
    </button>
  </Link>
        </div>

        <Link to="/login" style={{ textDecoration: "none" }}>
    <button style={{
      background: T.accentDark,
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "12px 28px",
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: "0.02em",
      boxShadow: `0 4px 20px rgba(224,123,42,0.35)`,
      cursor: "pointer",
      position : "absolute",
      top : "10px",
      right : "10px",
    }}>
      Login
    </button>
  </Link>

        <div style={{ animation: heroVisible ? "floatNote 5s ease-in-out infinite" : "none", position: "relative", zIndex: 1 }}>
          <BigNote animate={heroVisible} />
        </div>

        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", fontSize: 12, color: T.textLight, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
         =
          <span style={{ animation: "bounce 2s infinite" }}>↓</span>
        </div>
      </section>

      {divider}

      {/* FEATURES */}
      <section ref={featRef} style={{ ...sectionStyle, gap: "4rem", flexWrap: "wrap" }}>
        <div style={{
          flex: "1 1 300px", maxWidth: 380,
          transform: featVisible ? "translateX(0)" : "translateX(-60px)",
          opacity: featVisible ? 1 : 0,
          transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: T.accent, fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase" }}>Features</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, lineHeight: 1.18, marginBottom: "1rem", color: T.text }}>
            Everything you need to stay organized
          </h2>
          <p style={{ fontSize: 15, color: T.textMid, lineHeight: 1.75, marginBottom: "1.5rem" }}>
            From quick captures to structured documents — NoteAI adapts to the way you think.
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {["Rich text editor ","Instant full-text search ","tags, and smart collections","Completely Secure","Cross-device — web, iOS, Android"].map((item, i) => (
              <li key={i} style={{ fontSize: 14, color: T.textMid, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.yellow, flexShrink: 0, display: "inline-block", boxShadow: `0 0 0 3px ${T.yellowLight}` }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <FeatureCards visible={featVisible} />
      </section>

      {divider}

      {/* AI */}
      <section ref={aiRef} style={{ ...sectionStyle, gap: "4rem", flexWrap: "wrap", flexDirection: "row-reverse" }}>
        <div style={{
          flex: "1 1 300px", maxWidth: 380,
          transform: aiVisible ? "translateX(0)" : "translateX(60px)",
          opacity: aiVisible ? 1 : 0,
          transition: "all 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s",
        }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: T.accent, fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase" }}>AI Integration</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, lineHeight: 1.18, marginBottom: "1rem", color: T.text }}>
            Your notes,<br />now supercharged
          </h2>
          <p style={{ fontSize: 15, color: T.textMid, lineHeight: 1.75, marginBottom: "1.5rem" }}>
            Built-in AI that reads your notes and helps you take action — not just store information.
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {["Auto-summarize long notes","Get instant Roadmaps for any problem","Ask questions about your notes","Smart title and tag suggestions","Rewrite, expand, or shorten any note"].map((item, i) => (
              <li key={i} style={{ fontSize: 14, color: T.textMid, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent, flexShrink: 0, display: "inline-block", boxShadow: `0 0 0 3px #FDDCB0` }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <AIChat visible={aiVisible} />
      </section>

      {divider}

      {/* PRIORITY */}
      <section ref={priRef} style={{ ...sectionStyle, flexDirection: "column", textAlign: "center", gap: "2rem" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.1em", color: T.accent, fontWeight: 700, textTransform: "uppercase" }}>Priority levels</p>
        <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, lineHeight: 1.18, color: T.text }}>
          Focus on what matters most
        </h2>
        <p style={{ fontSize: 15, color: T.textMid, maxWidth: 420, lineHeight: 1.75 }}>
          Assign priority levels so you can stay focus on goals
        </p>
        <PriorityCards visible={priVisible} />
      </section>

      {divider}

      {/* CTA FOOTER */}
      <section ref={ctaRef} style={{ ...sectionStyle, flexDirection: "column", textAlign: "center", minHeight: "60vh", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: T.yellowLight, opacity: 0.3, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{
          transform: ctaVisible ? "translateY(0)" : "translateY(30px)",
          opacity: ctaVisible ? 1 : 0,
          transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
          position: "relative", zIndex: 1,
        }}>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, lineHeight: 1.1, marginBottom: "1rem", color: T.text }}>
            Start capturing<br />your best ideas
          </h2>
          <p style={{ fontSize: 15, color: T.textMid, marginBottom: "2rem" }}>Free forever. No credit card required.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
           
            <button style={{ background: "transparent", color: T.accent, border: `1.5px solid ${T.accentLight}`, borderRadius: 12, padding: "13px 32px", fontSize: 15, fontWeight: 600 }}>
              Credits
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}