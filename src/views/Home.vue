<template>
  <div class="home">
    <body id="body" class="body-wrapper version1 up-scroll">
      <!-- LIGHT SECTION -->
      <section class="lightSection clearfix pageHeader">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="page-title">
                <!-- <h2>Home</h2> -->
              </div>
            </div>
            <!-- <div class="col-md-6">
              <ol class="breadcrumb float-right">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li class="active">Create</li>
              </ol>
            </div> -->
          </div>
        </div>
      </section>
      <!-- MAIN CONTENT SECTION -->
      <section class="mainContent clearfix productsContent">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-4 sideBar">
              <div class="panel panel-default filterNormal">
                <div class="panel-heading">Product Categories</div>
                <div class="panel-body">
                  <ul class="list-unstyled clearfix">
                    <li v-for="category in categories">
                      <input
                        type="checkbox"
                        v-model="categoriesFilter"
                        v-bind:value="category.name"
                      />
                      {{ category.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="panel panel-default priceRange">
                <div class="panel-heading">Filter by Price</div>
                <div class="panel-body clearfix">
                  <div class="price-slider-inner">
                    <span class="amount-wrapper">
                      Price:
                      <input
                        type="number"
                        id="price-amount-1"
                        v-model="min"
                        readonly
                      />
                      <strong>-</strong>
                      <input
                        type="number"
                        id="price-amount-2"
                        v-model="max"
                        readonly
                      />
                    </span>
                    <div id="price-range"></div>
                  </div>
                  <button
                    type="submit"
                    class="btn-default"
                    value="Filter"
                    id="priceFilter"
                    v-on:click="priceFilter = true"
                  >
                    Filter
                  </button>
                  <!-- <span class="priceLabel">Price: <strong>$12 - $30</strong></span> -->
                </div>
              </div>
            </div>
            <!-- <h1 v-for="post in filterPostsByPrice">
              {{ post }}
            </h1> -->
            <div class="col-lg-9 col-md-8">
              <div class="row filterArea">
                <div class="col-6">
                  <div>
                    <input
                      type="text"
                      id="search-items"
                      v-model="search"
                      placeholder="Search..."
                    />
                  </div>
                  <!-- <select name="guiest_id1" id="guiest_id1" class="select-drop">
                    <option value="0">Default sorting</option>
                    <option value="1">Sort by popularity</option>
                    <option value="2">Sort by rating</option>
                    <option value="3">Sort by newness</option>
                    <option value="3">Sort by price</option>
                  </select> -->
                </div>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="checkbox-custom form-check-input"
                  checked="false"
                  v-model="currentLocationToggle"
                  true-value="yes"
                  false-value="no"
                />
                <label
                  for="checkbox-1"
                  class="checkbox-custom-label form-check-label"
                  >Sales in my city</label
                >
              </div>
              <div v-if="categoriesFilter.length > 0">
                <div class="row productListSingle">
                  <div
                    class="col-sm-12 "
                    v-for="post in orderBy(
                      filterBy(categoryFilteredPosts, search),
                      sortAttribute,
                      -1
                    )"
                    :key="post.id"
                  >
                    <div class="media flex-wrap productBox">
                      <div class="media-left">
                        <div class="productImage clearfix">
                          <div
                            class="fluid-width-video-wrapper"
                            style="padding-top: 56.2%;"
                          >
                            <iframe
                              :src="`${post.video_url}`"
                              frameborder="0"
                              webkitallowfullscreen
                              mozallowfullscreen
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </div>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <router-link :to="`/posts/${post.id}`">{{
                            post.title
                          }}</router-link>
                        </h4>
                        <p>{{ post.location }}</p>
                        <p>
                          {{ post.description }}
                        </p>
                        <h3>${{ post.price }}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="categoriesFilter.length === 0">
                <div class="row productListSingle">
                  <div
                    class="col-sm-12 "
                    v-for="post in orderBy(
                      filterBy(posts, search),
                      sortAttribute,
                      -1
                    )"
                    :key="post.id"
                  >
                    <div class="media flex-wrap productBox">
                      <div class="media-left">
                        <div class="productImage clearfix">
                          <div
                            class="fluid-width-video-wrapper"
                            style="padding-top: 56.2%;"
                          >
                            <iframe
                              :src="`${post.video_url}`"
                              frameborder="0"
                              webkitallowfullscreen
                              mozallowfullscreen
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </div>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <router-link :to="`/posts/${post.id}`">{{
                            post.title
                          }}</router-link>
                        </h4>
                        <p>{{ post.location }}</p>
                        <p>
                          {{ post.description }}
                        </p>
                        <h3>${{ post.price }}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PORDUCT QUICK VIEW MODAL -->
      <div class="modal fade quick-view" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
              <div class="media flex-wrap">
                <div class="media-left px-0">
                  <img
                    class="media-object"
                    src="/img/products/quick-view/quick-view-01.jpg"
                    alt="Image"
                  />
                </div>
                <div class="media-body">
                  <h2>Old Skool Navy</h2>
                  <h3>$149</h3>
                  <p>
                    Classic sneaker from Vans. Cotton canvas and suede upper.
                    Textile lining with heel stabilizer and ankle support.
                    Contrasting laces. Sits on a classic waffle rubber sole.
                  </p>
                  <span class="quick-drop">
                    <select
                      name="guiest_id3"
                      id="guiest_id3"
                      class="select-drop"
                    >
                      <option value="0">Size</option>
                      <option value="1">Size 1</option>
                      <option value="2">Size 2</option>
                      <option value="3">Size 3</option>
                    </select>
                  </span>
                  <span class="quick-drop resizeWidth">
                    <select
                      name="guiest_id4"
                      id="guiest_id4"
                      class="select-drop"
                    >
                      <option value="0">Qty</option>
                      <option value="1">Qty 1</option>
                      <option value="2">Qty 2</option>
                      <option value="3">Qty 3</option>
                    </select>
                  </span>
                  <div class="btn-area">
                    <a href="#" class="btn btn-primary btn-block"
                      >Add to cart
                      <i class="fa fa-angle-right" aria-hidden="true"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    <!-- <h1>Sell Me In</h1> -->

    <!-- <div>
      <div>
        <vue-range-slider
          v-model="value"
          :min="min"
          :max="max"
          :formatter="formatter"
        ></vue-range-slider>
      </div>
      {{ value }}
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
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import "vue-range-component/dist/vue-range-slider.css";
import VueRangeSlider from "vue-range-component";

