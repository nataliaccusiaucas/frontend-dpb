import api from "../../lib/axios"

export async function fetchNotifications(userId: string) {
  const { data } = await api.get(`/notifications/user/${userId}`)
  return data
}

export async function markAsRead(notificationId: string) {
  await api.patch(`/notifications/${notificationId}/read`)
}
