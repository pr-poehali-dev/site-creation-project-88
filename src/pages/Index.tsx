import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG1 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/a46093ac-accf-45b0-8922-81e0427dfd5b.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/3553e3d6-6071-4d25-9cb7-7a465983eb0e.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/a5a63f0a-021a-4cf9-bc40-1120a1c804bd.jpg";

const CYAN  = "#00F5FF";
const BG    = "#080C12";
const BGCARD= "#0C1119";

const navLinks = ["Главная", "О нас", "Услуги", "Портфолио", "Отзывы", "Контакты"];

const services = [
  { icon: "Film",         title: "Художественное",  desc: "Полнометражные и короткометражные фильмы, авторское кино любого жанра" },
  { icon: "Video",        title: "Документальное",   desc: "Документальные фильмы, репортажи, исторические и биографические хроники" },
  { icon: "Camera",       title: "Рекламное видео",  desc: "Коммерческая съёмка, имиджевые ролики, тизеры и промо-материалы" },
  { icon: "Clapperboard", title: "Постпродакшн",     desc: "Профессиональный монтаж, цветокоррекция и звуковое оформление" },
];

const portfolio = [
  { year: "2024", title: "Ночной Дозор",   genre: "Художественный",   img: IMG1 },
  { year: "2023", title: "Последний Рейс", genre: "Документальный",   img: IMG2 },
  { year: "2023", title: "Тени Прошлого",  genre: "Короткометражный", img: IMG3 },
  { year: "2022", title: "Горизонт",       genre: "Художественный",   img: IMG1 },
  { year: "2022", title: "Память Земли",   genre: "Документальный",   img: IMG2 },
  { year: "2021", title: "Новый Свет",     genre: "Короткометражный", img: IMG3 },
  { year: "2021", title: "Вечер в Москве", genre: "Рекламный",        img: IMG1 },
  { year: "2020", title: "Путь домой",     genre: "Художественный",   img: IMG2 },
];

const reviews = [
  { name: "Иван Петров",    role: "Продюсер",           text: "Команда студии создала для нас невероятный документальный фильм. Профессионализм на высшем уровне." },
  { name: "Анна Смирнова",  role: "Режиссёр",           text: "Работать с этой студией — настоящее удовольствие. Архив проектов впечатляет — за каждым кадром стоит история." },
  { name: "Дмитрий Козлов", role: "Маркетинг-директор", text: "Рекламный ролик превзошёл все ожидания. Мы пересматривали его ещё на стадии монтажа — редкое качество." },
];

const ITEMS = 4;

/* ─ tiny helpers ─ */
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.58rem",
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: CYAN,
      opacity: 0.6,
    }}
  >
    {children}
  </span>
);

