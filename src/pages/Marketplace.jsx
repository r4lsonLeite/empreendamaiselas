import React, { useEffect, useMemo, useState } from 'react';
import { listProducts } from '../services/api';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    listProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  const produtos = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return products;
    return products.filter((produto) => {
      const title = (produto.titulo || '').toLowerCase();
      const category = (produto.categoria || '').toLowerCase();
      return title.includes(term) || category.includes(term);
    });
  }, [products, search]);

  return (
    <div className="flex bg-[#FBFBFB] min-h-screen font-sans">
      
      {/* SIDEBAR ESQUERDA - Identidade Visual igual ao Protótipo */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 hidden md:flex">
        {/* Espaço para a Logotipo */}
        <div className="mb-10 px-2 py-4 border border-dashed border-gray-300 rounded text-center text-xs font-bold uppercase tracking-wider text-gray-500">
          EMPREENDA MAIS ELAS
        </div>

        {/* Links de Navegação */}
        <nav className="flex-grow space-y-2">
          {["Dashboard", "Diagnóstico", "Trilhas", "Mentorias", "Painel da empreendedora"].map((item) => (
            <a key={item} href="#" className="block px-4 py-2.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 transition">
              {item}
            </a>
          ))}
          {/* Item Ativo (Marketplace) */}
          <a href="#" className="block px-4 py-2.5 text-sm font-semibold text-[#A63A2B] bg-[#FDF3F1] rounded-md">
            Marketplace
          </a>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL (Topo + Grid de Produtos) */}
      <div className="flex-1 flex flex-col">
        
        {/* TOP NAVBAR (Sub-header) */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Vitrine de Produtos Locais</span>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#E5C3BD] flex items-center justify-center text-xs font-bold text-white">AS</div>
            <span className="text-sm font-semibold text-gray-700">Amanda Silva</span>
          </div>
        </header>

        {/* ÁREA DA VITRINE */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          
          {/* Título da Página e Barra de Pesquisa */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Compre de Quem Empreende</h1>
              <p className="text-gray-500 mt-1 text-sm">Apoie o comércio local consumindo produtos diretamente das mulheres da nossa rede.</p>
            </div>
            
            {/* Barra de Busca */}
            <div className="w-full md:w-80">
              <input 
                type="text" 
                placeholder="Buscar produtos ou artesãs..." 
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#A63A2B] focus:border-[#A63A2B]"
              />
            </div>
          </div>

          {/* GRID DE CARD DOS PRODUTOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col">
                {/* Imagem do Produto */}
                <div className="h-56 bg-gray-100 overflow-hidden relative">
                  <img 
                    src={produto.imagem} 
                    alt={produto.titulo} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Detalhes do Produto */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-medium text-purple-700">Categoria: {produto.categoria || 'Geral'}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">{produto.titulo}</h3>
                    <p className="text-[#A63A2B] text-xl font-bold mt-2">R$ {Number(produto.valor || 0).toFixed(2).replace('.', ',')}</p>
                  </div>
                  
                  {/* Botão de Ação */}
                  <button className="w-full mt-5 bg-[#A63A2B] hover:bg-[#8F3024] text-white py-2.5 rounded-xl font-medium text-sm transition shadow-sm">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

    </div>
  );
}