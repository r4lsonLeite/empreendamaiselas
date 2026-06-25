import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Minha Loja / Vendas', to: '/painel-empreendedora' },
  { label: 'Trilhas', to: '/trilhas' },
  { label: 'Painel administrativo', to: '/admin' },
];

const metricas = [
  { label: 'Vendas do Mês', valor: 'R$ 1.240,00', nota: '+12% em relação a ontem', notaCor: 'text-green-600' },
  { label: 'Pedidos Realizados', valor: '18 itens', nota: '4 aguardando envio', notaCor: 'text-on-surface-variant' },
  { label: 'Visitas no Catálogo', valor: '342 acessos', nota: '+5% esta semana', notaCor: 'text-green-600' },
  { label: 'Saldo Disponível', valor: 'R$ 850,00', nota: 'Próximo saque: 05/06', notaCor: 'text-on-surface-variant' },
];

const pedidos = [
  { id: '#1024', cliente: 'Mariana Souza', produto: 'Bolsa de Crochê Artesanal', valor: 'R$ 89,90', status: 'Aguardando Envio' },
  { id: '#1023', cliente: 'Beatriz Lima', produto: 'Avental de Cozinha Regulável', valor: 'R$ 35,00', status: 'Concluído' },
];

function StatusBadge({ status }) {
  const isConcluido = status === 'Concluído';
  return (
    <span
      className={
        isConcluido
          ? 'inline-block px-2.5 py-1 bg-green-600 text-white text-xs font-bold rounded-full'
          : 'inline-block px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full'
      }
    >
      {status}
    </span>
  );
}

export default function PainelEmpreendedora() {
  const activeLabel = 'Minha Loja / Vendas';

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
          <span className="text-sm font-medium text-on-surface-variant">Gerenciamento do Meu Negócio</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-xs font-bold text-on-surface">AS</div>
            <span className="text-sm font-semibold text-on-surface">Amanda Silva</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-6xl w-full">
          <div className="flex justify-between items-start mb-stack-lg">
            <div>
              <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Painel Comercial da Loja</h1>
              <p className="text-sm text-on-surface-variant">Controle seus produtos, gerencie pedidos e acompanhe seu faturamento.</p>
            </div>
            <button className="px-4 py-2.5 bg-primary text-on-primary text-sm font-bold rounded-lg hover:bg-primary/90 transition whitespace-nowrap">
              + Cadastrar Novo Produto
            </button>
          </div>

          {/* Cards de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-md mb-stack-lg">
            {metricas.map((m) => (
              <div key={m.label} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-3">{m.label}</p>
                <p className="text-lg font-bold text-on-surface mb-1">{m.valor}</p>
                <p className={`text-xs font-medium ${m.notaCor}`}>{m.nota}</p>
              </div>
            ))}
          </div>

          {/* Tabela de pedidos */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
            <h2 className="text-base font-bold text-on-surface px-5 py-4 border-b border-outline-variant/20">Últimos Pedidos Recebidos</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase text-on-surface-variant text-left">
                  <th className="px-5 py-3 font-bold">ID Pedido</th>
                  <th className="px-5 py-3 font-bold">Cliente</th>
                  <th className="px-5 py-3 font-bold">Produto</th>
                  <th className="px-5 py-3 font-bold">Valor</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="border-t border-outline-variant/20">
                    <td className="px-5 py-3 text-on-surface-variant">{pedido.id}</td>
                    <td className="px-5 py-3 text-on-surface font-medium">{pedido.cliente}</td>
                    <td className="px-5 py-3 text-on-surface-variant">{pedido.produto}</td>
                    <td className="px-5 py-3 text-on-surface font-medium">{pedido.valor}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={pedido.status} />
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
