<template>
  <div class="posts-show">
    <h1>{{ post.title }}</h1>
    <div v-if="$parent.getUserId() == post.user_id">
      <router-link :to="`/posts/edit/${post.id}`">Edit Post</router-link>
    </div>
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
      <div v-if="post.user_id === $parent.getUserId()">
        <button v-on:click="destroyImage(image)">Delete Image</button>
      </div>
    </div>
    <div v-if="post.user_id === $parent.getUserId()">
      <form v-on:submit.prevent="createImage()">
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="form-group">
          <label>Add Images:</label>
          <input
            type="file"
            class="form-control"
            v-on:change="setFile($event)"
            ref="fileInput"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Add Image" />
      </form>
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
      images: [],
      image: "",
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.post = response.data;
      this.images = response.data.images;
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    createImage: function() {
      var formData = new FormData();
      formData.append("post_id", this.post.id);
      formData.append("image", this.image);
      axios
        .post("/api/images", formData)
        .then((response) => {
          this.image = "";
          console.log(response.data);
          this.images.push(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyImage: function(image) {
      if (confirm("Are you sure you want to delete your image?")) {
        var index = this.images.indexOf(image);
        axios.delete(`/api/images/${image.id}`).then((response) => {
          console.log("success", response.data);
          this.images.splice(index, 1);
        });
      }
    },
  },
};
</script>
