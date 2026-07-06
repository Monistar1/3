/**
 * Minimal API client for future backend integration.
 * Currently reads from local JSON locale files; ready to switch to REST endpoints.
 */

class ApiClient {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const res = await fetch(`${this.baseUrl}${path}`);
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json();
  }

  async post(path, body) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
    return res.json();
  }

  async patch(path, body) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`PATCH ${path} failed: ${res.status}`);
    return res.json();
  }

  async delete(path) {
    const res = await fetch(`${this.baseUrl}${path}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
    return res.json();
  }
}

export const api = new ApiClient();
