import { Auth } from "./auth";  

document.addEventListener('DOMContentLoaded', async () => {
    await Auth.init(true);

    if (Auth.isAuthenticated()) {
        window.location.href = 'index.html';
    }

    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
            await Auth.login(
                document.getElementById('username').value,
                document.getElementById('password').value
            );
            window.location.href = 'index.html';
        } catch (error) {
            alert(error.message);
        }
    });
});

function redirectByRole(role) {
    if (role === 'admin') {
        window.location.href = 'admin.html';
    } else if (role === 'author') {
        window.location.href = 'author.html'
    } else {
        window.location.href = 'index.html-a'
    }
}