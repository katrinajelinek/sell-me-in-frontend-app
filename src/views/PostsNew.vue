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
                        class="btn btn-primary btn-block"
                        role="button"
                        v-on:click="openUploadModal()"
                      >
                        Upload Video
                      </button>
                    </div>
                    <br />
                    <div v-if="imagesSaveToggle === false" class="caption">
                      <button
                        class="btn btn-primary btn-block"
                        role="button"
                        v-on:click="openImageUploadModal()"
                      >
                        Add Images
                      </button>
                    </div>
                  </div>
                  <div v-for="image in imageUrls">
                    <img :src="image" height="500" width="500" />
                    <button
                      v-on:click="destroyImageUrl(image)"
                      class="btn btn-primary btn-block"
                    >
                      Delete Image
                    </button>
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
                          >Location</label
                        >
                        <div class="col-md-7">
                          <input
                            type="text"
                            class="form-control"
                            id="location"
                            v-model="location"
                            placeholder="Location"
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
      imagesSaveToggle: false,
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
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Conneticut",
        "Deleware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
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
            cloud_name: "djka3ehcg",
            upload_preset: "musnwcbj",
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
      // if (this.state) {
      // }
      axios
        .get(
          `https://us-zipcode.api.smartystreets.com/lookup?auth-id=0cc55538-0311-9b45-9c4b-3ef71db8faef&auth-token=zbguo7YFBLeli80EZbR7&city=${this.city}&state=${this.state}`
        )
        .then((response) => {
          console.log(response.data);
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
