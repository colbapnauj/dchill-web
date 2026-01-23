// Configuración de la API
const API_BASE_URL = 'https://api.abcorp.net.pe'; // Cambia esta URL por la de tu API
// const API_BASE_URL = 'http://localhost:3002';
const API_LOGIN_ENDPOINT = '/auth/login'; // Ajusta el endpoint según tu API

// Elementos del formulario
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');

// Función para mostrar errores
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Función para ocultar errores
function hideError() {
    errorMessage.style.display = 'none';
}

// Función para mostrar estado de carga
function setLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoader.style.display = 'inline-block';
    } else {
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
    }
}

// Función para realizar el login
async function handleLogin(username, password) {
    try {
        setLoading(true);
        hideError();

        const response = await fetch(`${API_BASE_URL}${API_LOGIN_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (response.ok) {
            // Login exitoso - redirigir a welcome
            // Guardamos el username en sessionStorage para mostrarlo en welcome
            sessionStorage.setItem('loggedInUser', username);
            window.location.href = 'welcome.html';
        } else {
            // Error en la respuesta
            const errorData = await response.json().catch(() => ({}));
            showError(errorData.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    } catch (error) {
        console.error('Error en el login:', error);
        showError('Error de conexión. Por favor, verifica que la API esté disponible.');
    } finally {
        setLoading(false);
    }
}

// Manejar el envío del formulario
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showError('Por favor, completa todos los campos.');
        return;
    }

    await handleLogin(username, password);
});

// Limpiar errores al escribir
usernameInput.addEventListener('input', hideError);
passwordInput.addEventListener('input', hideError);
