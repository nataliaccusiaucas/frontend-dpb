import api from "../../lib/axios"
import type { Conversation, Message } from "./types"

export async function listConversations(userId: string): Promise<Conversation[]> {
  const { data } = await api.get(`/chat/conversations/user/${userId}`)
  return data
}

export async function listMessages(conversationId: string): Promise<Message[]> {
  const { data } = await api.get(`/chat/conversations/${conversationId}/messages`)
  return data
}

export async function sendMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
  const { data } = await api.post(`/chat/conversations/${conversationId}/messages`, {
    senderId,
    content,
  })
  return data
}
