<template>
  <div class="users-edit">
    <h1>Edit your Profile</h1>
    <div>
      <button @click="openUploadModal">Choose a new profile picture</button>
    </div>
    <div v-if="image">
      <img :src="`${image}`" type="" width="700" height="500" />
    </div>
    <form v-on:submit.prevent="updateUser(user)">
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
      <button v-on:click="destroyUser()">Delete Profile</button>
    </form>
    <form v-if="passwordUpdateToggle">
      <div class="form-group">
        <label>Old Password:</label>
        <input type="password" class="form-control" v-model="oldPassword" />
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
          v-model="passwordConfirmation"
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
      image: "",
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
      passwordUpdateToggle: false,
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
      this.image = response.data.image_url;
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    updateUser: function(user) {
      var formData = new FormData();
      formData.append("first_name", user.first_name);
      formData.append("last_name", user.last_name);
      formData.append("username", user.username);
      formData.append("email", user.email);
      if (this.image) {
        formData.append("image", this.image);
      }
      formData.append("password", user.password);
      formData.append("old_password", this.oldPassword);
      formData.append("password", this.password);
      formData.append("password_confirmation", this.passwordConfirmation);
      axios
        .patch(`/api/users/${this.user.id}`, formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete your account?")) {
        axios.delete(`/api/users/${this.user.id}`).then((response) => {
          console.log("Success", response.data);
          localStorage.removeItem("jwt");
          localStorage.removeItem("user_id");
          this.$router.push("/");
        });
      }
    },
    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: "djka3ehcg",
            upload_preset: "musnwcbj",
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              this.image = result.info.url;
            }
          }
        )
        .open();
    },
  },
};
</script>
