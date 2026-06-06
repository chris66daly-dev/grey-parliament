import { redirect } from "next/navigation"
import { getSupabase } from "@/lib/supabase"

export default async function VotePage() {
  const client = getSupabase()
  if (!client) redirect("/")

  const { data } = await client
    .from("questions")
    .select("id")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (!data) redirect("/")
  redirect(`/vote/${data.id}`)
}
