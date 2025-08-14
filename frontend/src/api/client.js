const API_BASE = 'https://location-map.onrender.com'  // example: 'http://localhost:4000'

export async function api(path, { method = 'GET', body, token, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  console.log('API Response:', { path, method, body, token, data });
  console.log(API_BASE)
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}