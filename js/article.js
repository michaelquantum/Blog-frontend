import {request} from "./api.js";
let postId = null;

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    postId = urlParams.get("id");

    if (!postId) {
        window.location.href = "index.html"; // Redirect to home if no id is provided
        return;
    }

    //load the post data to pre-fill the form
    loadArticle(postId);

    async function loadArticle(id) {
        const container = document.getElementById("article-container");
        try {
            const response = await request(`/blogs/${id}`);
            const post = response; // Assuming the response is a single post object

            container.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>${post.title}</h2>
                    
                    <div>
                        <a href="edit.html?id=${post._id}" class="btn-edit" style="background-color: #007bff; color: #fff; padding: 5px 20px; border: none;text-decoration: none; border-radius: 4px; cursor: pointer; margin: 10px;">Edit</a>
                        <div style="background-color: #dc3545; color: #fff; padding: 5px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 10px;" class="btn-delete" id="delete-btn">Delete</div>
                    </div>
                </div>
                <p style="margin-top: 1.5rem; white-space: pre-wrap;">${post.body}</p>
            `;

            // Add event listener for delete button
            document.getElementById("delete-btn").addEventListener("click", deletePost);
            
        } catch (error) {
            container.innerHTML = "<p>Error loading article. Please try again later.</p>";
            console.error("Error loading article:", error);
        }
    }

    //Handle delete button click
    async function deletePost() {
        if (confirm("Are you sure you want to delete this post?")) {
            try {
                await request(`/blogs/${postId}`, {
                    method: "DELETE"
                });
                alert("Post deleted successfully!");
                window.location.href = "index.html"; // Redirect to home after successful deletion
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("Error deleting post. Please try again later.");
            }
        }
    }
});

