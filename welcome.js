// Cargar preferencia del tema desde localStorage
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Verificar si el usuario está logueado
window.addEventListener('DOMContentLoaded', () => {
    // Cargar preferencia del tema
    loadThemePreference();
    
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        // Si no hay usuario logueado, redirigir al login
        window.location.href = 'login.html';
        return;
    }

    // Mostrar mensaje personalizado
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.textContent = `¡Bienvenido, ${loggedInUser}!`;
    }
});

// Manejar el botón de cerrar sesión
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        // Limpiar sessionStorage y redirigir al login
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
}
