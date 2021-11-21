<template>
  <div class="categories-index">
    <div id="body" class="body-wrapper version1 up-scroll">
      <!-- LIGHT SECTION -->
      <section class="lightSection clearfix pageHeader">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="page-title">
                <h2>{{ category.name }}</h2>
              </div>
            </div>
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
                    filterBy(category.posts, search),
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
                      <!-- <p>
                        {{ post.description }}
                      </p> -->
                      <p>{{ post.location }}</p>
                      <h3>${{ post.price }}</h3>
                    </div>
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

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import "vue-range-component/dist/vue-range-slider.css";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      category: {},
      categories: [],
      sortAttribute: "created_at",
      search: "",
      value: [0, 250],
    };
  },
  created: function() {
    this.showCategory();
    this.indexCategories();
  },
  computed: {
    filteredPosts() {
      return this.getByFilter(
        this.category.posts,
        this.categoriesFilter,
        // this.locationsFilter,
        this.search,
        this.value
      );
    },
  },
  methods: {
    showCategory: function() {
      axios.get(`/api/categories/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.category = response.data;
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
