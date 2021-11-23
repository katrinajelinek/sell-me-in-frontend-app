<template>
  <div class="users-edit">
    <!-- LIGHT SECTION -->
    <section class="lightSection clearfix pageHeader">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="page-title">
              <h2>EDIT YOUR PROFILE</h2>
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
    <section class="mainContent clearfix userProfile">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="innerWrapper profile">
              <div class="orderBox">
                <router-link :to="`/users/${user.id}`">
                  <h2>profile</h2></router-link
                >
              </div>
              <div class="row">
                <div class="col-md-4 col-lg-3 col-xl-2 col-12">
                  <div class="thumbnail">
                    <div v-if="image">
                      <img :src="`${image}`" alt="" />
                    </div>
                    <div v-if="image == null">
                      <img :src="`${user.image_url}`" alt="" />
                    </div>

                    <div class="caption">
                      <button
                        class="btn btn-primary btn-block"
                        role="button"
                        v-on:click="openUploadModal()"
                      >
                        Change Avatar
                      </button>
                    </div>
                    <div class="caption">
                      <button
                        class="btn btn-warning btn-block"
                        role="button"
                        v-on:click="destroyUser()"
                      >
                        Delete Profile
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  class="col-md-8 col-lg-9 col-xl-10 col-12"
                  v-if="$parent.getUserId() == user.id"
                >
                  <form
                    class="form-horizontal"
                    v-on:submit.prevent="updateUser(user)"
                  >
                    <ul>
                      <li
                        class="text-danger"
                        v-for="error in errors"
                        v-bind:key="error"
                      >
                        {{ error }}
                      </li>
                    </ul>
                    <div class="form-group row">
                      <label for="" class="col-md-3 control-label"
                        >First Name</label
                      >
                      <div class="col-md-7">
                        <input
                          type="text"
                          class="form-control"
                          id="first_name"
                          v-model="user.first_name"
                          :placeholder="`${user.first_name}`"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="" class="col-md-3 control-label"
                        >Last Name</label
                      >
                      <div class="col-md-7">
                        <input
                          type="text"
                          class="form-control"
                          id="last_name"
                          v-model="user.last_name"
                          :placeholder="`${user.last_name}`"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="" class="col-md-3 control-label"
                        >Username</label
                      >
                      <div class="col-md-9">
                        <input
                          type="text"
                          class="form-control"
                          id="username"
                          v-model="user.username"
                          :placeholder="`${user.username}`"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="" class="col-md-3 control-label"
                        >Email Address</label
                      >
                      <div class="col-md-9">
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          v-model="user.email"
                          :placeholder="`${user.email}`"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="" class="col-md-3 control-label"
                        >Password</label
                      >
                      <div class="col-md-9">
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          v-model="oldPassword"
                          placeholder="***********"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="" class="col-md-3 control-label"
                        >New Password</label
                      >
                      <div class="col-md-9">
                        <input
                          type="password"
                          class="form-control"
                          id=""
                          v-model="password"
                          placeholder="***********"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="" class="col-md-3 control-label"
                        >Confirm Password</label
                      >
                      <div class="col-md-9">
                        <input
                          type="password"
                          class="form-control"
                          id=""
                          v-model="passwordConfirmation"
                          placeholder="***********"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class=" col-md-12 ">
                        <button
                          type="submit"
                          class="btn btn-primary float-right"
                        >
                          SAVE INFO
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
