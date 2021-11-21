<template>
  <div id="app">
    <div id="body" class="body-wrapper version1 up-scroll">
      <!-- Preloader -->
      <div id="preloader" class="smooth-loader-wrapper">
        <div class="preloader_container">
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
        </div>
      </div>

      <div class="main-wrapper">
        <!-- HEADER -->
        <div class="header clearfix">
          <!-- TOPBAR -->
          <div class="topBar">
            <div class="container">
              <div class="row">
                <div class="col-md-6 d-none d-md-block">
                  <ul class="list-inline">
                    <li>
                      <a href="#"><i class="fa fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-facebook"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-dribbble"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-vimeo"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-tumblr"></i></a>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6 col-12">
                  <ul class="list-inline float-right top-right">
                    <li class="account-login" v-if="!isLoggedIn()">
                      <span>
                        <router-link
                          data-toggle="modal"
                          href=".login-modal"
                          to="/login"
                          >Log in</router-link
                        ><small>or</small>
                        <router-link
                          data-toggle="modal"
                          href="#signup"
                          to="/signup"
                          >Create an account</router-link
                        ></span
                      >
                    </li>
                    <li class="account-login" v-if="isLoggedIn()">
                      <span>
                        <router-link
                          data-toggle="modal"
                          href=".login-modal"
                          to="/logout"
                          >Log out</router-link
                        ></span
                      >
                    </li>
                    <li class="searchBox">
                      <a href="#"><i class="fa fa-search"></i></a>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <li>
                          <span class="input-group">
                            <input
                              type="text"
                              class="form-control"
                              id="search-items"
                              placeholder="Search…"
                              aria-describedby="basic-addon2"
                              v-model="search"
                            />
                            <button type="submit" class="input-group-addon">
                              Submit
                            </button>
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="isLoggedIn()" :to="`/users/${getUserId()}`"
        >Profile</router-link
      >
      | <router-link v-if="!isLoggedIn()" to="/signup">Signup</router-link> |
      <router-link v-if="!isLoggedIn()" to="/login">Login</router-link> |
      <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link>
    </div> -->
    <router-view />

    <!-- FOOTER -->
    <div class="footer clearfix">
      <div class="container">
        <div class="row">
          <div class="col-md-2 col-12">
            <div class="footerLink">
              <h5>Accessories</h5>
              <ul class="list-unstyled">
                <li><a href="#">Body care </a></li>
                <li><a href="#">Chambray </a></li>
                <li><a href="#">Floral </a></li>
                <li><a href="#">Rejuvination </a></li>
                <li><a href="#">Shaving </a></li>
                <li><a href="#">Toilette </a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-2 col-12">
            <div class="footerLink">
              <h5>BRANDS</h5>
              <ul class="list-unstyled">
                <li><a href="#">Barbour </a></li>
                <li><a href="#">Brioni </a></li>
                <li><a href="#">Oliver Spencer</a></li>
                <li><a href="#">Belstaff</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-2 col-12">
            <div class="footerLink">
              <h5>Accessories</h5>
              <ul class="list-unstyled">
                <li><a href="#">Body care </a></li>
                <li><a href="#">Chambray </a></li>
                <li><a href="#">Floral </a></li>
                <li><a href="#">Rejuvination </a></li>
                <li><a href="#">Shaving </a></li>
                <li><a href="#">Toilette </a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-2 col-12">
            <div class="footerLink">
              <h5>Get in Touch</h5>
              <ul class="list-unstyled">
                <li>Call us at (555)-555-5555</li>
                <li>
                  <a href="mailto:support@iamabdus.com">support@iamabdus.com</a>
                </li>
              </ul>
              <ul class="list-inline">
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-dribbble"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-vimeo"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-tumblr"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 col-12">
            <div class="newsletter clearfix">
              <h4>Newsletter</h4>
              <h3>Sign up now</h3>
              <p>
                Enter your email address and get notified about new products. We
                hate spam!
              </p>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="your email address"
                  aria-describedby="basic-addon2"
                />
                <a href="#" class="input-group-addon" id="basic-addon2"
                  >go <i class="fa fa-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      search: "",
    };
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return parseInt(localStorage.getItem("user_id"));
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
