<template>
  <div class="home">
    <div v-for="post in posts">
      <h1>{{ post.title }}</h1>
      <h3>Made by: {{ post.user.username }}</h3>
      <h3>Price: {{ post.price }}</h3>
      <p>Description: {{ post.description }}</p>
      <p>Location: {{ post.location }}</p>
      <h4>Categories:</h4>
      <div v-for="category in post.categories">
        <p>{{ category.name }}</p>
      </div>
    </div>
    <h4>All Categories:</h4>
    <div v-for="category in categories">
      <p>{{ category.name }}</p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      posts: [],
      categories: [],
    };
  },
  created: function() {
    this.indexPosts();
    this.indexCategories();
  },
  methods: {
    indexPosts: function() {
      axios.get("/api/posts").then((response) => {
        console.log(response.data);
        this.posts = response.data;
      });
    },
    indexCategories: function() {
      axios.get("/api/categories").then((response) => {
        console.log(response.data);
        this.categories = response.data;
      });
    },
  },
};
</script>
