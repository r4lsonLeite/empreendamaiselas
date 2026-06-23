import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
   
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md">
      {/* TopNavBar */}
      <nav className="bg-surface/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop py-4 max-w-7xl mx-auto">
        <a className="font-headline-md text-2xl font-bold text-primary" href="#">Empreenda Mais Elas</a>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row pt-[72px] md:pt-[88px] min-h-screen">
        
        {/* Image Side */}
        <div className="hidden md:flex flex-1 relative bg-surface-container-highest">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtDoB4LL5LPBQqJxmZhLzgE7MCCIvZ3bKvoDF-ZcyiqwM_MqatUnnxJw4_V4ETDl9fL0w6pe6V9SqWWjpAFgy7MHE_1oQukyDS8uwQuPqRN4cJzS6Cc-XiH0OvsF9N0_XgcLVelIhtSTqbBFGYeKA39urY4xEqZUDI3Uda-AYZ66Y2s-S4Sb_oVZIhDAP1ibdeQxkCgnLsk79wV-Qkh71xpvaWudTRLdSqV9HYpS6Lb1LmqGWLRZ6V3mrqqTBWefgMYqDALfv8wENN')" }}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-end p-container-padding-desktop w-full text-surface-container-lowest">
            <blockquote className="font-headline-xl text-4xl font-bold mb-stack-sm text-white">O SUCESSO É CONSTRUÍDO JUNTAS.</blockquote>
            <p className="font-body-lg text-lg text-surface-container-low opacity-90 text-white">Junte-se à comunidade que eleva mulheres empreendedoras.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 flex flex-col justify-center px-container-padding-mobile py-stack-lg md:px-container-padding-desktop bg-surface-container-lowest">
          <div className="w-full max-w-md mx-auto">
            
            {/* Header */}
            <div className="mb-stack-lg text-center md:text-left">
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl font-bold text-on-surface mb-base">Bem-vinda de volta</h1>
              <p className="font-body-md text-on-surface-variant">Acesse sua conta para continuar.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-outline-variant/30 mb-stack-md">
              <Link to="/login" className="flex-1 pb-base text-center text-primary border-b-2 border-primary font-label-md font-bold transition-colors">Entrar</Link>
              <Link to="/register" className="flex-1 pb-base text-center text-on-surface-variant hover:text-primary border-b-2 border-transparent font-label-md transition-colors">Cadastrar</Link>
            </div>

            {/* Form */}
            <form className="space-y-stack-md">
              <div className="space-y-stack-sm">
                <div>
                  <label className="block font-label-sm font-bold text-on-surface mb-base" htmlFor="email">E-mail</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
                    <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md" id="email" placeholder="seu@email.com" type="email" />
                  </div>
                </div>
                
                <div>
                  <label className="block font-label-sm font-bold text-on-surface mb-base" htmlFor="password">Senha</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
                    <input className="w-full pl-10 pr-10 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md" id="password" placeholder="••••••••" type="password" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary" type="button">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <a className="font-label-sm text-sm text-primary hover:text-primary-container transition-colors" href="#">Esqueci minha senha</a>
                  </div>
                </div>
              </div>

              {/* Primary Action */}
              <button className="w-full py-3 bg-primary text-on-primary font-label-md font-bold rounded-lg shadow-sm shadow-secondary/5 hover:bg-primary/90 transition-all active:scale-95" type="submit">
                Entrar
              </button>

              {/* Divider */}
              <div className="relative flex items-center py-stack-sm">
                <div className="flex-grow border-t border-outline-variant/30"></div>
                <span className="flex-shrink-0 mx-4 font-label-sm text-xs text-on-surface-variant uppercase">ou continue com</span>
                <div className="flex-grow border-t border-outline-variant/30"></div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-sm">
                <button className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors font-label-md text-on-surface shadow-sm shadow-secondary/5" type="button">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors font-label-md text-on-surface shadow-sm shadow-secondary/5" type="button">
                  <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-stack-lg px-container-padding-mobile md:px-container-padding-desktop flex flex-col md:flex-row justify-between items-center gap-stack-md bg-surface-container-lowest border-t border-outline-variant/30 mt-auto">
        <div className="font-headline-md font-bold text-xl text-primary">Empreenda Mais Elas</div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a className="font-label-sm text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Sobre nós</a>
          <a className="font-label-sm text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacidade</a>
          <a className="font-label-sm text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Termos</a>
        </div>
        <div className="font-body-md text-sm text-secondary opacity-80 hover:opacity-100 transition-opacity text-center md:text-right">© 2026 Empreenda Mais Elas.</div>
      </footer>
    </div>
  );
}