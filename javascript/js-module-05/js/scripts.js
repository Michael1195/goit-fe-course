"use strict";

const initialUsers = [
  {
    id: "-s19a6hqce",
    login: "mangozedog@mail.com",
    password: "qwe123zv",
    isActive: true
  },
  {
    id: "-qkpzenjxe",
    login: "polysweet@skynet.ze",
    password: "123zxc78",
    isActive: true
  },
  {
    id: "-e51cpd4di",
    login: "ajax2k@change.ua",
    password: "ert234qw",
    isActive: false
  }
];

const initialPosts = {
  "-s19a6hqce": [
    { id: "-5sgljaskg", text: "post #1", likes: 3 },
    { id: "-199hb6igr", text: "post #2", likes: 5 },
    { id: "-hy0eyw5qo", text: "post #3", likes: 13 }
  ],
  "-qkpzenjxe": [
    { id: "-5tu69g5rf", text: "post #1", likes: 8 },
    { id: "-bje766393", text: "post #2", likes: 15 }
  ],
  "-e51cpd4di": [
    { id: "-9y6nkmlj4", text: "post #1", likes: 18 },
    { id: "-i03pbhy3s", text: "post #2", likes: 45 }
  ]
};

function SocialBook(users = [], posts = {}) {
  const user = { id: "", login: "michael@change.ua", password: "ert234" };
  const getId = () => "-" + Math.random().toString(36).substr(2, 9);
  const post = { id: "-5tu69g5rf", text: "post #1", likes: 55 };

  this.users = users;
  this.posts = posts;

  this.getAllUsers = () => this.users;
  this.getUserByLogin = login => this.users.find(use => use.login === login);
  this.getUserStatus = function(userId) {
    let user = this.users.find(use => use.id === userId);

    if (user === undefined) {
      return "Пользователя под таким id нет";
    }

    if (user.isActive) {
      return "active";
    } else {
      return "inactive";
    }
  };

  this.addUser = function(user) {
    user.id = getId();
    user.isActive = false;
    this.users.push(user);
  };

  this.removeUserById = userId =>
    (this.users = this.users.filter(use => use.id !== userId));

  this.getUsersCount = () => this.users.length;

  console.log(this.getUserByLogin("ajax2k@change.ua"));
  console.log(this.getUserStatus("-e51cpd4di"));
  this.addUser(user);
  this.removeUserById("-qkpzenjxe");
  console.log(this.getAllUsers());
  console.log(this.getUsersCount());

  // posts

  this.addPost = (userId, post) => this.posts[userId].push(post);

  this.removePost = (userId, postId) =>
    (this.posts[userId] = this.posts[userId].filter(
      post => post.id !== postId
    ));

  this.getUserPosts = userId => this.posts[userId];

  this.addPostLike = (userId, postId) =>
    this.posts[userId].find(
      post => (post.id === postId ? (post.likes += 1) : post)
    );

  this.getAllLikes = userId =>
    this.posts[userId].reduce((acc, post) => acc + post.likes, 0);

  this.getPostsCount = userId => this.posts[userId].length;

  this.addPost("-s19a6hqce", post);
  this.removePost("-s19a6hqce", "-5sgljaskg");
  console.log(this.getUserPosts("-s19a6hqce"));
  this.addPostLike("-s19a6hqce", "-199hb6igr");
  console.log(this.getAllLikes("-s19a6hqce"));
  console.log(this.getPostsCount("-s19a6hqce"));
}

const user = new SocialBook(initialUsers, initialPosts);
