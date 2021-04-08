<template>
  <div class="home">
    <div v-cloak>
      <p>
        Let us locate you for better results...
        <button @click="locateMe">Get location</button>
      </p>

      <div v-if="errorStr">
        Sorry, but the following error occurred: {{ errorStr }}
      </div>

      <div v-if="gettingLocation">
        <i>Getting your location...</i>
      </div>

      <div v-if="location">
        Your location data is {{ location.coords.latitude }},
        {{ location.coords.longitude }}
      </div>
    </div>

    <h1>Sell Me In</h1>
    <div>
      <multiselect
        v-model="categoriesFilter"
        :options="categories"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Search by Categories"
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
    <div
      v-for="post in orderBy(
        filterBy(filteredPostsByCategories, titleFilter, 'title'),
        sortAttribute,
        -1
      )"
    >
      <router-link :to="`/posts/${post.id}`"
        ><h1>{{ post.title }}</h1></router-link
      >
      <h3>
        Made by:
        <router-link :to="`/users/${post.user_id}`">{{
          post.user.username
        }}</router-link>
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
    </div>
    <h4>All Categories:</h4>
    <div v-for="category in categories">
      <p>
        <router-link :to="`/categories/${category.id}`">{{
          category.name
        }}</router-link>
      </p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  components: {
    Multiselect,
  },
  data: function() {
    return {
      posts: [],
      categories: [],
      categoriesFilter: [],
      values: [],
      sortAttribute: "created_at",
      titleFilter: "",
      location: null,
      gettingLocation: false,
      errorStr: null,
    };
  },
  created: function() {
    this.indexPosts();
    this.indexCategories();
  },
  computed: {
    filteredPostsByCategories() {
      return this.getByCategory(this.posts, this.categoriesFilter);
    },
  },
  methods: {
    indexPosts: function() {
      axios.get("/api/posts").then((response) => {
        console.log(response.data);
        this.posts = response.data;
      });
    },
    setSortAttribute: function(attribute) {
      this.sortAttribute = attribute;
    },
    indexCategories: function() {
      axios.get("/api/categories").then((response) => {
        console.log(response.data);
        this.categories = response.data;
      });
    },
    getByCategory: function(posts, categoriesFilter) {
      categoriesFilter.forEach((category) => {
        posts = this.filterBy(posts, category.name);
      });
      return posts;
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
    async locateMe() {
      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
      } catch (e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    },
  },
};
</script>
