import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { projects } from '@/lib/portfolioData';
import { Hammer, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

function ProjectGallery({ images, alt }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const goPrev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="relative w-full h-full group">
      <img
        src={`${import.meta.env.BASE_URL}${images[index]}`}
        alt={`${alt} — ${index + 1}/${images.length}`}
        className="w-full h-full object-contain bg-[rgb(var(--surface-elevated))]"
        loading="lazy"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous screenshot"
            className="absolute start-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity focus-ring"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <button
            onClick={goNext}
            aria-label="Next screenshot"
            className="absolute end-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity focus-ring"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === index ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          <div className="absolute top-2 end-2 px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-medium">
            {index + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="bg-surface"
      aria-labelledby="projects-heading"
    >
      <div className="section-pad">
        <SectionHeader
          number="04"
          title={
            lang === 'ar'
              ? 'المشاريع'
              : lang === 'ru'
              ? 'Проекты'
              : 'Projects'
          }
          subtitle={
            lang === 'ar'
              ? 'أعمال قمت بتطويرها'
              : lang === 'ru'
              ? 'Проекты, которые я разработал'
              : 'Projects I have built'
          }
        />

        <div
          ref={ref}
          className="reveal grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((proj) => {
            const techs =
              (lang === 'ar'
                ? proj.technologiesAr
                : lang === 'ru'
                ? proj.technologiesRu
                : proj.technologiesEn) || [];

            const projName =
              lang === 'ar'
                ? proj.nameAr
                : lang === 'ru'
                ? proj.nameRu
                : proj.nameEn;

            const hasImages =
              proj.images && proj.images.length > 0;

            return (
              <div
                key={proj.id}
                className="rounded-2xl bg-surface-elevated border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.5)] transition-colors flex flex-col overflow-hidden"
              >
                <div className="aspect-video w-full bg-[rgb(var(--accent)/0.05)] border-b border-[rgb(var(--border))] flex items-center justify-center overflow-hidden">
                  {hasImages ? (
                    <ProjectGallery
                      images={proj.images}
                      alt={projName}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-foreground-muted py-8">
                      <Hammer size={26} aria-hidden="true" />
                      <span className="text-xs font-medium">
                        {lang === 'ar'
                          ? 'قيد التطوير — الصور قريبًا'
                          : lang === 'ru'
                          ? 'В разработке — скоро скриншоты'
                          : 'In progress — screenshots coming soon'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {proj.featured && (
                    <span className="text-xs font-medium text-[rgb(var(--accent))] mb-2 uppercase tracking-wide">
                      {lang === 'ar'
                        ? 'مشروع مميز'
                        : lang === 'ru'
                        ? 'Избранный проект'
                        : 'Featured Project'}
                    </span>
                  )}

                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {projName}
                  </h3>

                  <p className="text-sm text-foreground-muted leading-relaxed mb-4 flex-1">
                    {lang === 'ar'
                      ? proj.descriptionAr
                      : lang === 'ru'
                      ? proj.descriptionRu
                      : proj.descriptionEn}
                  </p>

                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {techs.map((tech, ti) => (
                        <span
                          key={ti}
                          className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[rgb(var(--accent))] hover:underline"
                    >
                      {lang === 'ar'
                        ? 'عرض على GitHub'
                        : lang === 'ru'
                        ? 'На GitHub'
                        : 'View on GitHub'}{' '}
                      →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}