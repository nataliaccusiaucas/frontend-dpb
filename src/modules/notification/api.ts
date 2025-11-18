import api from "../../lib/axios"

export async function fetchNotifications(userId: string) {
  const { data } = await api.get(`/api/notifications/user/${userId}`)
  return data
}

export async function markAsRead(notificationId: string) {
  await api.patch(`/api/notifications/${notificationId}/read`)
}
