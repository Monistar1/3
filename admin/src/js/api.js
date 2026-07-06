const API_BASE = 'http://localhost:4000/api';

function getToken() {
  return localStorage.getItem('ea-token');
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    ...options.headers
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}

export const api = {
  login: (email, password) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),

  getProfile: (id) => request(`/profiles/${id}/full`),
  updateProfile: (id, body) => request(`/profiles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body)
  })
};
