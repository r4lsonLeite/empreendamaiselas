import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';
import { useEffect } from 'react';
import { listTrilhas } from '../services/api';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Diagnóstico', to: '/diagnostico' },
  { label: 'Trilhas', to: '/trilhas' },
  { label: 'Mentorias', to: '/mentorias' },
  { label: 'Painel da empreendedora', to: '/painel-empreendedora' },
  { label: 'Marketplace', to: '/marketplace' },
];

const modulos = [
  {
    categoria: 'MÓDULO 1 • INCLUSÃO DIGITAL',
    titulo: 'Alfabetização Digital para Negócios',
    descricao: 'Aprenda a posicionar sua ideia no ecossistema digital usando ferramentas acessíveis.',
    acao: 'Continuar Aprendizado',
    variante: 'solida',
  },
  {
    categoria: 'MÓDULO 2 • PLANEJAMENTO',
    titulo: 'Construindo seu Modelo de Negócio',
    descricao: 'Aprenda o passo a passo para colocar sua estratégia comercial no papel de forma descomplicada.',
    acao: 'Iniciar Módulo',
    variante: 'outline',
  },
];

export default function Trilhas() {
  const activeLabel = 'Trilhas';
  const [abaAtiva, setAbaAtiva] = useState('jornada');
  const [trilhas, setTrilhas] = useState([]);

  useEffect(() => {
    listTrilhas()
      .then((data) => setTrilhas(Array.isArray(data) ? data : []))
      .catch(() => setTrilhas([]));
  }, []);

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
          <span className="text-sm font-medium text-on-surface-variant">Capacitação Digital</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-xs font-bold text-on-surface">AS</div>
            <span className="text-sm font-semibold text-on-surface">Amanda Silva</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-5xl w-full">
          <div className="mb-stack-md">
            <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Sua Trilha de Conhecimento</h1>
            <p className="text-sm text-on-surface-variant">Cursos recomendados focados em autonomia, formalização e marketing comercial.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-stack-md border-b border-outline-variant/20 mb-stack-lg">
            <button
              onClick={() => setAbaAtiva('jornada')}
              className={
                abaAtiva === 'jornada'
                  ? 'pb-2 text-sm font-bold text-primary border-b-2 border-primary'
                  : 'pb-2 text-sm font-medium text-on-surface-variant border-b-2 border-transparent hover:text-primary transition'
              }
            >
              Minha Jornada
            </button>
            <button
              onClick={() => setAbaAtiva('modulos')}
              className={
                abaAtiva === 'modulos'
                  ? 'pb-2 text-sm font-bold text-primary border-b-2 border-primary'
                  : 'pb-2 text-sm font-medium text-on-surface-variant border-b-2 border-transparent hover:text-primary transition'
              }
            >
              Todos os Módulos
            </button>
          </div>

          {/* Cards de módulo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
            {(trilhas.length ? trilhas.map((trilha) => ({
              categoria: `TRILHA • ${trilha.tipo || 'geral'}`,
              titulo: `Trilha #${trilha.id}`,
              descricao: `${trilha.itens?.length || 0} conteúdos associados`,
              acao: trilha.status === 'ativa' ? 'Continuar Aprendizado' : 'Iniciar Módulo',
              variante: trilha.status === 'ativa' ? 'solida' : 'outline',
            })) : modulos).map((modulo) => (
              <div key={modulo.titulo} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5 flex flex-col">
                <p className="text-xs font-bold uppercase tracking-wide text-primary mb-3">{modulo.categoria}</p>
                <h2 className="text-lg font-bold text-on-surface mb-2">{modulo.titulo}</h2>
                <p className="text-sm text-on-surface-variant mb-5 flex-grow">{modulo.descricao}</p>
                <button
                  className={
                    modulo.variante === 'solida'
                      ? 'w-full py-2.5 bg-primary text-on-primary font-label-md font-bold rounded-lg hover:bg-primary/90 transition'
                      : 'w-full py-2.5 border border-primary text-primary font-label-md font-bold rounded-lg hover:bg-primary-fixed/30 transition'
                  }
                >
                  {modulo.acao}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
