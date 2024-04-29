import { SubscriptionManager } from "@/rc-api/SubscriptionManager";
import { TelephonySessionEvent } from "@/rc-api/TelephonySessionEvent";
import { WebSocketTokenData } from "@/types/WsAccessToken";
import { useState } from "react";

export function useTelephonyEvents() {
    const [manager, setManager] = useState<SubscriptionManager | null>(null)
    const [telephonySessionEvents, setTelephonySessionEvents] = useState<TelephonySessionEvent[]>([])

    async function subscribe(tokenData: WebSocketTokenData) {
        const newManager = new SubscriptionManager()
        newManager.onTelephonySessionEvent = handleTelephonySessionEvent
        await newManager.subscribe(tokenData.ws_access_token, tokenData.uri)
        setManager(newManager)
    }

    function handleTelephonySessionEvent(event: TelephonySessionEvent) {
        const existingEvent = telephonySessionEvents.find((e) => e.telephonySessionId === event.telephonySessionId && e.sequence === event.sequence)
        if (existingEvent) {
            return
        }
        setTelephonySessionEvents((prev) => [...prev, event])
    }

    return { telephonySessionEvents, subscribe }
}