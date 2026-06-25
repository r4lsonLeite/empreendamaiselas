import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';
import { createProduct, getCurrentUser, listOrders, listProducts } from '../services/api';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Minha Loja / Vendas', to: '/painel-empreendedora' },
  { label: 'Trilhas', to: '/trilhas' },
  { label: 'Painel administrativo', to: '/admin' },
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
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    valor: '',
    categoria: '',
  });

  useEffect(() => {
    Promise.all([getCurrentUser(), listProducts(), listOrders()])
      .then(([user, productsData, ordersData]) => {
        setCurrentUser(user);
        setProducts(productsData);
        setOrders(ordersData);
      })
      .catch(() => {
        setProducts([]);
        setOrders([]);
      });
  }, []);

  const productIds = useMemo(() => {
    const mine = products.filter((product) => product.usuarioId === currentUser?.id);
    return new Set(mine.map((product) => product.id));
  }, [products, currentUser]);

  const myOrders = useMemo(
    () => orders.filter((order) => order.itens.some((item) => productIds.has(item.produtoId))),
    [orders, productIds],
  );

  const myProductsById = useMemo(
    () => Object.fromEntries(products.map((product) => [product.id, product])),
    [products],
  );

  const totalSales = useMemo(
    () => myOrders.reduce((sum, order) => sum + Number(order.valorTotal || 0), 0),
    [myOrders],
  );

  const metricas = useMemo(
    () => [
      {
        label: 'Vendas Totais',
        valor: `R$ ${totalSales.toFixed(2).replace('.', ',')}`,
        nota: `${myOrders.length} pedidos associados aos seus produtos`,
        notaCor: 'text-green-600',
      },
      {
        label: 'Pedidos Realizados',
        valor: `${myOrders.length} itens`,
        nota: `${myOrders.filter((order) => order.status !== 'concluido').length} aguardando fechamento`,
        notaCor: 'text-on-surface-variant',
      },
      {
        label: 'Produtos Cadastrados',
        valor: `${products.filter((product) => product.usuarioId === currentUser?.id).length} ativos`,
        nota: 'Atualize catálogo para ganhar destaque',
        notaCor: 'text-green-600',
      },
      {
        label: 'Saldo Estimado',
        valor: `R$ ${(totalSales * 0.7).toFixed(2).replace('.', ',')}`,
        nota: 'Estimativa após taxas operacionais',
        notaCor: 'text-on-surface-variant',
      },
    ],
    [currentUser, myOrders, products, totalSales],
  );

  const pedidos = useMemo(
    () => myOrders.map((order) => ({
      id: `#${order.id}`,
      cliente: `Usuária #${order.usuarioId}`,
      produto:
        myProductsById[order.itens?.[0]?.produtoId]?.titulo ||
        `Produto #${order.itens?.[0]?.produtoId || '-'}`,
      valor: `R$ ${Number(order.valorTotal || 0).toFixed(2).replace('.', ',')}`,
      status: order.status === 'concluido' ? 'Concluído' : 'Aguardando Envio',
    })),
    [myOrders, myProductsById],
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    if (!currentUser?.id) {
      setFormError('Usuária não identificada para cadastrar produto.');
      return;
    }
    setFormLoading(true);
    setFormError('');
    try {
      const newProduct = await createProduct({
        usuario_id: currentUser.id,
        titulo: formData.titulo,
        descricao: formData.descricao,
        valor: Number(formData.valor),
        categoria: formData.categoria,
      });
      setProducts((prev) => [...prev, newProduct]);
      setFormData({ titulo: '', descricao: '', valor: '', categoria: '' });
      setFormOpen(false);
    } catch (error) {
      setFormError(error.message || 'Não foi possível criar o produto.');
    } finally {
      setFormLoading(false);
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
            <button onClick={() => setFormOpen((prev) => !prev)} className="px-4 py-2.5 bg-primary text-on-primary text-sm font-bold rounded-lg hover:bg-primary/90 transition whitespace-nowrap" type="button">
              + Cadastrar Novo Produto
            </button>
          </div>

          {formOpen && (
            <form onSubmit={handleCreateProduct} className="mb-stack-lg rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="titulo" value={formData.titulo} onChange={handleFormChange} placeholder="Título" className="rounded-lg border border-outline-variant px-3 py-2 text-sm" required />
              <input name="categoria" value={formData.categoria} onChange={handleFormChange} placeholder="Categoria" className="rounded-lg border border-outline-variant px-3 py-2 text-sm" required />
              <input name="valor" value={formData.valor} onChange={handleFormChange} placeholder="Valor" type="number" step="0.01" className="rounded-lg border border-outline-variant px-3 py-2 text-sm" required />
              <input name="descricao" value={formData.descricao} onChange={handleFormChange} placeholder="Descrição" className="rounded-lg border border-outline-variant px-3 py-2 text-sm" required />
              <div className="md:col-span-2 flex items-center gap-3">
                <button type="submit" disabled={formLoading} className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-bold disabled:opacity-70">
                  {formLoading ? 'Salvando...' : 'Salvar Produto'}
                </button>
                {formError && <span className="text-sm text-red-600">{formError}</span>}
              </div>
            </form>
          )}

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
                {pedidos.length ? pedidos.map((pedido) => (
                  <tr key={pedido.id} className="border-t border-outline-variant/20">
                    <td className="px-5 py-3 text-on-surface-variant">{pedido.id}</td>
                    <td className="px-5 py-3 text-on-surface font-medium">{pedido.cliente}</td>
                    <td className="px-5 py-3 text-on-surface-variant">{pedido.produto}</td>
                    <td className="px-5 py-3 text-on-surface font-medium">{pedido.valor}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={pedido.status} />
                    </td>
                  </tr>
                )) : (
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-5 py-6 text-on-surface-variant" colSpan={5}>Sem pedidos associados aos seus produtos ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
