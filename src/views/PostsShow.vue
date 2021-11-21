<template>
  <div class="posts-show">
    <div id="body" class="body-wrapper version1 up-scroll">
      <div class="main-wrapper">
        <!-- LIGHT SECTION -->
        <section class="lightSection clearfix pageHeader">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="page-title">
                  <h2>{{ post.title }}</h2>
                </div>
              </div>
              <div class="col-md-6">
                <ol class="breadcrumb pull-right">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li class="active">{{ post.title }}</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <!-- MAIN CONTENT SECTION -->
        <section class="mainContent clearfix">
          <div class="container">
            <div class="row singleProduct">
              <div class="col-md-12">
                <div class="media flex-wrap mb-5">
                  <div class="media-left productSlider">
                    <div
                      id="carousel"
                      class="carousel slide"
                      data-ride="carousel"
                    >
                      <div class="carousel-inner SingleProductItem">
                        <div class="video-icon">
                          <a
                            class="video-link"
                            data-fancybox
                            :href="`${post.video_url}`"
                          >
                            <i
                              class="fa fa-play play-icon"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </div>
                        <!-- top picture/make this the video -->
                        <div
                          class="carousel-item active productImage SingleProductImage"
                          data-thumb="0"
                        >
                          <div
                            class="fluid-width-video-wrapper"
                            style="padding-top: 56.2%;"
                          >
                            <iframe
                              :src="`${post.video_url}`"
                              frameborder="0"
                              webkitallowfullscreen
                              mozallowfullscreen
                              allowfullscreen
                            ></iframe>
                          </div>

                          <a
                            data-fancybox="images"
                            :href="`${post.video_url}`"
                            class="product-content"
                          >
                            <div class="MaskingIcon">
                              <i class="fa fa-plus"></i>
                            </div>
                          </a>
                        </div>
                        <!-- all images -->
                        <div v-if="post.images">
                          <div v-for="(image, index) in post.images">
                            <div
                              class="carousel-item SingleProductImage"
                              :data-thumb="`${image[index]}`"
                            >
                              <img :src="`${image.image_url}`" />
                              <a
                                data-fancybox="images"
                                :href="`${image.image_url}`"
                                class="product-content"
                              >
                                <div class="MaskingIcon">
                                  <i class="fa fa-plus"></i>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="post.images">
                      <div class="clearfix">
                        <div
                          id="thumbcarousel"
                          class="carousel slide"
                          data-interval="false"
                        >
                          <div class="carousel-inner">
                            <div
                              v-for="(image, index) in images"
                              data-target="#carousel"
                              :data-slide-to="`${image[index + 1]}`"
                              class="thumb"
                            >
                              <img :src="image.image_url" />
                            </div>
                          </div>
                          <a
                            class="left carousel-control"
                            href="#thumbcarousel"
                            role="button"
                            data-slide="prev"
                          >
                            <span
                              class="glyphicon glyphicon-chevron-left"
                            ></span>
                          </a>
                          <a
                            class="right carousel-control"
                            href="#thumbcarousel"
                            role="button"
                            data-slide="next"
                          >
                            <span
                              class="glyphicon glyphicon-chevron-right"
                            ></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="media-body">
                    <ul class="list-inline">
                      <li class="mb-4 mb-md-0">
                        <router-link to="/">
                          <i class="fa fa-reply" aria-hidden="true"></i>
                          Continue Shopping</router-link
                        >
                      </li>
                    </ul>

                    <h2>${{ post.price }}</h2>
                    <router-link :to="`/users/${post.user_id}`">
                      <h3>{{ post.user.username }}</h3></router-link
                    >

                    <div class="tabArea d-none">
                      <ul class="nav nav-tabs bar-tabs">
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            data-toggle="tab"
                            href="#details"
                            >details</a
                          >
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#about-art"
                            >about art</a
                          >
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" data-toggle="tab" href="#sizing"
                            >sizing</a
                          >
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" data-toggle="tab" href="#shipping"
                            >shipping</a
                          >
                        </li>
                      </ul>
                      <div class="tab-content">
                        <div id="details" class="tab-pane fade show active">
                          <p>
                            LContrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of
                            classical Latin liter ature from 45 BC, making it
                            over 2000 years old. Richard McClintock, a Latin
                            professor at Hampden-Sydney College in Virginia.
                          </p>
                          <ul class="list-unstyled">
                            <li>Black, Crew Neck</li>
                            <li>75% Cotton, 25% Rayon</li>
                            <li>Waterbased Ink</li>
                            <li>Wash Cold, dry low</li>
                          </ul>
                        </div>
                        <div id="about-art" class="tab-pane fade">
                          <p>
                            Nulla facilisi. Mauris efficitur, massa et iaculis
                            accumsan, mauris velit ultrices purus, quis
                            condimentum nibh dolor ut tortor. Donec egestas
                            tortor quis mattis gravida. Ut efficitur elit vitae
                            dignissim volutpat.
                          </p>
                        </div>
                        <div id="sizing" class="tab-pane fade">
                          <p>
                            Praesent dui felis, gravida a auctor at, facilisis
                            commodo ipsum. Cras eu faucibus justo. Nullam varius
                            cursus nisi, sed elementum sem sagittis at. Nulla
                            tellus massa, vestibulum a commodo facilisis,
                            pulvinar convallis nunc.
                          </p>
                        </div>
                        <div id="shipping" class="tab-pane fade">
                          <p>
                            Mauris lobortis augue ex, ut faucibus nisi mollis
                            ac. Sed volutpat scelerisque ex ut ullamcorper. Cras
                            at velit quis sapien dapibus laoreet a id odio. Sed
                            sit amet accumsan ante, eu congue metus. Aenean eros
                            tortor, cursus quis feugiat sed, vestibulum vel
                            purus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row singleProduct singleProductTab">
              <div class="col-12">
                <div class="media mb-4">
                  <div class="media-body">
                    <div class="tabArea">
                      <ul class="nav nav-tabs bar-tabs">
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            data-toggle="tab"
                            href="#OurDetails"
                            >Details</a
                          >
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" data-toggle="tab" href="#Reviews"
                            >Contact Seller</a
                          >
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#OurSizing"
                            >Sizing</a
                          >
                        </li>

                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#OurShipping"
                            >shipping</a
                          >
                        </li>
                      </ul>
                      <div class="tab-content">
                        <div id="OurDetails" class="tab-pane fade show active">
                          <p>
                            {{ post.description }}
                          </p>
                        </div>

                        <div id="Reviews" class="tab-pane fade">
                          <div class="mt-5 mb-2 border p-4 p-md-5">
                            <form>
                              <div class="media flex-column flex-md-row mb-0">
                                <!-- <img
                                  class="m-auto m-md-0 mr-md-4 rounded rounded-circle"
                                  :src="`${post.user.image_url}`"
                                  alt="Generic placeholder image"
                                /> -->

                                <div class="media-body mt-4 mt-md-0">
                                  <h6
                                    class="text-center text-md-left text-capitalize mt-0"
                                  >
                                    <em>{{ post.user.username }}</em>
                                  </h6>

                                  <div class="row">
                                    <div class="form-group col-md-12">
                                      <textarea
                                        class="form-control"
                                        id="exampleTextarea"
                                        rows="5"
                                        placeholder="Write your message here. Remember to leave contact information if you'd like the seller to contact you back!"
                                      ></textarea>
                                    </div>
                                  </div>

                                  <div class="text-center text-md-left">
                                    <button
                                      type="submit"
                                      class="btn btn-default btn-primary custom-btn"
                                    >
                                      Send Message
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>

                        <div id="OurSizing" class="tab-pane fade">
                          <div class="SingleCartListWrapper SingleCartSizing">
                            <div class="cartListInner">
                              <div class="table-responsive">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th>Inches</th>
                                      <th>US size</th>
                                      <th>EN size</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr>
                                      <td class="">9.65</td>
                                      <td class="">6.5</td>
                                      <td class="">39</td>
                                    </tr>

                                    <tr>
                                      <td class="">9.84</td>
                                      <td class="">7</td>
                                      <td class="">40</td>
                                    </tr>

                                    <tr>
                                      <td class="">10.04</td>
                                      <td class="">8</td>
                                      <td class="">41</td>
                                    </tr>

                                    <tr>
                                      <td class="">10.24</td>
                                      <td class="">8.5</td>
                                      <td class="">42</td>
                                    </tr>

                                    <tr>
                                      <td class="">10.43</td>
                                      <td class="">9.5</td>
                                      <td class="">43</td>
                                    </tr>

                                    <tr>
                                      <td class="">10.63</td>
                                      <td class="">10.0</td>
                                      <td class="">44</td>
                                    </tr>

                                    <tr>
                                      <td class="">10.83</td>
                                      <td class="">11.0</td>
                                      <td class="">45</td>
                                    </tr>

                                    <tr>
                                      <td class="">11.02</td>
                                      <td class="">12.0</td>
                                      <td class="">46</td>
                                    </tr>

                                    <tr>
                                      <td class="">11.2</td>
                                      <td class="">12.5</td>
                                      <td class="">47</td>
                                    </tr>

                                    <tr>
                                      <td class="">11.42</td>
                                      <td class="">13</td>
                                      <td class="">48</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div id="OurShipping" class="tab-pane fade">
                          <div class="SingleCartListWrapper SingleCartShipping">
                            <div class="cartListInner">
                              <div class="table-responsive">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th>Shipping method</th>
                                      <th>Estimated Time</th>
                                      <th>Fees</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr>
                                      <td class="">
                                        <div
                                          class="custom-control custom-radio single-custom-control"
                                        >
                                          <input
                                            type="radio"
                                            id="customRadio3"
                                            name="customRadio"
                                            class="custom-control-input"
                                            checked=""
                                          />
                                          <label
                                            class="custom-control-label"
                                            for="customRadio3"
                                            ><span
                                              class="d-block"
                                              style="margin-top: 3px;"
                                              >Pickup from store</span
                                            ></label
                                          >
                                        </div>
                                      </td>

                                      <td class="">—</td>
                                      <td class="">$0</td>
                                    </tr>

                                    <tr>
                                      <td class="">
                                        <div
                                          class="custom-control custom-radio single-custom-control"
                                        >
                                          <input
                                            type="radio"
                                            id="customRadio2"
                                            name="customRadio"
                                            class="custom-control-input"
                                          />
                                          <label
                                            class="custom-control-label"
                                            for="customRadio2"
                                            ><span
                                              class="d-block"
                                              style="margin-top: 3px;"
                                              >Local Shipping</span
                                            ></label
                                          >
                                        </div>
                                      </td>

                                      <td class="">2-7 days</td>
                                      <td class="">$4</td>
                                    </tr>

                                    <tr>
                                      <td class="">
                                        <div
                                          class="custom-control custom-radio single-custom-control"
                                        >
                                          <input
                                            type="radio"
                                            id="customRadio1"
                                            name="customRadio"
                                            class="custom-control-input"
                                          />
                                          <label
                                            class="custom-control-label"
                                            for="customRadio1"
                                            ><span
                                              class="d-block"
                                              style="margin-top: 3px;"
                                              >Courier</span
                                            ></label
                                          >
                                          >
                                        </div>
                                      </td>

                                      <td class="">3-5 days</td>
                                      <td class="">$5</td>
                                    </tr>

                                    <tr>
                                      <td class="">
                                        <div
                                          class="custom-control custom-radio single-custom-control"
                                        >
                                          <input
                                            type="radio"
                                            id="customRadio4"
                                            name="customRadio"
                                            class="custom-control-input"
                                          />
                                          <label
                                            class="custom-control-label"
                                            for="customRadio4"
                                            ><span
                                              class="d-block"
                                              style="margin-top: 3px;"
                                              >International Shipping</span
                                            ></label
                                          >
                                        </div>
                                      </td>

                                      <td class="">7-15 days</td>
                                      <td class="">$15</td>
                                    </tr>
                                  </tbody>
                                </table>
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
          </div>
        </section>
        <!-- PORDUCT QUICK VIEW MODAL -->
        <div class="modal fade quick-view" tabindex="-1" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
                <div class="media flex-wrap">
                  <div class="media-left px-0">
                    <img
                      class="media-object"
                      src="assets/img/products/quick-view/quick-view-01.jpg"
                      alt="Image"
                    />
                  </div>
                  <div class="media-body">
                    <h2>Old Skool Navy</h2>
                    <h3>$149</h3>
                    <p>
                      Classic sneaker from Vans. Cotton canvas and suede upper.
                      Textile lining with heel stabilizer and ankle support.
                      Contrasting laces. Sits on a classic waffle rubber sole.
                    </p>
                    <span class="quick-drop">
                      <select
                        name="guiest_id3"
                        id="guiest_id3"
                        class="select-drop"
                      >
                        <option value="0">Size</option>
                        <option value="1">Size 1</option>
                        <option value="2">Size 2</option>
                        <option value="3">Size 3</option>
                      </select>
                    </span>
                    <span class="quick-drop resizeWidth">
                      <select
                        name="guiest_id4"
                        id="guiest_id4"
                        class="select-drop"
                      >
                        <option value="0">Qty</option>
                        <option value="1">Qty 1</option>
                        <option value="2">Qty 2</option>
                        <option value="3">Qty 3</option>
                      </select>
                    </span>
                    <div class="btn-area">
                      <a href="#" class="btn btn-primary btn-block"
                        >Add to cart
                        <i class="fa fa-angle-right" aria-hidden="true"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <h1>{{ post.title }}</h1>
    <div v-if="$parent.getUserId() == post.user_id">
      <router-link :to="`/posts/edit/${post.id}`">Edit Post</router-link>
    </div>
    <h3>
      Made by:
      <router-link :to="`/users/${post.user_id}`">{{
        post.user.username
      }}</router-link>
      <br />
    </h3>

    <br />
    <embed :src="`${post.video_url}`" type="" />
    <h3>Price: {{ post.price }}</h3>
    <p>Description: {{ post.description }}</p>
    <p>Location: {{ post.location }}</p>
    <h4>Categories:</h4>
    <div v-for="category in post.categories">
      <p>
        <router-link :to="`/categories/${category.id}`">{{
          category.name
        }}</router-link>
      </p>
    </div>
    <div v-if="post.user_id === $parent.getUserId()">
      <div>
        <button @click="openUploadModal">Upload images</button>
      </div>
    </div>
    <div v-for="image in images">
      <img :src="image.image_url" height="500" width="500" />
      <div v-if="post.user_id === $parent.getUserId()">
        <button v-on:click="destroyImage(image)">
          Delete Image
        </button>
      </div>
    </div>
    <div v-for="image in imageUrls">
      <img :src="image" height="500" width="500" />
      <div v-if="post.user_id === $parent.getUserId()">
        <button v-on:click="destroyImageUrl(image)">
          Delete Image
        </button>
      </div>
    </div>
    <div v-if="post.user_id === $parent.getUserId()">
      <div v-if="imagesSaveToggle === true">
        <button v-on:click="createImage()">Save Images</button>
      </div>
    </div> -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      post: {
        user: {},
      },
      images: [],
      imageUrls: [],
      errors: [],
      messageToggle: false,
      message: "",
      imagesSaveToggle: false,
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.post = response.data;
      this.images = response.data.images;
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    createMessage: function() {
      var params = {
        message: this.message,
        post_creator: this.post.user_id,
      };
      axios
        .post("/api/messages", params)
        .then((response) => {
          console.log(response.data);
          this.messageToggle = false;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    createImage: function() {
      this.imageUrls.forEach((image) => {
        var formData = new FormData();
        formData.append("post_id", this.post.id);
        formData.append("image", image);
        axios
          .post("/api/images", formData)
          .then((response) => {
            this.image = "";
            console.log(response.data);
            this.images.push(response.data);
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      });
      this.imageUrls = [];
      this.imagesSaveToggle = false;
    },
    destroyImage: function(image) {
      if (confirm("Are you sure you want to delete your image?")) {
        var index = this.images.indexOf(image);
        axios.delete(`/api/images/${image.id}`).then((response) => {
          console.log("success", response.data);
          this.images.splice(index, 1);
        });
      }
    },
    destroyImageUrl: function(image) {
      if (confirm("Are you sure you want to delete your image?")) {
        var index = this.imageUrls.indexOf(image);
        this.imageUrls.splice(index, 1);
        console.log("image destroyed");
      }
    },
    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: "djka3ehcg",
            upload_preset: "musnwcbj",
            sources: [
              "local",
              "url",
              "camera",
              "google_drive",
              "dropbox",
              "instagram",
              "facebook",
            ],
            dropboxAppKey: "2ymhwjldd8r671y",
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              this.imageUrls.push(result.info.url);
            }
          }
        )
        .open();
      this.imagesSaveToggle = true;
    },
    incrementImage: function(index) {
      this.index = index++;
    },
  },
};
</script>
