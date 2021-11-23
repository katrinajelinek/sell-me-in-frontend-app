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
                      <router-link :to="`/categories/${category.id}`">{{
                        category.name
                      }}</router-link>
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
                      <input type="text" id="price-amount-1" readonly />
                      <strong>-</strong>
                      <input type="text" id="price-amount-2" readonly />
                    </span>
                    <div id="price-range"></div>
                  </div>
                  <input class="btn-default" type="submit" value="Filter" />
                  <!-- <span class="priceLabel">Price: <strong>$12 - $30</strong></span> -->
                </div>
              </div>
            </div>
            <div class="col-lg-9 col-md-8">
              <div class="row filterArea">
                <div class="col-6">
                  <select name="guiest_id1" id="guiest_id1" class="select-drop">
                    <option value="0">Default sorting</option>
                    <option value="1">Sort by popularity</option>
                    <option value="2">Sort by rating</option>
                    <option value="3">Sort by newness</option>
                    <option value="3">Sort by price</option>
                  </select>
                </div>
              </div>
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
                        <!-- <div class="productMasking">
                          <ul class="list-inline btn-group" role="group">
                            <li>
                              <a class="btn btn-default btn-wishlist"
                                ><i class="fa fa-heart-o"></i
                              ></a>
                            </li>
                            <li>
                              <a
                                href="javascript:void(0)"
                                class="btn btn-default"
                                data-toast
                                data-toast-type="success"
                                data-toast-position="topRight"
                                data-toast-icon="icon-circle-check"
                                data-toast-title="Product"
                                data-toast-message="successfuly added to cart!"
                                ><i class="fa fa-shopping-basket"></i
                              ></a>
                            </li>
                            <li>
                              <a
                                class="btn btn-default"
                                data-toggle="modal"
                                href=".quick-view"
                                ><i class="fa fa-eye"></i
                              ></a>
                            </li>
                          </ul>
                        </div> -->
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
      <input
        type="text"
        id="search-items"
        v-model="search"
        placeholder="Search title..."
      />
      <label>Search title:</label>
    </div> -->
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
      <div
        v-for="post in orderBy(filterBy(posts, search), sortAttribute, -1)"
        :key="post.id"
      >
        <h3>
          Made by:
          <router-link :to="`/users/${post.user_id}`">{{
            post.user.username
          }}</router-link>
        </h3>
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
      value: [0, 250],
    };
  },
  created: function() {
    this.indexPosts();
    this.indexCategories();
    this.min = 0;
    this.max = 250;
    this.formatter = (value) => `$${value}`;
  },
  computed: {
    filteredPosts() {
      return this.getByFilter(
        this.posts,
        this.categoriesFilter,
        this.locationsFilter,
        this.search,
        this.value
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
    getByFilter: function(
      posts,
      categoriesFilter,
      locationsFilter,
      search,
      value
    ) {
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
  },
};
</script>
