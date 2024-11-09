export const dynamic = 'force-static'
 
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = process.env.SPOTIFY_KEY;
async function fetchWebApi(endpoint:any, method:any, body:any) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    //body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

    const response = await fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=50', 'GET', {})
    return (response).items;
}

export async function GET() {
  const topTracks:any = await getTopTracks()
  const TracksList = topTracks?.map(
    ({name, artists}:any) =>
    `${name} by ${artists.map((artist: { name: any; }) => artist.name).join(', ')}`
  )
  return Response.json(TracksList)

}




