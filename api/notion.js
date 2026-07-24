export default async function handler(req, res) {
  const origin = req.headers.origin || ''
  const allowed = process.env.ALLOWED_ORIGIN || ''
  if (!allowed || origin === allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const NOTION_KEY = process.env.NOTION_API_KEY
  const EXHIBITORS_DB = process.env.NOTION_EXHIBITORS_DB_ID

  if (!NOTION_KEY || !EXHIBITORS_DB) {
    return res.status(503).json({ error: 'Notion not configured', results: [] })
  }

  const notionPost = async (endpoint, body) => {
    const r = await fetch(`https://api.notion.com/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify(body),
    })
    if (!r.ok) {
      const err = await r.json().catch(() => ({}))
      throw new Error(err.message || `Notion API ${r.status}`)
    }
    return r.json()
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = {} }
  }
  const { action } = body || {}

  try {
    let data
    switch (action) {
      case 'getExhibitors': {
        data = await notionPost(`databases/${EXHIBITORS_DB}/query`, {
          filter: { property: 'Status', select: { equals: 'Published' } },
          sorts: [
            { property: 'Featured', direction: 'descending' },
            { property: 'Order', direction: 'ascending' },
          ],
        })
        break
      }
      default:
        return res.status(400).json({ error: `Unknown action: ${action}` })
    }
    return res.status(200).json(data)
  } catch (err) {
    console.error('Notion API error:', err.message)
    const isDev = process.env.VERCEL_ENV !== 'production'
    return res.status(500).json({ error: isDev ? err.message : 'Internal server error', results: [] })
  }
}
