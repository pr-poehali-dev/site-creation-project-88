import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/a46093ac-accf-45b0-8922-81e0427dfd5b.jpg";
const ABOUT_IMG = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/3553e3d6-6071-4d25-9cb7-7a465983eb0e.jpg";
const EQUIP_IMG = "https://cdn.poehali.dev/projects/6c323c1b-5d83-418c-a327-b7e4050f6428/files/a5a63f0a-021a-4cf9-bc40-1120a1c804bd.jpg";

const navLinks = ["Главная", "О нас", "Услуги", "Портфолио", "Отзывы", "Контакты"];

const services = [
  { icon: "Film", title: "Художественное кино", desc: "Полнометражные и короткометражные фильмы, авторское кино" },
  { icon: "Video", title: "Документальное кино", desc: "Документальные фильмы, репортажи, исторические хроники" },
  { icon: "Camera", title: "Рекламное видео", desc: "Коммерческая съёмка, имиджевые ролики, тизеры" },
  { icon: "Clapperboard", title: "Постпродакшн", desc: "Монтаж, цветокоррекция, звуковое оформление" },
];

const portfolio = [
  { year: "2024", title: "Ночной Дозор", genre: "Художественный фильм", img: HERO_IMG },
  { year: "2023", title: "Последний Рейс", genre: "Документальный", img: ABOUT_IMG },
  { year: "2023", title: "Тени Прошлого", genre: "Короткометражный", img: EQUIP_IMG },
  { year: "2022", title: "Горизонт", genre: "Художественный фильм", img: HERO_IMG },
  { year: "2022", title: "Память Земли", genre: "Документальный", img: ABOUT_IMG },
  { year: "2021", title: "Новый Свет", genre: "Короткометражный", img: EQUIP_IMG },
  { year: "2021", title: "Вечер в Москве", genre: "Рекламный ролик", img: HERO_IMG },
  { year: "2020", title: "Путь домой", genre: "Художественный фильм", img: ABOUT_IMG },
];

const ITEMS_PER_PAGE = 4;

const team = [
  { name: "Александр Воронов", role: "Режиссёр-постановщик", phone: "+7 (495) 123-45-67" },
  { name: "Мария Соколова", role: "Продюсер", phone: "+7 (495) 987-65-43" },
];

