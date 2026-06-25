import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';

const menuItems = [
  { label: 'Voltar para página anterior', to: '/dashboard' },
  { label: 'Visão Geral', to: '/admin' },
  { label: 'Validar Projetos', to: '/admin/validar-projetos' },
  { label: 'Parceiros / SEBRAE', to: '/admin/parceiros' },
  { label: 'Relatórios Financeiros', to: '/admin/relatorios' },
  { label: 'Feedback das Usuárias', to: '/admin/feedback' },
  { label: 'Usuárias cadastradas', to: '/admin/usuarias' },
];

const metricas = [
  { label: 'Total de Mulheres Inscritas', valor: '1.405 Empreendedoras', nota: '+54 novas esta semana', borda: 'border-t-primary' },
  { label: 'Trilhas Concluídas', valor: '312 Certificados', nota: '68% de engajamento ativo', borda: 'border-t-secondary' },
  { label: 'Microcréditos Solicitados', valor: '42 Encaminhamentos', nota: 'Conexão direta com bancos parceiros', borda: 'border-t-green-600' },
];

const lojas = [
  {
    empreendedora: 'Francisca Iracema',
    loja: 'Doces Tradicionais Iracema',
    local: 'Lavras da Mangabeira',
    status: 'Trilha Inicial Concluída',
    statusTipo: 'concluido',
    acao: 'Aprovar Catálogo',
    acaoTipo: 'solida',
  },
  {
    empreendedora: 'Juliana Maria das Dores',
    loja: 'Artesanatos em Linha e Fuxico',
    local: 'Lavras da Mangabeira',
    status: 'Em Análise Técnica',
    statusTipo: 'analise',
    acao: 'Revisar Perfil',
    acaoTipo: 'outline',
  },
];

function StatusBadge({ status, tipo }) {
  return (
    <span
      className={
        tipo === 'concluido'
          ? 'inline-block px-2.5 py-1 bg-green-600 text-white text-xs font-bold rounded-full'
          : 'inline-block px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full'
      }
    >
      {status}
    </span>
  );
}

export default function PainelAdministrativoVisaoGeral() {
  const activeLabel = 'Visão Geral';

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
          <span className="text-sm font-medium text-on-surface-variant">Área de Monitoramento Geral (Admin)</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-on-secondary">A</div>
            <span className="text-sm font-semibold text-on-surface">Administrador(a)</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-6xl w-full">
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Métricas Gerais da Plataforma</h1>
            <p className="text-sm text-on-surface-variant">Controle de impacto social, acompanhamento dos acessos das trilhas e aprovação de novas lojas.</p>
          </div>

          {/* Cards de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md mb-stack-lg">
            {metricas.map((m) => (
              <div key={m.label} className={`bg-surface-container-lowest rounded-xl border border-outline-variant/20 border-t-4 ${m.borda} p-5`}>
                <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-3">{m.label}</p>
                <p className="text-lg font-bold text-on-surface mb-1">{m.valor}</p>
                <p className="text-xs font-medium text-on-surface-variant">{m.nota}</p>
              </div>
            ))}
          </div>

          {/* Tabela de aprovação */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
            <h2 className="text-base font-bold text-on-surface px-5 py-4 border-b border-outline-variant/20">Aprovação Pendente de Novas Lojas no Marketplace</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase text-on-surface-variant text-left">
                  <th className="px-5 py-3 font-bold">Empreendedora</th>
                  <th className="px-5 py-3 font-bold">Nome da Loja Solicitada</th>
                  <th className="px-5 py-3 font-bold">Polo / Cidade</th>
                  <th className="px-5 py-3 font-bold">Status Diagnóstico</th>
                  <th className="px-5 py-3 font-bold">Ação</th>
                </tr>
              </thead>
              <tbody>
                {lojas.map((loja) => (
                  <tr key={loja.empreendedora} className="border-t border-outline-variant/20">
                    <td className="px-5 py-3 text-on-surface font-medium">{loja.empreendedora}</td>
                    <td className="px-5 py-3 text-on-surface-variant">{loja.loja}</td>
                    <td className="px-5 py-3 text-on-surface-variant">{loja.local}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={loja.status} tipo={loja.statusTipo} />
                    </td>
                    <td className="px-5 py-3">
                      <button
                        className={
                          loja.acaoTipo === 'solida'
                            ? 'px-3 py-1.5 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary/90 transition'
                            : 'px-3 py-1.5 border border-primary text-primary text-xs font-bold rounded-lg hover:bg-primary-fixed/30 transition'
                        }
                      >
                        {loja.acao}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
