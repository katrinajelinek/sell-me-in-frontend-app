<template>
  <div class="home">
    <div v-cloak>
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
      <input type="text" v-model="search" placeholder="Search title..." />
      <label>Search title:</label>
    </div>
    <div>
      <multiselect
        v-model="locationsFilter"
        :options="locations"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Search by Location"
        :preselect-first="true"
      >
        <template slot="selection" slot-scope="{ values, isOpen }"
          ><span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
            >{{ values.length }} locations selected</span
          ></template
        >
      </multiselect>
    </div>
    {{ locationsFilter }}
    <div v-for="category in categories">
      <input
        type="checkbox"
        v-model="categoriesFilter"
        v-bind:value="category.name"
      />
      {{ category.name }}
    </div>
    <!-- <div>
      <input
        type="checkbox"
        v-model="currentLocationToggle"
        true-value="yes"
        false-value="no"
      />
      <label>Current Location</label>
    </div>
    <div v-for="category in categories">
      <input
        type="checkbox"
        v-model="categoryToggle"
        true-value="yes"
        false-value="no"
      />
      <label
        ><router-link :to="`/categories/${category.id}`">{{
          category.name
        }}</router-link></label
      >
    </div> -->
    <div
      v-for="post in orderBy(
        filterBy(filteredPosts, titleFilter, 'title'),
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
      locationsFilter: [],
      locations: [],
      values: [],
      sortAttribute: "created_at",
      titleFilter: "",
      search: "",
      // currentLocationToggle: "yes",
      // categoryToggle: "no",
      checkedCategories: [],
      location: null,
      gettingLocation: false,
      errorStr: null,
    };
  },
  created: function() {
    this.indexPosts();
    this.indexCategories();
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.gettingLocation = false;
        this.location = pos;
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
  computed: {
    filteredPosts() {
      return this.getByFilter(
        this.posts,
        this.categoriesFilter,
        this.locationsFilter
      );
    },
  },
  methods: {
    indexPosts: function() {
      axios.get("/api/posts").then((response) => {
        console.log(response.data);
        response.data.forEach((post) => {
          if (!this.locations.includes(post.location)) {
            this.locations.push(post.location);
          }
        });
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
    getByFilter: function(posts, categoriesFilter, locationsFilter) {
      if (categoriesFilter) {
        categoriesFilter.forEach((category) => {
          posts = this.filterBy(posts, category);
        });
      }
      if (locationsFilter) {
        locationsFilter.forEach((location) => {
          posts = this.filterBy(posts, location);
        });
      }
      return posts;
    },
  },
};
</script>
