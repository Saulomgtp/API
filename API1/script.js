const url = "https://jsonplaceholder.typicode.com/posts"


const loading = document.querySelector("#loading")
const postsContainer = document.querySelector("#posts-container")

const postPage = document.querySelector("#post")
const postContainer = document.querySelector("#post-container")
const commentsContainer = document.querySelector("#comments-container")

const commentForm = document.querySelector("#comment-form")
const emailInput = document.querySelector("#email")
const bodyInput = document.querySelector("#body")

//Get id from URL

const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get("id")


// Get all posts

async function pegarPosts () {
    
    const response = await fetch(url)

    console.log(response)

    const data = await response.json()

    console.log(data)
    
    loading.classList.add("hide")

    data.map((e) => {
        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = e.title
        body.innerText = e.body
        link.innerText = "Ler"
        link.setAttribute("href", `/post.html?id=${e.id}`)
        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)

        postsContainer.appendChild(div)
    })
}

async function getPost(id) {
    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])

    const dataPost = await responsePost.json()

    const dataComments = await responseComments.json()

    loading.classList.add("hide")
    postPage.classList.remove("hide")

    const title = document.createElement("h1")
    const body = document.createElement("p")

    title.innerText = dataPost.title
    body.innerText = dataPost.body

    postContainer.appendChild(title)
    postContainer.appendChild(body)

    dataComments.map ((e) => {
        createComment(e)
    })

}


function createComment (c) {
    const div = document.createElement("div")
    const email = document.createElement("h3")
    const comment = document.createElement("p")

    email.innerText = c.email
    comment.innerText = c.body

    div.appendChild(email)
    div.appendChild(comment)

    commentsContainer.appendChild(div)
}


async function postComment(comment) {
    const response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-type": "application/json",
        },
    })
    const data = await response.json()
    createComment(data)
}



if(!postId) {
    pegarPosts()
} else {
    getPost(postId)

    commentForm.addEventListener("submit", (evt) => {
        evt.preventDefault()

        let comment = {
            email: emailInput.value,
            body: bodyInput.value,
        }
        comment = JSON.stringify(comment)

        postComment(comment)
    })
}







// Eu fiz mas deu errado por conta que não ficava salvo quando recarregava a página

// evt.preventDefault()

// const div = document.createElement("div")
// const email = document.createElement("h3")
// const comment = document.createElement("p")

// email.innerText = emailInput.value
// comment.innerText = bodyInput.value

// div.appendChild(email)
// div.appendChild(comment)

// commentsContainer.appendChild(div)

// emailInput.value = ""
// bodyInput.value = ""
