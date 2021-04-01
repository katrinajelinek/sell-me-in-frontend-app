<template>
  <div class="posts-show">
    <h1>{{ post.title }}</h1>
    <router-link :to="`/posts/edit/${post.id}`">Edit Post</router-link>
    <h3>
      Made by:
      <router-link :to="`/users/${post.user_id}`">{{
        post.user.username
      }}</router-link>
      <br />
      <button>Contact Seller</button>
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
    <div v-for="image in post.images">
      <img :src="`${image.image_url}`" />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      post: {
        user: {},
      },
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.post = response.data;
    });
  },
  methods: {},
};
</script>
