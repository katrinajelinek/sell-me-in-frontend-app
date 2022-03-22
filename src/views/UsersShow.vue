<template>
  <div class="users-show">
    <!-- <div id="body" class="body-wrapper version1 up-scroll"> -->
    <!-- LIGHT SECTION -->
    <section class="lightSection clearfix pageHeader">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="page-title">
              <h2>{{ user.username }}'S POSTS</h2>
            </div>
          </div>
          <div class="col-md-6">
            <ol class="breadcrumb float-right">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li class="active">PROFILE</li>
            </ol>
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
              <div class="panel-heading">{{ user.username }}</div>
              <div class="panel-body">
                <img
                  height="160"
                  width="160"
                  :src="`${user.image_url}`"
                  alt=""
                />
                <br />
                <div class="form-check">
                  <input
                    id="boughtPostsToggle"
                    type="checkbox"
                    class="checkbox-custom form-check-input"
                    checked="false"
                    v-model="boughtPostsToggle"
                    true-value="yes"
                    false-value="no"
                  />
                  <label
                    for="checkbox-1"
                    class="checkbox-custom-label form-check-label"
                    >Show already bought posts</label
                  >
                </div>
                <div v-if="$parent.getUserId() == user.id">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    v-on:click="pushToUserEdit()"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
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
                {{ categoriesFilter }}
                {{ categoryFilteredPosts }}
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
                <!-- <span class="priceLabel"
                  >Price: <strong>$12 - $30</strong></span
                > -->
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-md-8">
            <div class="row">
              <div v-if="user.posts.length == 0" class="page-title">
                <h2>This seller hasn't created any posts yet</h2>
              </div>
              <div v-if="categoriesFilter.length === 0">
                <div
                  class="col-sm-12 "
                  v-for="post in orderBy(
                    filterBy(user.posts, search),
                    sortAttribute,
                    -1
                  )"
                  :key="post.id"
                >
                  <div v-if="post.bought == false">
                    <div class="productBox">
                      <div class="productImage clearfix">
                        <iframe
                          :src="`${post.video_url}`"
                          frameborder="0"
                          webkitallowfullscreen
                          mozallowfullscreen
                          allowfullscreen
                        ></iframe>
                      </div>
                      <div class="productCaption clearfix">
                        <div v-if="$parent.getUserId() == post.user_id">
                          <button
                            v-on:click="updatePost(post)"
                            class="btn btn-info btn-rounded btn-sm"
                          >
                            Mark post as bought
                          </button>
                          <br />
                          <br />
                        </div>
                        <h4 class="media-heading">
                          <router-link :to="`/posts/${post.id}`">{{
                            post.title
                          }}</router-link>
                        </h4>
                        <p>
                          {{ post.description }}
                        </p>
                        <p>{{ post.location }}</p>
                        <h3>${{ post.price }}</h3>
                      </div>
                    </div>
                  </div>
                  <div v-if="boughtPostsToggle == 'yes'">
                    <div v-if="post.bought">
                      <div class="productBox">
                        <div class="productImage clearfix">
                          <iframe
                            :src="`${post.video_url}`"
                            frameborder="0"
                            webkitallowfullscreen
                            mozallowfullscreen
                            allowfullscreen
                          ></iframe>
                        </div>
                        <div class="productCaption clearfix">
                          <h4 class="media-heading">
                            <router-link :to="`/posts/${post.id}`">{{
                              post.title
                            }}</router-link>
                          </h4>
                          <p>
                            {{ post.description }}
                          </p>
                          <p>{{ post.location }}</p>
                          <h3>${{ post.price }}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="categoriesFilter.length > 0">
                <div
                  class="col-sm-12 "
                  v-for="post in orderBy(
                    filterBy(categoryFilteredPosts, search),
                    sortAttribute,
                    -1
                  )"
                  :key="post.id"
                >
                  <div v-if="post.bought == false">
                    <div class="productBox">
                      <div class="productImage clearfix">
                        <iframe
                          :src="`${post.video_url}`"
                          frameborder="0"
                          webkitallowfullscreen
                          mozallowfullscreen
                          allowfullscreen
                        ></iframe>
                      </div>
                      <div class="productCaption clearfix">
                        <div v-if="$parent.getUserId() == post.user_id">
                          <button
                            v-on:click="updatePost(post)"
                            class="btn btn-info btn-rounded btn-sm"
                          >
                            Mark post as bought
                          </button>
                          <br />
                          <br />
                        </div>
                        <h4 class="media-heading">
                          <router-link :to="`/posts/${post.id}`">{{
                            post.title
                          }}</router-link>
                        </h4>
                        <p>
                          {{ post.description }}
                        </p>
                        <p>{{ post.location }}</p>
                        <h3>${{ post.price }}</h3>
                      </div>
                    </div>
                  </div>
                  <div v-if="boughtPostsToggle == 'yes'">
                    <div v-if="post.bought">
                      <div class="productBox">
                        <div class="productImage clearfix">
                          <iframe
                            :src="`${post.video_url}`"
                            frameborder="0"
                            webkitallowfullscreen
                            mozallowfullscreen
                            allowfullscreen
                          ></iframe>
                        </div>
                        <div class="productCaption clearfix">
                          <h4 class="media-heading">
                            <router-link :to="`/posts/${post.id}`">{{
                              post.title
                            }}</router-link>
                          </h4>
                          <p>
                            {{ post.description }}
                          </p>
                          <p>{{ post.location }}</p>
                          <h3>${{ post.price }}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      user: {
        posts: [],
      },
      search: "",
      sortAttribute: "created_at",
      categoryFilteredPosts: [],
      categoriesFilter: [],
      boughtPostsToggle: "no",
      termsAndDisclaimerToggle: false,
      categories: [],
      priceRange: [],
    };
  },
  created: function() {
    this.showUser();
    this.indexCategories();
  },
  watch: {
    categoriesFilter: function() {
      if (this.categoriesFilter) {
        this.categoryFilteredPosts = this.filterBy(
          this.user.posts,
          this.categoriesFilter
        );
        console.log(this.categoryFilteredPosts);
      }
    },
  },
  computed: {
    filteredPosts() {
      return this.getByFilter(
        this.user.posts,
        this.categoriesFilter,
        this.search
      );
    },
  },
  methods: {
    showUser: function() {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
    },
    indexCategories: function() {
      axios.get("/api/categories").then((response) => {
        console.log(response.data);
        this.categories = response.data;
      });
    },
    updatePost: function(post) {
      var formData = new FormData();
      var index = this.user.posts.indexOf(post);
      console.log(index);
      formData.append("bought", true);
      axios
        .patch(`/api/posts/${post.id}`, formData)
        .then((response) => {
          console.log(response.data);
          post.bought = true;
          this.user.posts[index] = response.data;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    pushToUserEdit: function() {
      this.$router.push(`/users/edit/${this.user.id}`);
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
