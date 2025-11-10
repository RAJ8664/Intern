export const dynamic = 'force-dynamic'
import axios from 'axios'

// const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3'
// const getVideos = async (query) => {
//     const params = {
//         part: 'snippet',
//         q: query,
//         maxResults: 1,
//         type: 'video',
//         videoDuration: 'long',
//         key: process.env?.NEXT_PUBLIC_YOUTUBE_API_KEY,
//     }
//     const response = await axios.get(YOUTUBE_BASE_URL + '/search', { params })
//     return response.data.items
// }
// export default { getVideos }
//

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3'

const getVideos = async (query) => {
    if (typeof window === 'undefined') return [] // Prevents running on server

    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY // safe to use in browser
    const params = {
        part: 'snippet',
        q: query,
        maxResults: 1,
        type: 'video',
        videoDuration: 'long',
        key: API_KEY,
    }

    const response = await fetch(
        `${YOUTUBE_BASE_URL}/search?${new URLSearchParams(params)}`,
    )

    const data = await response.json()
    return data.items
}

export default { getVideos }
