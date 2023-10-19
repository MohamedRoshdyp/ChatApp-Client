
export interface Message {
    id: number
    senderId: string
    senderUserName: string
    senderProfileUrl: string
    recipientId: string
    recipientUserName: string
    recipientProfileUrl: string
    content: string
    dateRead?: Date
    messageSend: Date
}
