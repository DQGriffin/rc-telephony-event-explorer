export const revalidate = 0;

export async function GET() {
    const environmentToken = process.env.ACCESS_TOKEN

    if (environmentToken && environmentToken.length > 0) {
        return new Response(JSON.stringify({ access_token: environmentToken }, null, 2), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const basicToken = Buffer.from(`${process.env.RC_CLIENT_ID}:${process.env.RC_CLIENT_SECRET}`).toString('base64')
    const params = new URLSearchParams()
    params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer')
    params.append('assertion', process.env.RC_JWT!)

    const res = await fetch(`${process.env.NEXT_PUBLIC_RC_SERVER_URL}/restapi/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicToken}`
        },
        body: params
    })

    const json = await res.json()
    return new Response(JSON.stringify(json, null, 2), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}