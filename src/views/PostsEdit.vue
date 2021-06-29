<template>
  <div class="posts-edit">
    <h1>Edit Media</h1>
    <br />
    <embed :src="videoUrl" type="" />
    <div v-if="post.user_id === $parent.getUserId()">
      <div>
        <button @click="openVideoUploadModal">Change your video pitch</button>
      </div>
    </div>
    <div v-if="post.user_id === $parent.getUserId()">
      <div>
        <button @click="openImageUploadModal">Upload images</button>
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
    <form v-on:submit.prevent="updatePost(post)">
      <h1>Edit Details</h1>
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
        <div>
          <multiselect
            v-model="values"
            :options="categories"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Categories"
            label="name"
            track-by="name"
            :preselect-first="true"
          >
            <template slot="selection" slot-scope="{ values, isOpen }"
              ><span
                class="multiselect__single"
                v-if="values.length &amp;&amp; !isOpen"
                >{{ values.length }} categories selected</span
              ></template
            >
          </multiselect>
        </div>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    <button v-on:click="destroyPost()">Delete your post</button>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data: function() {
    return {
      post: {},
      images: [],
      imageUrls: [],
      videoUrl: "",
      imagesSaveToggle: false,
      errors: [],
      values: [],
      categories: [],
    };
  },
  created: function() {
    this.showPost();
    this.indexCategories();
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
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
    openImageUploadModal() {
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
    openVideoUploadModal() {
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
              this.videoUrl = result.info.url;
            }
          }
        )
        .open();
    },
    showPost: function() {
      axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.post = response.data;
        this.values = response.data.categories;
        this.images = response.data.images;
        this.videoUrl = response.data.video_url;
      });
    },
    indexCategories: function() {
      axios.get("/api/categories").then((response) => {
        console.log(response.data);
        this.categories = response.data;
      });
    },
    updatePost: function(post) {
      var categoryIds = this.values.map((category) => category.id);
      var formData = new FormData();
      formData.append("title", post.title);
      formData.append("price", post.price);
      formData.append("location", post.location);
      formData.append("description", post.description);
      formData.append("video", this.videoUrl);
      formData.append("category_ids", JSON.stringify(categoryIds));
      axios
        .patch(`/api/posts/${post.id}`, formData)
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
