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

const GROUP_META = {
  primary: { icon: Code2, color: '59 130 246' },
  business: { icon: Briefcase, color: '13 148 136' },
  tools: { icon: Wrench, color: '124 58 237' },
  soft: { icon: Users, color: '180 83 9' },
};

const SKILL_ICON_RULES = [
  [/flutter/i, Smartphone],
  [/dart/i, Code2],
  [/mobile app/i, Smartphone],
  [/ui\/ux/i, Palette],
  [/social media/i, Share2],
  [/e-business|e-commerce/i, ShoppingCart],
  [/marketing/i, Megaphone],
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

            return (
              <div key={group.id} style={{ '--cat': cat }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <GroupIcon size={15} className="text-[rgb(var(--cat))]" aria-hidden="true" />
                  <h3 className="text-[13px] font-medium text-foreground-muted tracking-wide">
                    {label}
                  </h3>
                  <div className="flex-1 h-px bg-[rgb(var(--border))]" aria-hidden="true" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {group.skills.map((skill, i) => {
                    const SkillIcon = iconFor(skill.nameEn);
                    const name = lang === 'ar' ? skill.nameAr : lang === 'ru' ? skill.nameRu : skill.nameEn;
                    const evidence = lang === 'ar' ? skill.evidenceAr : lang === 'ru' ? skill.evidenceRu : skill.evidenceEn;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-elevated border border-[rgb(var(--border))] hover:border-[rgb(var(--cat)/0.5)] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[rgb(var(--cat)/0.12)] flex items-center justify-center flex-shrink-0">
                          <SkillIcon size={14} className="text-[rgb(var(--cat))]" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-foreground truncate">{name}</div>
                          {evidence && (
                            <div className="text-xs text-foreground-muted truncate">{evidence}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}