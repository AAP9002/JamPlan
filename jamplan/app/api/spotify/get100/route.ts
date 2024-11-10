import { headers } from "next/headers";
import { useSearchParams } from "next/navigation";

export const dynamic = 'force-static'
 
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

async function fetchWebApi(endpoint:any, method:any, body:any, token:any) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    //body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(token:any){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

    const response = await fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=50', 'GET', {}, token)
    return (response).items;
}

export async function GET(request:Request) {

  //const token =  process.env.SPOTIFY_KEY;
  
  const urlParams = new URLSearchParams(request.url.split('?')[1]);
  //const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("code")


  const topTracks:any = await getTopTracks(token)
  const TracksList = topTracks?.map(
    ({name, artists}:any) =>
    `${name} by ${artists.map((artist: { name: any; }) => artist.name).join(', ')}`
  )

  if (TracksList === undefined){
    console.log(typeof TracksList)
    return Response.json([],{status: 418})
  }
  return Response.json(TracksList)

}




