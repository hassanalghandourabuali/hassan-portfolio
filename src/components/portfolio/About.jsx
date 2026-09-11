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

  // Final agreed About copy: Flutter identity -> supporting UI/UX & business background -> additional digital experience.
  const summary = {
    en: `A Flutter-focused mobile app developer, I build practical apps that start with understanding the idea and user needs, then turn them into a clear, workable digital experience.\n\nI hold an academic background in Electronic Business Management, alongside an interest in UI/UX design and understanding the relationship between user needs and product goals.\n\nI also have hands-on experience in content management, digital marketing, and working with digital platforms, experience that helps me understand the product and user from a wider perspective.`,
    ar: `مطوّر تطبيقات موبايل متخصص في Flutter، أهتم ببناء تطبيقات عملية تبدأ من فهم الفكرة واحتياجات المستخدم، ثم تحويلها إلى تجربة رقمية واضحة وقابلة للتنفيذ.\n\nأمتلك خلفية أكاديمية في إدارة الأعمال الإلكترونية، إلى جانب اهتمام بتصميم UI/UX وفهم العلاقة بين احتياجات المستخدم وأهداف المنتج.\n\nكما أمتلك خبرة عملية في إدارة المحتوى والتسويق الرقمي والتعامل مع المنصات الرقمية، وهي خبرات أستفيد منها لفهم المنتج والمستخدم من منظور أوسع.`,
    ru: `Разработчик мобильных приложений, специализирующийся на Flutter. Я создаю практичные приложения, начиная с понимания идеи и потребностей пользователя, а затем превращаю их в понятный и реализуемый цифровой продукт.\n\nУ меня академическая база в управлении электронным бизнесом, а также интерес к UI/UX-дизайну и пониманию связи между потребностями пользователей и целями продукта.\n\nТакже у меня есть практический опыт в управлении контентом, цифровом маркетинге и работе с цифровыми платформами, опыт, который помогает мне понимать продукт и пользователя шире.`,
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

  // Updated subtitle: leads with Flutter + supporting identity, no longer equal-weights social media.
  const subtitle = {
    ar: 'مطوّر تطبيقات موبايل بتقنية Flutter — بخلفية في إدارة الأعمال الإلكترونية وتصميم UI/UX',
    en: 'A Flutter mobile app developer, with a background in e-business management and UI/UX design',
    ru: 'Разработчик мобильных приложений на Flutter, с опытом в управлении электронным бизнесом и UI/UX-дизайне',
  };

  return (
    <section id="about" className="bg-surface" aria-labelledby="about-heading">
      <div className="section-pad">
        <div ref={ref} className="reveal grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <SectionHeader
              number="01"
              title={lang === 'ar' ? 'من أنا' : lang === 'ru' ? 'Обо мне' : 'About Me'}
              subtitle={subtitle[lang] || subtitle.en}
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