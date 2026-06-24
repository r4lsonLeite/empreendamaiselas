import { Link } from 'react-router-dom';

export default function Carrinho() {
  // Dados estáticos temporários para o MVP — substituir por estado real (context, etc.)
  const itens = [];

  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  return (
    <div className="flex bg-[#FBFBFB] min-h-screen font-sans">
      {/* SIDEBAR ESQUERDA */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 hidden md:flex">
        <div className="mb-10 px-2 py-4 border border-dashed border-gray-300 rounded text-center text-xs font-bold uppercase tracking-wider text-gray-500">
          EMPREENDA MAIS ELAS
        </div>

        <nav className="flex-grow space-y-2">
          {["Dashboard", "Diagnóstico", "Trilhas", "Mentorias", "Painel da empreendedora"].map((item) => (
            <Link key={item} to="#" className="block px-4 py-2.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 transition">
              {item}
            </Link>
          ))}
          <Link to="/marketplace" className="block px-4 py-2.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 transition">
            Marketplace
          </Link>
          <Link to="/carrinho" className="block px-4 py-2.5 text-sm font-semibold text-[#A63A2B] bg-[#FDF3F1] rounded-md">
            Carrinho
          </Link>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Meu Carrinho</span>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#E5C3BD] flex items-center justify-center text-xs font-bold text-white">AS</div>
            <span className="text-sm font-semibold text-gray-700">Amanda Silva</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Carrinho de Compras</h1>
            <p className="text-gray-500 mt-1 text-sm">Revise os produtos antes de finalizar sua compra.</p>
          </div>

          {itens.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200/60 p-10 text-center">
              <p className="text-gray-500">Seu carrinho está vazio.</p>
              <Link
                to="/marketplace"
                className="inline-block mt-5 bg-[#A63A2B] hover:bg-[#8F3024] text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow-sm"
              >
                Ver produtos no Marketplace
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
              <ul className="divide-y divide-gray-100">
                {itens.map((item) => (
                  <li key={item.id} className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-semibold text-gray-900">{item.titulo}</p>
                      <p className="text-sm text-gray-500">Qtd: {item.quantidade}</p>
                    </div>
                    <p className="text-[#A63A2B] font-bold">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center p-5 border-t border-gray-100 bg-gray-50">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-[#A63A2B]">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
