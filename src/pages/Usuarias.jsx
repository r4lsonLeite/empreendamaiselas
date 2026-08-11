import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';
import { listUsers, getCurrentUser } from '../services/api';

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
        status === 'ativo'
          ? 'inline-block px-2.5 py-1 bg-green-600 text-white text-xs font-bold rounded-full'
          : 'inline-block px-2.5 py-1 bg-gray-400 text-white text-xs font-bold rounded-full'
      }
    >
      {status === 'ativo' ? 'Ativa' : 'Inativa'}
    </span>
  );
}

export default function Usuarias() {
  const activeLabel = 'Usuárias cadastradas';
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    Promise.all([getCurrentUser(), listUsers()])
      .then(([user, usersData]) => {
        setCurrentUser(user);
        setUsers(Array.isArray(usersData) ? usersData : []);
      })
      .catch(() => {
        setCurrentUser(null);
        setUsers([]);
      });
  }, []);

  const userInitials = useMemo(() => {
    if (!currentUser?.nome) return 'A';
    const parts = currentUser.nome.split(' ');
    return parts.slice(0, 1).map((name) => name[0]?.toUpperCase() || '').join('');
  }, [currentUser]);

  const filteredUsers = useMemo(() => {
    let result = users;

    // Filtrar por tipo
    if (filter !== 'todos') {
      result = result.filter((user) => user.papel === filter);
    }

    // Filtrar por busca
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((user) => user.nome.toLowerCase().includes(term) || user.email.toLowerCase().includes(term));
    }

    return result;
  }, [users, search, filter]);

  const userStats = useMemo(() => {
    return {
      total: users.length,
      empreendedoras: users.filter((u) => u.papel === 'empreendedora').length,
      mentoras: users.filter((u) => u.papel === 'mentora').length,
      admins: users.filter((u) => u.papel === 'admin').length,
    };
  }, [users]);

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
          <span className="text-sm font-medium text-on-surface-variant">Gestão de Usuárias</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-on-secondary">{userInitials}</div>
            <span className="text-sm font-semibold text-on-surface">Administrador(a)</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Usuárias Cadastradas</h1>
            <p className="text-sm text-on-surface-variant">Gerencie todas as usuárias da plataforma, acesso e permissões.</p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-lg mb-stack-lg">
            <div className="bg-surface-container-lowest rounded-xl border-t-4 border-t-primary p-6">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Total de Usuárias</p>
              <h3 className="text-3xl font-bold text-on-surface">{userStats.total}</h3>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border-t-4 border-t-green-600 p-6">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Empreendedoras</p>
              <h3 className="text-3xl font-bold text-on-surface">{userStats.empreendedoras}</h3>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border-t-4 border-t-secondary p-6">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Mentoras</p>
              <h3 className="text-3xl font-bold text-on-surface">{userStats.mentoras}</h3>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border-t-4 border-t-orange-600 p-6">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Administradoras</p>
              <h3 className="text-3xl font-bold text-on-surface">{userStats.admins}</h3>
            </div>
          </div>

          {/* Filtros e busca */}
          <div className="flex flex-col md:flex-row gap-3 mb-stack-lg">
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-outline-variant/20 bg-surface-container-lowest focus:outline-none focus:border-primary"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 text-sm rounded-lg border border-outline-variant/20 bg-surface-container-lowest focus:outline-none focus:border-primary"
            >
              <option value="todos">Todos os papéis</option>
              <option value="empreendedora">Empreendedoras</option>
              <option value="mentora">Mentoras</option>
              <option value="admin">Administradoras</option>
            </select>
          </div>

          {/* Tabela de Usuárias */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/20">
                    <th className="px-6 py-3 text-left text-xs font-bold text-on-surface-variant">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-on-surface-variant">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-on-surface-variant">Papel</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-on-surface-variant">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-on-surface-variant">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-outline-variant/20 hover:bg-surface-container-low transition">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-xs font-bold text-on-surface">
                              {user.nome.split(' ')[0][0]}
                            </div>
                            <span className="text-sm font-medium text-on-surface">{user.nome}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm text-on-surface-variant">{user.email}</td>
                        <td className="px-6 py-3">
                          <span className="inline-block px-2.5 py-1 bg-primary-fixed text-primary text-xs font-bold rounded-full">
                            {user.papel || 'empreendedora'}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <StatusBadge status={user.ativo ? 'ativo' : 'inativo'} />
                        </td>
                        <td className="px-6 py-3 text-center">
                          <div className="flex gap-2 justify-center">
                            <button className="text-xs font-bold text-primary hover:underline">Editar</button>
                            <button className="text-xs font-bold text-error hover:underline">Desativar</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-sm text-on-surface-variant">
                        Nenhuma usuária encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
