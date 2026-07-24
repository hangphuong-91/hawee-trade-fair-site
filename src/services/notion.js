const _cache = new Map()
const CACHE_TTL = 5 * 60 * 1000

const notionFetch = async (action, params = {}) => {
  const key = action + JSON.stringify(params)
  const hit = _cache.get(key)
  if (hit && Date.now() - hit.ts < CACHE_TTL) return hit.data

  const res = await fetch('/api/notion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, params }),
  })
  if (!res.ok) throw new Error(`Notion proxy ${res.status}`)
  const data = await res.json()
  _cache.set(key, { data, ts: Date.now() })
  return data
}

const richText = (p) => p?.rich_text?.map((r) => r.plain_text).join('') ?? ''
const titleText = (p) => p?.title?.map((r) => r.plain_text).join('') ?? ''
const selectVal = (p) => p?.select?.name ?? ''
const checkboxVal = (p) => p?.checkbox ?? false
const fileVal = (p) => {
  const f = p?.files?.[0]
  return f?.file?.url ?? f?.external?.url ?? null
}

const mapExhibitor = (page) => {
  const p = page.properties
  return {
    id: page.id,
    name: titleText(p.Title),
    logo: fileVal(p.Logo),
    industry: selectVal(p.Industry),
    description: richText(p.Description),
    featured: checkboxVal(p.Featured),
  }
}

export const getExhibitors = async () => {
  const data = await notionFetch('getExhibitors')
  return (data.results ?? []).map(mapExhibitor)
}
