<template>
  <div class="posts-edit">
    <form v-on:submit.prevent="updatePost(post)">
      <h1>Edit your Post</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="post.title" />
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="text" class="form-control" v-model="post.price" />
      </div>
      <div class="form-group">
        <label>Location:</label>
        <input type="text" class="form-control" v-model="post.location" />
      </div>
      <div class="form-group">
        <label>Description:</label>
        <input type="text" class="form-control" v-model="post.description" />
      </div>
      <div class="form-group">
        <label>Video Url:</label>
        <input type="text" class="form-control" v-model="post.video_url" />
      </div>
      <!-- <div class="form-group">
        <label>Image Url:</label>
        <input type="text" class="form-control" v-model="imageUrl" />
      </div> -->
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    <button v-on:click="destroyPost()">Delete</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      post: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.post = response.data;
    });
  },
  methods: {
    updatePost: function(post) {
      var params = {
        title: post.title,
        price: post.price,
        location: post.location,
        description: post.description,
        video_url: post.video_url,
      };
      axios
        .patch(`/api/posts/${post.id}`, params)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/posts/${post.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyPost: function() {
      if (confirm("Are you sure you want to delete your post?")) {
        axios.delete(`/api/posts/${this.post.id}`).then((response) => {
          console.log("success", response.data);
          this.$router.push(`/users/${this.post.user_id}`);
        });
      }
    },
  },
};
</script>
