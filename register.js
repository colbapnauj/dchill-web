// Configuración de la API
const API_BASE_URL = 'https://api.abcorp.net.pe'; // Cambia esta URL por la de tu API
const API_REGISTER_ENDPOINT = '/auth/register'; // Endpoint de registro

// Elementos del formulario
const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('username');
// const emailInput = document.getElementById('email'); // Comentado - no se solicita email por ahora
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');

// Función para mostrar errores
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Función para mostrar éxito
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

// Función para ocultar mensajes
function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
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

// Función para validar el formulario
function validateForm(username, password, confirmPassword) {
    if (!username || !password || !confirmPassword) {
        showError('Por favor, completa todos los campos.');
        return false;
    }

    if (password !== confirmPassword) {
        showError('Las contraseñas no coinciden.');
        return false;
    }

    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres.');
        return false;
    }

    // Validación de email comentada - no se solicita email por ahora
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //     showError('Por favor, ingresa un email válido.');
    //     return false;
    // }

    return true;
}

// Función para realizar el registro
async function handleRegister(username, password) {
    try {
        setLoading(true);
        hideMessages();

        const response = await fetch(`${API_BASE_URL}${API_REGISTER_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
                // email: email, // Comentado - no se envía email por ahora
            })
        });

        if (response.ok) {
            // Registro exitoso
            showSuccess('¡Registro exitoso! Redirigiendo al login...');
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            // Error en la respuesta
            const errorData = await response.json().catch(() => ({}));
            showError(errorData.message || 'Error al registrar. Por favor, intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        showError('Error de conexión. Por favor, verifica que la API esté disponible.');
    } finally {
        setLoading(false);
    }
}

// Manejar el envío del formulario
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    // const email = emailInput.value.trim(); // Comentado - no se solicita email por ahora
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!validateForm(username, password, confirmPassword)) {
        return;
    }

    await handleRegister(username, password);
});

// Limpiar errores al escribir
usernameInput.addEventListener('input', hideMessages);
// emailInput.addEventListener('input', hideMessages); // Comentado - no se solicita email por ahora
passwordInput.addEventListener('input', hideMessages);
confirmPasswordInput.addEventListener('input', hideMessages);
