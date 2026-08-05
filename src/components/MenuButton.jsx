export default function MenuButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Abrir menu"
      className="md:hidden -ml-1 p-2 rounded text-on-surface-variant hover:text-primary"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}
