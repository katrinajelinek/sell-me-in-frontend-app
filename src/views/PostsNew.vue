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
        <label>Upload your pitch:</label>
        <input
          type="file"
          class="form-control"
          v-on:change="setFile($event)"
          ref="fileInput"
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
            <template slot="selection" slot-scope="{ values, isOpen }"
              ><span
                class="multiselect__single"
                v-if="values.length &amp;&amp; !isOpen"
                >{{ values.length }} categories selected</span
              ></template
            >
          </multiselect>
          <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
        </div>
      </div>
      <!-- <div class="form-group">
        <label>Image Url:</label>
        <input type="text" class="form-control" v-model="imageUrl" />
      </div> -->
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    <button
      v-on:click="openWidget"
      id="upload_widget"
      class="cloudinary-button"
    >
      Upload files
    </button>
  </div>
</template>

//
<script type="text/javascript">
// var myWidget = cloudinary.createUploadWidget(
//   {
//     cloudName: "djka3ehcg",
//     uploadPreset: "q2upzv8p",
//   },
//   (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log("Done! Here is the image info: ", result.info);
//       this.video = result.info.path;
//     }
//   }
// );
// myWidget.open();

// document.getElementById("upload_widget").addEventListener(
//   "click",
//   function() {
//     myWidget.open();
//     console.log("buttons");
//   },
//   false
// );

// var generateSignature = function(callback, params_to_sign) {
//   $.ajax({
//     url: "https://localhost:8080/my_generate_signature",
//     type: "GET",
//     dataType: "text",
//     data: { data: params_to_sign },
//     complete: function() {
//       console.log("complete");
//     },
//     success: function(signature, textStatus, xhr) {
//       callback(signature);
//     },
//     error: function(xhr, status, error) {
//       console.log(xhr, status, error);
//     },
//   });
// };

// cloudinary.applyUploadWidget(
//   document.getElementById("upload_widget_opener"),
//   {
//     api_key: console.log(env.local.VUE_APP_MY_API_KEY),
//     cloudName: "djka3ehcg",
//     uploadSignature: generateSignature,
//   },
//   (error, result) => {}
// );
//
</script>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import myWidget from "../router/index.js";

export default {
  components: {
    Multiselect,
  },
  data: function() {
    return {
      title: "",
      price: "",
      location: "",
      description: "",
      video: "",
      imageUrl: "",
      errors: [],
      values: [],
      categories: [],
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
    openWidget: function() {
      document.getElementById("upload_widget").onclick = myWidget.open();
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
