import { useEffect, useRef } from 'react';
import { Mail, Phone, Link as LinkIcon, ArrowUpRight, Download } from 'lucide-react';
import { useLanguage } from '@/lib/i18n.jsx';
import { personalInfo as pInfo } from '@/lib/portfolioData';
import SectionHeader from './SectionHeader';

// GitHub logo brand icons were removed from lucide-react in its 1.0 release,
// so we render the mark as a plain inline SVG instead of importing it.
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

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

  const whatsappNumber = pInfo.phone.replace(/[^\d]/g, '');
  const whatsappHref = `https://wa.me/${whatsappNumber}`;
  const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${pInfo.email}`;

  const contactItems = [
    {
      key: 'linkedin',
      labelEn: 'LinkedIn',
      labelAr: 'لينكدإن',
      labelRu: 'LinkedIn',
      value: pInfo.linkedin.replace(/^https?:\/\//, ''),
      href: pInfo.linkedin,
      icon: LinkIcon,
      colorVar: '--color-blue',
    },
    {
      key: 'github',
      labelEn: 'GitHub',
      labelAr: 'GitHub',
      labelRu: 'GitHub',
      value: pInfo.github.replace(/^https?:\/\//, ''),
      href: pInfo.github,
      icon: GithubIcon,
      colorVar: '--color-purple',
    },
    {
      key: 'email',
      labelEn: 'Email',
      labelAr: 'البريد الإلكتروني',
      labelRu: 'Email',
      value: pInfo.email,
      href: gmailComposeHref,
      icon: Mail,
      colorVar: '--color-orange',
    },
    {
      key: 'phone',
      labelEn: 'WhatsApp',
      labelAr: 'واتساب',
      labelRu: 'WhatsApp',
      value: pInfo.phone,
      href: whatsappHref,
      icon: Phone,
      colorVar: '--color-green',
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-5 rounded-2xl bg-surface-elevated border border-[rgb(var(--border))] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 text-center"
                >
                  <ArrowUpRight
                    size={14}
                    className="absolute top-4 right-4 text-foreground-muted transition-colors"
                    aria-hidden="true"
                  />
                  <div
                    className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    style={{
                      backgroundColor: `rgb(var(${item.colorVar}) / 0.1)`,
                      color: `rgb(var(${item.colorVar}))`,
                    }}
                  >
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

          <div className="mt-6 p-5 rounded-2xl border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.04)] text-center">
            <p className="text-sm text-foreground-muted leading-relaxed mb-4">
              {lang === 'ar'
                ? 'حمّل سيرتي الذاتية العامة مباشرة، أو تواصل معي إذا بدك نسخة مخصصة لوظيفة أو منحة معينة.'
                : lang === 'ru'
                ? 'Скачайте моё общее резюме напрямую, или свяжитесь со мной, если нужна версия, адаптированная под конкретную вакансию или стипендию.'
                : "Download my general CV directly, or reach out if you'd like a version tailored to a specific job or scholarship."}
            </p>
            <a
              href="/cv/Hassan-Alghandour-CV.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(var(--accent))] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Download size={16} aria-hidden="true" />
              {lang === 'ar' ? 'تحميل السيرة الذاتية' : lang === 'ru' ? 'Скачать резюме' : 'Download CV'}
            </a>
          </div>

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
