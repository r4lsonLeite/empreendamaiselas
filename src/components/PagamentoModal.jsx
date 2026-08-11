import { useState } from 'react'
import { createPagamento } from '../services/api'

export default function PagamentoModal({ pedido, onClose, onSuccess }) {
  const [metodo, setMetodo] = useState('pix')
  const [cardData, setCardData] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvc: '',
  })
  const [processing, setProcessing] = useState(false)
  const [pixCode, setPixCode] = useState(null)

  const handleCardChange = (e) => {
    const { name, value } = e.target
    let formatted = value

    if (name === 'numero') {
      formatted = value.replace(/\s/g, '').slice(0, 16)
      formatted = formatted.replace(/(\d{4})/g, '$1 ').trim()
    } else if (name === 'validade') {
      formatted = value.replace(/\D/g, '').slice(0, 4)
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2)
      }
    } else if (name === 'cvc') {
      formatted = value.replace(/\D/g, '').slice(0, 3)
    }

    setCardData((prev) => ({ ...prev, [name]: formatted }))
  }

  const handlePay = async (e) => {
    e.preventDefault()
    setProcessing(true)

    try {
      if (metodo === 'pix') {
        // Simular geração de QR code PIX
        const pixQRCode = `00020126580014br.gov.bcb.brcode0136123e4567-e12b-12d1-a456-426655440000520400005303986540${pedido.valorTotal.toFixed(2).replace('.', '')}5802BR5913EMPREENDA MAIS ELAS6009SAO PAULO62070503***63041D3D`
        setPixCode(pixQRCode)

        await createPagamento({
          pedido_id: pedido.id,
          metodo: 'pix',
          valor: pedido.valorTotal,
          status: 'pendente',
          dados_pix: pixQRCode,
        })
      } else if (metodo === 'cartao') {
        // Simular pagamento com cartão
        if (!cardData.numero || !cardData.nome || !cardData.validade || !cardData.cvc) {
          alert('Preencha todos os dados do cartão')
          setProcessing(false)
          return
        }

        await createPagamento({
          pedido_id: pedido.id,
          metodo: 'cartao',
          valor: pedido.valorTotal,
          status: 'confirmado',
          dados_cartao: {
            ultimos_digitos: cardData.numero.slice(-4),
            bandeira: 'Visa',
          },
        })

        onSuccess?.('Pagamento confirmado com sucesso!')
        onClose()
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      alert('Erro ao processar pagamento')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-on-surface mb-4">Pagar Pedido</h2>

        <div className="mb-6 p-4 bg-surface-container-low rounded-lg">
          <p className="text-xs text-on-surface-variant uppercase font-bold mb-1">Valor Total</p>
          <p className="text-2xl font-bold text-primary">R$ {pedido.valorTotal.toFixed(2).replace('.', ',')}</p>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          {/* Seleção de Método */}
          <div>
            <label className="text-sm font-bold text-on-surface-variant uppercase mb-3 block">
              Método de Pagamento
            </label>
            <div className="space-y-2">
              {[
                { id: 'pix', label: '📱 PIX', desc: 'Transferência instantânea' },
                { id: 'cartao', label: '💳 Cartão de Crédito', desc: 'Visa/Mastercard' },
              ].map((m) => (
                <label key={m.id} className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition" style={{ borderColor: metodo === m.id ? '#6750a4' : '#ccc' }}>
                  <input type="radio" name="metodo" value={m.id} checked={metodo === m.id} onChange={(e) => setMetodo(e.target.value)} className="w-4 h-4" />
                  <div>
                    <p className="font-bold text-sm">{m.label}</p>
                    <p className="text-xs text-on-surface-variant">{m.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* PIX */}
          {metodo === 'pix' && !pixCode && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-on-surface-variant">Clique em "Gerar QR Code" para receber o código PIX</p>
            </div>
          )}

          {/* PIX QR Code */}
          {pixCode && (
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-xs text-on-surface-variant mb-3 font-bold uppercase">Código PIX Gerado</p>
              <div className="bg-white p-3 rounded-lg mb-3 font-mono text-xs break-all">{pixCode.slice(0, 50)}...</div>
              <p className="text-xs text-on-surface-variant">Copie o código ou escaneie um QR code (simulado)</p>
            </div>
          )}

          {/* Cartão */}
          {metodo === 'cartao' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Número do Cartão</label>
                <input
                  type="text"
                  name="numero"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.numero}
                  onChange={handleCardChange}
                  className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Nome no Cartão</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="SEU NOME"
                  value={cardData.nome}
                  onChange={handleCardChange}
                  className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Validade</label>
                  <input
                    type="text"
                    name="validade"
                    placeholder="MM/AA"
                    value={cardData.validade}
                    onChange={handleCardChange}
                    className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={handleCardChange}
                    className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm font-mono"
                  />
                </div>
              </div>
              <p className="text-xs text-on-surface-variant italic">Use cartão de teste: 4242 4242 4242 4242</p>
            </div>
          )}

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
              disabled={processing}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-sm disabled:opacity-70"
            >
              {processing ? 'Processando...' : metodo === 'pix' && !pixCode ? 'Gerar QR Code' : 'Pagar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
