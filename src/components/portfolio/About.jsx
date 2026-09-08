import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { personalInfo as pInfo, languages as langData } from '@/lib/portfolioData';
import SectionHeader from './SectionHeader';

export default function About() {
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

  const summary = {
    en: `Mobile app developer specialized in Flutter, with an academic background in Electronic Business Management.\n\nI combine the technical side — building Flutter apps from idea to execution — with hands-on experience managing social media pages, gained through freelance work. This combination gives me two angles on a product: the code, and how it actually reaches users and the market.\n\nMUNJIZ is the clearest example: an idea I researched, planned, and am independently developing with Flutter to solve a real problem I observed firsthand.`,
    ar: `مطوّر تطبيقات موبايل متخصص بـ Flutter، بخلفية أكاديمية في إدارة الأعمال الإلكترونية.\n\nأجمع بين الجانب التقني — بناء تطبيقات Flutter من الفكرة للتنفيذ — وخبرة عملية بإدارة صفحات السوشيال ميديا، اكتسبتها من خلال أدوار حرة. هاد الجمع بيخليني أفهم المنتج من زاويتين: الكود، وكيف بوصل فعليًا للمستخدم والسوق.\n\nمُنجز هو أوضح مثال: فكرة درستها، خططتلها، وطورتها بشكل مستقل باستخدام Flutter لحل مشكلة حقيقية لاحظتها بنفسي.`,
    ru: `Разработчик мобильных приложений, специализирующийся на Flutter, с академической базой в управлении электронным бизнесом.\n\nЯ сочетаю техническую сторону — создание приложений на Flutter от идеи до реализации — с практическим опытом управления страницами в социальных сетях, полученным на фриланс-проектах. Это сочетание даёт мне два ракурса на продукт: код и то, как он реально доходит до пользователей и рынка.\n\nMUNJIZ — самый наглядный пример: идея, которую я изучил, спланировал и самостоятельно разрабатываю на Flutter для решения реальной проблемы, замеченной мной лично.`,
  };

  const paragraphs = (summary[lang] || summary.en).split('\n\n');

  const experienceLabel = lang === 'ar'
    ? '٣ سنوات'
    : lang === 'ru'
    ? '3 года'
    : '3 Years';

  const availabilityLabel = lang === 'ar'
    ? 'متاح للعمل'
    : lang === 'ru'
    ? 'Открыт к работе'
    : 'Open to Work';

  return (
    <section id="about" className="bg-surface" aria-labelledby="about-heading">
      <div className="section-pad">
        <div ref={ref} className="reveal grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <SectionHeader
              number="01"
              title={lang === 'ar' ? 'من أنا' : lang === 'ru' ? 'Обо мне' : 'About Me'}
              subtitle={lang === 'ar' ? 'مطوّر تطبيقات موبايل بتقنية Flutter — بخلفية إدارة أعمال إلكترونية وخبرة سوشيال ميديا' : lang === 'ru' ? 'Разработчик мобильных приложений на Flutter — с опытом в управлении электронным бизнесом и SMM' : 'A Flutter mobile app developer — with a background in e-business administration and social media experience'}
            />
            <div className="space-y-6">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-foreground-muted leading-loose text-lg">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="p-7 rounded-2xl bg-surface-elevated border border-[rgb(var(--border))]">
              <h3 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wide">
                {lang === 'ar' ? 'معلومات سريعة' : lang === 'ru' ? 'Быстрые факты' : 'Quick Facts'}
              </h3>
              <div className="space-y-5">
                <div>
                  <div className="text-xs text-foreground-muted mb-1">
                    {lang === 'ar' ? 'الخبرة' : lang === 'ru' ? 'Опыт' : 'Experience'}
                  </div>
                  <div className="text-sm text-foreground font-medium">{experienceLabel}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground-muted mb-1">
                    {lang === 'ar' ? 'التوفر' : lang === 'ru' ? 'Доступность' : 'Availability'}
                  </div>
                  <div className="text-sm text-foreground font-medium">{availabilityLabel}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground-muted mb-1">{lang === 'ar' ? 'الموقع' : lang === 'ru' ? 'Местоположение' : 'Location'}</div>
                  <div className="text-sm text-foreground font-medium">{lang === 'ar' ? pInfo.locationAr : lang === 'ru' ? pInfo.locationRu : pInfo.locationEn}</div>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-surface-elevated border border-[rgb(var(--border))]">
              <h3 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wide">
                {lang === 'ar' ? 'اللغات' : lang === 'ru' ? 'Языки' : 'Languages'}
              </h3>
              <div className="space-y-4">
                {langData.map((l) => (
                  <div key={l.nameEn} className="flex justify-between items-center">
                    <span className="text-sm text-foreground font-medium">
                      {lang === 'ar' ? l.nameAr : lang === 'ru' ? l.nameRu : l.nameEn}
                    </span>
                    <span className="text-xs text-foreground-muted">
                      {lang === 'ar' ? l.levelAr : lang === 'ru' ? l.levelRu : l.levelEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}