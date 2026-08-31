import { useEffect, useRef } from 'react';
import { Mail, Phone, Link as LinkIcon, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n.jsx';
import { personalInfo as pInfo } from '@/lib/portfolioData';
import SectionHeader from './SectionHeader';

export default function Contact() {
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

  // رقم الهاتف بدون رموز أو مسافات، لازم يكون بصيغة دولية للواتساب (بدون +)
  const whatsappNumber = pInfo.phone.replace(/[^\d]/g, '');
  const whatsappHref = `https://wa.me/${whatsappNumber}`;

  // رابط يفتح Gmail بالمتصفح مباشرة برسالة جاهزة بدل الاعتماد على برنامج بريد مثبت
  const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${pInfo.email}`;

  const contactItems = [
    {
      key: 'email',
      labelEn: 'Email',
      labelAr: 'البريد الإلكتروني',
      labelRu: 'Email',
      value: pInfo.email,
      href: gmailComposeHref,
      icon: Mail,
      external: true,
    },
    {
      key: 'phone',
      labelEn: 'WhatsApp',
      labelAr: 'واتساب',
      labelRu: 'WhatsApp',
      value: pInfo.phone,
      href: whatsappHref,
      icon: Phone,
      external: true,
    },
    {
      key: 'linkedin',
      labelEn: 'LinkedIn',
      labelAr: 'لينكدإن',
      labelRu: 'LinkedIn',
      value: pInfo.linkedin.replace(/^https?:\/\//, ''),
      href: pInfo.linkedin,
      icon: LinkIcon,
      external: true,
    },
  ];

  return (
    <section id="contact" className="bg-surface" aria-labelledby="contact-heading">
      <div className="section-pad">
        <SectionHeader
          number="05"
          title={lang === 'ar' ? 'تواصل معي' : lang === 'ru' ? 'Связаться' : 'Contact'}
          subtitle={lang === 'ar' ? 'يسعدني التواصل بخصوص فرص جديدة' : lang === 'ru' ? 'Буду рад обсудить новые возможности' : "I'd love to hear about new opportunities"}
        />

        <div ref={ref} className="reveal">
          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="group relative p-5 rounded-2xl bg-surface-elevated border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.5)] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 text-center"
                >
                  {item.external && (
                    <ArrowUpRight
                      size={14}
                      className="absolute top-4 right-4 text-foreground-muted group-hover:text-[rgb(var(--accent))] transition-colors"
                      aria-hidden="true"
                    />
                  )}
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] group-hover:bg-[rgb(var(--accent)/0.15)] transition-colors">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div className="text-xs text-foreground-muted mb-1 uppercase tracking-wide">
                    {lang === 'ar' ? item.labelAr : lang === 'ru' ? item.labelRu : item.labelEn}
                  </div>
                  <div className="text-sm font-medium text-foreground break-words">{item.value}</div>
                </a>
              );
            })}
          </div>

          {/* CV note */}
          <div className="mt-6 p-5 rounded-2xl border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.04)] text-center">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {lang === 'ar'
                ? 'بحال بدك سيرة ذاتية مخصصة لوظيفة أو منحة معينة، تواصل معي وبجهزلك وحدة مخصصة تناسب المتطلبات.'
                : lang === 'ru'
                ? 'Нужно резюме, адаптированное под конкретную вакансию или стипендию? Свяжитесь со мной, и я подготовлю его специально под требования.'
                : "Need a CV tailored to a specific job or scholarship? Reach out and I'll prepare one that fits the exact requirements."}
            </p>
          </div>

          {/* Location line */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-foreground-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
            {lang === 'ar'
              ? `${pInfo.locationAr} — متاح للعمل عن بُعد`
              : lang === 'ru'
              ? `${pInfo.locationRu} — открыт к удалённой работе`
              : `${pInfo.locationEn} — open to remote work`}
          </div>
        </div>
      </div>
    </section>
  );
}
