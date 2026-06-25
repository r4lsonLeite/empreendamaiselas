import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { registerUser } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerUser({
        nome: formData.name,
        email: formData.email,
        senha: formData.password,
      });
      navigate('/login', { replace: true });
    } catch (apiError) {
      setError(apiError.message || 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  };

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
      <form className="space-y-stack-md" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="space-y-stack-sm">
          <div>
            <label className="block font-label-sm font-bold text-on-surface mb-base" htmlFor="name">Nome completo</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">person</span>
              <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md" id="name" placeholder="Seu nome" type="text" value={formData.name} onChange={handleChange} required />
            </div>
          </div>

          <div>
            <label className="block font-label-sm font-bold text-on-surface mb-base" htmlFor="email">E-mail</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
              <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md" id="email" placeholder="seu@email.com" type="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div>
            <label className="block font-label-sm font-bold text-on-surface mb-base" htmlFor="password">Senha</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
              <input className="w-full pl-10 pr-10 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md" id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <button className="w-full py-3 bg-primary text-on-primary font-label-md font-bold rounded-lg shadow-sm shadow-secondary/5 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-70" type="submit" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>
    </AuthLayout>
  );
}
