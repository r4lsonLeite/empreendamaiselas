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

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'text-amber-400 text-lg' : 'text-gray-300 text-lg'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Feedback() {
  const activeLabel = 'Feedback das Usuárias';
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

  // Dados mockados de feedback
  const feedbacks = [
    {
      id: 1,
      usuaria: 'Maria Silva',
      data: '2024-08-10',
      categoria: 'Plataforma',
      rating: 5,
      mensagem: 'Adorei a experiência! A plataforma é muito intuitiva e fácil de usar. Recomendo!',
      resposta: null,
    },
    {
      id: 2,
      usuaria: 'Ana Costa',
      data: '2024-08-09',
      categoria: 'Mentorias',
      rating: 4,
      mensagem: 'As mentorias foram muito produtivas. Gostaria de mais horários disponíveis.',
      resposta: null,
    },
    {
      id: 3,
      usuaria: 'Beatriz Santos',
      data: '2024-08-08',
      categoria: 'Trilhas',
      rating: 3,
      mensagem: 'O conteúdo é bom, mas seria melhor com mais exemplos práticos.',
      resposta: 'Obrigada! Vamos considerar sua sugestão nas próximas atualizações.',
    },
    {
      id: 4,
      usuaria: 'Carla Mendes',
      data: '2024-08-07',
      categoria: 'Marketplace',
      rating: 5,
      mensagem: 'Consegui vender meus produtos! Muito bom! 🎉',
      resposta: null,
    },
    {
      id: 5,
      usuaria: 'Diana Oliveira',
      data: '2024-08-06',
      categoria: 'Suporte',
      rating: 2,
      mensagem: 'Tive dificuldade ao contactar o suporte. Levou muito tempo para responder.',
      resposta: null,
    },
  ];

  const averageRating = useMemo(
    () => (feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length).toFixed(1),
    [feedbacks],
  );

  const ratingDistribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      count: feedbacks.filter((fb) => fb.rating === rating).length,
    }));
  }, [feedbacks]);

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
          <span className="text-sm font-medium text-on-surface-variant">Centro de Feedback</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-on-secondary">{userInitials}</div>
            <span className="text-sm font-semibold text-on-surface">Administrador(a)</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Feedback das Usuárias</h1>
            <p className="text-sm text-on-surface-variant">Avalie e responda aos comentários e sugestões das empreendedoras.</p>
          </div>

          {/* Resumo de avaliações */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-6 mb-stack-lg">
            <div className="flex items-start gap-8">
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Avaliação Média</p>
                <h3 className="text-4xl font-bold text-on-surface mb-2">{averageRating}</h3>
                <StarRating rating={Math.round(averageRating)} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-on-surface-variant uppercase mb-3">Distribuição de Ratings</p>
                {ratingDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-on-surface w-8">{item.rating}★</span>
                    <div className="flex-1 bg-surface-container-low rounded-full h-2">
                      <div
                        className="bg-primary-fixed rounded-full h-2"
                        style={{ width: `${(item.count / feedbacks.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-on-surface-variant w-12">({item.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lista de Feedback */}
          <div className="space-y-stack-sm">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-6">
                <div className="flex justify-between items-start mb-stack-sm">
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">{feedback.usuaria}</h3>
                    <p className="text-xs text-on-surface-variant">{feedback.categoria} • {feedback.data}</p>
                  </div>
                  <StarRating rating={feedback.rating} />
                </div>
                <p className="text-sm text-on-surface mb-stack-sm">{feedback.mensagem}</p>
                {feedback.resposta && (
                  <div className="bg-primary-fixed p-3 rounded-lg mb-stack-sm border-l-4 border-primary">
                    <p className="text-xs font-bold text-primary mb-1">Resposta do Admin:</p>
                    <p className="text-sm text-on-surface">{feedback.resposta}</p>
                  </div>
                )}
                <div className="flex gap-3">
                  {!feedback.resposta && (
                    <button className="px-3 py-1.5 text-xs font-bold text-primary border border-primary rounded-md hover:bg-primary-fixed transition">
                      Responder
                    </button>
                  )}
                  <button className="px-3 py-1.5 text-xs font-bold text-on-surface-variant border border-outline-variant/20 rounded-md hover:bg-surface-container-low transition">
                    Ver Perfil
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
