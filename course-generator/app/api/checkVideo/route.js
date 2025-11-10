export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const videoId = searchParams.get('id')

    if (!videoId) {
        return Response.json({ valid: false }, { status: 400 })
    }

    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`

    try {
        const res = await fetch(url)
        if (!res.ok) {
            return Response.json({ valid: false })
        }
        return Response.json({ valid: true })
    } catch (err) {
        return Response.json({ valid: false })
    }
}
