import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';
import { createDiagnosis, getCurrentUser } from '../services/api';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Diagnóstico', to: '/diagnostico' },
  { label: 'Trilhas', to: '/trilhas' },
  { label: 'Mentorias', to: '/mentorias' },
  { label: 'Painel da empreendedora', to: '/painel-empreendedora' },
  { label: 'Marketplace', to: '/marketplace' },
];

const opcoes = [
  { id: 'ideia', texto: 'Estou estruturando uma ideia para começar do zero' },
  { id: 'ativo', texto: 'Já tenho um negócio ativo e quero expandir e acelerar' },
];

export default function Diagnostico() {
  const activeLabel = 'Diagnóstico';
  const [selecionada, setSelecionada] = useState('ideia');
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmitDiagnosis = async () => {
    setSaving(true);
    setFeedback('');
    try {
      const user = await getCurrentUser();
      const payload = {
        user_id: user.id,
        score_first: selecionada === 'ativo' ? 8.5 : 5.0,
        level: selecionada === 'ativo' ? 'intermediario' : 'iniciante',
        answers: { fase: selecionada },
      };
      await createDiagnosis(payload);
      setFeedback('Diagnóstico salvo com sucesso.');
    } catch (error) {
      setFeedback(error.message || 'Não foi possível salvar o diagnóstico.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex bg-surface min-h-screen font-body-md">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-stack-lg px-2">
          <img src={logoIcon} alt="" className="h-8 w-8" />
          <span className="font-headline-md text-sm font-extrabold uppercase leading-tight text-on-surface">
            Empreenda<br />Mais Elas
          </span>
        </div>

        <nav className="flex-grow space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={
                item.label === activeLabel
                  ? 'block px-4 py-2.5 text-sm font-bold text-primary bg-primary-fixed rounded-md'
                  : 'block px-4 py-2.5 text-sm font-medium text-on-surface-variant rounded-md hover:bg-surface-container-low transition'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <header className="bg-surface-container-lowest border-b border-outline-variant/20 px-8 py-4 flex justify-between items-center">
          <span className="text-sm font-medium text-on-surface-variant">Mapeamento de Negócio</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-xs font-bold text-on-surface">AS</div>
            <span className="text-sm font-semibold text-on-surface">Amanda Silva</span>
          </div>
        </header>

        <main className="flex-1 flex items-start justify-center p-8">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-6 w-full max-w-md">
            <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-3">Pergunta 3 de 5</p>
            <h1 className="text-lg font-bold text-on-surface mb-stack-md">
              Você já possui um negócio ativo faturando ou está apenas na fase de planejamento?
            </h1>

            <div className="space-y-stack-sm mb-stack-md">
              {opcoes.map((opcao) => (
                <label
                  key={opcao.id}
                  className={
                    selecionada === opcao.id
                      ? 'flex items-center gap-3 p-3 rounded-lg border-2 border-primary cursor-pointer transition'
                      : 'flex items-center gap-3 p-3 rounded-lg border border-outline-variant cursor-pointer hover:border-primary/40 transition'
                  }
                >
                  <input
                    type="radio"
                    name="diagnostico"
                    checked={selecionada === opcao.id}
                    onChange={() => setSelecionada(opcao.id)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm text-on-surface">{opcao.texto}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button type="button" className="text-sm font-medium text-on-surface-variant hover:text-primary transition">
                Voltar
              </button>
              <button type="button" onClick={handleSubmitDiagnosis} disabled={saving} className="px-5 py-2.5 bg-primary text-on-primary font-label-md font-bold rounded-lg hover:bg-primary/90 transition disabled:opacity-70">
                {saving ? 'Salvando...' : 'Avançar Proposta'}
              </button>
            </div>
            {feedback && <p className="mt-3 text-sm text-on-surface-variant">{feedback}</p>}
          </div>
        </main>
      </div>
    </div>
  );
}
