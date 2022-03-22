<template>
  <div class="posts-new">
    <div id="body" class="body-wrapper version1 up-scroll">
      <!-- LIGHT SECTION -->
      <section class="lightSection clearfix pageHeader">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="page-title">
                <h2>Create New Post</h2>
              </div>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb float-right">
                <li>
                  <router-link to="/">Home</router-link>
                </li>
                <li class="active">Create</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <!-- MAIN CONTENT SECTION -->
      <section class="mainContent clearfix userProfile">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="innerWrapper profile">
                <div class="orderBox">
                  <h2>Create Post</h2>
                </div>
                <div class="row">
                  <div class="col-md-4 col-lg-3 col-xl-2 col-12">
                    <div class="thumbnail" v-if="video">
                      <iframe
                        :src="`${video}`"
                        frameborder="0"
                        webkitallowfullscreen
                        mozallowfullscreen
                        allowfullscreen
                      ></iframe>
                    </div>
                    <div class="caption">
                      <button
                        class="btn btn-primary btn-rounded"
                        role="button"
                        v-on:click="openUploadModal()"
                      >
                        Upload Video
                      </button>
                    </div>
                    <br />
                    <div class="caption">
                      <button
                        class="btn btn-primary btn-rounded"
                        role="button"
                        v-on:click="openImageUploadModal()"
                      >
                        Add Images
                      </button>
                    </div>
                    <br />
                    <div v-for="image in imageUrls">
                      <img :src="image" height="100" width="100" />
                      <button
                        v-on:click="destroyImageUrl(image)"
                        class="btn btn-primary-outlined btn-sm"
                      >
                        Delete Image
                      </button>
                      <br />
                    </div>
                  </div>

                  <div class="col-md-8 col-lg-9 col-xl-10 col-12">
                    <form
                      class="form-horizontal"
                      method="POST"
                      v-on:submit.prevent="submit()"
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
                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"
                          >Title</label
                        >
                        <div class="col-md-7">
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            v-model="title"
                            placeholder="Title"
                            required
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"
                          >Price</label
                        >
                        <div class="col-md-7">
                          <input
                            type="text"
                            class="form-control"
                            id="price"
                            v-model="price"
                            placeholder="Price"
                            required
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"
                          >Description</label
                        >
                        <div class="col-md-7">
                          <input
                            type="text"
                            class="form-control"
                            id="description"
                            v-model="description"
                            placeholder="Description"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"></label>
                        <div class="col-md-7">
                          <multiselect
                            v-model="values"
                            :options="categories"
                            :multiple="true"
                            :close-on-select="false"
                            :clear-on-select="false"
                            :preserve-search="true"
                            placeholder="Choose your Categories"
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
                      <br />
                      <div>
                        <div class="form-group row">
                          <label for="" class="col-md-3 control-label"
                            >City</label
                          >
                          <div class="col-md-7">
                            <input
                              type="text"
                              class="form-control"
                              id="city"
                              v-model="city"
                              placeholder="City"
                              required
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="" class="col-md-3 control-label"></label>
                          <div class="col-md-7">
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
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class=" col-md-12 ">
                            <button
                              v-on:click="validateLocation()"
                              class="btn btn-primary-outlined btn-sm float-right"
                            >
                              Validate Location
                            </button>
                          </div>
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
                              v-model="location"
                              placeholder="Location"
                              required
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class=" col-md-12 ">
                          <button
                            type="submit"
                            class="btn btn-primary float-right"
                          >
                            CREATE POST
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
      auth_id: process.env.VUE_APP_STREETSMARTS_AUTH_ID,
      auth_token: process.env.VUE_APP_STREETSMARTS_AUTH_TOKEN,
      title: "",
      price: "",
      location: "",
      description: "",
      video: "",
      imageUrl: "",
      post: {},
      imageUrls: [],
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
    this.indexCategories();
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.video = event.target.files[0];
      }
    },
    submit: function() {
      var categoryIds = this.values.map((category) => category.id);
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("price", this.price);
      formData.append("location", this.location);
      formData.append("description", this.description);
      formData.append("image_urls", JSON.stringify(this.imageUrls));
      formData.append("video", this.video);
      formData.append("category_ids", JSON.stringify(categoryIds));
      axios
        .post("/api/posts", formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/posts/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    indexCategories: function() {
      axios.get("/api/categories").then((response) => {
        console.log(response.data);
        this.categories = response.data;
      });
    },
    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: process.env.VUE_APP_CLOUD_NAME,
            upload_preset: process.env.VUE_APP_CLOUD_PRESET,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              this.video = result.info.secure_url;
            }
          }
        )
        .open();
    },
    validateLocation: function() {
      axios
        .get(
          `https://us-zipcode.api.smartystreets.com/lookup?auth-id=${this.auth_id}&auth-token=${this.auth_token}&city=${this.city}&state=${this.state.name}`
        )
        .then((response) => {
          this.location = `${response.data[0]["city_states"][0]["city"]}, ${response.data[0]["city_states"][0]["state_abbreviation"]}`;
        });
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
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
