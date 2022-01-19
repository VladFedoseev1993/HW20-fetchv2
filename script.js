let title = document.querySelector('.title');
let description = document.querySelector('.description');
let listComments = document.querySelector('.list-comments');
let input = document.querySelector('.input-comment');
let url = 'https://jsonplaceholder.typicode.com';
let bntAddComment = document.querySelector('.add-comment-btn');


class Posts {
    constructor(id) {
        this.id = id;
    }

    async getPost() {
        let response = await fetch(`${url}/posts/${this.id}`);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error');
        }
    }

    async getComment() {
        let response = await fetch(`${url}/comments?postId=${this.id}`);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error');
        }
    }

    async addComment(data, postId) {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/comments`, {
                    method: 'POST',
                    body: JSON.stringify({
                        postId: postId,
                        body: data,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },

                })
                .then((response) => response.json())
                .then((json) => this.showAddComment(json));
        } catch (error) {
            console.error('Ошибка:', error);
        }

    }

    showAddComment(data) {
        let addedComment = document.createElement('li');
        addedComment.innerHTML = `<li>${data.body}</li>`;
        addedComment.classList.add("comment-post");
        listComments.append(addedComment);
    }

    async showPost() {
        try {
            let data = await this.getPost(1);
            this.renderPost(data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    renderPost(post) {
        let lisTitle = '';
        let lisDescription = '';

        lisTitle += `<li class="title-post" data-id="${post.id}">${post.title}</li>`;
        lisDescription += `<li class="description-post" data-id="${post.id}">${post.body}</li>`

        title.innerHTML = lisTitle;
        description.innerHTML = lisDescription;

    }

    async showComments() {
        try {
            let data = await this.getComment(1);
            this.renderComments(data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    renderComments(comments) {
        let lis = '';
        for (let el of comments) {
            if (!el) {
                return;
            }
            lis += `<li class="comment-post" data-id="${el.id}">${el.email} : ${el.body}</li>`;
        }
        listComments.innerHTML = lis;
    }


}

let post = new Posts(1);
post.showPost();
post.showComments();

bntAddComment.addEventListener('click', (event) => {
    post.addComment(input.value, 1);
});