const SectionHead = ({
  id, label, title, action,
}: {
  id: string; label: string; title: string; action?: React.ReactNode;
}) => (
  <div style={{ marginBottom: "40px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: CYAN, opacity: 0.4 }}>{id}</span>
      <div style={{ flex: 1, height: "1px", background: "rgba(0,245,255,0.1)" }} />
      {action}
    </div>
    <Tag>{label}</Tag>
    <h2 className="sec-title" style={{ marginTop: "6px" }}>{title}</h2>
  </div>
);

const Rule = () => <hr className="hr-rule" />;

export default function Index() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalPages = Math.ceil(portfolio.length / ITEMS);
  const visible = portfolio.slice((page - 1) * ITEMS, page * ITEMS);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#B0E8EC", overflowX: "hidden" }}>
      {/* scan line fx */}
      <div className="scan-fx" />

      {/* ── TOP BAR ── */}
      <div
        style={{
          background: BGCARD,
          borderBottom: "1px solid rgba(0,245,255,0.1)",
          padding: "7px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tag>// система управления контентом v2.4.1</Tag>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <Tag>ПН–ПТ 10:00–19:00</Tag>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              color: CYAN,
            }}
          >
            +7 (495) 456-78-90
          </span>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8,12,18,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,245,255,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                border: `1px solid ${CYAN}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 12px rgba(0,245,255,0.25)",
                flexShrink: 0,
                background: "rgba(0,245,255,0.04)",
              }}
            >
              <Icon name="Film" size={16} style={{ color: CYAN }} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#D0F4F8",
                  lineHeight: 1,
                  textShadow: "0 0 20px rgba(0,245,255,0.3)",
                }}
              >
                КиноАрхив
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.52rem",
                  letterSpacing: "0.3em",
                  color: CYAN,
                  opacity: 0.5,
                  marginTop: "2px",
                }}
              >
                STUDIO_SYS
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l} href="#" className="nav-link">{l}</a>
            ))}
          </nav>

          {/* Phone */}
          <div className="hidden md:flex items-center gap-2">
            <div
              style={{
                width: "28px",
                height: "28px",
                border: "1px solid rgba(0,245,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="Phone" size={12} style={{ color: CYAN }} />
            </div>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                color: CYAN,
              }}
            >
              +7 (495) 456-78-90
            </span>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: CYAN }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div
            style={{ background: BGCARD, borderTop: "1px solid rgba(0,245,255,0.1)", padding: "16px 40px" }}
            className="flex flex-col gap-4"
          >
            {navLinks.map((l) => (
              <a key={l} href="#" className="nav-link py-1" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "calc(100vh - 93px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(0,245,255,0.08)",
        }}
      >
        {/* bg glow blobs */}
        <div style={{ position: "absolute", top: "10%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0%", right: "-5%", width: "600px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(155,89,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            width: "100%",
          }}
          className="max-md:grid-cols-1"
        >
          {/* Left */}
          <div>
            <div className="anim-up d1" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", background: CYAN, opacity: 0.5 }} />
              <Tag>// ГЛАВНЫЙ ЭКРАН — ВИДЕОПОРТФОЛИО</Tag>
            </div>

            <h1
              className="anim-up d2"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#D0F4F8",
                marginBottom: "8px",
                textShadow: "0 0 40px rgba(0,245,255,0.15)",
              }}
            >
              Лучше снимать,
            </h1>
            <h1
              className="anim-up d2"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: CYAN,
                marginBottom: "28px",
                textShadow: "0 0 30px rgba(0,245,255,0.4)",
                fontStyle: "italic",
              }}
            >
              чем не снимать
            </h1>

            <Rule />
            <p
              className="anim-up d3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "#5A9AA0",
                maxWidth: "460px",
                margin: "20px 0 32px",
              }}
            >
              Студия визуального искусства. Создаём художественные и документальные фильмы, храним архив кинопроектов и развиваем культуру кинематографии.
            </p>

            <div className="anim-up d4" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button className="btn-primary">
                Смотреть архив
                <Icon name="ArrowRight" size={14} />
              </button>
              <button className="btn-outline">О студии</button>
            </div>

            {/* Stats */}
            <div
              className="anim-up d5"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "0",
                marginTop: "48px",
                border: "1px solid rgba(0,245,255,0.12)",
              }}
            >
              {[["200+", "Проектов"], ["20+", "Лет опыта"], ["50+", "Наград"]].map(([n, l], i) => (
                <div
                  key={l}
                  style={{
                    padding: "16px 20px",
                    borderRight: i < 2 ? "1px solid rgba(0,245,255,0.12)" : "none",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.8rem",
                      letterSpacing: "0.06em",
                      color: CYAN,
                      textShadow: "0 0 20px rgba(0,245,255,0.5)",
                      lineHeight: 1,
                    }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#2A7080",
                      marginTop: "4px",
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — video frame */}
          <div className="anim-up d3 hidden md:block">
            <div
              style={{
                position: "relative",
                border: "1px solid rgba(0,245,255,0.2)",
                padding: "2px",
                boxShadow: "0 0 40px rgba(0,245,255,0.06)",
              }}
            >
              {/* corner marks */}
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "14px",
                    height: "14px",
                    borderColor: CYAN,
                    borderStyle: "solid",
                    borderWidth: i === 0 ? "2px 0 0 2px" : i === 1 ? "2px 2px 0 0" : i === 2 ? "0 0 2px 2px" : "0 2px 2px 0",
                    top: i < 2 ? "-1px" : "auto",
                    bottom: i >= 2 ? "-1px" : "auto",
                    left: i % 2 === 0 ? "-1px" : "auto",
                    right: i % 2 === 1 ? "-1px" : "auto",
                    zIndex: 2,
                  }}
                />
              ))}

              <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                <img
                  src={IMG1}
                  alt="Hero"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.65) saturate(0.7) hue-rotate(170deg)" }}
                />
                {/* overlay grid */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(8,12,18,0.4) 0%, transparent 60%)",
                  }}
                />
                {/* play button */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    style={{
                      width: "64px",
                      height: "64px",
                      border: `1.5px solid ${CYAN}`,
                      borderRadius: "50%",
                      background: "rgba(0,245,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 0 30px rgba(0,245,255,0.3)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0,245,255,0.18)";
                      e.currentTarget.style.boxShadow = "0 0 50px rgba(0,245,255,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0,245,255,0.08)";
                      e.currentTarget.style.boxShadow = "0 0 30px rgba(0,245,255,0.3)";
                    }}
                  >
                    <Icon name="Play" size={22} style={{ color: CYAN, marginLeft: "3px" }} />
                  </button>
                </div>
                {/* label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: "rgba(8,12,18,0.85)",
                    border: "1px solid rgba(0,245,255,0.2)",
                    padding: "5px 10px",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: CYAN,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  ▶ ШОУРИЛ 2024
                </div>
                {/* REC indicator */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(8,12,18,0.8)",
                    border: "1px solid rgba(0,245,255,0.15)",
                    padding: "4px 8px",
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF3B3B", animation: "pulse-border 1.5s ease infinite" }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#FF6060" }}>REC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          О ПРОЕКТЕ
      ══════════════════════════ */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid rgba(0,245,255,0.08)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead id="[02]" label="— О проекте" title="Наша история" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              background: "rgba(0,245,255,0.07)",
              border: "1px solid rgba(0,245,255,0.1)",
            }}
            className="max-md:grid-cols-1"
          >
            <div style={{ position: "relative", minHeight: "380px", overflow: "hidden", background: BGCARD }}>
              <img
                src={IMG2}
                alt="О студии"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.55) saturate(0.5) hue-rotate(160deg)" }}
              />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.04) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
            </div>

            <div style={{ padding: "52px 48px", background: BGCARD }}>
              <blockquote
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "1.3rem",
                  lineHeight: 1.6,
                  color: CYAN,
                  borderLeft: `2px solid ${CYAN}`,
                  paddingLeft: "20px",
                  marginBottom: "28px",
                  textShadow: "0 0 20px rgba(0,245,255,0.2)",
                }}
              >
                «Кино — это зеркало эпохи, запечатлённое в свете и тени»
              </blockquote>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.85, color: "#4A8A90", marginBottom: "18px" }}>
                Студия основана в 2015 году профессиональными кинематографистами с опытом более 20 лет. Мы создаём художественные и документальные фильмы, рекламные ролики и храним богатый архив кинопроектов.
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.85, color: "#4A8A90", marginBottom: "36px" }}>
                В нашем архиве собраны материалы более 200 проектов — от авторского кино до масштабных коммерческих работ.
              </p>
              <button className="btn-primary">
                Читать подробнее <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          УСЛУГИ
      ══════════════════════════ */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid rgba(0,245,255,0.08)", background: BGCARD }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead id="[03]" label="— Наши услуги" title="Что мы создаём" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px", background: "rgba(0,245,255,0.07)" }} className="max-md:grid-cols-2 max-sm:grid-cols-1">
            {services.map((s, i) => (
              <div
                key={i}
                className="ht-card"
                style={{ padding: "36px 28px 32px", background: BG, borderRadius: 0, border: "none" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    border: `1px solid rgba(0,245,255,0.3)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    background: "rgba(0,245,255,0.04)",
                  }}
                >
                  <Icon name={s.icon} size={18} style={{ color: CYAN }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#D0F4F8",
                    marginBottom: "10px",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.7, color: "#3A7A80", marginBottom: "24px" }}>
                  {s.desc}
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A5A60", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#1A5A60")}
                >
                  ПОДРОБНЕЕ <Icon name="ArrowRight" size={11} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          ПОРТФОЛИО
      ══════════════════════════ */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid rgba(0,245,255,0.08)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead
            id="[04]"
            label="— Архив проектов"
            title="Портфолио"
            action={<button className="btn-outline" style={{ fontSize: "0.72rem", padding: "8px 18px" }}>Весь архив</button>}
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }} className="max-md:grid-cols-2 max-sm:grid-cols-1">
            {visible.map((item, i) => (
              <div key={i} className="ht-card">
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4" }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease, filter 0.4s ease", filter: "brightness(0.5) saturate(0.4) hue-rotate(165deg)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.06)";
                      e.currentTarget.style.filter = "brightness(0.65) saturate(0.6) hue-rotate(165deg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.filter = "brightness(0.5) saturate(0.4) hue-rotate(165deg)";
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(8,12,18,0.85)", border: "1px solid rgba(0,245,255,0.2)", padding: "3px 8px" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", color: CYAN, letterSpacing: "0.12em" }}>{item.year}</span>
                  </div>
                  {/* play overlay */}
                  <div
                    style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s", background: "rgba(0,245,255,0.04)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  >
                    <div style={{ width: "44px", height: "44px", border: `1.5px solid ${CYAN}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(0,245,255,0.4)", background: "rgba(0,245,255,0.1)" }}>
                      <Icon name="Play" size={16} style={{ color: CYAN, marginLeft: "2px" }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: "14px 16px 16px", borderTop: "1px solid rgba(0,245,255,0.08)" }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#D0F4F8", marginBottom: "4px" }}>{item.title}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "#2A7080" }}>{item.genre}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "36px" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: "34px",
                  height: "34px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem",
                  background: p === page ? CYAN : "transparent",
                  color: p === page ? BG : "#2A7080",
                  border: "1px solid " + (p === page ? CYAN : "rgba(0,245,255,0.15)"),
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: p === page ? "0 0 16px rgba(0,245,255,0.4)" : "none",
                }}
              >
                {p}
              </button>
            ))}
            <button style={{ height: "34px", padding: "0 10px", fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", background: "transparent", color: "#2A7080", border: "1px solid rgba(0,245,255,0.15)", cursor: "pointer" }}>…</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          ОТЗЫВЫ
      ══════════════════════════ */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid rgba(0,245,255,0.08)", background: BGCARD }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead id="[05]" label="— Отзывы" title="Что говорят клиенты" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px", background: "rgba(0,245,255,0.07)" }} className="max-md:grid-cols-1">
            {reviews.map((r, i) => (
              <div key={i} className="ht-card" style={{ padding: "36px 32px", background: BG, border: "none", borderRadius: 0 }}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "4rem", lineHeight: 1, color: CYAN, opacity: 0.25, marginBottom: "8px" }}>"</div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.8, color: "#3A7A80", marginBottom: "28px" }}>{r.text}</p>
                <Rule />
                <div style={{ marginTop: "16px" }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.08em", color: "#D0F4F8", textTransform: "uppercase" }}>{r.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "#2A7080", marginTop: "3px" }}>{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          КОНТАКТЫ
      ══════════════════════════ */}
      <section style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead id="[06]" label="— Контакты" title="Свяжитесь с нами" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "2px",
              background: "rgba(0,245,255,0.07)",
              border: "1px solid rgba(0,245,255,0.1)",
            }}
            className="max-md:grid-cols-1"
          >
            {/* Form */}
            <div style={{ padding: "44px 40px", background: BGCARD }}>
              <Tag>// ФОРМА ЗАЯВКИ</Tag>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                <input className="field" type="text" placeholder="Имя" />
                <input className="field" type="email" placeholder="Email" />
                <input className="field" type="tel" placeholder="Телефон" />
                <textarea className="field" placeholder="Сообщение" rows={4} style={{ resize: "none" }} />
                <button className="btn-primary" style={{ marginTop: "4px", justifyContent: "center" }}>
                  Отправить заявку <Icon name="Send" size={13} />
                </button>
              </div>
            </div>

            {/* Team */}
            <div style={{ padding: "44px 36px", background: BGCARD }}>
              <Tag>// КОМАНДА</Tag>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
                {[
                  { name: "Александр Воронов", role: "Режиссёр-постановщик", phone: "+7 (495) 123-45-67", email: "voronov@kinoarkhiv.ru" },
                  { name: "Мария Соколова",     role: "Продюсер",             phone: "+7 (495) 987-65-43", email: "sokolova@kinoarkhiv.ru" },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", padding: "16px", border: "1px solid rgba(0,245,255,0.1)", background: "rgba(0,245,255,0.02)" }}>
                    <div style={{ width: "40px", height: "40px", border: "1px solid rgba(0,245,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(0,245,255,0.04)" }}>
                      <Icon name="User" size={16} style={{ color: CYAN }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.06em", color: "#D0F4F8", textTransform: "uppercase" }}>{m.name}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", color: "#2A7080", marginTop: "2px", letterSpacing: "0.1em" }}>{m.role}</div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", color: "#3A7A80", marginTop: "8px" }}>
                        <div>{m.phone}</div>
                        <div style={{ opacity: 0.7 }}>{m.email}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map + info */}
            <div style={{ display: "flex", flexDirection: "column", background: BGCARD }}>
              <div style={{ position: "relative", flex: "0 0 200px", overflow: "hidden", borderBottom: "1px solid rgba(0,245,255,0.1)" }}>
                <img src={IMG3} alt="Карта" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) saturate(0.3) hue-rotate(160deg)", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.04) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                  <div style={{ width: "36px", height: "36px", border: `1.5px solid ${CYAN}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(0,245,255,0.35)", background: "rgba(0,245,255,0.08)" }}>
                    <Icon name="MapPin" size={16} style={{ color: CYAN }} />
                  </div>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", color: CYAN, textTransform: "uppercase" }}>КАРТА ПРОЕЗДА</span>
                </div>
              </div>
              <div style={{ padding: "28px 32px" }}>
                <Tag>// РЕКВИЗИТЫ</Tag>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { icon: "MapPin", val: "Москва, ул. Мосфильмовская, д. 1" },
                    { icon: "Phone",  val: "+7 (495) 456-78-90" },
                    { icon: "Mail",   val: "info@kinoarkhiv.ru" },
                  ].map(({ icon, val }) => (
                    <div key={val} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <Icon name={icon} size={13} style={{ color: CYAN, opacity: 0.6, marginTop: "1px", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem", color: "#3A7A80", lineHeight: 1.5 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          FOOTER
      ══════════════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(0,245,255,0.1)", background: BGCARD }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "52px 40px 36px",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "48px",
          }}
          className="max-md:grid-cols-2 max-sm:grid-cols-1"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ width: "28px", height: "28px", border: `1px solid ${CYAN}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 10px rgba(0,245,255,0.2)" }}>
                <Icon name="Film" size={13} style={{ color: CYAN }} />
              </div>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D0F4F8" }}>КиноАрхив</span>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: "0.8rem", lineHeight: 1.75, color: "#2A6066" }}>
              Студия визуального искусства. Создаём кино, которое остаётся в памяти.
            </p>
          </div>
          {[
            { title: "Студия",  links: ["О нас", "Команда", "История", "Награды"] },
            { title: "Услуги",  links: ["Художественное", "Документальное", "Реклама", "Постпродакшн"] },
            { title: "Ресурсы", links: ["Портфолио", "Архив", "Пресса", "Контакты"] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#2A6066", marginBottom: "14px" }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {col.links.map((l) => (
                  <a
                    key={l}
                    href="#"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 300, color: "#2A6A70", textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.02em" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#2A6A70")}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(0,245,255,0.07)", maxWidth: "1280px", margin: "0 auto", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.14em", color: "#1A4A50" }}>
            © 2024 КИНОАРХИВ — ALL RIGHTS RESERVED
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Instagram", "Youtube", "Send"].map((ic) => (
              <button
                key={ic}
                style={{ width: "30px", height: "30px", border: "1px solid rgba(0,245,255,0.12)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.boxShadow = "0 0 10px rgba(0,245,255,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,245,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <Icon name={ic} size={12} style={{ color: "#2A6A70" }} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
