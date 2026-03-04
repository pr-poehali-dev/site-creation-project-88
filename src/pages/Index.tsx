import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG1 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/a46093ac-accf-45b0-8922-81e0427dfd5b.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/3553e3d6-6071-4d25-9cb7-7a465983eb0e.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/a5a63f0a-021a-4cf9-bc40-1120a1c804bd.jpg";

const navLinks = ["Главная", "О нас", "Услуги", "Портфолио", "Отзывы", "Контакты"];

const services = [
  { icon: "Film",        title: "Художественное кино",   desc: "Полнометражные и короткометражные фильмы, авторское кино любого жанра" },
  { icon: "Video",       title: "Документальное кино",   desc: "Документальные фильмы, репортажи, исторические и биографические хроники" },
  { icon: "Camera",      title: "Рекламное видео",       desc: "Коммерческая съёмка, имиджевые ролики, тизеры и промо-материалы" },
  { icon: "Clapperboard",title: "Постпродакшн",          desc: "Профессиональный монтаж, цветокоррекция и звуковое оформление" },
];

const portfolio = [
  { year: "2024", title: "Ночной Дозор",    genre: "Художественный",   img: IMG1 },
  { year: "2023", title: "Последний Рейс",  genre: "Документальный",   img: IMG2 },
  { year: "2023", title: "Тени Прошлого",   genre: "Короткометражный", img: IMG3 },
  { year: "2022", title: "Горизонт",        genre: "Художественный",   img: IMG1 },
  { year: "2022", title: "Память Земли",    genre: "Документальный",   img: IMG2 },
  { year: "2021", title: "Новый Свет",      genre: "Короткометражный", img: IMG3 },
  { year: "2021", title: "Вечер в Москве",  genre: "Рекламный",        img: IMG1 },
  { year: "2020", title: "Путь домой",      genre: "Художественный",   img: IMG2 },
];

const reviews = [
  { name: "Иван Петров",    role: "Продюсер",           text: "Команда студии создала для нас невероятный документальный фильм. Профессионализм и внимание к деталям на высшем уровне." },
  { name: "Анна Смирнова",  role: "Режиссёр",           text: "Работать с этой студией — настоящее удовольствие. Архив проектов впечатляет — за каждым кадром стоит история." },
  { name: "Дмитрий Козлов", role: "Маркетинг-директор", text: "Рекламный ролик превзошёл все ожидания. Мы пересматривали его ещё на стадии монтажа — редкое качество работы." },
];

const ITEMS_PER_PAGE = 4;

// Separator component
const Rule = ({ className = "" }: { className?: string }) => (
  <hr className={`hr-rule ${className}`} />
);

// Section header component
const SectionHead = ({
  label,
  title,
  action,
}: {
  label: string;
  title: string;
  action?: React.ReactNode;
}) => (
  <div className="flex items-end justify-between mb-10 gap-4">
    <div>
      <p className="sec-label mb-3">{label}</p>
      <h2 className="sec-title">{title}</h2>
    </div>
    {action}
  </div>
);

