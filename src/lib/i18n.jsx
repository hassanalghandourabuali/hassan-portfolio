// ============================================================
// Localization context — AR / EN / RU
// ============================================================
import { createContext, useContext, useState, useEffect } from 'react';

export const languages = [
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'ru', label: 'RU', dir: 'ltr' },
];

export const LanguageContext = createContext({
  lang: 'en',
  dir: 'ltr',
  setLang: () => {},
  t: (obj) => obj?.en || '',
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('portfolio_lang') || 'en'; } catch { return 'en'; }
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = (code) => {
    setLangState(code);
    try { localStorage.setItem('portfolio_lang', code); } catch {}
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
  }, [lang, dir]);

  const t = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export const ui = {
  viewWork: { en: "View My Work", ar: "استعرض أعمالي", ru: "Смотреть работы" },
  downloadCV: { en: "Download CV", ar: "تحميل السيرة الذاتية", ru: "Скачать резюме" },
  contactMe: { en: "Contact Me", ar: "تواصل معي", ru: "Связаться" },
  exploreMunjiz: { en: "Explore MUNJIZ", ar: "استعرض مُنجز", ru: "Изучить MUNJIZ" },
  learnMore: { en: "Learn More", ar: "اعرف أكثر", ru: "Подробнее" },
  viewOnGithub: { en: "View on GitHub", ar: "عرض على GitHub", ru: "На GitHub" },
  about: { en: "About", ar: "عني", ru: "Обо мне" },
  aboutTitle: { en: "About Me", ar: "من أنا", ru: "Обо мне" },
  projects: { en: "Projects", ar: "المشاريع", ru: "Проекты" },
  featuredProjects: { en: "Featured Projects", ar: "المشاريع المميزة", ru: "Избранные проекты" },
  experience: { en: "Experience", ar: "الخبرة المهنية", ru: "Опыт работы" },
  skills: { en: "Skills", ar: "المهارات", ru: "Навыки" },
  education: { en: "Education", ar: "التعليم", ru: "Образование" },
  certifications: { en: "Certificates & Training", ar: "الشهادات والتدريب", ru: "Сертификаты и обучение" },
  contact: { en: "Get In Touch", ar: "تواصل معي", ru: "Связаться" },
  role: { en: "Role", ar: "الدور", ru: "Роль" },
  type: { en: "Type", ar: "النوع", ru: "Тип" },
  status: { en: "Status", ar: "الحالة", ru: "Статус" },
  technologies: { en: "Technologies", ar: "التقنيات", ru: "Технологии" },
  problem: { en: "The Problem", ar: "المشكلة", ru: "Проблема" },
  solution: { en: "The Solution", ar: "الحل", ru: "Решение" },
  targetUsers: { en: "Target Users", ar: "المستخدمون المستهدفون", ru: "Целевые пользователи" },
  coreFeatures: { en: "Core Features", ar: "الميزات الأساسية", ru: "Основные функции" },
  myRole: { en: "My Role", ar: "دوري", ru: "Моя роль" },
  developmentProcess: { en: "Development Process", ar: "مسيرة التطوير", ru: "Процесс разработки" },
  futureImprovements: { en: "Future Improvements", ar: "التطوير المستقبلي", ru: "Будущие улучшения" },
  whatMakesItUnique: { en: "What Makes It Unique", ar: "ما الذي يميّزه", ru: "Что делает его уникальным" },
  independentProduct: { en: "Independent Product", ar: "منتج مستقل", ru: "Независимый продукт" },
  teamProject: { en: "Team-Based Academic Project", ar: "مشروع أكاديمي جماعي", ru: "Командный академический проект" },
  inDevelopment: { en: "In Development", ar: "قيد التطوير", ru: "В разработке" },
  completed: { en: "Completed", ar: "مكتمل", ru: "Завершён" },
  keyFocus: { en: "Key Focus Areas", ar: "المحاور الأساسية", ru: "Ключевые направления" },
  responsibilities: { en: "Key Responsibilities", ar: "المسؤوليات الرئيسية", ru: "Основные обязанности" },
  languages: { en: "Languages", ar: "اللغات", ru: "Языки" },
  backToTop: { en: "Back to Top", ar: "العودة للأعلى", ru: "Наверх" },
  featuredProject: { en: "Featured Project", ar: "المشروع المميز", ru: "Избранный проект" },
  allRightsReserved: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة.", ru: "Все права защищены." },
  buildPillar: { en: "Build", ar: "أبني", ru: "Строю" },
  buildDesc: { en: "Flutter & Mobile Development", ar: "Flutter وتطوير الموبايل", ru: "Flutter и мобильная разработка" },
  thinkPillar: { en: "Think", ar: "أفكّر", ru: "Думаю" },
  thinkDesc: { en: "Product & Business Thinking", ar: "تفكير المنتج والأعمال", ru: "Продуктовое и бизнес-мышление" },
  understandPillar: { en: "Understand", ar: "أفهم", ru: "Понимаю" },
  understandDesc: { en: "Customer & Digital Experience", ar: "تجربة العملاء والرقمية", ru: "Клиентский и цифровой опыт" },
  scrollDown: { en: "Scroll to explore", ar: "مرّر للاستكشاف", ru: "Прокрутите для изучения" },
  openToOpportunities: { en: "Open to opportunities in Mobile Development, Product Development & Digital roles.", ar: "متاح للفرص في تطوير الموبايل وتطوير المنتجات والأدوار الرقمية.", ru: "Открыт для возможностей в мобильной разработке, разработке продуктов и цифровых ролях." },
  emailLabel: { en: "Email", ar: "البريد الإلكتروني", ru: "Email" },
  phoneLabel: { en: "Phone", ar: "الهاتف", ru: "Телефон" },
  locationLabel: { en: "Location", ar: "الموقع", ru: "Местоположение" },
  cvNote: { en: "For a detailed overview of my experience and qualifications, download my CV.", ar: "للاطلاع على تفاصيل خبرتي ومؤهلاتي، قم بتحميل سيرتي الذاتية.", ru: "Для детального обзора моего опыта и квалификаций скачайте моё резюме." },
  projectHighlights: { en: "Project Highlights", ar: "أبرز جوانب المشروع", ru: "Особенности проекта" },
  swotStrengths: { en: "Strengths", ar: "نقاط القوة", ru: "Сильные стороны" },
  swotWeaknesses: { en: "Limitations (V1)", ar: "القيود (النسخة الأولى)", ru: "Ограничения (V1)" },
  swotOpportunities: { en: "Future Opportunities", ar: "الفرص المستقبلية", ru: "Будущие возможности" },
};