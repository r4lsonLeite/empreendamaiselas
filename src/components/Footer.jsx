export default function Footer() {
  return (
    <footer className="w-full py-stack-lg px-container-padding-mobile md:px-container-padding-desktop flex flex-col md:flex-row justify-between items-center gap-stack-md bg-surface-container-lowest border-t border-outline-variant/30 mt-auto">
      <div className="font-headline-md font-bold text-xl text-primary">Empreenda Mais Elas</div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a className="font-label-sm text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Sobre nós</a>
        <a className="font-label-sm text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacidade</a>
        <a className="font-label-sm text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Termos</a>
      </div>
      <div className="font-body-md text-sm text-secondary opacity-80 hover:opacity-100 transition-opacity text-center md:text-right">
        © 2026 Empreenda Mais Elas.
      </div>
    </footer>
  );
}
