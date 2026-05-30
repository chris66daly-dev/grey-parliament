export type PostcodeResult = {
  postcode: string
  constituency: string
  mpId: string
  mpName: string
  mpEmail: string | null
  mpParty: string | null
}

export async function lookupPostcode(postcode: string): Promise<PostcodeResult | null> {
  const clean = postcode.trim().toUpperCase().replace(/\s+/g, '')

  // 1. postcodes.io → parliamentary constituency
  const pcRes = await fetch(
    `https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`,
    { next: { revalidate: 86400 } } // postcodes don't change often
  )
  if (!pcRes.ok) return null

  const pcData = await pcRes.json()
  const constituency: string | undefined = pcData.result?.parliamentary_constituency
  if (!constituency) return null

  // 2. UK Parliament Members API → current MP for constituency
  const mpRes = await fetch(
    `https://members-api.parliament.uk/api/Members/Search?constituency=${encodeURIComponent(constituency)}&House=Commons&IsCurrentMember=true`,
    { headers: { Accept: 'application/json' }, next: { revalidate: 3600 } }
  )
  if (!mpRes.ok) return null

  const mpData = await mpRes.json()
  const mp = mpData.items?.[0]?.value
  if (!mp) return null

  // 3. MP contact details → email
  let mpEmail: string | null = null
  try {
    const contactRes = await fetch(
      `https://members-api.parliament.uk/api/Members/${mp.id}/Contact`,
      { headers: { Accept: 'application/json' }, next: { revalidate: 3600 } }
    )
    if (contactRes.ok) {
      const contactData = await contactRes.json()
      mpEmail =
        (contactData.value as Array<{ line1?: string }>)
          ?.find(c => typeof c.line1 === 'string' && c.line1.includes('@'))
          ?.line1 ?? null
    }
  } catch {
    // email is optional — proceed without it
  }

  return {
    postcode: clean,
    constituency,
    mpId: String(mp.id),
    mpName: mp.nameDisplayAs as string,
    mpEmail,
    mpParty: (mp.latestParty?.name as string) ?? null,
  }
}
