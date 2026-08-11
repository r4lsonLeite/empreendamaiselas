import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';
import { listOrders, listProducts, getCurrentUser } from '../services/api';

const menuItems = [
  { label: 'Voltar para página anterior', to: '/dashboard' },
  { label: 'Visão Geral', to: '/admin' },
  { label: 'Validar Projetos', to: '/admin/validar-projetos' },
  { label: 'Parceiros / SEBRAE', to: '/admin/parceiros' },
  { label: 'Relatórios Financeiros', to: '/admin/relatorios' },
  { label: 'Feedback das Usuárias', to: '/admin/feedback' },
  { label: 'Usuárias cadastradas', to: '/admin/usuarias' },
];

export default function Relatorios() {
  const activeLabel = 'Relatórios Financeiros';
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Promise.all([getCurrentUser(), listOrders(), listProducts()])
      .then(([user, ordersData, productsData]) => {
        setCurrentUser(user);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);
      })
      .catch(() => {
        setCurrentUser(null);
        setOrders([]);
        setProducts([]);
      });
  }, []);

  const userInitials = useMemo(() => {
    if (!currentUser?.nome) return 'A';
    const parts = currentUser.nome.split(' ');
    return parts.slice(0, 1).map((name) => name[0]?.toUpperCase() || '').join('');
  }, [currentUser]);

  const financialMetrics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.valorTotal || 0), 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const activeProducts = products.length;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      activeProducts,
    };
  }, [orders, products]);

  const monthlyRevenue = useMemo(() => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months.map((month, index) => ({
      month,
      revenue: Math.floor(Math.random() * 5000 + 1000),
    }));
  }, []);

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
          <span className="text-sm font-medium text-on-surface-variant">Relatórios Financeiros</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-on-secondary">{userInitials}</div>
            <span className="text-sm font-semibold text-on-surface">Administrador(a)</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Análise Financeira da Plataforma</h1>
            <p className="text-sm text-on-surface-variant">Acompanhe a performance de vendas, faturamento e métricas do marketplace.</p>
          </div>

          {/* Métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-lg mb-stack-lg">
            <div className="bg-surface-container-lowest rounded-xl border-t-4 border-t-primary p-6">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Faturamento Total</p>
              <h3 className="text-2xl font-bold text-on-surface mb-1">R$ {financialMetrics.totalRevenue.toFixed(2).replace('.', ',')}</h3>
              <p className="text-xs text-on-surface-variant">{financialMetrics.totalOrders} transações</p>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border-t-4 border-t-secondary p-6">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Ticket Médio</p>
              <h3 className="text-2xl font-bold text-on-surface mb-1">R$ {financialMetrics.averageOrderValue.toFixed(2).replace('.', ',')}</h3>
              <p className="text-xs text-on-surface-variant">por pedido</p>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border-t-4 border-t-green-600 p-6">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Total de Pedidos</p>
              <h3 className="text-2xl font-bold text-on-surface mb-1">{financialMetrics.totalOrders}</h3>
              <p className="text-xs text-on-surface-variant">no marketplace</p>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border-t-4 border-t-orange-600 p-6">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Produtos Ativos</p>
              <h3 className="text-2xl font-bold text-on-surface mb-1">{financialMetrics.activeProducts}</h3>
              <p className="text-xs text-on-surface-variant">à venda</p>
            </div>
          </div>

          {/* Gráfico de receita por mês */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-6 mb-stack-lg">
            <h2 className="text-sm font-bold text-on-surface mb-stack-md">Receita Mensal (Simulado)</h2>
            <div className="flex items-end gap-2 h-48">
              {monthlyRevenue.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-primary-fixed rounded-t-lg" style={{ height: `${(data.revenue / 6000) * 100}%` }}></div>
                  <p className="text-xs text-on-surface-variant mt-2">{data.month}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de exportação */}
          <div className="flex gap-3">
            <button className="px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dim transition">
              📊 Exportar Relatório (PDF)
            </button>
            <button className="px-6 py-2.5 text-sm font-bold text-primary border-2 border-primary rounded-lg hover:bg-primary-fixed transition">
              📈 Exportar Dados (CSV)
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
