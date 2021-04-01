<template>
  <div class="users-show">
    <img :src="`${user.image_url}`" alt="" />
    <h1>{{ user.username }}</h1>
    <div v-if="$parent.getUserId() == user.id">
      <router-link :to="`/users/${user.id}/edit`"
        >Edit your Profile</router-link
      >
      <br />
      <router-link to="/posts/new">Create a Post</router-link>
    </div>
    <br />
    <h2>Posts:</h2>
    <div v-for="post in user.posts">
      <embed :src="`${post.video_url}`" type="" />
      <h3>
        <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      </h3>
      <div v-if="$parent.getUserId() == post.user_id">
        <router-link :to="`/posts/edit/${post.id}`">Edit your Post</router-link>
      </div>
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
