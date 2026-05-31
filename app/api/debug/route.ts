import{NextResponse}from"next/server"
import{createClient}from"@supabase/supabase-js"
export async function GET(){
  const client=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{autoRefreshToken:false,persistSession:false}})
  const result=await client.from("questions").select("id,text,approved").limit(5)
  return NextResponse.json({data:result.data,error:result.error?.message})
}
