import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerAuth } from "@/lib/supabase-server"

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerAuth()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

  const { questionId, vote } = await req.json()

  const { data: profile } = await supabase.from("profiles").select("has_used_free_vote").eq("id", user.id).single()
  if (profile?.has_used_free_vote) return NextResponse.json({ error: "Free vote already used" }, { status: 403 })

  await supabase.from("votes").insert({ user_id: user.id, question_id: questionId, vote })
  await supabase.from("profiles").update({ has_used_free_vote: true }).eq("id", user.id)

  return NextResponse.json({ success: true })
}