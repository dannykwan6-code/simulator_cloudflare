// Cloudflare Pages Function: POST /api/chat
// Forwards the request body to DeepSeek chat completions using the
// DEEPSEEK_API_KEY environment variable (set in the Cloudflare dashboard).
// The key never appears in the page.
export async function onRequestPost(context) {
  const key = context.env.DEEPSEEK_API_KEY;
  if (!key) {
    return new Response(
      JSON.stringify({ error: 'DEEPSEEK_API_KEY 未設定，請喺 Cloudflare 頁面設定環境變數。' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  const body = await context.request.json();
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
