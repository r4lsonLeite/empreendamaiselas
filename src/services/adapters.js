export function normalizeUser(user = {}) {
  return {
    id: user.id ?? null,
    nome: user.nome ?? 'Usuária',
    email: user.email ?? '',
    telefone: user.telefone ?? '',
    endereco: user.endereco ?? '',
    papel: user.papel ?? 'empreendedora',
    ativo: Boolean(user.ativo ?? true),
    criadoEm: user.criado_em ?? null,
  }
}

export function normalizeProduct(product = {}) {
  return {
    id: product.id ?? null,
    usuarioId: product.usuario_id ?? null,
    titulo: product.titulo ?? 'Produto sem título',
    descricao: product.descricao ?? '',
    valor: Number(product.valor ?? 0),
    categoria: product.categoria ?? 'geral',
    status: product.status ?? 'ativo',
  }
}

export function normalizeOrder(order = {}) {
  const items = Array.isArray(order.itens)
    ? order.itens.map((item) => ({
        produtoId: item.produto_id ?? null,
        quantidade: Number(item.quantidade ?? 0),
        precoUnitario: Number(item.preco_unitario ?? 0),
        total: Number(item.total ?? 0),
      }))
    : []

  return {
    id: order.id ?? null,
    usuarioId: order.usuario_id ?? null,
    enderecoEntrega: order.endereco_entrega ?? '',
    status: order.status ?? 'criado',
    dataCriacao: order.data_criacao ?? null,
    valorTotal: Number(order.valor_total ?? 0),
    itens: items,
  }
}

export function normalizeTrilha(trilha = {}) {
  return {
    id: trilha.id ?? null,
    usuarioId: trilha.usuario_id ?? null,
    tipo: trilha.tipo ?? 'geral',
    status: trilha.status ?? 'ativa',
    criadoEm: trilha.criado_em ?? null,
    itens: Array.isArray(trilha.itens) ? trilha.itens : [],
  }
}

export function normalizeMentoria(mentoria = {}) {
  return {
    id: mentoria.id ?? null,
    usuarioId: mentoria.usuario_id ?? null,
    mentora: mentoria.mentora ?? 'Mentora',
    dataHora: mentoria.data_hora ?? '',
    tema: mentoria.tema ?? 'Sessão',
    observacoes: mentoria.observacoes ?? '',
    status: mentoria.status ?? 'agendada',
    criadoEm: mentoria.criado_em ?? null,
  }
}

export function normalizeDiagnosis(diagnosis = {}) {
  return {
    id: diagnosis.id ?? null,
    userId: diagnosis.user_id ?? null,
    scoreFirst: Number(diagnosis.score_first ?? 0),
    level: diagnosis.level ?? 'iniciante',
    answers: diagnosis.answers ?? {},
    dateApp: diagnosis.date_app ?? null,
  }
}
