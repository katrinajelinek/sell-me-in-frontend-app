<template>
  <div class="login">
    <div id="body" class="body-wrapper version1 up-scroll">
      <!-- LIGHT SECTION -->
      <section class="lightSection clearfix pageHeader">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="page-title">
                <h2>log in</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- MAIN CONTENT SECTION -->
      <section class="mainContent clearfix logIn">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-7 col-lg-8 col-xl-7 col-12">
              <div class="panel panel-default">
                <div class="panel-heading"><h3>log in</h3></div>
                <div class="panel-body">
                  <form
                    action=""
                    method="POST"
                    role="form"
                    v-on:submit.prevent="submit()"
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
                    <div class="form-group">
                      <label for="">Enter Email</label>
                      <input
                        type="email"
                        class="form-control"
                        v-model="email"
                        id="email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        v-model="password"
                        id="password"
                      />
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary btn-default btn-block"
                    >
                      log in
                    </button>
                    <!-- <div class="d-block social-login text-center">
                      <button
                        class="btn btn-social titled facebook float-lg-left"
                      >
                        <i class="fa fa-facebook-f"></i> log in with facebook
                      </button>
                      <button
                        class="btn btn-social titled google-plus float-lg-right"
                      >
                        <i class="fa fa-google-plus"></i> log in with
                        google-plus
                      </button>
                    </div> -->
                    <!-- <button type="button" class="btn btn-link btn-block">
                      Forgot Password?
                    </button> -->
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
