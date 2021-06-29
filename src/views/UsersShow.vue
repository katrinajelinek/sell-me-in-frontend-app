<template>
  <div class="users-show">
    <div v-if="user.image_url == null">
      <img
        src="https://images.unsplash.com/photo-1624916888948-7015aa2b25b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        alt=""
        height="500"
        width="700"
      />
    </div>
    <div v-if="user.image_url !== null">
      <img :src="`${user.image_url}`" alt="" height="500" width="700" />
    </div>
    <h1>{{ user.username }}</h1>
    <div v-if="$parent.getUserId() == user.id">
      <router-link :to="`/users/edit/${user.id}`"
        >Edit your Profile</router-link
      >
      <br />
      <router-link to="/posts/new">Create a Post</router-link>
    </div>
    <br />
    <div v-if="$parent.getUserId() == user.id">
      <div v-if="termsAndDisclaimerToggle == true">
        <h4>These are terms and conditions</h4>
        <h4>This is a disclaimer</h4>
        <button v-on:click="termsAndDisclaimerToggle = false">Close</button>
      </div>
      <div v-if="termsAndDisclaimerToggle == false">
        <button v-on:click="termsAndDisclaimerToggle = true">
          click to read terms and conditions agreement
        </button>
      </div>
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
      termsAndDisclaimerToggle: false,
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
