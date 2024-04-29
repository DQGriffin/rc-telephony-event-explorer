import { AccessTokenData } from "@/types/AccessToken"
import { WebSocketTokenData } from "@/types/WsAccessToken"

export async function getAcessToken() {
    try {
        const res = await fetch('/api/token')
        const json: AccessTokenData = await res.json()
        return json   
    }
    catch (e) {
        console.log('Error in getAccessToken')
        console.error(e)
    }
}

export async function getWebsocketToken(accessToken: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RC_SERVER_URL}/restapi/oauth/wstoken`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        const json: WebSocketTokenData = await res.json()
        return json
    }
    catch (e) {
        console.log('Error in getWebsocketToken')
        console.error(e)
    }
}