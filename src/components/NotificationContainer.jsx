export default function NotificationContainer({ notifications, onRemove }) {
  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-white'
      case 'info':
      default:
        return 'bg-blue-500 text-white'
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
      default:
        return 'ℹ'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`${getColors(notif.type)} px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 animate-slide-in`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold">{getIcon(notif.type)}</span>
            <span className="text-sm font-medium">{notif.message}</span>
          </div>
          <button
            onClick={() => onRemove(notif.id)}
            className="text-lg font-bold opacity-70 hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
