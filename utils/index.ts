export function safeParse(json: string) {
    try {
        const parsed = JSON.parse(json)
        return parsed
    }
    catch (e) {
        console.log('Could not parse JSON...')
        console.log(e)
    }
}