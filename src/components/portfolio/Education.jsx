import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/i18n.jsx';
import { education, certifications } from '@/lib/portfolioData';
import SectionHeader from './SectionHeader';

export default function Education() {
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
    <section id="education" className="bg-surface" aria-labelledby="education-heading">
      <div className="section-pad">
        <SectionHeader
          number="05"
          title={lang === 'ar' ? 'التعليم' : lang === 'ru' ? 'Образование' : 'Education'}
          subtitle={lang === 'ar' ? 'المؤهل الأكاديمي والشهادات' : lang === 'ru' ? 'Образование и сертификаты' : 'Academic background and certifications'}
        />

        <div ref={ref} className="reveal space-y-8">
          {/* Education */}
          <div className="space-y-4">
            {education.map((edu) => {
              const focus = lang === 'ar' ? edu.focusAreasAr : lang === 'ru' ? edu.focusAreasRu : edu.focusAreasEn;
              return (
                <div key={edu.id} className="p-5 rounded-2xl bg-surface-elevated border border-[rgb(var(--border))]">
                  <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {lang === 'ar' ? edu.degreeAr : lang === 'ru' ? edu.degreeRu : edu.degreeEn}
                    </h3>
                    <span className="text-xs text-foreground-muted">{edu.period}</span>
                  </div>
                  <div className="text-sm text-[rgb(var(--accent))] font-medium mb-3">
                    {lang === 'ar' ? edu.institutionAr : lang === 'ru' ? edu.institutionRu : edu.institutionEn}
                  </div>
                  {focus && (
                    <div className="flex flex-wrap gap-2">
                      {focus.map((f, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-[13px] font-medium text-foreground-muted tracking-wide mb-3">
              {lang === 'ar' ? 'الشهادات والتدريب' : lang === 'ru' ? 'Сертификаты и обучение' : 'Certificates & Training'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert) => {
                const name = lang === 'ar' ? cert.nameAr : lang === 'ru' ? cert.nameRu : cert.nameEn;
                const issuer = lang === 'ar' ? cert.issuerAr : lang === 'ru' ? cert.issuerRu : cert.issuerEn;
                const Wrapper = cert.url ? 'a' : 'div';
                const wrapperProps = cert.url
                  ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer' }
                  : {};

                return (
                  <Wrapper
                    key={cert.id}
                    {...wrapperProps}
                    className="group relative p-4 rounded-xl bg-surface-elevated border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.5)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium text-foreground mb-1">{name}</div>
                      {cert.url && (
                        <ExternalLink
                          size={13}
                          className="mt-0.5 text-foreground-muted group-hover:text-[rgb(var(--accent))] transition-colors flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="text-xs text-foreground-muted">{issuer}</div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
