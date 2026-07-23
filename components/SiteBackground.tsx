export default function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="neon-orb"
        style={{
          width: 560, height: 560, top: -180, left: -120,
          background: 'var(--neon-cyan)', animation: 'neon-drift-1 26s ease-in-out infinite',
        }}
      />
      <div
        className="neon-orb"
        style={{
          width: 620, height: 620, bottom: -220, right: -160,
          background: 'var(--neon-violet)', animation: 'neon-drift-2 32s ease-in-out infinite',
        }}
      />
      <div
        className="neon-orb"
        style={{
          width: 420, height: 420, top: '40%', left: '50%',
          background: 'var(--neon-magenta)', animation: 'neon-drift-1 38s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--neon-ink) 1px, transparent 1px), linear-gradient(to bottom, var(--neon-ink) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
