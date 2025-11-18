import { useState } from "react"
import axios from "../../lib/axios"
import type { Notification } from "./types"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const load = async (userId: string) => {
    const res = await axios.get(`/notifications/user/${userId}`)
    const data: Notification[] = res.data

    setNotifications(data)
    setUnreadCount(data.filter(n => !n.read).length)
  }

  const markOne = async (id: string) => {
    await axios.patch(`/notifications/${id}/read`)

    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    )

    setUnreadCount(prev => prev - 1)
  }

  return { notifications, unreadCount, load, markOne }
}
