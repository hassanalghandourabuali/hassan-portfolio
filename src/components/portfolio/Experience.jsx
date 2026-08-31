import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { experiences } from '@/lib/portfolioData';
import SectionHeader from './SectionHeader';

export default function Experience() {
  const { lang } = useLanguage();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="bg-surface" aria-labelledby="experience-heading">
      <div className="section-pad">
        <SectionHeader
          number="02"
          title={lang === 'ar' ? 'الخبرة' : lang === 'ru' ? 'Опыт' : 'Experience'}
          subtitle={lang === 'ar' ? 'رحلتي المهنية' : lang === 'ru' ? 'Мой профессиональный путь' : 'My professional journey'}
        />

        <div ref={ref} className="reveal space-y-6">
          {experiences.map((exp) => {
            const resp = lang === 'ar' ? exp.responsibilitiesAr : lang === 'ru' ? exp.responsibilitiesRu : exp.responsibilitiesEn;
            return (
              <div key={exp.id} className="p-5 rounded-2xl bg-surface-elevated border border-[rgb(var(--border))]">
                <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {lang === 'ar' ? exp.roleAr : lang === 'ru' ? exp.roleRu : exp.roleEn}
                  </h3>
                  <span className="text-xs text-foreground-muted">{exp.period}</span>
                </div>
                <div className="text-sm text-[rgb(var(--accent))] font-medium mb-3">
                  {lang === 'ar' ? exp.orgAr : lang === 'ru' ? exp.orgRu : exp.orgEn}
                  {' — '}
                  {lang === 'ar' ? exp.locationAr : lang === 'ru' ? exp.locationRu : exp.locationEn}
                </div>
                <ul className="space-y-1.5 mb-4">
                  {resp.map((r, i) => (
                    <li key={i} className="text-sm text-foreground-muted leading-relaxed flex gap-2">
                      <span className="text-[rgb(var(--accent))] mt-1">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                {exp.skillTags && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skillTags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}