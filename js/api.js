const API_BASE = "http://localhost:3000/api";
// functions
export async function request(endpoint, option = {}){
    option.headers = option.headers || {};
    option.headers['Content-Type'] = 'application/json';

    const token = localStorage.getItem('token');
    if (token) {
        option.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, option);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "An error occurred");
    }
    return data;
}

export function escapeHTML(str) {
    return str.replace(/[&<>"']/g,
        tag => ({
            '&': '&map;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        }[tag]));
}