// Prüfen, welches Formular auf der Seite existiert
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// --- REGISTRIERUNG ---
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const newUser = { name: name, email: email, password: password };
    
    // In der "Datenbank" (Browser) speichern
    localStorage.setItem('dearDatabaseUser', JSON.stringify(newUser));
    // Direkt einloggen
    localStorage.setItem('dearCurrentUser', JSON.stringify(newUser));
    
    alert(`Super, ${name}! Dein Konto wurde erstellt.`);
    // Zurück zur Hauptseite!
    window.location.href = '../index.html'; 
  });
}

// --- LOGIN ---
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-password').value;
    
    const savedUserString = localStorage.getItem('dearDatabaseUser');
    
    if (savedUserString) {
      const savedUser = JSON.parse(savedUserString);
      if (savedUser.email === email && savedUser.password === password) {
        // Erfolgreich einloggen
        localStorage.setItem('dearCurrentUser', JSON.stringify(savedUser));
        window.location.href = '../index.html';
      } else {
        alert('Falsche E-Mail oder falsches Passwort!');
      }
    } else {
      alert('Kein Konto gefunden. Bitte registriere dich zuerst.');
    }
  });
}