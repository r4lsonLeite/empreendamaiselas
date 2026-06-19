import AuthLayout from '../layouts/AuthLayout';
import SocialLogin from '../components/SocialLogin';

export default function Login() {
  return (
    <AuthLayout 
      quote="O SUCESSO É CONSTRUÍDO JUNTAS."
      subtitle="Junte-se à comunidade que eleva mulheres empreendedoras."
      imageAlt="A brightly lit, modern co-working space..."
    >
      {/* Cabeçalho */}
      <div className="mb-stack-lg text-center md:text-left">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-base">
          Bem-vinda de volta
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Acesse sua conta para continuar.
        </p>
      </div>

      {/* Abas */}
      <div className="flex border-b border-outline-variant/30 mb-stack-md">
        <button className="flex-1 pb-base text-primary border-b-2 border-primary font-label-md transition-colors">
          Entrar
        </button>
        <button className="flex-1 pb-base text-on-surface-variant hover:text-primary border-b-2 border-transparent font-label-md transition-colors">
          Cadastrar
        </button>
      </div>

      {/* Formulário */}
      <form className="space-y-stack-md">
        <div className="space-y-stack-sm">
          <div>
            <label htmlFor="email" className="block font-label-sm text-on-surface mb-base">E-mail</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
              <input 
                id="email" 
                type="email" 
                placeholder="seu@email.com"
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block font-label-sm text-on-surface mb-base">Senha</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
              <input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <a href="#" className="font-label-sm text-primary hover:opacity-80 transition-colors">Esqueci minha senha</a>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3 bg-primary text-white font-label-md rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-95">
          Entrar
        </button>

        {/* Divisor */}
        <div className="relative flex items-center py-stack-sm">
          <div className="flex-grow border-t border-outline-variant/30"></div>
          <span className="flex-shrink-0 mx-4 font-label-sm text-on-surface-variant uppercase">ou continue com</span>
          <div className="flex-grow border-t border-outline-variant/30"></div>
        </div>

        {/* Botões Sociais isolados num componente */}
        <SocialLogin />
      </form>
    </AuthLayout>
  );
}