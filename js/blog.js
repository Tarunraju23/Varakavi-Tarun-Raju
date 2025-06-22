document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('blog-form');
  const titleInput = document.getElementById('blog-title');
  const contentInput = document.getElementById('blog-content');
  const blogList = document.getElementById('blog-list');

  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  function renderPosts() {
    blogList.innerHTML = '';
    posts.slice().reverse().forEach((post, index) => {
      const card = document.createElement('div');
      card.className = 'blog-card';

      const title = document.createElement('h3');
      title.textContent = post.title;
      card.appendChild(title);

      const content = document.createElement('p');
      content.textContent = post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '');
      card.appendChild(content);

      const viewBtn = document.createElement('button');
      viewBtn.textContent = 'View';
      viewBtn.onclick = () => alert(`Title: ${post.title}\n\n${post.content}`);
      card.appendChild(viewBtn);

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => {
        const newTitle = prompt('Edit Title', post.title);
        const newContent = prompt('Edit Content', post.content);
        if (newTitle !== null && newContent !== null) {
          posts[posts.length - 1 - index] = { title: newTitle, content: newContent };
          savePosts();
          renderPosts();
        }
      };
      card.appendChild(editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => {
        if (confirm('Are you sure you want to delete this post?')) {
          posts.splice(posts.length - 1 - index, 1);
          savePosts();
          renderPosts();
        }
      };
      card.appendChild(deleteBtn);

      blogList.appendChild(card);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) return;

    posts.push({ title, content });
    savePosts();
    renderPosts();
    form.reset();
  });

  renderPosts();
});
