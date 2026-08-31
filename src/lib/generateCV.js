import { jsPDF } from 'jspdf';
import {
  personalInfo,
  experiences,
  education,
  skillGroups,
  certifications,
  languages,
  summaryEn,
  summaryAr,
  summaryRu,
} from './portfolioData';

export function generateCV(lang = 'en') {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = margin;

  const isAr = lang === 'ar';
  const isRu = lang === 'ru';

  const name = isAr ? personalInfo.nameAr : isRu ? personalInfo.nameRu : personalInfo.nameEn;
  const title = isAr ? personalInfo.titleAr : isRu ? personalInfo.titleRu : personalInfo.titleEn;
  const location = isAr ? personalInfo.locationAr : isRu ? personalInfo.locationRu : personalInfo.locationEn;
  const summary = isAr ? summaryAr : isRu ? summaryRu : summaryEn;

  const tr = (en, ar, ru) => (isAr ? ar : isRu ? ru : en);

  // ── Header ──
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(20, 20, 20);
  doc.text(name, margin, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(title, margin, y);
  y += 6;

  // Contact line
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  const contactLine = `${personalInfo.email}  |  ${personalInfo.phone}  |  ${location}`;
  doc.text(contactLine, margin, y);
  y += 3;
  doc.text(`LinkedIn: ${personalInfo.linkedin}  |  GitHub: ${personalInfo.github}`, margin, y);
  y += 5;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  // ── Summary ──
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('Profile Summary', 'الملف الشخصي', 'Профиль'), margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(70, 70, 70);
  const summaryLines = doc.splitTextToSize(summary, contentW);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.5 + 4;

  // ── Experience ──
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('Professional Experience', 'الخبرة المهنية', 'Опыт работы'), margin, y);
  y += 5;

  experiences.forEach((exp) => {
    if (y > pageH - 30) { doc.addPage(); y = margin; }

    const expRole = isAr ? exp.roleAr : isRu ? exp.roleRu : exp.roleEn;
    const expOrg = isAr ? exp.orgAr : isRu ? exp.orgRu : exp.orgEn;
    const expLoc = isAr ? exp.locationAr : isRu ? exp.locationRu : exp.locationEn;
    const expResps = isAr ? exp.responsibilitiesAr : isRu ? exp.responsibilitiesRu : exp.responsibilitiesEn;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text(`${expRole} — ${expOrg}`, margin, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(120, 120, 120);
    doc.text(`${expLoc}  |  ${exp.period}`, margin, y);
    y += 4;

    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    expResps.forEach((resp) => {
      if (y > pageH - 20) { doc.addPage(); y = margin; }
      const lines = doc.splitTextToSize(`•  ${resp}`, contentW - 3);
      doc.text(lines, margin + 3, y);
      y += lines.length * 4 + 1;
    });
    y += 3;
  });

  // ── Education ──
  if (y > pageH - 30) { doc.addPage(); y = margin; }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('Education', 'التعليم', 'Образование'), margin, y);
  y += 5;

  education.forEach((edu) => {
    const degree = isAr ? edu.degreeAr : isRu ? edu.degreeRu : edu.degreeEn;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text(degree, margin, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(120, 120, 120);
    doc.text(`${edu.institutionEn}  |  ${edu.period}`, margin, y);
    y += 6;
  });

  // ── Skills ──
  if (y > pageH - 40) { doc.addPage(); y = margin; }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('Skills', 'المهارات', 'Навыки'), margin, y);
  y += 5;

  skillGroups.forEach((group) => {
    if (y > pageH - 20) { doc.addPage(); y = margin; }
    const groupLabel = isAr ? group.labelAr : isRu ? group.labelRu : group.labelEn;
    const skillNames = group.skills.map((s) => (isAr ? s.nameAr : isRu ? s.nameRu : s.nameEn)).join('  ·  ');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text(groupLabel, margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(70, 70, 70);
    const skillLines = doc.splitTextToSize(skillNames, contentW);
    doc.text(skillLines, margin, y);
    y += skillLines.length * 4 + 2;
  });

  // ── Certifications ──
  if (y > pageH - 30) { doc.addPage(); y = margin; }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('Certifications & Training', 'الشهادات والتدريب', 'Сертификаты'), margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  certifications.forEach((cert) => {
    if (y > pageH - 15) { doc.addPage(); y = margin; }
    const certName = isAr ? cert.nameAr : isRu ? cert.nameRu : cert.nameEn;
    const issuer = isAr ? cert.issuerAr : isRu ? cert.issuerRu : cert.issuerEn;
    doc.text(`•  ${certName} — ${issuer} (${cert.date})`, margin, y);
    y += 4.5;
  });

  // ── Languages ──
  y += 2;
  if (y > pageH - 20) { doc.addPage(); y = margin; }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('Languages', 'اللغات', 'Языки'), margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  languages.forEach((l) => {
    const lName = isAr ? l.nameAr : isRu ? l.nameRu : l.nameEn;
    const lLevel = isAr ? l.levelAr : isRu ? l.levelRu : l.levelEn;
    doc.text(`•  ${lName}: ${lLevel}`, margin, y);
    y += 4.5;
  });

  doc.save('Hassan_Alghandour_CV.pdf');
}