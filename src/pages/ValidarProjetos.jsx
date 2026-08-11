import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';
import { getCurrentUser } from '../services/api';

const menuItems = [
  { label: 'Voltar para página anterior', to: '/dashboard' },
  { label: 'Visão Geral', to: '/admin' },
  { label: 'Validar Projetos', to: '/admin/validar-projetos' },
  { label: 'Parceiros / SEBRAE', to: '/admin/parceiros' },
  { label: 'Relatórios Financeiros', to: '/admin/relatorios' },
  { label: 'Feedback das Usuárias', to: '/admin/feedback' },
  { label: 'Usuárias cadastradas', to: '/admin/usuarias' },
];

function StatusBadge({ status }) {
  return (
    <span
      className={
        status === 'aprovado'
          ? 'inline-block px-2.5 py-1 bg-green-600 text-white text-xs font-bold rounded-full'
          : status === 'pendente'
          ? 'inline-block px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full'
          : 'inline-block px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full'
      }
    >
      {status === 'aprovado' ? 'Aprovado' : status === 'pendente' ? 'Pendente' : 'Rejeitado'}
    </span>
  );
}

export default function ValidarProjetos() {
  const activeLabel = 'Validar Projetos';
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('pendente');

  useEffect(() => {
    getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch(() => setCurrentUser(null));
  }, []);

  // Dados mockados de projetos
  const mockProjects = [
    {
      id: 1,
      titulo: 'Loja de Artesanato Feminino',
      usuarioNome: 'Maria Silva',
      descricao: 'Projeto para venda de artesanato feito à mão por mulheres da comunidade.',
      status: 'pendente',
    },
    {
      id: 2,
      titulo: 'Consultoria de Marketing Digital',
      usuarioNome: 'Ana Costa',
      descricao: 'Serviço de consultoria em estratégias digitais para pequenos negócios.',
      status: 'aprovado',
    },
    {
      id: 3,
      titulo: 'Produção de Bolos Caseiros',
      usuarioNome: 'Beatriz Santos',
      descricao: 'Negócio de bolos e doces caseiros com entrega.',
      status: 'pendente',
    },
  ];

  useEffect(() => {
    setProjects(mockProjects);
  }, []);

  const userInitials = useMemo(() => {
    if (!currentUser?.nome) return 'A';
    const parts = currentUser.nome.split(' ');
    return parts.slice(0, 1).map((name) => name[0]?.toUpperCase() || '').join('');
  }, [currentUser]);

  const filteredProjects = useMemo(
    () => projects.filter((p) => !filter || p.status === filter),
    [projects, filter],
  );

  const projectsByStatus = useMemo(() => {
    return {
      pendente: projects.filter((p) => p.status === 'pendente').length,
      aprovado: projects.filter((p) => p.status === 'aprovado').length,
      rejeitado: projects.filter((p) => p.status === 'rejeitado').length,
    };
  }, [projects]);

  return (
    <div className="flex bg-surface min-h-screen font-body-md">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col p-6 hidden md:flex">
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
        <header className="bg-surface-container-lowest border-b border-outline-variant/20 px-4 md:px-8 py-4 flex justify-between items-center">
          <span className="text-sm font-medium text-on-surface-variant">Validação de Projetos</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-on-secondary">{userInitials}</div>
            <span className="text-sm font-semibold text-on-surface">Administrador(a)</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Validar Novos Projetos</h1>
            <p className="text-sm text-on-surface-variant">Revise e valide os diagnósticos e planos de negócio das empreendedoras.</p>
          </div>

          {/* Filtros */}
          <div className="mb-stack-lg flex gap-3">
            {[
              { label: 'Todos', value: null },
              { label: `Pendentes (${projectsByStatus.pendente})`, value: 'pendente' },
              { label: `Aprovados (${projectsByStatus.aprovado})`, value: 'aprovado' },
              { label: `Rejeitados (${projectsByStatus.rejeitado})`, value: 'rejeitado' },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={
                  filter === btn.value
                    ? 'px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg transition'
                    : 'px-4 py-2 text-sm font-medium text-on-surface-variant bg-surface-container-lowest border border-outline-variant/20 rounded-lg hover:bg-surface-container-low transition'
                }
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Lista de Projetos */}
          <div className="space-y-stack-sm">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-6">
                  <div className="flex justify-between items-start mb-stack-sm">
                    <div>
                      <h3 className="text-sm font-bold text-on-surface">{project.titulo || 'Projeto sem título'}</h3>
                      <p className="text-xs text-on-surface-variant">{project.usuarioNome || 'Usuária desconhecida'}</p>
                    </div>
                    <StatusBadge status={project.status || 'pendente'} />
                  </div>
                  <p className="text-sm text-on-surface-variant mb-stack-sm">{project.descricao || 'Sem descrição'}</p>
                  <div className="flex gap-3">
                    <button className="px-3 py-1.5 text-xs font-bold text-primary bg-primary-fixed rounded-md hover:bg-primary-fixed-dim transition">
                      Aprovar
                    </button>
                    <button className="px-3 py-1.5 text-xs font-bold text-error bg-error-fixed rounded-md hover:bg-error-fixed-dim transition">
                      Rejeitar
                    </button>
                    <button className="px-3 py-1.5 text-xs font-bold text-on-surface-variant border border-outline-variant/20 rounded-md hover:bg-surface-container-low transition">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-on-surface-variant">Nenhum projeto encontrado para este filtro.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
