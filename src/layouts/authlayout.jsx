import topnavbar from '../components/topnavbar';
import footer from '../components/footer';

export default function AuthLayout({ children, imageAlt, quote, subtitle }) {
  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex flex-col font-body-md">
      <TopNavBar />
      
      <main className="flex-grow flex flex-col md:flex-row pt-[72px] md:pt-[88px] min-h-screen">
        {/* Lado da Imagem (Escondido no Mobile) */}
        <div className="hidden md:flex flex-1 relative bg-surface-container-highest">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            title={imageAlt}
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtDoB4LL5LPBQqJxmZhLzgE7MCCIvZ3bKvoDF-ZcyiqwM_MqatUnnxJw4_V4ETDl9fL0w6pe6V9SqWWjpAFgy7MHE_1oQukyDS8uwQuPqRN4cJzS6Cc-XiH0OvsF9N0_XgcLVelIhtSTqbBFGYeKA39urY4xEqZUDI3Uda-AYZ66Y2s-S4Sb_oVZIhDAP1ibdeQxkCgnLsk79wV-Qkh71xpvaWudTRLdSqV9HYpS6Lb1LmqGWLRZ6V3mrqqTBWefgMYqDALfv8wENN")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#191c1d]/80 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col justify-end p-container-padding-desktop w-full text-white">
            <blockquote className="font-headline-xl text-headline-xl mb-stack-sm">
              {quote}
            </blockquote>
            <p className="font-body-lg text-body-lg text-white/90">
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