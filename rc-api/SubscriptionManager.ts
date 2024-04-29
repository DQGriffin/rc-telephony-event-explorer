import { safeParse } from "@/utils"
import { TelephonySessionEvent } from "./TelephonySessionEvent"

export class SubscriptionManager {
    webSocket: WebSocket | null = null
    onTelephonySessionEvent: (event: TelephonySessionEvent) => void = () => { }

    constructor() { }

    async subscribe(token: string, uri: string) {
        if (!token || !uri) {
            console.error('Invalid token or uri')
            return
        }
        this.webSocket = new WebSocket(`${uri}?access_token=${token}`)
        this.webSocket.onopen = this.onOpen
        this.webSocket.onerror = this.onError
        this.webSocket.onmessage = this.onMessage
        this.webSocket.onclose = this.onClose
        setInterval(this.sendHeartbeat, 25000)
    }

    getSubscriptionPayload = () => {
        const payload = [
            {
                type: "ClientRequest",
                messageId: "11618510-987d-442e-8dcf-0640b82e4ff5",
                method: "POST",
                path: "/restapi/v1.0/subscription/"
            },
            {
                eventFilters: [
                    "/restapi/v1.0/account/~/telephony/sessions",
                ],
                deliveryMode: {
                    transportType: "WebSocket"
                }
            }
        ]
        return payload
    }

    sendHeartbeat = () => {

        if (!this.webSocket || this.webSocket.readyState !== this.webSocket.OPEN) {
            console.error('WebSocket is not open. Cannot send heartbeat!')
            return
        }

        const data = {
            type: 'Heartbeat',
            messageId: `${Math.random()}`,
        }

        this.webSocket.send(JSON.stringify([data]))

    }

    requestSubscription = () => {
        if (!this.webSocket || this.webSocket.readyState !== this.webSocket.OPEN) {
            console.error('WebSocket is not open. Cannot request subscription!')
            return
        }

        this.webSocket.send(JSON.stringify(this.getSubscriptionPayload()))
    }

    onOpen = (event: any) => {
        console.log('WebSocket connection opened:', event)
        this.sendHeartbeat()
        this.requestSubscription()
    }

    onError = (event: any) => {
        console.error('WebSocket error observed:', event)
    }

    onMessage = (event: any) => {
        const data = safeParse(event.data)

        if (data && data[0] && data[0].type === 'ServerNotification') {
            const body: TelephonySessionEvent = data[1].body
            this.onTelephonySessionEvent(body)
        }
    }

    onClose = (event: any) => {
        console.log('WebSocket connection closed:', event)
    }
}