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
    en: `Electronic Business Management graduate with a clear focus on mobile application development using Flutter. I combine practical business experience in customer service, CRM, and digital marketing with the technical ability to plan and build real digital products.\n\nMy background gives me an understanding of problems from both the user and business perspective — which I apply when designing and developing mobile solutions. MUNJIZ is the clearest example: a product I conceived, planned, and am independently developing using Flutter to solve a real problem I observed firsthand.\n\nI am looking for opportunities in mobile development, product development, and digital roles where I can apply both my technical and business strengths.`,
    ar: `خريج إدارة الأعمال الإلكترونية بتركيز واضح على تطوير تطبيقات الموبايل باستخدام Flutter. أجمع بين الخبرة العملية في الأعمال — خدمة العملاء وCRM والتسويق الرقمي — والقدرة التقنية على تخطيط وبناء منتجات رقمية حقيقية.\n\nخلفيتي تمنحني فهماً للمشكلات من منظور المستخدم والأعمال معاً — وهذا ما أطبّقه عند تصميم وتطوير الحلول الرقمية. مُنجز هو أوضح مثال على ذلك: منتج فكّرت فيه وخططت له وأطوّره بشكل مستقل باستخدام Flutter لحل مشكلة حقيقية لاحظتها بنفسي.\n\nأبحث عن فرص في تطوير الموبايل وتطوير المنتجات والأدوار الرقمية حيث أستطيع تطبيق نقاط قوتي التقنية والتجارية.`,
    ru: `Выпускник по управлению электронным бизнесом с чётким фокусом на разработке мобильных приложений с использованием Flutter. Я сочетаю практический бизнес-опыт в обслуживании клиентов, CRM и цифровом маркетинге с техническими навыками планирования и создания реальных цифровых продуктов.\n\nМоя база даёт мне понимание проблем как с точки зрения пользователя, так и бизнеса — что я применяю при проектировании и разработке мобильных решений. MUNJIZ — самый наглядный пример: продукт, который я придумал, спланировал и самостоятельно разрабатываю с использованием Flutter.\n\nИщу возможности в мобильной разработке, разработке продуктов и цифровых ролях.`,
  };

  const paragraphs = (summary[lang] || summary.en).split('\n\n');

  return (
    <section id="about" className="bg-surface" aria-labelledby="about-heading">
      <div className="section-pad">
        <div ref={ref} className="reveal grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <SectionHeader
              number="01"
              title={lang === 'ar' ? 'من أنا' : lang === 'ru' ? 'Обо мне' : 'About Me'}
              subtitle={lang === 'ar' ? 'مطوّر بتفكير أعمال — أفهم المشكلة قبل أن أبني الحل' : lang === 'ru' ? 'Разработчик с бизнес-мышлением — понимаю проблему прежде чем строить решение' : 'A developer with business thinking — I understand the problem before building the solution'}
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
                  <div className="text-xs text-foreground-muted mb-1">{lang === 'ar' ? 'التخصص' : lang === 'ru' ? 'Специализация' : 'Focus'}</div>
                  <div className="text-sm text-foreground font-medium">Flutter & Mobile Development</div>
                </div>
                <div>
                  <div className="text-xs text-foreground-muted mb-1">{lang === 'ar' ? 'الخلفية' : lang === 'ru' ? 'База' : 'Background'}</div>
                  <div className="text-sm text-foreground font-medium">{lang === 'ar' ? 'إدارة الأعمال الإلكترونية' : 'E-Business Administration'}</div>
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
              <div className="space-y-5">
                {langData.map((l) => (
                  <div key={l.nameEn}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-foreground font-medium">
                        {lang === 'ar' ? l.nameAr : lang === 'ru' ? l.nameRu : l.nameEn}
                      </span>
                    </div>
                    <div className="text-xs text-foreground-muted">
                      {lang === 'ar' ? l.levelAr : lang === 'ru' ? l.levelRu : l.levelEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-7 rounded-2xl border border-[rgb(var(--accent)/0.3)] bg-[rgb(var(--accent)/0.04)] flex items-center">
              <blockquote className="text-sm text-foreground-muted leading-relaxed italic">
                {lang === 'ar'
                  ? '"لا أتعلم التقنيات فقط. أستخدمها لبناء حلول حقيقية."'
                  : lang === 'ru'
                  ? '"Я не просто учу технологии. Я использую их для создания реальных решений."'
                  : '"I don\'t just learn technologies. I use them to build real solutions."'}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
