export default function PopBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="pop-blob"
        style={{
          width: 480, height: 480, top: -160, left: -120,
          background: 'var(--pop-pink)', animation: 'pop-float-1 24s ease-in-out infinite',
        }}
      />
      <div
        className="pop-blob"
        style={{
          width: 520, height: 520, top: '30%', right: -180,
          background: 'var(--pop-teal)', animation: 'pop-float-2 28s ease-in-out infinite',
        }}
      />
      <div
        className="pop-blob"
        style={{
          width: 420, height: 420, bottom: -160, left: '20%',
          background: 'var(--pop-yellow)', animation: 'pop-float-1 32s ease-in-out infinite',
        }}
      />
    </div>
  );
}
