<template>
  <div class="categories-index">
    <h1>{{ category.name }}</h1>
    <div v-for="post in category.posts">
      <h2>{{ post.title }}</h2>
      <h3>
        Made by:
        <router-link :to="`/users/${post.user_id}`">{{
          post.user.username
        }}</router-link>
      </h3>
      <embed :src="`${post.video_url}`" type="" />
      <h3>Price: {{ post.price }}</h3>
      <p>Description: {{ post.description }}</p>
      <p>Location: {{ post.location }}</p>
      <h4>Categories:</h4>
      <div v-for="category in post.categories">
        <p>
          <router-link :to="`/categories/${category.id}`">{{
            category.name
          }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      category: {},
    };
  },
  created: function() {
    axios.get(`/api/categories/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.category = response.data;
    });
  },
  methods: {},
};
</script>
