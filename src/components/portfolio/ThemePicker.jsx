import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/lib/theme.jsx';
import { useLanguage } from '@/lib/i18n.jsx';
import { Palette } from 'lucide-react';

export default function ThemePicker() {
  const { colorTheme, setColorTheme, colorThemes } = useTheme();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-elevated))] text-foreground-muted hover:text-foreground hover:border-accent transition-all focus-ring"
        aria-label="Choose color theme"
        aria-expanded={open}
      >
        <Palette size={16} aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute end-0 top-full mt-2 w-56 max-h-64 overflow-y-auto p-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-lg z-50">
          <div className="grid grid-cols-1 gap-1">
            {colorThemes.map((ct) => (
              <button
                key={ct.id}
                onClick={() => { setColorTheme(ct.id); setOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-start transition-colors ${
                  colorTheme === ct.id
                    ? 'bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] font-medium'
                    : 'text-foreground-muted hover:bg-[rgb(var(--surface-elevated))] hover:text-foreground'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-[rgb(var(--border))] flex-shrink-0"
                  style={{ backgroundColor: ct.swatch }}
                />
                {lang === 'ar' ? ct.name.ar : lang === 'ru' ? ct.name.ru : ct.name.en}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}