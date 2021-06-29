<template>
  <div class="posts-new">
    <h1>Create Post</h1>
    <h3>First, upload your video pitch</h3>
    <div>
      <button @click="openUploadModal">Upload Pitch</button>
    </div>
    <div v-if="video">
      <embed :src="`${video}`" type="" />
    </div>
    <h3>Now, give us some details</h3>
    <form v-on:submit.prevent="submit()">
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
      <!-- <div class="form-group">
        <label>Upload your pitch:</label>
        <input
          type="file"
          class="form-control"
          v-on:change="setFile($event)"
          ref="fileInput"
        />
      </div> -->
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
              this.video = result.info.url;
            }
          }
        )
        .open();
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
