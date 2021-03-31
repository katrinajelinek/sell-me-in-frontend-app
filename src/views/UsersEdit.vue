<template>
  <div class="users-edit">
    <form v-on:submit.prevent="updateUser(user)">
      <h1>Edit your Profile</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="user.first_name" />
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="user.last_name" />
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="user.username" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="user.email" />
      </div>
      <button v-on:click="passwordUpdateToggle = !passwordUpdateToggle">
        Change Password
      </button>
      <button type="submit">
        Update
      </button>
    </form>
    <form v-if="passwordUpdateToggle">
      <div class="form-group">
        <label>Old Password:</label>
        <input type="password" class="form-control" v-model="old_password" />
      </div>
      <div class="form-group">
        <label>New Password:</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          class="form-control"
          v-model="password_confirmation"
        />
      </div>
      <button v-on:click="updateUser()">
        Update Password
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      old_password: "",
      password: "",
      password_confirmation: "",
      passwordUpdateToggle: false,
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function(user) {
      var params = {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        old_password: this.old_password,
        password: this.password,
        password_confirmation: this.password_confirmation,
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
