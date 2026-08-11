import { useState } from 'react'
import { createAvaliacaoMentoria } from '../services/api'

export default function AvaliacaoMentoriaModal({ mentoria, onClose, onSuccess }) {
  const [rating, setRating] = useState(5)
  const [comentario, setComentario] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await createAvaliacaoMentoria({
        mentoria_id: mentoria.id,
        usuario_id: mentoria.usuarioId,
        nota: rating,
        comentario: comentario || null,
      })
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Erro ao avaliar:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-on-surface mb-4">Avaliar Mentoria</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-on-surface-variant uppercase mb-3 block">
              Tema: {mentoria.tema}
            </label>
            <p className="text-xs text-on-surface-variant mb-4">
              Mentora: {mentoria.mentora}
            </p>
          </div>

          <div>
            <label className="text-sm font-bold text-on-surface-variant uppercase mb-3 block">
              Sua Avaliação
            </label>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl transition ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-xs text-on-surface-variant">
              {rating === 5 && 'Excelente!'}
              {rating === 4 && 'Muito bom!'}
              {rating === 3 && 'Bom'}
              {rating === 2 && 'Pode melhorar'}
              {rating === 1 && 'Precisa melhorar'}
            </p>
          </div>

          <div>
            <label className="text-sm font-bold text-on-surface-variant uppercase mb-2 block">
              Comentário (opcional)
            </label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Compartilhe sua experiência..."
              rows={3}
              className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-bold text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-sm disabled:opacity-70"
            >
              {saving ? 'Enviando...' : 'Avaliar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
