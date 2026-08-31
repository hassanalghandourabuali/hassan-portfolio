import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { skillGroups } from '@/lib/portfolioData';
import {
  Smartphone, Code2, Palette, Layers,
  Briefcase, Wrench, Users,
  Users2, HeartHandshake, Megaphone, Share2, ShoppingCart, TrendingUp,
  FileSpreadsheet, Mail, Image as ImageIcon, Database,
  MessageCircle, Lightbulb, UsersRound,
} from 'lucide-react';
import SectionHeader from './SectionHeader';

// Each group gets its own accent color (as an "R G B" triplet so it plugs into
// the same rgb(var(--x)/opacity) pattern already used for --accent/--border).
// This is what actually separates the four categories at a glance instead of
// everything sharing one blue.
const GROUP_META = {
  primary: { icon: Code2, color: '59 130 246' },   // blue — matches existing --accent
  business: { icon: Briefcase, color: '13 148 136' }, // teal
  tools: { icon: Wrench, color: '124 58 237' },     // violet
  soft: { icon: Users, color: '180 83 9' },         // amber (darkened for contrast)
};

// Best-effort icon per individual skill, matched by keyword in the English name.
const SKILL_ICON_RULES = [
  [/flutter/i, Smartphone],
  [/dart/i, Code2],
  [/mobile app/i, Smartphone],
  [/ui\/ux/i, Palette],
  [/crm|relationship/i, Users2],
  [/experience \(cx\)/i, HeartHandshake],
  [/digital marketing/i, Megaphone],
  [/social media/i, Share2],
  [/e-commerce|e-business/i, ShoppingCart],
  [/sales/i, TrendingUp],
  [/excel|office/i, FileSpreadsheet],
  [/google workspace/i, Mail],
  [/canva/i, ImageIcon],
  [/data entry/i, Database],
  [/communication/i, MessageCircle],
  [/problem-solving/i, Lightbulb],
  [/team collaboration/i, UsersRound],
];

function iconFor(nameEn) {
  const match = SKILL_ICON_RULES.find(([re]) => re.test(nameEn));
  return match ? match[1] : Layers;
}

export default function Skills() {
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
    <section id="skills" className="bg-surface" aria-labelledby="skills-heading">
      <div className="section-pad">
        <SectionHeader
          number="03"
          title={lang === 'ar' ? 'المهارات' : lang === 'ru' ? 'Навыки' : 'Skills'}
          subtitle={lang === 'ar' ? 'الأدوات والتقنيات التي أستخدمها' : lang === 'ru' ? 'Инструменты и технологии' : 'Tools and technologies I use'}
        />

        <div ref={ref} className="reveal space-y-9">
          {skillGroups.map((group) => {
            const meta = GROUP_META[group.id] || GROUP_META.primary;
            const GroupIcon = meta.icon;
            const cat = meta.color;
            const label = lang === 'ar' ? group.labelAr : lang === 'ru' ? group.labelRu : group.labelEn;
            const isPrimary = group.level === 'primary';

            return (
              <div key={group.id} style={{ '--cat': cat }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <GroupIcon size={15} className="text-[rgb(var(--cat))]" aria-hidden="true" />
                  <h3 className="text-[13px] font-medium text-foreground-muted tracking-wide">
                    {label}
                  </h3>
                  <div className="flex-1 h-px bg-[rgb(var(--border))]" aria-hidden="true" />
                </div>

                {isPrimary ? (
                  // Featured treatment: larger cards, icon badge, top accent bar
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {group.skills.map((skill, i) => {
                      const SkillIcon = iconFor(skill.nameEn);
                      const name = lang === 'ar' ? skill.nameAr : lang === 'ru' ? skill.nameRu : skill.nameEn;
                      return (
                        <div
                          key={i}
                          className="relative overflow-hidden p-5 rounded-2xl bg-surface-elevated border border-[rgb(var(--border))] hover:border-[rgb(var(--cat)/0.6)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-[rgb(var(--cat))] to-[rgb(var(--cat)/0.2)]" aria-hidden="true" />
                          <div className="flex items-start gap-3">
                            <div className="w-11 h-11 rounded-xl bg-[rgb(var(--cat)/0.12)] flex items-center justify-center flex-shrink-0">
                              <SkillIcon size={20} className="text-[rgb(var(--cat))]" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-base font-semibold text-foreground mb-1">{name}</div>
                              {skill.evidence && (
                                <div className="text-xs text-foreground-muted leading-relaxed">{skill.evidence}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Compact treatment: pill chips, evidence revealed on hover
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill, i) => {
                      const SkillIcon = iconFor(skill.nameEn);
                      const name = lang === 'ar' ? skill.nameAr : lang === 'ru' ? skill.nameRu : skill.nameEn;
                      return (
                        <div
                          key={i}
                          className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-elevated border border-[rgb(var(--border))] hover:border-[rgb(var(--cat)/0.5)] hover:bg-[rgb(var(--cat)/0.08)] hover:-translate-y-0.5 transition-all cursor-default"
                        >
                          <SkillIcon size={14} className="text-foreground-muted group-hover:text-[rgb(var(--cat))] transition-colors" aria-hidden="true" />
                          <span className="text-sm font-medium text-foreground">{name}</span>

                          {skill.evidence && (
                            <div
                              role="tooltip"
                              className="pointer-events-none absolute bottom-full start-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] px-3 py-2 rounded-lg bg-[rgb(var(--foreground))] text-[rgb(var(--background))] text-[11px] leading-snug opacity-0 group-hover:opacity-100 transition-opacity z-10 text-center"
                            >
                              {skill.evidence}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
