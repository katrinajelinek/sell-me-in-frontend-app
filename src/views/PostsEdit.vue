<template>
  <div class="posts-edit">
    <div id="body" class="body-wrapper version1 up-scroll">
      <!-- LIGHT SECTION -->
      <section class="lightSection clearfix pageHeader">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="page-title">
                <h2>Edit your Post</h2>
              </div>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb float-right">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li class="active">Create</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <!-- MAIN CONTENT SECTION -->
      <section class="mainContent clearfix signUp">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="panel panel-default">
                <div class="panel-heading"><h3>Post</h3></div>
                <div class="panel-body">
                  <div v-if="post.user_id === $parent.getUserId()">
                    <div class="row justify-content-center">
                      <embed :src="videoUrl" type="" />
                    </div>
                    <br />
                    <div>
                      <button
                        class="btn btn-primary btn-block"
                        v-on:click="openVideoUploadModal()"
                      >
                        Change your video pitch
                      </button>
                    </div>
                  </div>
                  <br />
                  <div
                    class="row justify-content-center"
                    v-for="image in post.images"
                  >
                    <img
                      :src="image.image_url"
                      type=""
                      height="100"
                      width="100"
                    />
                    <br />
                    <button
                      v-on:click="destroyImage(image)"
                      class="btn btn-primary btn-sm"
                    >
                      Delete Image
                    </button>
                    <br />
                  </div>
                  <div v-for="image in imageUrls">
                    <img :src="image" type="" height="100" width="100" />
                    <br />
                    <button
                      v-on:click="destroyImageUrl(image)"
                      class="btn btn-primary btn-sm"
                    >
                      Delete Image
                    </button>
                    <br />
                  </div>
                  <br />
                  <div>
                    <button
                      class="btn btn-primary btn-sm"
                      v-on:click="openImageUploadModal()"
                    >
                      Upload more images
                    </button>
                  </div>
                  <br />
                  <form
                    action=""
                    method="PUT"
                    role="form"
                    v-on:submit.prevent="updatePost(post)"
                  >
                    <ul>
                      <li
                        class="text-danger"
                        v-for="error in errors"
                        v-bind:key="error"
                      >
                        {{ error }}
                      </li>
                    </ul>
                    <div class="form-group">
                      <label for="">Title</label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        v-model="post.title"
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Price</label>
                      <input
                        type="text"
                        class="form-control"
                        id="price"
                        v-model="post.price"
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Description</label>
                      <input
                        type="text"
                        class="form-control"
                        id="description"
                        v-model="post.description"
                      />
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
                          <template
                            slot="selection"
                            slot-scope="{ values, isOpen }"
                            ><span
                              class="multiselect__single"
                              v-if="values.length &amp;&amp; !isOpen"
                              >{{ values.length }} categories selected</span
                            ></template
                          >
                        </multiselect>
                      </div>
                    </div>
                    <div>
                      <div class="form-group">
                        <label for="" class="col-md-3 control-label"
                          >City</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="city"
                          v-model="city"
                          placeholder="City"
                        />
                      </div>
                      <div class="form-group">
                        <label for="" class="col-md-3 control-label"></label>
                        <multiselect
                          v-model="state"
                          :options="states"
                          :multiple="false"
                          :close-on-select="true"
                          :clear-on-select="false"
                          :preserve-search="true"
                          placeholder="Choose your State"
                          label="name"
                          track-by="name"
                          :preselect-first="true"
                        >
                          <template
                            slot="selection"
                            slot-scope="{ values, isOpen }"
                            ><span
                              class="multiselect__single"
                              v-if="values.length &amp;&amp; !isOpen"
                              >{{ state }}</span
                            ></template
                          >
                        </multiselect>
                      </div>
                      <br />
                      <div class="form-group">
                        <button
                          v-on:click="validateLocation()"
                          class="btn btn-primary-outlined btn-sm float-right"
                        >
                          Validate Location
                        </button>
                      </div>
                      <br />
                    </div>
                    <div>
                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"
                          >Location</label
                        >
                        <div class="col-md-7">
                          <input
                            type="text"
                            class="form-control"
                            id="city"
                            v-model="post.location"
                            placeholder="Location"
                            required
                            readonly
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary btn-block"
                      value="submit"
                    >
                      Submit
                    </button>
                  </form>
                  <br />
                  <div>
                    <button
                      class="btn btn-primary btn-block"
                      v-on:click="destroyPost()"
                    >
                      Delete your post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- <h1>Edit Media</h1> -->
    <!-- <div>
      <div>
        <select v-model="state">
          <option disabled value="">Please your state</option>
          <option v-for="state in states">{{ state }}</option>
        </select>
      </div>
      <div>
        <label>City:</label>
        <input type="text" v-model="city" />
      </div>
      <button v-on:click="validateLocation()">Validate Location</button>
    </div> -->

    <!-- <div v-if="post.user_id === $parent.getUserId()">
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
    <button v-on:click="destroyPost()">Delete your post</button> -->
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
      states: [
        { name: "Alabama" },
        { name: "Alaska" },
        { name: "Arizona" },
        { name: "Arkansas" },
        { name: "California" },
        { name: "Colorado" },
        { name: "Conneticut" },
        { name: "Deleware" },
        { name: "Florida" },
        { name: "Georgia" },
        { name: "Hawaii" },
        { name: "Idaho" },
        { name: "Illinois" },
        { name: "Indiana" },
        { name: "Iowa" },
        { name: "Kansas" },
        { name: "Kentucky" },
        { name: "Louisiana" },
        { name: "Maine" },
        { name: "Maryland" },
        { name: "Massachusetts" },
        { name: "Michigan" },
        { name: "Minnesota" },
        { name: "Mississippi" },
        { name: "Missouri" },
        { name: "Montana" },
        { name: "Nebraska" },
        { name: "Nevada" },
        { name: "New Hampshire" },
        { name: "New Jersey" },
        { name: "New Mexico" },
        { name: "New York" },
        { name: "North Carolina" },
        { name: "North Dakota" },
        { name: "Ohio" },
        { name: "Oklahoma" },
        { name: "Oregon" },
        { name: "Pennsylvania" },
        { name: "Rhode Island" },
        { name: "South Carolina" },
        { name: "South Dakota" },
        { name: "Tennessee" },
        { name: "Texas" },
        { name: "Utah" },
        { name: "Vermont" },
        { name: "Virginia" },
        { name: "Washington" },
        { name: "West Virginia" },
        { name: "Wisconsin" },
        { name: "Wyoming" },
      ],
      state: "",
      city: "",
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
      formData.append("image_urls", JSON.stringify(this.imageUrls));
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
    validateLocation: function() {
      axios
        .get(
          `https://us-zipcode.api.smartystreets.com/lookup?auth-id=1f0a605e-51dc-c94f-41c7-ba9353288bec&auth-token=B8M2uIdYBPXkdi1tNTII&city=${this.city}&state=${this.state.name}`
        )
        .then((response) => {
          console.log(this.state);
          console.log(this.city);
          console.log(response.data);
          this.location = `${response.data[0]["city_states"][0]["city"]}, ${response.data[0]["city_states"][0]["state_abbreviation"]}`;
        });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
