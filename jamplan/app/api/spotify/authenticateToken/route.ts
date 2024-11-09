

const client_id = process.env.CLIENT_ID;
const redirect_uri = 'http://localhost:3000/api/spotify'; 

export async function GET(req:Request, res:Response) {

    var state = "1111111111111111";//generateRandomString(16);
    var scope = 'user-read-private user-read-email';

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: client_id?client_id:"",
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
        });

    const url = `https://accounts.spotify.com/authorize?${params.toString()}`
    return new Response(null, {
        status: 302,
        headers: {
            'Location': url,
            'SpotifyToken': params.toString()
        }
    });
}