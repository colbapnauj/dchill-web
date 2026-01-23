// Verificar si el usuario está logueado
window.addEventListener('DOMContentLoaded', () => {
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
