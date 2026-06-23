import React from 'react';

export default function AdminPanel() {
  // Dados simulados da tabela conforme o protótipo
  const solicitacoes = [
    {
      id: 1,
      empreendedora: "Francisca Iracema",
      loja: "Doces Tradicionais Iracema",
      polo: "Lavras da Mangabeira",
      status: "Trilha Inicial Concluída",
      statusColor: "bg-[#E6F4EA] text-[#137333]", // Verde suave
      acaoPrincipal: true
    },
    {
      id: 2,
      empreendedora: "Juliana Maria das Dores",
      loja: "Artesanatos em Linha e Fuxico",
      polo: "Lavras da Mangabeira",
      status: "Em Análise Técnica",
      statusColor: "bg-[#F1F3F4] text-[#5F6368]", // Cinza neutro
      acaoPrincipal: false
    }
  ];

  return (
    <div className="flex bg-[#FBFBFB] min-h-screen font-sans text-[#333333]">
      
      {/* SIDEBAR ESQUERDA - ADMIN */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 hidden md:flex">
        {/* Logotipo */}
        <div className="mb-10 px-2 py-4 border border-dashed border-gray-300 rounded text-center text-xs font-bold uppercase tracking-wider text-gray-500">
          EMPREENDA MAIS ELAS
        </div>

        {/* Links de Navegação Administrativa */}
        <nav className="flex-grow space-y-2">
          <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition">
            Voltar para página anterior
          </a>
          
          {/* Item Ativo - Visão Geral */}
          <a href="#" className="block px-4 py-2.5 text-sm font-semibold text-[#A63A2B] bg-[#FDF3F1] rounded-md">
            Visão Geral
          </a>

          {["Validar Projetos", "Parceiros / SEBRAE", "Relatórios Financeiros", "Feedback das Usuárias", "Usuárias cadastradas"].map((item) => (
            <a key={item} href="#" className="block px-4 py-2.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 transition">
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col">
        
        {/* NAVBAR SUPERIOR */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Área de Monitoramento Geral (Admin)</span>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#7B5294] flex items-center justify-center text-xs font-bold text-white"></div>
            <span className="text-sm font-semibold text-gray-700">Administrador(a)</span>
          </div>
        </header>

        {/* CONTEÚDO DA ÁREA DE TRABALHO */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Cabeçalho de Métricas */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Métricas Gerais da Plataforma</h1>
            <p className="text-gray-500 mt-1 text-sm">Controle de impacto social, acompanhamento de acessos das trilhas e aprovação de novas lojas.</p>
          </div>

          {/* GRID DE CARDS - MÉTRICAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 - Mulheres Inscritas */}
            <div className="bg-white p-6 rounded-xl border-t-4 border-[#A63A2B] border-x border-b border-gray-200/60 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total de Mulheres Inscritas</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">1.405 Empreendedoras</h2>
              <span className="text-xs font-semibold text-green-600 block mt-2">+54 novas esta semana</span>
            </div>

            {/* Card 2 - Trilhas Concluídas */}
            <div className="bg-white p-6 rounded-xl border-t-4 border-[#7B5294] border-x border-b border-gray-200/60 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Trilhas Concluídas</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">312 Certificados</h2>
              <span className="text-xs font-semibold text-green-600 block mt-2">88% de engajamento ativo</span>
            </div>

            {/* Card 3 - Microcréditos */}
            <div className="bg-white p-6 rounded-xl border-t-4 border-[#1E7E34] border-x border-b border-gray-200/60 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Microcréditos Solicitados</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">42 Encaminhamentos</h2>
              <span className="text-xs font-medium text-gray-400 block mt-2">Conexão direta com bancos parceiros</span>
            </div>

          </div>

          {/* TABELA DE APROVAÇÕES */}
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Aprovação Pendente de Novas Lojas no Marketplace</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
                    <th className="pb-3 font-semibold">Empreendedora</th>
                    <th className="pb-3 font-semibold">Nome da Loja Solicitada</th>
                    <th className="pb-3 font-semibold">Polo / Cidade</th>
                    <th className="pb-3 font-semibold">Status Diagnóstico</th>
                    <th className="pb-3 font-semibold text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {solicitacoes.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 font-medium text-gray-900">{item.empreendedora}</td>
                      <td className="py-4">{item.loja}</td>
                      <td className="py-4">{item.polo}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded text-xs font-medium ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 flex justify-center">
                        {item.acaoPrincipal ? (
                          <button className="bg-[#A63A2B] hover:bg-[#8F3024] text-white px-4 py-2 rounded-lg font-medium text-xs transition shadow-sm">
                            Aprovar Catálogo
                          </button>
                        ) : (
                          <button className="border border-[#A63A2B] text-[#A63A2B] hover:bg-[#FDF3F1] px-4 py-2 rounded-lg font-medium text-xs transition">
                            Revisar Perfil
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}