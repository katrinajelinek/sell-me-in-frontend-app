<template>
  <div class="home">
    <div v-cloak>
      <div v-if="errorStr">
        Sorry, but the following error occurred: {{ errorStr }}
      </div>

      <div v-if="gettingLocation">
        <i>Getting your location...</i>
      </div>

      <div v-if="latitude">
        Your location data is {{ latitude }}, {{ longitude }}
      </div>
    </div>
    <!-- <div>
      <section class="container">
        <div class="ui icon big input" id="location-input-section">
          <input
            type="text"
            placeholder="Enter Your Address"
            id="autocomplete"
          />
          <i
            aria-hidden="true"
            class="dot circle outline link icon"
            id="location-button"
          ></i>
        </div>
      </section>
    </div> -->

    <h1>Sell Me In</h1>
    <div>
      <input
        type="text"
        id="search-items"
        v-model="search"
        placeholder="Search title..."
      />
      <label>Search title:</label>
    </div>
    <div>
      <input
        type="checkbox"
        v-model="currentLocationToggle"
        true-value="yes"
        false-value="no"
      />
      <label>Filter by Current Location</label>
    </div>
    <div v-for="category in categories">
      <input
        type="checkbox"
        v-model="categoriesFilter"
        v-bind:value="category.name"
      />
      {{ category.name }}
    </div>
    <!-- <div id="map"></div> -->
    <div
      v-for="post in orderBy(filterBy(posts, search), sortAttribute, -1)"
      :key="post.id"
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

<style>
.container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
#map {
  width: 800px;
  height: 700px;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      posts: [],
      categories: [],
      categoriesFilter: [],
      locationsFilter: [],
      locations: [],
      values: [],
      location: null,
      sortAttribute: "created_at",
      search: "",
      currentLocationToggle: "yes",
      // categoryToggle: "no",
      checkedCategories: [],
      latitude: null,
      longitude: null,
      gettingLocation: false,
      errorStr: null,
      address: "",
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
    this.getLocation();
  },
  // mounted: function() {
  //   this.getLocation();
  //   console.log(this.latitude, this.longitude);
  //   mapboxgl.accessToken =
  //     "pk.eyJ1Ijoia21yamVsaW5layIsImEiOiJja2dxcnloMWswM3lxMnNycngwanI0enlqIn0.IbzEgdDnsqI4lKKa1vArOw";
  //   const map = new mapboxgl.Map({
  //     container: "map", // container ID
  //     style: "mapbox://styles/mapbox/streets-v11", // style URL
  //     center: [this.latitude, this.longitude], // starting position [lng, lat]
  //     zoom: 4, // starting zoom
  //   });
  // },
  computed: {
    filteredPosts() {
      return this.getByFilter(
        this.posts,
        this.categoriesFilter,
        this.locationsFilter,
        this.search
      );
    },
  },
  methods: {
    getLocation: function() {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.gettingLocation = false;
          this.latitude = pos.coords.latitude;
          this.longitude = pos.coords.longitude;
          // this.getStreetAddressFrom(this.latitude, this.longitude);
        },
        (err) => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        }
      );
    },
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
    getByFilter: function(posts, categoriesFilter, locationsFilter, search) {
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
      if (search) {
        search.forEach((word) => {
          console.log(word);
          posts = this.filterBy(posts, word);
        });
      }
      return posts;
    },
    // async getStreetAddressFrom(lat, long) {
    //   try {
    //     console.log("get stree address from function");
    //     var { data } = await axios.get(
    //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyARySGuGVDeWp3kl29Z7AmqaiKxqQ8s8nY`
    //     );
    //     if (data.error_message) {
    //       console.log(data.error_message);
    //     } else {
    //       console.log(data.results[0].formatted_address);
    //       this.address = data.results[0].formatted_address;
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // },
    // getStreetAddressFrom: function(lat, long) {
    //   axios
    //     .get(
    //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyARySGuGVDeWp3kl29Z7AmqaiKxqQ8s8nY`
    //     )
    //     .then((response) => {
    //       console.log(response.results[0].formatted_address);
    //       this.location = response.results[0].formatted_address;
    //     })
    //     .catch((error) => {
    //       this.errors = error.error_message;
    //     });
    // },
  },
};
</script>
