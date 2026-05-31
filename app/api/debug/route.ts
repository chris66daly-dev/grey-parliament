import{NextResponse}from"next/server"
export async function GET(){return NextResponse.json({url:!!process.env.NEXT_PUBLIC_SUPABASE_URL,key:!!process.env.SUPABASE_SERVICE_ROLE_KEY,anon:!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,urlVal:process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0,30)})}
