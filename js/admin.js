import { request } from './api.js';
import { Auth } from './auth.js';


document.addEventListener('DOMContentLoaded', async () => {

    if (Auth.user?.role !== 'admin'){
        alert('You are not authorized to access this page');
        window.location.href = 'index.html';
        return;   
    }

    //User verified as admin - reveal the admin dashboard content
    const mainContent = document.getElementById('main-Content');
    if (mainContent) {
        mainContent.style.display = 'block';
    }
    loadUsers();
    
})