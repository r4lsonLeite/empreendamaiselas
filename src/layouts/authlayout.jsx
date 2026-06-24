import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import logoIcon from '../assets/logo-icon.png';
import heroImage from '../assets/hero.jpg';

export default function AuthLayout({ children, imageAlt, quote, subtitle }) {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md">
      <main className="flex-grow flex flex-col md:flex-row min-h-screen">
        {/* Lado da Imagem (Escondido no Mobile) */}
        <div className="hidden md:flex flex-1 relative bg-surface-container-highest overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            role="img"
            aria-label={imageAlt}
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/40 to-transparent"></div>

          <div className="relative z-10 flex flex-col p-container-padding-desktop w-full">
            <Link to="/" className="flex items-center gap-3 mb-stack-md">
              <img src={logoIcon} alt="" className="h-12 w-12" />
              <span className="font-headline-md text-xl font-extrabold uppercase leading-tight text-on-surface">
                Empreenda<br />Mais Elas
              </span>
            </Link>

            <blockquote className="font-headline-xl text-4xl font-extrabold uppercase leading-tight mb-stack-sm text-on-surface">
              {quote}
            </blockquote>
            <p className="font-body-lg text-lg text-on-surface-variant">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Lado do Formulário (Dinâmico) */}
        <div className="flex-1 flex flex-col justify-center px-container-padding-mobile py-stack-lg md:px-container-padding-desktop bg-surface-container-lowest">
          <div className="w-full max-w-md mx-auto">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
