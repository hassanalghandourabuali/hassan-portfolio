import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { personalInfo as pInfo } from '@/lib/portfolioData';
import { ArrowDown, Mail, Link as LinkIcon } from 'lucide-react';
import heroCutout from '@/assets/hero-cutout.png';

export default function Hero() {
  const { lang } = useLanguage();
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add('visible'), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const name = lang === 'ar' ? pInfo.nameAr : lang === 'ru' ? pInfo.nameRu : pInfo.nameEn;
  const title = lang === 'ar' ? pInfo.titleAr : lang === 'ru' ? pInfo.titleRu : pInfo.titleEn;
  const tagline = lang === 'ar' ? pInfo.taglineAr : lang === 'ru' ? pInfo.taglineRu : pInfo.taglineEn;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgb(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="absolute top-1/4 start-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 end-1/4 w-64 h-64 rounded-full bg-accent/3 blur-3xl pointer-events-none" aria-hidden="true" />

      <div
        ref={containerRef}
        className="reveal section-pad w-full pt-24 sm:pt-28 pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgb(var(--accent)/0.3)] bg-[rgb(var(--accent)/0.05)] mt-16 sm:mt-4 mb-8">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
              <span className="text-xs font-medium text-accent">
                {lang === 'ar' ? 'متاح للفرص' : lang === 'ru' ? 'Открыт для возможностей' : 'Open to Opportunities'}
              </span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-none mb-4 tracking-tight">
              {name}
            </h1>

            <h2 className="font-heading font-semibold text-xl sm:text-2xl md:text-3xl text-accent mb-6">
              {title}
            </h2>

            <p className="text-foreground-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
              {tagline}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { label: lang === 'ar' ? 'أبني' : lang === 'ru' ? 'Строю' : 'Build', sub: 'Flutter & Mobile', icon: '⚡' },
                { label: lang === 'ar' ? 'أفكّر' : lang === 'ru' ? 'Думаю' : 'Think', sub: 'Product & Business', icon: '🧠' },
                { label: lang === 'ar' ? 'أحل' : lang === 'ru' ? 'Решаю' : 'Solve', sub: 'Customer & Digital', icon: '🎯' },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-elevated border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.4)] transition-all"
                >
                  <span aria-hidden="true">{p.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{p.label}</div>
                    <div className="text-xs text-foreground-muted">{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-[rgb(var(--accent-foreground))] font-semibold text-sm hover:opacity-90 transition-all focus-ring accent-glow"
              >
                {lang === 'ar' ? 'استعرض أعمالي' : lang === 'ru' ? 'Смотреть работы' : 'View My Work'}
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-elevated border border-[rgb(var(--border))] text-foreground-muted font-semibold text-sm hover:border-accent hover:text-accent transition-all focus-ring"
              >
                <Mail size={16} aria-hidden="true" />
                {lang === 'ar' ? 'تواصل معي' : lang === 'ru' ? 'Связаться' : 'Contact Me'}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={pInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors focus-ring rounded"
                aria-label="LinkedIn profile"
              >
                <LinkIcon size={20} aria-hidden="true" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <span className="text-border" aria-hidden="true">·</span>
              <a
                href={pInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors focus-ring rounded"
                aria-label="GitHub profile"
              >
                <LinkIcon size={20} aria-hidden="true" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <span className="text-border mx-1" aria-hidden="true">·</span>
              <span className="text-sm text-foreground-muted">
                {lang === 'ar' ? 'مقيم في فلسطين' : lang === 'ru' ? 'Базируется в Палестине' : 'Based in Palestine'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-center lg:justify-end self-end">
            <div className="relative w-72 h-[26rem] sm:w-96 sm:h-[32rem] lg:h-[36rem] lg:w-auto flex items-end justify-center">
              {/* Soft color glow behind the figure, tinted with the accent color */}
              <div
                className="absolute inset-0 opacity-80 blur-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(55% 65% at 50% 55%, rgb(var(--accent) / 0.28), transparent 72%)',
                }}
                aria-hidden="true"
              />

              {/* Decorative floating shapes, like the reference layout */}
              <div className="absolute top-4 start-2 w-3 h-3 rotate-45 bg-accent/70 rounded-sm" aria-hidden="true" />
              <div className="absolute top-1/3 end-0 w-2.5 h-2.5 rounded-full bg-accent/50" aria-hidden="true" />
              <div className="absolute bottom-1/4 start-0 w-16 h-16 rounded-full border-2 border-[rgb(var(--accent)/0.25)]" aria-hidden="true" />
              <div className="absolute top-8 end-6 text-2xl select-none" aria-hidden="true">✦</div>

              {/* The cutout photo itself — no box, no border, sits directly on the page */}
              <img
                src={heroCutout}
                alt={name}
                className="relative z-10 h-full w-auto max-w-full object-contain object-bottom"
                style={{ filter: 'drop-shadow(0 20px 35px rgb(var(--accent) / 0.25)) drop-shadow(0 8px 12px rgb(0 0 0 / 0.2))' }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo('about')}
          className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground-muted hover:text-accent transition-colors focus-ring rounded"
          aria-label="Scroll down"
        >
          <span className="text-xs">{lang === 'ar' ? 'مرّر للاستكشاف' : lang === 'ru' ? 'Прокрутите' : 'Scroll to explore'}</span>
          <ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
