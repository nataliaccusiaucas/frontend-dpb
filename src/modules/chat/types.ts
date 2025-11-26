export type Conversation = {
  id: string
  jobTitle: string
  clientName: string
  freelancerName: string
  createdAt: string
}

export type Message = {
  id: string
  senderId: string
  senderName: string
  content: string
  createdAt: string
}