export default function Index() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalPages = Math.ceil(portfolio.length / ITEMS_PER_PAGE);
  const visiblePortfolio = portfolio.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDE8DC]">

      {/* TOP BAR */}
      <div className="border-b border-[#1A1A1A] px-6 py-2 flex items-center justify-between">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", letterSpacing: "0.1em", color: "#888" }}>
          КиноАрхив — Студия визуального искусства
        </span>
        <button className="outline-btn text-xs py-2 px-4">Команда</button>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#C9A227] flex items-center justify-center">
              <Icon name="Film" size={18} className="text-[#C9A227]" />
            </div>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500, fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                КиноАрхив
              </div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C9A227", textTransform: "uppercase" }}>
                Студия
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link} href="#" className="nav-link">{link}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 text-[#C9A227]">
            <Icon name="Phone" size={14} />
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, letterSpacing: "0.1em", fontSize: "0.85rem" }}>
              +7 (495) 456-78-90
            </span>
          </div>

          {/* Mobile menu */}
          <button className="md:hidden text-[#C9A227]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#111] border-t border-[#1A1A1A] px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link} href="#" className="nav-link py-1" onClick={() => setMenuOpen(false)}>{link}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", color: "#C9A227", textTransform: "uppercase", marginBottom: "16px" }}>
              Главный экран — Видеопортфолио
            </div>
            <h1 className="hero-title mb-6" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1.1, color: "#EDE8DC" }}>
              Искусство<br />
              <span style={{ color: "#C9A227" }}>кинематографа</span><br />
              в каждом кадре
            </h1>
            <p className="mb-8 animate-fade-in delay-200" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.7, color: "#999", maxWidth: "480px", opacity: 0 }}>
              Студия визуального искусства. Создаём художественные и документальные фильмы, храним архив кинопроектов и развиваем культуру кинематографии.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in delay-400" style={{ opacity: 0 }}>
              <button className="gold-btn">Смотреть архив</button>
              <button className="outline-btn">О студии</button>
            </div>
          </div>

          <div className="hidden md:block animate-fade-in delay-300" style={{ opacity: 0 }}>
            <div className="relative border border-[#C9A227]/30 p-1">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#C9A227]" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#C9A227]" />
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <div className="absolute inset-0 flex items-center justify-center bg-[#111] z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 border-2 border-[#C9A227] rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-[#C9A227]/10 transition-all cursor-pointer">
                      <Icon name="Play" size={24} className="text-[#C9A227] ml-1" />
                    </div>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#666", textTransform: "uppercase" }}>
                      Смотреть шоурил 2024
                    </div>
                  </div>
                </div>
                <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover opacity-30" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500" style={{ opacity: 0 }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#555", textTransform: "uppercase" }}>Листать</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#555] to-transparent" />
        </div>
      </section>

      {/* О ПРОЕКТЕ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#C9A227", textTransform: "uppercase", marginBottom: "8px" }}>
            — О проекте
          </div>
          <h2 className="section-title gold-line">Наша история</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="border border-[#1A1A1A] overflow-hidden">
            <img src={ABOUT_IMG} alt="О студии" className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" style={{ height: "380px" }} />
          </div>
          <div className="space-y-6">
            <blockquote className="hero-title" style={{ fontSize: "1.6rem", lineHeight: 1.5, color: "#C9A227", borderLeft: "2px solid #C9A227", paddingLeft: "24px" }}>
              «Кино — это зеркало эпохи, запечатлённое в свете и тени»
            </blockquote>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.9, color: "#888" }}>
              Студия основана в 2015 году профессиональными кинематографистами с опытом более 20 лет. Мы создаём художественные и документальные фильмы, рекламные ролики и храним богатый архив кинопроектов, отражающих историю современного российского кино.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.9, color: "#888" }}>
              В нашем архиве собраны материалы более 200 проектов — от авторского кино до масштабных коммерческих работ. Мы верим, что каждый кадр должен рассказывать историю.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[["200+", "Проектов"], ["20+", "Лет опыта"], ["50+", "Наград"]].map(([num, label]) => (
                <div key={label} className="text-center border-t border-[#1A1A1A] pt-4">
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 500, color: "#C9A227" }}>{num}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "#555", textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#C9A227", textTransform: "uppercase", marginBottom: "8px" }}>
              — Наши услуги
            </div>
            <h2 className="section-title gold-line">Что мы создаём</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1A1A]">
            {services.map((s, i) => (
              <div key={i} className="film-card bg-[#0D0D0D] p-8 group">
                <div className="w-12 h-12 border border-[#C9A227]/30 flex items-center justify-center mb-6 group-hover:border-[#C9A227] transition-colors">
                  <Icon name={s.icon} size={20} className="text-[#C9A227]" />
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 400, fontSize: "1rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#EDE8DC", marginBottom: "12px" }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.7, color: "#666" }}>
                  {s.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#C9A227] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Подробнее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОРТФОЛИО */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#C9A227", textTransform: "uppercase", marginBottom: "8px" }}>
              — Архив проектов
            </div>
            <h2 className="section-title gold-line">Портфолио</h2>
          </div>
          <button className="outline-btn">Весь архив</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visiblePortfolio.map((item, i) => (
            <div key={i} className="film-card group">
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-[#0A0A0A]/80 px-2 py-1">
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C9A227" }}>{item.year}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 400, fontSize: "1rem", letterSpacing: "0.05em", color: "#EDE8DC", textTransform: "uppercase" }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem", color: "#C9A227", marginTop: "4px" }}>
                    {item.genre}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-12 h-12 border border-[#C9A227] rounded-full flex items-center justify-center bg-[#0A0A0A]/50">
                    <Icon name="Play" size={18} className="text-[#C9A227] ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                width: "36px",
                height: "36px",
                border: p === page ? "1px solid #C9A227" : "1px solid #1A1A1A",
                color: p === page ? "#C9A227" : "#555",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {p}
            </button>
          ))}
          <button
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 300,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              padding: "0 12px",
              height: "36px",
              border: "1px solid #1A1A1A",
              color: "#555",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            ...
          </button>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#C9A227", textTransform: "uppercase", marginBottom: "8px" }}>
              — Отзывы
            </div>
            <h2 className="section-title gold-line">Что говорят клиенты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Иван Петров", role: "Продюсер", text: "Команда КиноАрхива создала для нас невероятный документальный фильм. Профессионализм на высшем уровне." },
              { name: "Анна Смирнова", role: "Режиссёр", text: "Работать с этой студией — настоящее удовольствие. Архив проектов впечатляет — видно, что за каждым кадром стоит история." },
              { name: "Дмитрий Козлов", role: "Маркетинг-директор", text: "Рекламный ролик превзошёл все ожидания. Смотрели его снова и снова ещё на стадии монтажа." },
            ].map((r, i) => (
              <div key={i} className="border border-[#1A1A1A] p-8 hover:border-[#C9A227]/40 transition-colors">
                <div className="text-[#C9A227] text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>"</div>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.8, color: "#888", marginBottom: "20px" }}>
                  {r.text}
                </p>
                <div className="border-t border-[#1A1A1A] pt-4">
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.9rem", letterSpacing: "0.08em", color: "#EDE8DC" }}>{r.name}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem", color: "#C9A227" }}>{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#C9A227", textTransform: "uppercase", marginBottom: "8px" }}>
            — Контакты
          </div>
          <h2 className="section-title gold-line">Свяжитесь с нами</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-1 space-y-4">
            <input
              type="text"
              placeholder="Имя"
              className="w-full bg-[#111] border border-[#1A1A1A] px-4 py-3 text-[#EDE8DC] text-sm focus:outline-none focus:border-[#C9A227] transition-colors placeholder:text-[#444]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#111] border border-[#1A1A1A] px-4 py-3 text-[#EDE8DC] text-sm focus:outline-none focus:border-[#C9A227] transition-colors placeholder:text-[#444]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full bg-[#111] border border-[#1A1A1A] px-4 py-3 text-[#EDE8DC] text-sm focus:outline-none focus:border-[#C9A227] transition-colors placeholder:text-[#444]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            />
            <textarea
              placeholder="Сообщение"
              rows={4}
              className="w-full bg-[#111] border border-[#1A1A1A] px-4 py-3 text-[#EDE8DC] text-sm focus:outline-none focus:border-[#C9A227] transition-colors placeholder:text-[#444] resize-none"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            />
            <button className="gold-btn w-full">Отправить заявку</button>
          </div>

          {/* Team */}
          <div className="space-y-4">
            {team.map((m, i) => (
              <div key={i} className="flex gap-4 border border-[#1A1A1A] p-5 hover:border-[#C9A227]/30 transition-colors">
                <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={20} className="text-[#C9A227]" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.95rem", letterSpacing: "0.05em", color: "#EDE8DC" }}>{m.name}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem", color: "#C9A227", marginTop: "2px" }}>{m.role}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.8rem", color: "#666", marginTop: "8px" }}>{m.phone}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder + info */}
          <div className="space-y-4">
            <div className="border border-[#1A1A1A] overflow-hidden" style={{ height: "180px" }}>
              <img src={EQUIP_IMG} alt="Карта" className="w-full h-full object-cover opacity-50 grayscale" />
              <div className="relative -mt-full inset-0 flex items-center justify-center" style={{ marginTop: "-180px", height: "180px", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="text-center">
                  <Icon name="MapPin" size={24} className="text-[#C9A227] mx-auto mb-1" />
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "#EDE8DC", textTransform: "uppercase" }}>Карта проезда</span>
                </div>
              </div>
            </div>
            <div className="border border-[#1A1A1A] p-5 space-y-3">
              <div className="flex gap-3 items-start">
                <Icon name="MapPin" size={14} className="text-[#C9A227] mt-1 flex-shrink-0" />
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.85rem", color: "#888" }}>
                  Москва, ул. Мосфильмовская, д. 1
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Icon name="Phone" size={14} className="text-[#C9A227] flex-shrink-0" />
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.85rem", color: "#888" }}>
                  +7 (495) 456-78-90
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Icon name="Mail" size={14} className="text-[#C9A227] flex-shrink-0" />
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.85rem", color: "#888" }}>
                  info@kinoarkhiv.ru
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1A1A1A] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-[#C9A227]/50 flex items-center justify-center">
              <Icon name="Film" size={12} className="text-[#C9A227]" />
            </div>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: "0.75rem", letterSpacing: "0.2em", color: "#555", textTransform: "uppercase" }}>
              КиноАрхив
            </span>
          </div>
          <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem", color: "#444" }}>
            © 2024 КиноАрхив — Студия визуального искусства. Все права защищены.
          </span>
          <div className="flex gap-4">
            {["Instagram", "Youtube", "Send"].map((icon) => (
              <button key={icon} className="w-8 h-8 border border-[#1A1A1A] flex items-center justify-center hover:border-[#C9A227] transition-colors group">
                <Icon name={icon} size={14} className="text-[#555] group-hover:text-[#C9A227] transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}