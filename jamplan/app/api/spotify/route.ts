export const dynamic = 'force-static'
 
export async function GET() {

  //const data = await res.json()
  const data = "hi"
  return Response.json({ data })
}