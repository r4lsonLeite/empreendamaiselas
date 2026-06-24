import AuthLayout from '../layouts/AuthLayout';

export default function Register() {
  return (
    <AuthLayout
      imageAlt="Mulheres empreendedoras colaborando"
      quote="O SUCESSO É CONSTRUÍDO JUNTAS."
      subtitle="Junte-se à comunidade que eleva mulheres empreendedoras."
    >
      {/* Header */}
      <div className="mb-stack-lg text-center md:text-left">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl font-bold text-on-surface mb-base">Crie sua conta</h1>
        <p className="font-body-md text-on-surface-variant">Junte-se à nossa comunidade de empreendedoras.</p>
      </div>

      {/* Form */}
      <form className="space-y-stack-md">
        <div className="space-y-stack-sm">
          <div>
            <label className="block font-label-sm font-bold text-on-surface mb-base" htmlFor="name">Nome completo</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">person</span>
              <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md" id="name" placeholder="Seu nome" type="text" />
            </div>
          </div>

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
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <button className="w-full py-3 bg-primary text-on-primary font-label-md font-bold rounded-lg shadow-sm shadow-secondary/5 hover:bg-primary/90 transition-all active:scale-95" type="submit">
          Criar conta
        </button>
      </form>
    </AuthLayout>
  );
}
