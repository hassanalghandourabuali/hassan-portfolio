import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { projects } from '@/lib/portfolioData';
import { Hammer, Maximize2 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

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

            // coverImage: a dedicated field if you add one to portfolioData.js,
            // otherwise falls back to the first image in the images array.
            const coverSrc = proj.coverImage || proj.images?.[0];

            return (
              <div
                key={proj.id}
                 onClick={() =>
                  (proj.images?.length > 0 ||
                    proj.imagesWeb?.length > 0 ||
                    proj.imagesMobile?.length > 0) &&
                  setActiveProject(proj)
                }
                className="rounded-2xl bg-surface-elevated border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.5)] transition-colors flex flex-col overflow-hidden cursor-pointer group"
              >
                <div className="relative aspect-video w-full bg-[rgb(var(--accent)/0.05)] border-b border-[rgb(var(--border))] flex items-center justify-center overflow-hidden">
                  {coverSrc ? (
                    <>
                      <img
                        src={`${import.meta.env.BASE_URL}${coverSrc}`}
                        alt={projName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-full bg-black/60">
                          <Maximize2 size={13} aria-hidden="true" />
                          {lang === 'ar'
                            ? 'عرض البروتوتايب الكامل'
                            : lang === 'ru'
                            ? 'Смотреть прототип'
                            : 'View full prototype'}
                        </span>
                      </div>
                    </>
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
                      onClick={(e) => e.stopPropagation()}
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

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}