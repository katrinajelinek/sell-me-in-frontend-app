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
    </h3>
    <div v-if="messageToggle == false">
      <button v-on:click="messageToggle = true">
        Contact Seller
      </button>
    </div>
    <div v-if="messageToggle == true">
      <form v-on:submit.prevent="createMessage()">
        <div class="form-group">
          <label>Message:</label>
          <textarea v-model="message" cols="30" rows="10"></textarea>
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </div>
    <br />
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
    <div v-if="post.user_id === $parent.getUserId()">
      <div>
        <button @click="openUploadModal">Upload images</button>
      </div>
    </div>
    <div v-for="image in images">
      <img :src="image.image_url" height="500" width="500" />
      <div v-if="post.user_id === $parent.getUserId()">
        <button v-on:click="destroyImage(image)">
          Delete Image
        </button>
      </div>
    </div>
    <div v-for="image in imageUrls">
      <img :src="image" height="500" width="500" />
      <div v-if="post.user_id === $parent.getUserId()">
        <button v-on:click="destroyImageUrl(image)">
          Delete Image
        </button>
      </div>
    </div>
    <div v-if="post.user_id === $parent.getUserId()">
      <div v-if="imagesSaveToggle === true">
        <button v-on:click="createImage()">Save Images</button>
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
      post: {
        user: {},
      },
      images: [],
      imageUrls: [],
      errors: [],
      messageToggle: false,
      message: "",
      imagesSaveToggle: false,
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
    createMessage: function() {
      var params = {
        message: this.message,
        post_creator: this.post.user_id,
      };
      axios
        .post("/api/messages", params)
        .then((response) => {
          console.log(response.data);
          this.messageToggle = false;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    createImage: function() {
      this.imageUrls.forEach((image) => {
        var formData = new FormData();
        formData.append("post_id", this.post.id);
        formData.append("image", image);
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
      });
      this.imageUrls = [];
      this.imagesSaveToggle = false;
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
    destroyImageUrl: function(image) {
      if (confirm("Are you sure you want to delete your image?")) {
        var index = this.imageUrls.indexOf(image);
        this.imageUrls.splice(index, 1);
        console.log("image destroyed");
      }
    },
    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: "djka3ehcg",
            upload_preset: "musnwcbj",
            sources: [
              "local",
              "url",
              "camera",
              "google_drive",
              "dropbox",
              "instagram",
              "facebook",
            ],
            dropboxAppKey: "2ymhwjldd8r671y",
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              this.imageUrls.push(result.info.url);
            }
          }
        )
        .open();
      this.imagesSaveToggle = true;
    },
  },
};
</script>