export default function Index() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalPages = Math.ceil(portfolio.length / ITEMS_PER_PAGE);
  const visible = portfolio.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen" style={{ background: "#F5F5F3", color: "#1A1A1A" }}>

      {/* ── TOP BAR ── */}
      <div
        style={{
          background: "#1A1A1A",
          color: "#F5F5F3",
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          textTransform: "uppercase",
          padding: "8px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#888" }}>Студия визуального искусства</span>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <span style={{ color: "#888" }}>Пн–Пт: 10:00–19:00</span>
          <span style={{ color: "#CCC" }}>+7 (495) 456-78-90</span>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <header
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #D8D8D6",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                border: "1.5px solid #1A1A1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="Film" size={16} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                  color: "#1A1A1A",
                }}
              >
                КиноАрхив
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.28em",
                  color: "#999",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Студия
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l} href="#" className="nav-link">{l}</a>
            ))}
          </nav>

          {/* Phone */}
          <div className="hidden md:flex items-center gap-2" style={{ color: "#1A1A1A" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                border: "1px solid #D4D4D2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="Phone" size={13} />
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
              }}
            >
              +7 (495) 456-78-90
            </span>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div
            style={{ background: "#fff", borderTop: "1px solid #E8E8E6", padding: "16px 40px" }}
            className="flex flex-col gap-4"
          >
            {navLinks.map((l) => (
              <a key={l} href="#" className="nav-link py-1" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ══════════════════════════════════
          1. ГЛАВНЫЙ ЭКРАН
      ══════════════════════════════════ */}
      <section
        className="anim-in"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #D8D8D6",
          padding: "0",
          minHeight: "540px",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
            width: "100%",
          }}
          className="max-md:grid-cols-1"
        >
          {/* Left */}
          <div>
            <p className="sec-label anim-up d1 mb-4">Главный экран — Видеопортфолио</p>
            <h1
              className="anim-up d2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                lineHeight: 1.08,
                color: "#1A1A1A",
                marginBottom: "24px",
              }}
            >
              Лучше снимать,<br />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "#555" }}>чем не снимать</span>
            </h1>
            <Rule className="anim-up d3 my-6" />
            <p
              className="anim-up d3"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "#666",
                maxWidth: "460px",
                marginBottom: "32px",
              }}
            >
              Студия визуального искусства. Создаём художественные и документальные фильмы, храним архив кинопроектов и развиваем культуру кинематографии.
            </p>
            <div className="anim-up d4 flex flex-wrap gap-3">
              <button className="btn-primary">
                Смотреть архив
                <Icon name="ArrowRight" size={14} />
              </button>
              <button className="btn-outline">О студии</button>
            </div>
          </div>

          {/* Right — media placeholder */}
          <div className="anim-up d3 hidden md:block">
            <div
              style={{
                position: "relative",
                border: "1px solid #D8D8D6",
                background: "#ECECEA",
                aspectRatio: "16/10",
                overflow: "hidden",
              }}
            >
              <img src={IMG1} alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(245,245,243,0.15)",
                }}
              >
                <button
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    border: "1.5px solid #D4D4D2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Icon name="Play" size={22} style={{ marginLeft: "3px" }} />
                </button>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(6px)",
                  padding: "6px 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#555",
                  border: "1px solid #E0E0DE",
                }}
              >
                Шоурил 2024
              </div>
            </div>
            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                borderLeft: "1px solid #D8D8D6",
                borderRight: "1px solid #D8D8D6",
                borderBottom: "1px solid #D8D8D6",
              }}
            >
              {[["200+", "Проектов"], ["20+", "Лет опыта"], ["50+", "Наград"]].map(([n, l], i) => (
                <div
                  key={l}
                  style={{
                    padding: "14px 20px",
                    borderRight: i < 2 ? "1px solid #D8D8D6" : "none",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "#1A1A1A",
                      lineHeight: 1,
                    }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#999",
                      marginTop: "4px",
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          2. О ПРОЕКТЕ
      ══════════════════════════════════ */}
      <section style={{ background: "#F5F5F3", padding: "88px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead label="— О проекте" title="Наша история" />
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #D8D8D6",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              overflow: "hidden",
            }}
            className="max-md:grid-cols-1"
          >
            {/* image */}
            <div style={{ position: "relative", minHeight: "360px" }}>
              <img src={IMG2} alt="О студии" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(20%)" }} />
            </div>
            {/* text */}
            <div style={{ padding: "52px 48px", borderLeft: "1px solid #D8D8D6" }}>
              <blockquote
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "1.25rem",
                  lineHeight: 1.6,
                  color: "#333",
                  borderLeft: "3px solid #1A1A1A",
                  paddingLeft: "20px",
                  marginBottom: "28px",
                }}
              >
                «Кино — это зеркало эпохи, запечатлённое в свете и тени»
              </blockquote>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.92rem",
                  lineHeight: 1.85,
                  color: "#666",
                  marginBottom: "20px",
                }}
              >
                Студия основана в 2015 году профессиональными кинематографистами с опытом более 20 лет. Мы создаём художественные и документальные фильмы, рекламные ролики и храним богатый архив кинопроектов.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.92rem",
                  lineHeight: 1.85,
                  color: "#666",
                  marginBottom: "32px",
                }}
              >
                В нашем архиве собраны материалы более 200 проектов — от авторского кино до масштабных коммерческих работ. Мы верим, что каждый кадр должен рассказывать историю.
              </p>
              <button className="btn-primary">
                Читать подробнее
                <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          3. НАШИ УСЛУГИ
      ══════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "88px 0", borderTop: "1px solid #D8D8D6", borderBottom: "1px solid #D8D8D6" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead label="— Наши услуги" title="Что мы создаём" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              border: "1px solid #D8D8D6",
            }}
            className="max-md:grid-cols-2 max-sm:grid-cols-1"
          >
            {services.map((s, i) => (
              <div
                key={i}
                className="media-card"
                style={{
                  padding: "36px 28px 32px",
                  borderRight: i < 3 ? "1px solid #D8D8D6" : "none",
                  borderRadius: 0,
                  border: "none",
                  borderRight: i < services.length - 1 ? "1px solid #D8D8D6" : "none",
                }}
              >
                {/* Icon box */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1px solid #D4D4D2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    transition: "background 0.2s, border-color 0.2s",
                    background: "#F8F8F6",
                  }}
                >
                  <Icon name={s.icon} size={18} style={{ color: "#1A1A1A" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "#1A1A1A",
                    marginBottom: "10px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.83rem",
                    lineHeight: 1.7,
                    color: "#888",
                    marginBottom: "20px",
                  }}
                >
                  {s.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#AAAAAA",
                    transition: "color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#AAAAAA")}
                >
                  Подробнее <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          4. ПОРТФОЛИО
      ══════════════════════════════════ */}
      <section style={{ background: "#F5F5F3", padding: "88px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead
            label="— Архив проектов"
            title="Портфолио"
            action={<button className="btn-outline">Весь архив</button>}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
            className="max-md:grid-cols-2 max-sm:grid-cols-1"
          >
            {visible.map((item, i) => (
              <div key={i} className="media-card group">
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4" }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s ease, filter 0.4s ease",
                      filter: "grayscale(40%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.04)";
                      e.currentTarget.style.filter = "grayscale(0%)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.filter = "grayscale(40%)";
                    }}
                  />
                  {/* year badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "#FFFFFF",
                      padding: "4px 8px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "#666",
                      border: "1px solid #D8D8D6",
                    }}
                  >
                    {item.year}
                  </div>
                  {/* play overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(245,245,243,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "#1A1A1A",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name="Play" size={16} style={{ color: "#FFFFFF", marginLeft: "2px" }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: "16px 16px 18px", borderTop: "1px solid #E8E8E6" }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: "#1A1A1A",
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: "#999",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.genre}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "40px" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: "36px",
                  height: "36px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: p === page ? 500 : 400,
                  background: p === page ? "#1A1A1A" : "#FFFFFF",
                  color: p === page ? "#F5F5F3" : "#888",
                  border: "1px solid " + (p === page ? "#1A1A1A" : "#D4D4D2"),
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {p}
              </button>
            ))}
            <button
              style={{
                height: "36px",
                padding: "0 12px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                background: "#FFFFFF",
                color: "#888",
                border: "1px solid #D4D4D2",
                cursor: "pointer",
              }}
            >
              ...
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          5. ОТЗЫВЫ
      ══════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "88px 0", borderTop: "1px solid #D8D8D6", borderBottom: "1px solid #D8D8D6" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead label="— Отзывы" title="Что говорят клиенты" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: "1px solid #D8D8D6",
            }}
            className="max-md:grid-cols-1"
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 32px",
                  borderRight: i < reviews.length - 1 ? "1px solid #D8D8D6" : "none",
                }}
              >
                {/* Quote mark */}
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "3.5rem",
                    lineHeight: 1,
                    color: "#D4D4D2",
                    marginBottom: "12px",
                    fontStyle: "italic",
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    color: "#555",
                    marginBottom: "28px",
                  }}
                >
                  {r.text}
                </p>
                <Rule className="mb-4" />
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.88rem",
                      color: "#1A1A1A",
                    }}
                  >
                    {r.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      color: "#999",
                      marginTop: "3px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {r.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          6. КОНТАКТЫ
      ══════════════════════════════════ */}
      <section style={{ background: "#F5F5F3", padding: "88px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHead label="— Контакты" title="Свяжитесь с нами" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              border: "1px solid #D8D8D6",
              background: "#FFFFFF",
            }}
            className="max-md:grid-cols-1"
          >
            {/* Form */}
            <div style={{ padding: "44px 40px", borderRight: "1px solid #D8D8D6" }}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: "24px",
                }}
              >
                Оставьте заявку
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input className="field" type="text" placeholder="Имя" />
                <input className="field" type="email" placeholder="Email" />
                <input className="field" type="tel" placeholder="Телефон" />
                <textarea
                  className="field"
                  placeholder="Сообщение"
                  rows={4}
                  style={{ resize: "none" }}
                />
                <button className="btn-primary" style={{ marginTop: "4px" }}>
                  Отправить заявку
                  <Icon name="Send" size={13} />
                </button>
              </div>
            </div>

            {/* Team */}
            <div style={{ padding: "44px 36px", borderRight: "1px solid #D8D8D6" }}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: "24px",
                }}
              >
                Наша команда
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { name: "Александр Воронов", role: "Режиссёр-постановщик", phone: "+7 (495) 123-45-67", email: "voronov@kinoarkhiv.ru" },
                  { name: "Мария Соколова",     role: "Продюсер",             phone: "+7 (495) 987-65-43", email: "sokolova@kinoarkhiv.ru" },
                ].map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "14px",
                      padding: "16px",
                      border: "1px solid #E8E8E6",
                      background: "#FAFAFA",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        background: "#EBEBEA",
                        border: "1px solid #D8D8D6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="User" size={18} style={{ color: "#888" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.88rem", color: "#1A1A1A" }}>{m.name}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#999", marginTop: "2px", letterSpacing: "0.04em" }}>{m.role}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#666", marginTop: "8px" }}>
                        <div>{m.phone}</div>
                        <div style={{ color: "#999" }}>{m.email}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map + details */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", flex: 1, minHeight: "200px", borderBottom: "1px solid #D8D8D6", overflow: "hidden" }}>
                <img src={IMG3} alt="Карта" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(70%) brightness(1.1)", display: "block" }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(245,245,243,0.55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="MapPin" size={16} style={{ color: "#F5F5F3" }} />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#333" }}>Карта проезда</span>
                </div>
              </div>
              <div style={{ padding: "28px 32px" }}>
                {[
                  { icon: "MapPin", val: "Москва, ул. Мосфильмовская, д. 1" },
                  { icon: "Phone",  val: "+7 (495) 456-78-90" },
                  { icon: "Mail",   val: "info@kinoarkhiv.ru" },
                ].map(({ icon, val }) => (
                  <div key={val} style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "flex-start" }}>
                    <div style={{ paddingTop: "1px", flexShrink: 0 }}>
                      <Icon name={icon} size={13} style={{ color: "#888" }} />
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#666", lineHeight: 1.5 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER
      ══════════════════════════════════ */}
      <footer style={{ background: "#1A1A1A", color: "#F5F5F3" }}>
        {/* Main footer */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "56px 40px 40px",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "48px",
          }}
          className="max-md:grid-cols-2 max-sm:grid-cols-1"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "30px", height: "30px", border: "1px solid #444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="Film" size={14} style={{ color: "#F5F5F3" }} />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.04em" }}>КиноАрхив</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.75, color: "#777" }}>
              Студия визуального искусства. Создаём кино, которое остаётся в памяти.
            </p>
          </div>
          {[
            { title: "Студия", links: ["О нас", "Команда", "История", "Награды"] },
            { title: "Услуги",  links: ["Художественное кино", "Документальное", "Реклама", "Постпродакшн"] },
            { title: "Ресурсы", links: ["Портфолио", "Архив", "Пресса", "Контакты"] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#666", marginBottom: "16px" }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {col.links.map((l) => (
                  <a
                    key={l}
                    href="#"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 300, color: "#888", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#EEE")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #2A2A2A", maxWidth: "1280px", margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#555" }}>
            © 2024 КиноАрхив — Студия визуального искусства. Все права защищены.
          </span>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Instagram", "Youtube", "Send"].map((ic) => (
              <button
                key={ic}
                style={{
                  width: "32px",
                  height: "32px",
                  border: "1px solid #333",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#888"; e.currentTarget.style.background = "#2A2A2A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "transparent"; }}
              >
                <Icon name={ic} size={13} style={{ color: "#666" }} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}