"use client"

import { useTelephonyEvents } from "@/hooks/useTelephonyEvents";
import { FormattedJsonView } from "./FormattedJsonView";
import { NavigationView } from "./NavigationView";
import { useEffect, useState } from "react";
import { getAcessToken, getWebsocketToken } from "@/rc-api";
import { TelephonySessionEvent } from "@/rc-api/TelephonySessionEvent";

export function MainView() {
    const [wsToken, setWsToken] = useState<string | undefined>()
    const { telephonySessionEvents, subscribe } = useTelephonyEvents()
    const [selectedEvent, setSelectedEvent] = useState<TelephonySessionEvent | undefined>()
    const [selectedTelephonySessionId, setSelectedTelephonySessionId] = useState('')

    useEffect(() => {
        fetchTokens()
    }, [])

    async function fetchTokens() {

        if (wsToken) {
            return
        }

        const accessTokenData = await getAcessToken()
        if (!accessTokenData) {
            return
        }

        const webSocketTokenData = await getWebsocketToken(accessTokenData.access_token)
        if (!webSocketTokenData) {
            return
        }

        setWsToken(webSocketTokenData.ws_access_token)
        await subscribe(webSocketTokenData)
    }

    function handleClick(value: string) {
        setSelectedTelephonySessionId(value)
        setSelectedEvent(undefined)
    }

    function handleSequenceSelection(value: string) {
        const parsedSequence = parseInt(value)
        const selectedEvent = telephonySessionEvents.find((event) => event.telephonySessionId === selectedTelephonySessionId && event.sequence === parsedSequence)
        setSelectedEvent(selectedEvent)
    }

    function uniqueTelephonySessionIds() {
        const eventIds = telephonySessionEvents.map((event) => event.telephonySessionId)
        const set = new Set(eventIds)
        return Array.from(set).reverse()
    }

    function uniqueSequences() {
        const sequences = telephonySessionEvents.filter((event) => event.telephonySessionId === selectedTelephonySessionId).map((event) => `${event.sequence}`)
        const set = new Set(sequences)
        return Array.from(set).sort((a, b) => {
            const parsedA = parseInt(a)
            const parsedB = parseInt(b)

            if (parsedA < parsedB) return 1
            return -1
        })
    }

    return (
        <div>

            <div className="space-x-2 inline">
                <NavigationView
                    label="Telephony Sessions"
                    options={uniqueTelephonySessionIds()}
                    onClick={handleClick}
                />
                <NavigationView
                label="Events"
                    options={uniqueSequences()}
                    onClick={handleSequenceSelection}
                />
            </div>

            <FormattedJsonView json={selectedEvent ? selectedEvent : {}} />

        </div>
    )
}