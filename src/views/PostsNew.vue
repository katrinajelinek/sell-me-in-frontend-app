<template>
  <div class="posts-new">
    <form v-on:submit.prevent="submit()">
      <h1>Create Post</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="title" />
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="text" class="form-control" v-model="price" />
      </div>
      <div class="form-group">
        <label>Location:</label>
        <input type="text" class="form-control" v-model="location" />
      </div>
      <div class="form-group">
        <label>Description:</label>
        <input type="text" class="form-control" v-model="description" />
      </div>
      <div class="form-group">
        <label>Video Url:</label>
        <input type="text" class="form-control" v-model="videoUrl" />
      </div>
      <!-- <div class="form-group">
        <label>Image Url:</label>
        <input type="text" class="form-control" v-model="imageUrl" />
      </div> -->
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      price: "",
      location: "",
      description: "",
      videoUrl: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        price: this.price,
        location: this.location,
        description: this.description,
        video_url: this.videoUrl,
      };
      axios
        .post("/api/posts", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
