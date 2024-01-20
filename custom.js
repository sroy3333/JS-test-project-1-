let blogCount = 0;
let currentBlogPost = null;

function createBlogPost(imageUrl, title, description) {
    blogCount++;
    let blogPost = document.createElement('div');

    let img = document.createElement('img');
    img.src = imageUrl;
    blogPost.appendChild(img);

    let h2 = document.createElement('h2');
    h2.textContent = title;
    blogPost.appendChild(h2);

    let p = document.createElement('p');
    p.textContent = description;
    blogPost.appendChild(p);

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        document.getElementById('imageUrl').value = img.src;
        document.getElementById('title').value = h2.textContent;
        document.getElementById('description').value = p.textContent;
        currentBlogPost = blogPost;
    };
    blogPost.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteBlogPostFromAPI(blogPost); // Add this line
        blogPost.remove();
        blogCount--;
        updateBlogCount();
    };
    blogPost.appendChild(deleteButton);

    document.body.appendChild(blogPost);
    updateBlogCount();

    // Add this block to automatically store details when creating a blog post
    createOrUpdateBlogPostAPI({
        imageUrl: imageUrl,
        title: title,
        description: description
    });
}

// Function to send a POST request to create or update a blog post
function createOrUpdateBlogPostAPI(data) {
    fetch('https://crudcrud.com/api/6cd3e46558ab48e7b858131a83522426/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Blog post created/updated:', data))
    .catch(error => console.error('Error:', error));
}

// Function to send a DELETE request to remove a blog post
function deleteBlogPostFromAPI(blogPost) {
    let blogId = getBlogIdFromElement(blogPost);
    fetch(`https://crudcrud.com/api/6cd3e46558ab48e7b858131a83522426/blogs/${blogId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => console.log('Blog post deleted:', data))
    .catch(error => console.error('Error:', error));
}

// Function to extract the blog ID from the blog post element
function getBlogIdFromElement(blogPost) {
    // Implement logic to extract the unique identifier (blog ID) from the element
    // For example, you can store the blog ID as a data attribute in the HTML or find it in some other way
}

function updateBlogCount() {
    let blogCountElement = document.getElementById('blogCount');
    blogCountElement.textContent = 'Total Blogs: ' + blogCount;
}

let postBlogButton = document.getElementById('postBlogButton');
postBlogButton.onclick = function() {
    let imageUrl = document.getElementById('imageUrl').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    if (currentBlogPost) {
        deleteBlogPostFromAPI(currentBlogPost); // Add this line
        currentBlogPost.remove();
        blogCount--;
    }
    createBlogPost(imageUrl, title, description);
    document.getElementById('imageUrl').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    currentBlogPost = null;
};