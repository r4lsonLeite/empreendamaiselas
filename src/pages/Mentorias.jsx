import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';
import { useEffect, useMemo, useState } from 'react';
import { createMentoria, getCurrentUser, listMentorias } from '../services/api';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Diagnóstico', to: '/diagnostico' },
  { label: 'Trilhas', to: '/trilhas' },
  { label: 'Mentorias', to: '/mentorias' },
  { label: 'Painel da empreendedora', to: '/painel-empreendedora' },
  { label: 'Marketplace', to: '/marketplace' },
];

const mentoras = [
  { nome: 'Juliana Costa', especialidade: 'Finanças, Fluxo de Caixa e Custos' },
  { nome: 'Carla Mendes', especialidade: 'Marketing Digital e Vendas' },
];

export default function Mentorias() {
  const activeLabel = 'Mentorias';
  const [sessions, setSessions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    mentora: mentoras[0]?.nome || '',
    dataHora: '',
    tema: '',
    observacoes: '',
  });
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    Promise.all([getCurrentUser(), listMentorias()])
      .then(([user, data]) => {
        setCurrentUser(user);
        setSessions(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setCurrentUser(null);
        setSessions([]);
      });
  }, []);

  const meusAgendamentos = useMemo(
    () => sessions.filter((sessao) => sessao.usuarioId === currentUser?.id),
    [sessions, currentUser],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitMentoria = async (event) => {
    event.preventDefault();
    if (!currentUser?.id) {
      setFormMessage('Usuária não identificada. Faça login novamente.');
      return;
    }

    setSaving(true);
    setFormMessage('');
    try {
      const created = await createMentoria({
        usuario_id: currentUser.id,
        mentora: formData.mentora,
        data_hora: formData.dataHora,
        tema: formData.tema,
        observacoes: formData.observacoes || null,
      });

      setSessions((prev) => [created, ...prev]);
      setFormData({
        mentora: mentoras[0]?.nome || '',
        dataHora: '',
        tema: '',
        observacoes: '',
      });
      setFormMessage('Mentoria agendada com sucesso.');
    } catch (error) {
      setFormMessage(error.message || 'Não foi possível agendar a mentoria.');
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
          <span className="text-sm font-medium text-on-surface-variant">Rede de Apoio</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-xs font-bold text-on-surface">AS</div>
            <span className="text-sm font-semibold text-on-surface">Amanda Silva</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-5xl w-full">
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Conexão com Especialistas</h1>
            <p className="text-sm text-on-surface-variant">Agende sessões individuais com mentores parceiros do SEBRAE e instituições bancárias parceiras.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {/* Mentoras Disponíveis */}
            <div>
              <h2 className="text-sm font-bold text-on-surface mb-stack-sm">Mentoras Disponíveis</h2>
              <div className="space-y-stack-sm">
                {mentoras.map((mentora) => (
                  <div key={mentora.nome} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center text-xs font-bold text-on-surface">
                        {mentora.nome.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{mentora.nome}</p>
                        <p className="text-xs text-on-surface-variant">{mentora.especialidade}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-primary text-primary text-xs font-bold rounded-lg hover:bg-primary-fixed/30 transition">
                      Agendar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Meus Agendamentos */}
            <div>
              <h2 className="text-sm font-bold text-on-surface mb-stack-sm">Agendar nova mentoria</h2>
              <form onSubmit={handleSubmitMentoria} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-4 mb-stack-md space-y-3">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Mentora</label>
                  <select name="mentora" value={formData.mentora} onChange={handleChange} className="mt-1 w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm" required>
                    {mentoras.map((mentora) => (
                      <option key={mentora.nome} value={mentora.nome}>{mentora.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Data e hora</label>
                  <input name="dataHora" value={formData.dataHora} onChange={handleChange} type="datetime-local" className="mt-1 w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Tema</label>
                  <input name="tema" value={formData.tema} onChange={handleChange} placeholder="Ex.: Precificação de produtos" className="mt-1 w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Observações</label>
                  <textarea name="observacoes" value={formData.observacoes} onChange={handleChange} placeholder="Opcional" rows={2} className="mt-1 w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm" />
                </div>
                <button type="submit" disabled={saving} className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-on-primary disabled:opacity-70">
                  {saving ? 'Agendando...' : 'Agendar Mentoria'}
                </button>
                {formMessage && <p className="text-xs text-on-surface-variant">{formMessage}</p>}
              </form>

              <h2 className="text-sm font-bold text-on-surface mb-stack-sm">Meus Agendamentos</h2>
              {meusAgendamentos.length ? meusAgendamentos.map((sessao) => (
                <div key={sessao.id} className="bg-surface-container-lowest rounded-xl border-2 border-primary p-4">
                  <span className="inline-block px-2 py-0.5 bg-primary-fixed text-primary text-xs font-bold rounded-full mb-3">
                    {sessao.status || 'Confirmada'}
                  </span>
                  <p className="text-sm font-bold text-on-surface mb-1">{sessao.tema || 'Sessão de Mentoria'}</p>
                  <p className="text-xs text-on-surface-variant mb-3">{sessao.dataHora || 'A definir'} • {sessao.mentora || 'Mentora'}</p>
                  <a href="#" className="text-xs font-bold text-primary hover:underline">
                    Acessar link da chamada →
                  </a>
                </div>
              )) : (
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-4 text-sm text-on-surface-variant">
                  Nenhuma mentoria agendada ainda.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
