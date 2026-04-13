// ==========================================================================
// FADE-UP ANIMATIONS (IntersectionObserver)
// ==========================================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ==========================================================================
// TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '&#10003;',
    error: '&#10007;',
    info: '&#8505;'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Schliessen">&times;</button>
    <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => {
    dismissToast(toast);
  });

  container.appendChild(toast);
  setTimeout(() => dismissToast(toast), duration);
}

function dismissToast(toast) {
  if (toast.classList.contains('toast-out')) return;
  toast.classList.add('toast-out');
  toast.addEventListener('animationend', () => toast.remove());
}

// ==========================================================================
// HELPER: Multi-User Storage
// ==========================================================================
function getUsers() {
  // Migrate old single-user data if it exists
  const oldUser = localStorage.getItem('dearDatabaseUser');
  let users = JSON.parse(localStorage.getItem('dearUsers') || '[]');

  if (oldUser && users.length === 0) {
    const parsed = JSON.parse(oldUser);
    users.push(parsed);
    localStorage.setItem('dearUsers', JSON.stringify(users));
    localStorage.removeItem('dearDatabaseUser');
  }

  return users;
}

function saveUsers(users) {
  localStorage.setItem('dearUsers', JSON.stringify(users));
}

// ==========================================================================
// AUTH LOGIC
// ==========================================================================
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// --- REGISTRIERUNG (Multi-User) ---
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;

    if (password.length < 6) {
      showToast('Das Passwort muss mindestens 6 Zeichen lang sein.', 'error');
      return;
    }

    const users = getUsers();

    // Check for duplicate name
    if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) {
      showToast('Dieser Benutzername ist bereits vergeben.', 'error');
      return;
    }

    // Check for duplicate email
    if (users.some(u => u.email.toLowerCase() === email)) {
      showToast('Diese E-Mail-Adresse ist bereits registriert.', 'error');
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    // Log in immediately
    localStorage.setItem('dearCurrentUser', JSON.stringify(newUser));

    showToast(`Willkommen, ${name}! Dein Konto wurde erstellt.`, 'success');

    setTimeout(() => {
      window.location.href = '../../index.html';
    }, 1500);
  });
}

// --- LOGIN (Multi-User) ---
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('log-email').value.trim().toLowerCase();
    const password = document.getElementById('log-password').value;

    const users = getUsers();

    if (users.length === 0) {
      showToast('Kein Konto gefunden. Bitte registriere dich zuerst.', 'error');
      return;
    }

    const foundUser = users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (foundUser) {
      localStorage.setItem('dearCurrentUser', JSON.stringify(foundUser));
      showToast(`Willkommen zurück, ${foundUser.name}!`, 'success');

      setTimeout(() => {
        window.location.href = '../../index.html';
      }, 1500);
    } else {
      showToast('Falsche E-Mail oder falsches Passwort.', 'error');
    }
  });
}
