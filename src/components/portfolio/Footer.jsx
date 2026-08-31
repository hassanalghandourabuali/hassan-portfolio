import { useLanguage } from '@/lib/i18n.jsx';
import { personalInfo as pInfo, navItems } from '@/lib/portfolioData';

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-[rgb(var(--border))]">
      <div className="section-pad py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-start">
            <div className="text-base font-semibold text-foreground">
              {lang === 'ar' ? pInfo.nameAr : lang === 'ru' ? pInfo.nameRu : pInfo.nameEn}
            </div>
            <div className="text-sm text-foreground-muted mt-1">
              {lang === 'ar' ? pInfo.titleAr : lang === 'ru' ? pInfo.titleRu : pInfo.titleEn}
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-foreground-muted hover:text-[rgb(var(--accent))] transition-colors"
              >
                {lang === 'ar' ? item.labelAr : lang === 'ru' ? item.labelRu : item.labelEn}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            <a
              href={pInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-muted hover:text-[rgb(var(--accent))] transition-colors"
            >
              GitHub
            </a>
            <a
              href={pInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-muted hover:text-[rgb(var(--accent))] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-foreground-muted mt-8 pt-6 border-t border-[rgb(var(--border-subtle))]">
          © {year} {lang === 'ar' ? pInfo.nameAr : lang === 'ru' ? pInfo.nameRu : pInfo.nameEn}. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : lang === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}
        </div>
      </div>
    </footer>
  );
}
