<template>
  <div class="categories-index">
    <div id="body" class="body-wrapper version1 up-scroll">
      <!-- LIGHT SECTION -->
      <section class="lightSection clearfix pageHeader">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-6">
              <div class="page-title">
                <h2>Categories</h2>
              </div>
            </div>
            <div class="col-6">
              <ol class="breadcrumb pull-right">
                <li>
                  <router-link to="/">Home</router-link>
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
                <li class="active">Shoes</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <!-- MAIN CONTENT SECTION -->
      <section class="mainContent clearfix productsContent">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-4 " v-for="category in categories">
              <div class="productBox">
                <div class="productImage clearfix">
                  <router-link :to="`/categories/${category.id}`">
                    <img :src="`${category.image_url}`" alt="products-img"
                  /></router-link>
                </div>
                <div class="productCaption clearfix">
                  <router-link :to="`/categories/${category.id}`"
                    ><h5>{{ category.name }}</h5></router-link
                  >
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
export default {
  data: function() {
    return {
      categories: [],
    };
  },
  created: function() {
    axios.get("/api/categories").then((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
  },
  methods: {},
};
</script>
