// Cloudflare Pages Function: GET /api/balance
// Checks the DeepSeek account balance using DEEPSEEK_API_KEY from the
// Cloudflare dashboard environment variables.
export async function onRequestGet(context) {
  const key = context.env.DEEPSEEK_API_KEY;
  if (!key) {
    return new Response(
      JSON.stringify({ error: 'DEEPSEEK_API_KEY 未設定，請喺 Cloudflare 頁面設定環境變數。' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  const res = await fetch('https://api.deepseek.com/user/balance', {
    headers: { Authorization: `Bearer ${key}` },
  });
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
