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

export default function Parceiros() {
  const activeLabel = 'Parceiros / SEBRAE';
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch(() => setCurrentUser(null));
  }, []);

  const userInitials = useMemo(() => {
    if (!currentUser?.nome) return 'A';
    const parts = currentUser.nome.split(' ');
    return parts.slice(0, 1).map((name) => name[0]?.toUpperCase() || '').join('');
  }, [currentUser]);

  // Dados mockados de parceiros
  const mockPartners = [
    {
      id: 1,
      nome: 'SEBRAE',
      tipo: 'Instituição',
      servicos: 'Consultoria, Capacitação, Acesso a Crédito',
      contato: 'contato@sebrae.com.br',
      status: 'Ativo',
    },
    {
      id: 2,
      nome: 'Banco do Brasil',
      tipo: 'Instituição Financeira',
      servicos: 'Linhas de Crédito, Conta Corrente PJ',
      contato: 'pj@bb.com.br',
      status: 'Ativo',
    },
    {
      id: 3,
      nome: 'Caixa Econômica',
      tipo: 'Instituição Financeira',
      servicos: 'Financiamento, Investimento',
      contato: 'pequenegocios@caixa.gov.br',
      status: 'Ativo',
    },
    {
      id: 4,
      nome: 'Google para Negócios',
      tipo: 'Plataforma Digital',
      servicos: 'Marketing Digital, Ferramentas Online',
      contato: 'partner@google.com',
      status: 'Ativo',
    },
  ];

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
          <span className="text-sm font-medium text-on-surface-variant">Rede de Parceiros</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-on-secondary">{userInitials}</div>
            <span className="text-sm font-semibold text-on-surface">Administrador(a)</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Parceiros SEBRAE e Instituições</h1>
            <p className="text-sm text-on-surface-variant">Gerencie a rede de instituições parceiras que apoiam as empreendedoras.</p>
          </div>

          {/* Botão adicionar parceiro */}
          <div className="mb-stack-lg">
            <button className="px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dim transition">
              + Adicionar Novo Parceiro
            </button>
          </div>

          {/* Grid de Parceiros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {mockPartners.length > 0 ? (
              mockPartners.map((partner) => (
                <div key={partner.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-6">
                  <div className="flex justify-between items-start mb-stack-sm">
                    <div>
                      <h3 className="text-sm font-bold text-on-surface">{partner.nome}</h3>
                      <p className="text-xs text-on-surface-variant">{partner.tipo}</p>
                    </div>
                    <span className="inline-block px-2.5 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                      {partner.status}
                    </span>
                  </div>
                  <div className="mb-stack-sm">
                    <p className="text-xs font-bold text-on-surface-variant">Serviços oferecidos:</p>
                    <p className="text-sm text-on-surface">{partner.servicos}</p>
                  </div>
                  <div className="mb-stack-md">
                    <p className="text-xs text-on-surface-variant">{partner.contato}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-1.5 text-xs font-bold text-primary border border-primary rounded-md hover:bg-primary-fixed transition">
                      Editar
                    </button>
                    <button className="flex-1 px-3 py-1.5 text-xs font-bold text-error border border-error rounded-md hover:bg-error-fixed transition">
                      Remover
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 col-span-2">
                <p className="text-sm text-on-surface-variant">Nenhum parceiro cadastrado no momento.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
