export default function SectionHeader({ number, title, subtitle }) {
  return (
    <div className="mb-10">
      {number && (
        <div className="text-xs font-mono text-[rgb(var(--accent))] mb-2">
          {number}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-foreground-muted max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}