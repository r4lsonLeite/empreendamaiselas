import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Diagnóstico', to: '/diagnostico' },
  { label: 'Trilhas', to: '/trilhas' },
  { label: 'Mentorias', to: '/mentorias' },
  { label: 'Painel da empreendedora', to: '/painel-empreendedora' },
  { label: 'Marketplace', to: '/marketplace' },
];

export default function Dashboard() {
  const activeLabel = 'Dashboard';

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
          <span className="text-sm font-medium text-on-surface-variant">Painel Inicial</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-xs font-bold text-on-surface">AS</div>
            <span className="text-sm font-semibold text-on-surface">Amanda Silva</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-5xl w-full">
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Olá, Amanda!</h1>
            <p className="text-sm text-on-surface-variant">Acompanhe o desenvolvimento e os próximos passos do seu negócio local.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
            {/* Estágio Atual */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-3">Estágio Atual</p>
              <p className="text-lg font-bold text-on-surface mb-1">Fase de Ideia</p>
              <p className="text-sm text-on-surface-variant">Trilha Inicial Ativa</p>
            </div>

            {/* Progresso da Trilha */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-3">Progresso da Trilha</p>
              <p className="text-lg font-bold text-on-surface mb-3">45% Concluído</p>
              <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            {/* Próximo Encontro */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-3">Próximo Encontro</p>
              <p className="text-lg font-bold text-on-surface mb-1">Amanhã, 15h</p>
              <p className="text-sm text-on-surface-variant">Mentoria de Finanças</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
