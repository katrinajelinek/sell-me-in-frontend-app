<template>
  <div class="categories-index">
    <h1>All Categories</h1>
    <div v-for="category in categories">
      <router-link :to="`/categories/${category.id}`">{{
        category.name
      }}</router-link>
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
