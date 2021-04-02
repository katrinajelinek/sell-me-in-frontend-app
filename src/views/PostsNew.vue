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
      videoUrl: "",
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
    submit: function() {
      var categoryIds = this.values.map((category) => category.id);
      var params = {
        title: this.title,
        price: this.price,
        location: this.location,
        description: this.description,
        video_url: this.videoUrl,
        category_ids: categoryIds,
      };
      axios
        .post("/api/posts", params)
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
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
