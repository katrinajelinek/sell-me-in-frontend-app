<template>
  <div class="users-show">
    <img :src="`${user.image_url}`" alt="" />
    <h1>{{ user.username }}</h1>
    <h2>Posts:</h2>
    <div v-for="post in user.posts">
      <h3>{{ post.title }}</h3>
      <p>Price: {{ post.price }}</p>
      <p>Location: {{ post.location }}</p>
      <p>Description: {{ post.description }}</p>
      <h5>Categories:</h5>
      <div v-for="category in post.categories">
        <p>{{ category.name }}</p>
      </div>
      <br />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
    };
  },
  created: function() {
    this.showUser();
  },
  methods: {
    showUser: function() {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
    },
  },
};
</script>
