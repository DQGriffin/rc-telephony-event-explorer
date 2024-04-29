export type ServerNotification = {
    type: string
    messageId: string
    status: string
    headers: {
        RCRequestId: string
    }
}