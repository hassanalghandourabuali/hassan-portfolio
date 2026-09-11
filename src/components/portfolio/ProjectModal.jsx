import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Monitor, Smartphone } from 'lucide-react';
import { useLanguage } from '@/lib/i18n.jsx';

export default function ProjectModal({ project, onClose }) {
  const { lang } = useLanguage();

  const webImages = project?.imagesWeb || [];
  const mobileImages = project?.imagesMobile || project?.images || [];
  const hasWeb = webImages.length > 0;
  const hasMobile = mobileImages.length > 0;

  const [activeTab, setActiveTab] = useState(hasWeb ? 'web' : 'mobile');
  const [index, setIndex] = useState(0);

  const images = activeTab === 'web' ? webImages : mobileImages;

  useEffect(() => {
    setIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  if (!project) return null;

  const goPrev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const projName =
    lang === 'ar' ? project.nameAr : lang === 'ru' ? project.nameRu : project.nameEn;

  const techs =
    (lang === 'ar'
      ? project.technologiesAr
      : lang === 'ru'
      ? project.technologiesRu
      : project.technologiesEn) || [];

  const tabLabel = {
    web: lang === 'ar' ? 'ويب' : lang === 'ru' ? 'Веб' : 'Web',
    mobile: lang === 'ar' ? 'موبايل' : lang === 'ru' ? 'Моб.' : 'Mobile',
  };

  const roleText =
    lang === 'ar' ? project.roleAr : lang === 'ru' ? project.roleRu : project.roleEn;

  const statusText =
    lang === 'ar' ? project.statusAr : lang === 'ru' ? project.statusRu : project.statusEn;

  const problemText =
    lang === 'ar' ? project.problemAr : lang === 'ru' ? project.problemRu : project.problemEn;

  const solutionText =
    lang === 'ar' ? project.solutionAr : lang === 'ru' ? project.solutionRu : project.solutionEn;

  const outcomeText =
    lang === 'ar' ? project.outcomeAr : lang === 'ru' ? project.outcomeRu : project.outcomeEn;

  const highlightsList =
    (lang === 'ar'
      ? project.highlightsAr || project.featuresAr
      : lang === 'ru'
      ? project.highlightsRu || project.featuresRu
      : project.highlightsEn || project.featuresEn) || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-[fadeIn_0.18s_ease]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={projName}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl overflow-hidden flex flex-col md:flex-row animate-[scaleIn_0.2s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 end-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {/* Screenshot viewer */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center bg-[rgb(var(--accent)/0.05)] p-6 md:p-8 md:w-[380px]">
          {/* Web / Mobile tabs — only shown if project has both */}
          {hasWeb && hasMobile && (
            <div className="flex items-center gap-1 mb-4 p-1 rounded-full bg-[rgb(var(--border)/0.4)]">
              <button
                onClick={() => setActiveTab('web')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeTab === 'web'
                    ? 'bg-[rgb(var(--accent))] text-white'
                    : 'text-foreground-muted'
                }`}
              >
                <Monitor size={13} aria-hidden="true" />
                {tabLabel.web}
              </button>
              <button
                onClick={() => setActiveTab('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeTab === 'mobile'
                    ? 'bg-[rgb(var(--accent))] text-white'
                    : 'text-foreground-muted'
                }`}
              >
                <Smartphone size={13} aria-hidden="true" />
                {tabLabel.mobile}
              </button>
            </div>
          )}

          {activeTab === 'web' ? (
            // Browser-style frame — wide, object-contain so nothing gets cropped/zoomed
            <div className="relative w-full max-w-[340px] aspect-[16/10] rounded-xl border-[6px] border-black bg-black overflow-hidden shadow-lg">
              <div className="absolute top-0 inset-x-0 h-4 bg-black flex items-center gap-1 px-2 z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
              {images.length > 0 && (
                <img
                  src={`${import.meta.env.BASE_URL}${images[index]}`}
                  alt={`${projName} — ${index + 1}/${images.length}`}
                  className="w-full h-full object-contain bg-white pt-4"
                />
              )}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="Previous screenshot"
                    className="absolute start-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white z-10"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next screenshot"
                    className="absolute end-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white z-10"
                  >
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          ) : (
            // Phone frame — portrait, object-cover works fine since mobile shots match this ratio
            <div className="relative w-[180px] aspect-[9/19] rounded-[28px] border-[6px] border-black bg-black overflow-hidden shadow-lg">
              {images.length > 0 && (
                <img
                  src={`${import.meta.env.BASE_URL}${images[index]}`}
                  alt={`${projName} — ${index + 1}/${images.length}`}
                  className="w-full h-full object-cover"
                />
              )}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="Previous screenshot"
                    className="absolute start-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next screenshot"
                    className="absolute end-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white"
                  >
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="flex items-center gap-1.5 mt-4 flex-wrap justify-center max-w-[280px]">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to screenshot ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? 'w-4 bg-[rgb(var(--accent))]'
                      : 'w-1.5 bg-[rgb(var(--border))]'
                  }`}
                />
              ))}
            </div>
          )}

          <p className="text-xs text-foreground-muted mt-2">
            {images.length > 0 ? `${index + 1} / ${images.length}` : ''}
          </p>
        </div>

        {/* Details panel */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <h3 className="text-xl font-semibold text-foreground mb-3">{projName}</h3>

          {/* Meta badges: role, period, status */}
          <div className="flex flex-wrap gap-2 mb-5">
            {roleText && (
              <span className="text-xs px-3 py-1 rounded-full bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]">
                {roleText}
              </span>
            )}
            {project.period && (
              <span className="text-xs px-3 py-1 rounded-full bg-[rgb(var(--border)/0.4)] text-foreground-muted">
                {project.period}
              </span>
            )}
            {statusText && (
              <span className="text-xs px-3 py-1 rounded-full bg-[rgb(34,197,94,0.1)] text-[rgb(34,197,94)]">
                {statusText}
              </span>
            )}
          </div>

          {/* Problem / Solution / Outcome */}
          {(problemText || solutionText || outcomeText) && (
            <div className="flex flex-col gap-3 mb-5">
              {problemText && (
                <div className="bg-[rgb(var(--border)/0.2)] rounded-xl p-3.5">
                  <p className="text-xs font-medium text-red-500 mb-1">
                    {lang === 'ar' ? 'التحدي' : lang === 'ru' ? 'Проблема' : 'The Challenge'}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{problemText}</p>
                </div>
              )}
              {solutionText && (
                <div className="bg-[rgb(var(--border)/0.2)] rounded-xl p-3.5">
                  <p className="text-xs font-medium text-green-500 mb-1">
                    {lang === 'ar' ? 'الحل' : lang === 'ru' ? 'Решение' : 'The Solution'}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{solutionText}</p>
                </div>
              )}
              {outcomeText && (
                <div className="bg-[rgb(var(--border)/0.2)] rounded-xl p-3.5">
                  <p className="text-xs font-medium text-[rgb(var(--accent))] mb-1">
                    {lang === 'ar' ? 'النتيجة' : lang === 'ru' ? 'Результат' : 'The Outcome'}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{outcomeText}</p>
                </div>
              )}
            </div>
          )}

          {/* Highlights / Features list */}
          {highlightsList.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-medium text-foreground mb-2">
                {lang === 'ar' ? 'أبرز النقاط' : lang === 'ru' ? 'Ключевые моменты' : 'Highlights'}
              </p>
              <ul className="list-disc list-inside space-y-1.5">
                {highlightsList.map((item, i) => (
                  <li key={i} className="text-sm text-foreground-muted leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {techs.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
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

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-[rgb(var(--accent))] hover:underline"
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
    </div>
  );
}