import { useState, useEffect } from 'react';
import { useLanguage, languages } from '@/lib/i18n.jsx';
import { useTheme } from '@/lib/theme.jsx';
import { navItems } from '@/lib/portfolioData';
import { Sun, Moon, Menu, X } from 'lucide-react';
import ThemePicker from './ThemePicker';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map(i => document.getElementById(i.id)).filter(Boolean);
      let current = 'hero';
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= 80) current = sec.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgb(var(--surface)/0.85)] backdrop-blur-md border-b border-[rgb(var(--border)/0.5)] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <button
          onClick={() => scrollTo('hero')}
          className="font-heading font-bold text-lg text-foreground hover:text-accent transition-colors focus-ring"
          aria-label="Go to top"
        >
          <span className="text-accent">H</span>A
        </button>

        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all focus-ring ${
                  activeSection === item.id
                    ? 'text-accent bg-[rgb(var(--accent)/0.08)]'
                    : 'text-foreground-muted hover:text-foreground hover:bg-[rgb(var(--surface-elevated))]'
                }`}
              >
                {t({ en: item.labelEn, ar: item.labelAr, ru: item.labelRu })}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 bg-[rgb(var(--surface-elevated))] rounded-lg p-0.5 border border-[rgb(var(--border))]">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-all focus-ring ${
                  lang === l.code
                    ? 'bg-accent text-[rgb(var(--accent-foreground))] shadow-sm'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
                aria-label={`Switch to ${l.label}`}
                aria-pressed={lang === l.code}
              >
                <span className="sm:hidden">{l.code.toUpperCase()}</span>
                <span className="hidden sm:inline">{l.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <ThemePicker />
          </div>

          <button
            onClick={toggleTheme}
            className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-elevated))] text-foreground-muted hover:text-foreground hover:border-accent transition-all focus-ring"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-elevated))] text-foreground-muted hover:text-foreground transition-all focus-ring"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="lg:hidden bg-[rgb(var(--surface)/0.95)] backdrop-blur-md border-b border-[rgb(var(--border))] px-6 py-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-start px-4 py-2.5 rounded-lg text-sm font-medium transition-all focus-ring ${
                    activeSection === item.id
                      ? 'text-accent bg-[rgb(var(--accent)/0.08)]'
                      : 'text-foreground-muted hover:text-foreground hover:bg-[rgb(var(--surface-elevated))]'
                  }`}
                >
                  {t({ en: item.labelEn, ar: item.labelAr, ru: item.labelRu })}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-[rgb(var(--border))] flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground-muted">
              {theme === 'dark' ? 'Dark mode' : 'Light mode'}
            </span>
            <div className="flex items-center gap-2">
              <ThemePicker />
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-elevated))] text-foreground-muted hover:text-foreground hover:border-accent transition-all focus-ring"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
