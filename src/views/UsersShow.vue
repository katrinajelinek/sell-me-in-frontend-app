<template>
  <div class="users-show">
    <img :src="`${user.image_url}`" alt="" height="500" width="700" />
    <h1>{{ user.username }}</h1>
    <div v-if="$parent.getUserId() == user.id">
      <router-link :to="`/users/edit/${user.id}`"
        >Edit your Profile</router-link
      >
      <br />
      <router-link to="/posts/new">Create a Post</router-link>
    </div>
    <br />
    <div>
      <input
        type="checkbox"
        v-model="boughtPostsToggle"
        true-value="yes"
        false-value="no"
      />
      <label>Show already bought posts</label>
    </div>
    <!-- <button v-on:click="boughtToggle = !boughtToggle">
      Checkout bought posts
    </button> -->
    <h2>Posts:</h2>
    <div v-for="post in user.posts">
      <div v-if="post.bought == false">
        <embed :src="`${post.video_url}`" type="" />
        <h3>
          <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
        </h3>
        <div v-if="$parent.getUserId() == post.user_id">
          <router-link :to="`/posts/edit/${post.id}`"
            >Edit your Post</router-link
          >
        </div>
        <p>Price: {{ post.price }}</p>
        <p>Location: {{ post.location }}</p>
        <p>Description: {{ post.description }}</p>
        <h5>Categories:</h5>
        <div v-for="category in post.categories">
          <p>{{ category.name }}</p>
        </div>
        <div v-if="$parent.getUserId() == user.id">
          <div v-if="post.bought == false">
            <button v-on:click="updatePost(post)">Mark post as bought</button>
          </div>
        </div>
        <br />
      </div>
      <div v-if="boughtPostsToggle == 'yes'">
        <div v-if="post.bought == true">
          <embed :src="`${post.video_url}`" type="" />
          <h3>
            <router-link :to="`/posts/${post.id}`">{{
              post.title
            }}</router-link>
          </h3>
          <h4>This has been bought</h4>
          <div v-if="$parent.getUserId() == post.user_id">
            <router-link :to="`/posts/edit/${post.id}`"
              >Edit your Post</router-link
            >
          </div>
          <p>Price: {{ post.price }}</p>
          <p>Location: {{ post.location }}</p>
          <p>Description: {{ post.description }}</p>
          <h5>Categories:</h5>
          <div v-for="category in post.categories">
            <p>{{ category.name }}</p>
          </div>
          <div v-if="$parent.getUserId() == user.id">
            <div v-if="post.bought == false">
              <button v-on:click="updatePost(post)">Mark post as bought</button>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {
        posts: [],
      },
      boughtPostsToggle: "no",
    };
  },
  created: function() {
    this.showUser();
  },
  methods: {
    showUser: function() {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.user = response.data;
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
  },
};
</script>
