import { api } from './api.js';

const state = {
  token: localStorage.getItem('ea-token'),
  profile: null
};

const views = {
  login: document.getElementById('login-view'),
  dashboard: document.getElementById('dashboard-view')
};

const els = {
  loginForm: document.getElementById('login-form'),
  loginError: document.getElementById('login-error'),
  logoutBtn: document.getElementById('logout-btn'),
  tabs: document.querySelectorAll('[data-tab]'),
  tabsContent: document.querySelectorAll('.tab'),
  pageTitle: document.getElementById('page-title'),
  profileForm: document.getElementById('profile-form')
};

function showView(name) {
  Object.values(views).forEach(v => v.classList.add('hidden'));
  views[name].classList.remove('hidden');
}

async function init() {
  if (state.token) {
    try {
      // Demo profile id. In production, store active profile id in localStorage.
      state.profile = await api.getProfile('demo');
      showView('dashboard');
      renderProfile();
      return;
    } catch {
      localStorage.removeItem('ea-token');
    }
  }
  showView('login');
}

els.loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const { token } = await api.login(email, password);
    localStorage.setItem('ea-token', token);
    state.token = token;
    state.profile = await api.getProfile('demo');
    showView('dashboard');
    renderProfile();
  } catch (err) {
    els.loginError.textContent = err.message;
  }
});

els.logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('ea-token');
  state.token = null;
  state.profile = null;
  showView('login');
});

els.tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    els.tabs.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const target = btn.dataset.tab;
    els.tabsContent.forEach(t => t.classList.toggle('is-active', t.id === `tab-${target}`));
    els.pageTitle.textContent = btn.textContent;
  });
});

function renderProfile() {
  if (!state.profile) return;
  const p = state.profile;
  document.getElementById('partner1').value = p.partner1Name;
  document.getElementById('partner2').value = p.partner2Name;
  document.getElementById('weddingDate').value = p.weddingDate.split('T')[0];
  document.getElementById('slug').value = p.slug;
  document.getElementById('loveStory').value = p.loveStory || '';

  renderSectionToggles(p.sections);
  renderMemories(p.memories);
  renderGallery(p.galleryItems);
}

function renderSectionToggles(sections) {
  const container = document.getElementById('section-toggles');
  if (!sections) return;
  container.innerHTML = Object.entries(sections)
    .filter(([key]) => key !== 'id' && key !== 'profileId' && key !== 'createdAt' && key !== 'updatedAt')
    .map(([key, value]) => `
      <label class="toggle">
        <span>${key}</span>
        <input type="checkbox" ${value ? 'checked' : ''} data-section="${key}">
      </label>
    `).join('');
}

function renderMemories(memories) {
  const container = document.getElementById('memories-list');
  if (!memories) return;
  container.innerHTML = memories.map(m => `
    <div class="list-item">
      <span>${m.title}</span>
      <span>${m.date}</span>
    </div>
  `).join('');
}

function renderGallery(items) {
  const container = document.getElementById('gallery-list');
  if (!items) return;
  container.innerHTML = items.map(item => `
    <div class="list-item">
      <span>${item.caption || 'Untitled'}</span>
      <span class="text-soft">${item.src}</span>
    </div>
  `).join('');
}

els.profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!state.profile) return;

  const body = {
    partner1Name: document.getElementById('partner1').value,
    partner2Name: document.getElementById('partner2').value,
    weddingDate: new Date(document.getElementById('weddingDate').value).toISOString(),
    slug: document.getElementById('slug').value,
    loveStory: document.getElementById('loveStory').value
  };

  try {
    state.profile = await api.updateProfile(state.profile.id, body);
    alert('Profile saved.');
  } catch (err) {
    alert(err.message);
  }
});

init();
