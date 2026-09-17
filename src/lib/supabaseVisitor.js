const SUPA_URL = import.meta.env.VITE_SUPABASE_URL    || ''
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const TABLE    = 'arkaserve_visitors'

function getSessionId() {
  let sid = sessionStorage.getItem('arks_sid')
  if (!sid) {
    sid = crypto.randomUUID()
    sessionStorage.setItem('arks_sid', sid)
  }
  return sid
}

/** Record this browser session as a visit (idempotent — duplicate ignored by DB). */
export async function pingVisit() {
  if (!SUPA_URL || !SUPA_KEY) return
  try {
    await fetch(`${SUPA_URL}/rest/v1/${TABLE}`, {
      method: 'POST',
      headers: {
        apikey:         SUPA_KEY,
        Authorization:  `Bearer ${SUPA_KEY}`,
        'Content-Type': 'application/json',
        Prefer:         'resolution=ignore-duplicates,return=minimal',
      },
      body: JSON.stringify({
        session_id: getSessionId(),
        visit_date: new Date().toISOString().slice(0, 10),
        user_agent: navigator.userAgent.slice(0, 200),
      }),
    })
  } catch { /* non-critical — ignore */ }
}

/** Fetch total visitor session count from Supabase. */
export async function fetchVisitorCount() {
  if (!SUPA_URL || !SUPA_KEY) return null
  try {
    const res = await fetch(`${SUPA_URL}/rest/v1/${TABLE}?select=id`, {
      method: 'HEAD',
      headers: {
        apikey:        SUPA_KEY,
        Authorization: `Bearer ${SUPA_KEY}`,
        Prefer:        'count=exact',
      },
    })
    // Content-Range header: "0-24/25" → total is 25
    const range = res.headers.get('content-range')
    return parseInt(range?.split('/')[1] ?? '0', 10)
  } catch {
    return null
  }
}
