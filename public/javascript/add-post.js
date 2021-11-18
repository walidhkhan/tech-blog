async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#form-title').value;
    const post_content = document.querySelector('#form-text').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/posts/all');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#create-post').addEventListener('submit', newFormHandler);