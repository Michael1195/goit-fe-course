"use strict";

// const cards = createPosts(posts);
// grid.innerHTML = cards;

// function createPosts(posts) {
//   return posts.reduce((acc, obj) => acc + createPostCard(obj), "");
// }

// function createPostCard({ img, title, text, stats }) {
//   return `
//   <div class="post">
//     <img class="post__image" src=${img} alt="post image">
//     <h2 class="post__title">${title}</h2>
//     <p class="post__text">${text}</p>

//     <ul class="actions post__actions">
//       <li class="actions__item">
//         <button class="actions__btn ">
//           <span class="actions__icon actions__icon--like"></span>
//           <span class="actions__count">${stats.likes}</span>
//         </button>
//       </li>
//       <li class="actions__item">
//         <button class="actions__btn">
//           <span class="actions__icon actions__icon--dislike"></span>
//           <span class="actions__count">${stats.dislikes}</span>
//         </button>
//       </li>
//       <li class="actions__item">
//         <button class="actions__btn">
//            <span class="actions__icon actions__icon--fav"></span>
//           <span class="actions__count">${stats.fav}</span>
//         </button>
//       </li>
//     </ul>
//   </div>`;
// }

const posts = [
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    stats: {
      likes: 6,
      dislikes: 2,
      fav: 3
    }
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    stats: {
      likes: 124,
      dislikes: 8,
      fav: 36
    }
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    stats: {
      likes: 800,
      dislikes: 36,
      fav: 147
    }
  }
];

const grid = document.querySelector(".notes-grid");
const cards = createPosts(posts);

grid.append(...cards);

function createPosts(posts) {
  return posts.reduce((acc, obj) => acc.concat(createPostCard(obj)), []);
}

function createPostCard({ img, title, text, stats }) {
  const post = document.createElement("div");
  post.classList.add("post");

  const postImage = document.createElement("img");
  postImage.classList.add("post__image");
  postImage.setAttribute("src", `${img}`);
  postImage.setAttribute("alt", "post image");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title");
  postTitle.textContent = `${title}`;

  const postText = document.createElement("P");
  postText.classList.add("post__text");
  postText.textContent = `${text}`;

  const actions = document.createElement("ul");
  actions.classList.add("actions");
  actions.classList.add("post__actions");

  let actionsItem = document.createElement("li");
  actionsItem.classList.add("actions__item");

  let actionsBtn = document.createElement("button");
  actionsBtn.classList.add("actions__btn");

  let actionsIcon = document.createElement("span");
  actionsIcon.classList.add("actions__icon");
  actionsIcon.classList.add("actions__icon--like");

  let actionsCount = document.createElement("span");
  actionsCount.classList.add("actions__count");
  actionsCount.textContent = `${stats.likes}`;

  actionsBtn.append(actionsIcon, actionsCount);

  actionsItem.appendChild(actionsBtn);

  actions.appendChild(actionsItem);

  actionsItem = document.createElement("li");
  actionsItem.classList.add("actions__item");

  actionsBtn = document.createElement("button");
  actionsBtn.classList.add("actions__btn");

  actionsIcon = document.createElement("span");
  actionsIcon.classList.add("actions__icon");
  actionsIcon.classList.add("actions__icon--dislike");

  actionsCount = document.createElement("span");
  actionsCount.classList.add("actions__count");
  actionsCount.textContent = `${stats.dislikes}`;

  actionsBtn.append(actionsIcon, actionsCount);

  actionsItem.appendChild(actionsBtn);

  actions.appendChild(actionsItem);

  actionsItem = document.createElement("li");
  actionsItem.classList.add("actions__item");

  actionsBtn = document.createElement("button");
  actionsBtn.classList.add("actions__btn");

  actionsIcon = document.createElement("span");
  actionsIcon.classList.add("actions__icon");
  actionsIcon.classList.add("actions__icon--fav");

  actionsCount = document.createElement("span");
  actionsCount.classList.add("actions__count");
  actionsCount.textContent = `${stats.fav}`;

  actionsBtn.append(actionsIcon, actionsCount);

  actionsItem.appendChild(actionsBtn);

  actions.appendChild(actionsItem);

  post.append(postImage, postTitle, postText, actions);

  return post;
}
