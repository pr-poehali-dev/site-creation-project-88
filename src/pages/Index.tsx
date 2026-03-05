import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import WordSphere from "@/components/WordSphere";

const IMG1 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/a46093ac-accf-45b0-8922-81e0427dfd5b.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/3553e3d6-6071-4d25-9cb7-7a465983eb0e.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/a5a63f0a-021a-4cf9-bc40-1120a1c804bd.jpg";
const IMG4 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/abe6748f-f6d5-45e5-bb95-dbec473093b0.jpg";
const IMG5 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/b9f4b789-82ea-4a16-845c-ac9e10dbd8d8.jpg";
const IMG6 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/79e63512-5a8e-4d21-be0a-d4c56a7f62c2.jpg";

const HERO_SLIDES = [
  { img: IMG6, label: "Москва. Ночь. Кино.", sub: "Аэросъёмка городской хроники" },
  { img: IMG4, label: "Магия кинематографа", sub: "Съёмочная площадка в деле" },
  { img: IMG5, label: "Точность каждого кадра", sub: "Профессиональное оборудование" },
  { img: IMG1, label: "Эпическое повествование", sub: "Художественный кинематограф" },
];

const CYAN  = "#00F5FF";
const BG    = "#080C12";
const BGCARD= "#0C1119";

const navLinks = ["Что создаём", "Сделано", "Новости и Акции", "Больше", "Контакты"];