export default {
  mixins: [Vue2Filters.mixin],
  components: {
    // VueRangeSlider,
  },
  data: function() {
    return {
      posts: [],
      allPosts: [],
      categoryFilteredPosts: [],
      categories: [],
      categoriesFilter: [],
      nearMeFilter: "no",
      locations: [],
      values: [],
      userLocation: "",
      sortAttribute: "created_at",
      search: "",
      currentLocationToggle: "no",
      // categoryToggle: "no",
      checkedCategories: [],
      latitude: null,
      longitude: null,
      gettingLocation: false,
      errorStr: null,
      address: "",
      priceFilter: false,
      min: 2,
      max: 1000,
      // locationToggle: "no",
      // value: [0, 250],
    };
  },
  created: function() {
    this.indexPosts();
    this.indexCategories();
    this.showUser();
    // this.min = 0;
    // this.max = 250;
    // this.formatter = (value) => `$${value}`;
  },
  watch: {
    currentLocationToggle: function() {
      if (this.currentLocationToggle === "yes") {
        this.posts = this.filterBy(this.posts, this.userLocation);
        console.log(this.posts);
      }
      if (this.currentLocationToggle === "no") {
        this.indexPosts();
        console.log(this.posts);
      }
    },
    priceFilter: function() {
      if (this.priceFilter === true) {
        this.allPosts = this.posts;
        this.posts.forEach((post) => {
          if (
            !(Number(post.price) > this.min && Number(post.price) < this.max)
          ) {
            var index = this.posts.indexOf(post);
            this.posts.splice(index, 1);
          }
        });
      }
    },
    categoriesFilter: function() {
      if (this.categoriesFilter) {
        this.categoryFilteredPosts = this.filterBy(
          this.posts,
          this.categoriesFilter
        );
        console.log(this.categoryFilteredPosts);
      }
    },
  },
  computed: {
    filteredPosts() {
      return this.getByFilter(
        this.posts,
        this.categoriesFilter,
        this.currentLocationToggle,
        this.search
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
    showUser: function() {
      axios.get(`/api/users/${this.$parent.getUserId()}`).then((response) => {
        console.log(response.data);
        this.userLocation = response.data.location;
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
    getByFilter: function(posts, categoriesFilter, search) {
      if (categoriesFilter) {
        categoriesFilter.forEach((category) => {
          this.posts = this.filterBy(posts, category);
        });
        console.log(this.posts);
      }
      if (search) {
        search.forEach((word) => {
          console.log(word);
          posts = this.filterBy(posts, word);
        });
      }
    },
  },
};
</script>
