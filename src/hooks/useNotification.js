import { useState, useCallback, useRef, useEffect } from 'react'

let notificationId = 0

export function useNotification() {
  const [notifications, setNotifications] = useState([])
  const timeoutRefs = useRef({})

  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++notificationId
    
    setNotifications((prev) => [...prev, { id, message, type }])

    if (duration > 0) {
      const timeout = setTimeout(() => {
        removeNotification(id)
      }, duration)
      timeoutRefs.current[id] = timeout
    }

    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id])
      delete timeoutRefs.current[id]
    }
  }, [])

  const success = useCallback((message, duration = 4000) => {
    return addNotification(message, 'success', duration)
  }, [addNotification])

  const error = useCallback((message, duration = 5000) => {
    return addNotification(message, 'error', duration)
  }, [addNotification])

  const warning = useCallback((message, duration = 4000) => {
    return addNotification(message, 'warning', duration)
  }, [addNotification])

  const info = useCallback((message, duration = 4000) => {
    return addNotification(message, 'info', duration)
  }, [addNotification])

  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout)
    }
  }, [])

  return { notifications, addNotification, removeNotification, success, error, warning, info }
}