const services = [
  { icon: "Film",         title: 'АСУП "Регент"',   desc: "Одноранговая электронная система для прямого найма и управления агентами с визуальным доказательством выполнения работы" },
  { icon: "Video",        title: "Строительство апартаментов", desc: "Санаторий профилакторий на краю леса с видом на море в Приморском крае" },
  { icon: "Camera",       title: "Эко-ферма",        desc: "Фермерское предприятие, объединяющее консорциум производителей Дальнего Востока" },
  { icon: "Clapperboard", title: "Логистика севера", desc: "Логистические цепочки по территориям крайнего севера" },
  { icon: "Leaf",         title: "Строительный агрегатор", desc: "Сервис, где клиенты находят специалистов для своих задач" },
  { icon: "Globe",        title: 'Бренд "ЧАО"',      desc: "Уникальная разработка прототипов одежды под заказ" },
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
  const [svcIdx, setSvcIdx] = useState(0);
  const SVC_PER_PAGE = 4;
  const svcTotal = Math.ceil(services.length / SVC_PER_PAGE);
  const [slide, setSlide] = useState(0);
  const [slideDir, setSlideDir] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const WORDS_CYCLE = ["Снимаем", "Выстраиваем", "Реализуем", "Совершенствуем", "Привлекаем"];
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS_CYCLE.length), 2200);
    return () => clearInterval(t);
  }, []);

  const totalPages = Math.ceil(portfolio.length / ITEMS);
  const visible = portfolio.slice((page - 1) * ITEMS, page * ITEMS);

  const goTo = useCallback((idx: number, dir: "next" | "prev" = "next") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDir(dir);
    setSlide(idx);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  useEffect(() => {
    const t = setInterval(() => {
      goTo((slide + 1) % HERO_SLIDES.length, "next");
    }, 5000);
    return () => clearInterval(t);
  }, [slide, goTo]);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#B0E8EC", overflowX: "hidden" }}>
      {/* scan line fx */}
      <div className="scan-fx" />

      {/* ── NAVBAR ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8,12,18,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,245,255,0.1)",
        }}
      >
        {/* Top row: Logo центр + иконки справа */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Logo по центру */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px", height: "42px",
                border: `1px solid ${CYAN}`,
                boxShadow: "0 0 16px rgba(0,245,255,0.3)",
                background: "rgba(0,245,255,0.04)",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src="https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/8dc94a2c-b57a-4d77-8920-d8c83194df72.jpg"
                alt="logo"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.1) saturate(1.2)" }}
              />
            </div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: "1.15rem",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "#D0F4F8",
                textShadow: "0 0 20px rgba(0,245,255,0.3)",
              }}
            >
              Manzhour-Media
            </div>
          </div>


        </div>

        {/* Bottom row: навигация */}
        <div
          className="hidden md:flex"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            height: "40px",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(0,245,255,0.07)",
          }}
        >
          {/* Левые пункты */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {["Что создаём", "Сделано", "Новости и Акции"].map((l) => (
              <a key={l} href="#" className="nav-link" style={{ fontSize: "0.72rem" }}>{l}</a>
            ))}
          </nav>

          {/* Правые пункты */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {["Больше", "Контакты"].map((l) => (
              <a key={l} href="#" className="nav-link" style={{ fontSize: "0.72rem" }}>{l}</a>
            ))}
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#00F5FF", display: "flex", alignItems: "center" }}>
              <Icon name="Search" size={14} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem" }}>
              <button className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600, color: "#00F5FF", fontSize: "0.72rem" }}>RU</button>
              <span style={{ color: "rgba(0,245,255,0.3)" }}>/</span>
              <button className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "0.72rem" }}>EN</button>
            </div>
          </nav>
        </div>

      </header>

      {/* ══════════════════════════
          HERO — FULLSCREEN SLIDER
      ══════════════════════════ */}
      <section
        style={{
          position: "relative",
          height: "calc(100vh - 93px)",
          minHeight: "560px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(0,245,255,0.1)",
        }}
      >
        {/* Slides */}
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === slide ? 1 : 0,
              transition: "opacity 1s ease",
              zIndex: i === slide ? 2 : 1,
            }}
          >
            <img
              src={s.img}
              alt={s.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.45) saturate(0.55) hue-rotate(170deg)",
                transform: i === slide ? "scale(1.04)" : "scale(1)",
                transition: "transform 6s ease, opacity 1s ease",
              }}
            />
          </div>
        ))}

        {/* Grid overlay */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(0,245,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.025) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient vignette */}
        <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none", background: "linear-gradient(to right, rgba(8,12,18,0.85) 40%, rgba(8,12,18,0.2) 100%), linear-gradient(to top, rgba(8,12,18,0.7) 0%, transparent 50%)" }} />

        {/* Content */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 5,
            display: "flex", alignItems: "center",
            maxWidth: "1280px", margin: "0 auto", padding: "0 40px", width: "100%",
            left: "50%", transform: "translateX(-50%)",
            gap: "0",
          }}
        >
          {/* LEFT — text */}
          <div style={{ flex: "0 0 auto", maxWidth: "520px", zIndex: 2 }}>
            {/* Slide counter */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", background: CYAN, opacity: 0.5 }} />
              <Tag>// {String(slide + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}</Tag>
            </div>

            {/* Slide sub-label */}
            <div
              key={`sub-${slide}`}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: CYAN,
                opacity: 0.7,
                marginBottom: "14px",
                animation: "fade-up 0.6s ease both",
              }}
            >
              {HERO_SLIDES[slide].sub}
            </div>

            <h1
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)",
                lineHeight: 1.05,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: CYAN,
                marginBottom: "24px",
                textShadow: "0 0 40px rgba(0,245,255,0.45)",
                display: "flex",
                alignItems: "center",
                gap: "0.3em",
                flexWrap: "wrap",
              }}
            >
              <span
                key={wordIdx}
                style={{
                  display: "inline-block",
                  animation: "fade-up 0.45s ease both",
                  color: CYAN,
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                {WORDS_CYCLE[wordIdx]}
              </span>
            </h1>

            <div style={{ width: "60px", height: "1px", background: CYAN, opacity: 0.4, marginBottom: "20px" }} />

            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: "0.92rem",
                lineHeight: 1.8,
                color: "#5A9AA0",
                maxWidth: "420px",
                marginBottom: "28px",
              }}
            >
              Студия производства медиа продуктов. Строим диджитал-сети. Реализуем стратегии удержания. Расширяем новую аудиторию.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "36px" }}>
              <button className="btn-primary">
                Смотреть архив <Icon name="ArrowRight" size={14} />
              </button>
              <button className="btn-outline">О студии</button>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: "1px solid rgba(0,245,255,0.12)", maxWidth: "340px" }}>
              {[["200+", "Проектов"], ["20+", "Лет опыта"], ["50+", "Наград"]].map(([n, l], i) => (
                <div key={l} style={{ padding: "12px 16px", borderRight: i < 2 ? "1px solid rgba(0,245,255,0.12)" : "none", background: "rgba(8,12,18,0.5)", backdropFilter: "blur(8px)" }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: CYAN, textShadow: "0 0 16px rgba(0,245,255,0.5)", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2A7080", marginTop: "3px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D word sphere */}
          <div
            className="hidden md:block"
            style={{
              flex: 1,
              height: "100%",
              minHeight: "420px",
              position: "relative",
            }}
          >
            <WordSphere />
          </div>
        </div>

        {/* Slider controls — right side */}
        <div
          style={{
            position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)",
            zIndex: 6, display: "flex", flexDirection: "column", gap: "10px", alignItems: "center",
          }}
        >
          <button
            onClick={() => goTo((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length, "prev")}
            style={{ width: "38px", height: "38px", border: "1px solid rgba(0,245,255,0.25)", background: "rgba(8,12,18,0.7)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", backdropFilter: "blur(6px)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,245,255,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,245,255,0.25)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <Icon name="ChevronUp" size={16} style={{ color: CYAN }} />
          </button>

          {/* Dots */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "8px 0" }}>
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > slide ? "next" : "prev")}
                style={{
                  width: i === slide ? "3px" : "3px",
                  height: i === slide ? "28px" : "10px",
                  background: i === slide ? CYAN : "rgba(0,245,255,0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: i === slide ? "0 0 8px rgba(0,245,255,0.6)" : "none",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goTo((slide + 1) % HERO_SLIDES.length, "next")}
            style={{ width: "38px", height: "38px", border: "1px solid rgba(0,245,255,0.25)", background: "rgba(8,12,18,0.7)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", backdropFilter: "blur(6px)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,245,255,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,245,255,0.25)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <Icon name="ChevronDown" size={16} style={{ color: CYAN }} />
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 6, height: "2px", background: "rgba(0,245,255,0.08)" }}>
          <div
            key={slide}
            style={{
              height: "100%",
              background: `linear-gradient(90deg, ${CYAN}, rgba(0,245,255,0.4))`,
              boxShadow: "0 0 8px rgba(0,245,255,0.5)",
              animation: "progress-bar 5s linear forwards",
            }}
          />
        </div>

        {/* Slide caption bottom-left */}
        <div
          key={`cap-${slide}`}
          style={{
            position: "absolute", bottom: "20px", left: "40px", zIndex: 6,
            background: "rgba(8,12,18,0.75)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,245,255,0.15)", padding: "7px 16px",
            animation: "fade-up 0.5s ease both",
          }}
        >
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: CYAN }}>
            ▶ {HERO_SLIDES[slide].label}
          </span>
        </div>

        {/* REC */}
        <div style={{ position: "absolute", top: "20px", right: "100px", zIndex: 6, display: "flex", alignItems: "center", gap: "6px", background: "rgba(8,12,18,0.75)", border: "1px solid rgba(0,245,255,0.12)", padding: "5px 10px", backdropFilter: "blur(6px)" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF3B3B", animation: "pulse-border 1.5s ease infinite" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#FF6060" }}>REC</span>
        </div>
      </section>

      {/* ══════════════════════════
          ЧТО СОЗДАЁМ
      ══════════════════════════ */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid rgba(0,245,255,0.08)", background: BGCARD }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead id="[02]" label="— Сейчас в работе" title="Сейчас в работе" />

          <div style={{ position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px", background: "rgba(0,245,255,0.07)" }} className="max-md:grid-cols-2 max-sm:grid-cols-1">
              {services.slice(svcIdx * SVC_PER_PAGE, svcIdx * SVC_PER_PAGE + SVC_PER_PAGE).map((s, i) => (
                <div
                  key={svcIdx * SVC_PER_PAGE + i}
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

            {/* Навигация карусели */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                {Array.from({ length: svcTotal }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSvcIdx(i)}
                    style={{
                      width: i === svcIdx ? "24px" : "8px",
                      height: "2px",
                      background: i === svcIdx ? CYAN : "rgba(0,245,255,0.25)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setSvcIdx(i => Math.max(0, i - 1))}
                  disabled={svcIdx === 0}
                  style={{
                    width: "36px", height: "36px",
                    border: `1px solid rgba(0,245,255,${svcIdx === 0 ? "0.1" : "0.35"})`,
                    background: "transparent",
                    cursor: svcIdx === 0 ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: svcIdx === 0 ? "rgba(0,245,255,0.2)" : CYAN,
                    transition: "all 0.2s",
                  }}
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button
                  onClick={() => setSvcIdx(i => Math.min(svcTotal - 1, i + 1))}
                  disabled={svcIdx === svcTotal - 1}
                  style={{
                    width: "36px", height: "36px",
                    border: `1px solid rgba(0,245,255,${svcIdx === svcTotal - 1 ? "0.1" : "0.35"})`,
                    background: "transparent",
                    cursor: svcIdx === svcTotal - 1 ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: svcIdx === svcTotal - 1 ? "rgba(0,245,255,0.2)" : CYAN,
                    transition: "all 0.2s",
                  }}
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          ПОРТФОЛИО
      ══════════════════════════ */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid rgba(0,245,255,0.08)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead
            id="[03]"
            label="— Архив проектов"
            title="Сделано"
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
          НОВОСТИ И АКЦИИ
      ══════════════════════════ */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid rgba(0,245,255,0.08)", background: BGCARD }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead id="[04]" label="— Новости и Акции" title="Последние новости" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px", background: "rgba(0,245,255,0.07)" }} className="max-md:grid-cols-1">
            {[
              { tag: "НОВОСТЬ", date: "15 февраля 2026", title: "Премьера нового документального фильма", desc: "Студия Manzhour-Media объявляет о выходе долгожданного документального проекта о кинематографе 70-х." },
              { tag: "АКЦИЯ",   date: "01 марта 2026",   title: "Скидка 20% на постпродакшн в марте",    desc: "Специальное предложение для новых клиентов — профессиональный монтаж и цветокоррекция со скидкой." },
              { tag: "НОВОСТЬ", date: "28 февраля 2026",  title: "Участие в международном кинофестивале", desc: "Наши работы вошли в официальную программу фестиваля визуального искусства в Берлине." },
            ].map((n, i) => (
              <div key={i} className="ht-card" style={{ padding: "36px 32px", background: BG, border: "none", borderRadius: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: n.tag === "АКЦИЯ" ? "#FF9900" : CYAN, border: `1px solid ${n.tag === "АКЦИЯ" ? "#FF9900" : CYAN}`, padding: "3px 8px", opacity: 0.85 }}>{n.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "1rem", letterSpacing: "0.06em", color: "#D0F4F8", textTransform: "uppercase", marginBottom: "12px", lineHeight: 1.3 }}>{n.title}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.75, color: "#3A7A80", marginBottom: "24px" }}>{n.desc}</p>
                <Rule />
                <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A5A60", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#1A5A60")}
                >
                  ЧИТАТЬ ДАЛЕЕ <Icon name="ArrowRight" size={11} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          БОЛЬШЕ
      ══════════════════════════ */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid rgba(0,245,255,0.08)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead id="[05]" label="— Больше" title="Узнайте больше о нас" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px", background: "rgba(0,245,255,0.07)" }} className="max-md:grid-cols-1">
            {[
              { icon: "Award",    title: "Награды",      desc: "Более 50 наград на международных и российских кинофестивалях за 20 лет работы студии." },
              { icon: "Users",    title: "Команда",       desc: "Профессионалы с многолетним опытом: режиссёры, операторы, монтажёры и продюсеры." },
              { icon: "Archive",  title: "Архив",         desc: "Богатый архив из 200+ проектов — от авторского кино до масштабных коммерческих работ." },
            ].map((item, i) => (
              <div key={i} className="ht-card" style={{ padding: "48px 36px", background: BGCARD, border: "none", borderRadius: 0 }}>
                <div style={{ width: "52px", height: "52px", border: `1px solid rgba(0,245,255,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", background: "rgba(0,245,255,0.04)" }}>
                  <Icon name={item.icon} size={22} style={{ color: CYAN }} />
                </div>
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#D0F4F8", marginBottom: "12px" }}>{item.title}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.75, color: "#3A7A80" }}>{item.desc}</p>
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
          <SectionHead id="[06]" label="— Контакты" title="Контакты" />

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
              <div style={{ width: "32px", height: "32px", border: `1px solid ${CYAN}`, overflow: "hidden", boxShadow: "0 0 10px rgba(0,245,255,0.2)", flexShrink: 0 }}>
                <img src="https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/8dc94a2c-b57a-4d77-8920-d8c83194df72.jpg" alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D0F4F8" }}>Manzhour-Media</span>
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
            © MANZHOUR-MEDIA — ALL RIGHTS RESERVED
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