import {request, escapeHTML} from './api.js';

document.addEventListener('DOMContentLoaded', loadposts);

async function loadposts() {
    const container = document.getElementById('post-list');

    try {
        const res = await request('/blogs');
        const posts = res;
        if (posts.length === 0) {
            container.innerHTML = "<p>No posts available</p>"
        }   
         container.innerHTML = posts.map(post =>`
            <div class="post">
                <h3>${escapeHTML(post.title)}</h3>
                <p>${escapeHTML(post.body)}</p>
                <div>
                    <a href="article.html?id=${post._id}" class="edit-button">Read Article</a>
                </div>
            </div>  
        `).join('');
    } catch (error) {
        console.error("Error loading blog posts:", error);
        container.innerHTML = "<p>Error loading blog posts. Try again later.</p>";
    }
}