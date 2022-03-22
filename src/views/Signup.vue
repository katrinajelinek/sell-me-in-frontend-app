<template>
  <div class="signup">
    <div id="body" class="body-wrapper version1 up-scroll">
      <!-- MAIN CONTENT SECTION -->

      <section class="mainContent clearfix userProfile">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="innerWrapper profile">
                <div class="orderBox">
                  <h2>Create Profile</h2>
                </div>
                <div class="row">
                  <div class="col-md-4 col-lg-3 col-xl-2 col-12">
                    <div class="thumbnail">
                      <div v-if="image">
                        <img
                          :src="`${image}`"
                          alt="/src/assets/user-profile.png"
                        />
                      </div>
                      <div v-if="image == ''">
                        <img src="/src/assets/user-profile.png" alt="" />
                      </div>
                      <div class="caption">
                        <button
                          class="btn btn-primary btn-block"
                          role="button"
                          v-on:click="openUploadModal()"
                        >
                          Upload Avatar
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-8 col-lg-9 col-xl-10 col-12">
                    <form
                      class="form-horizontal"
                      v-on:submit.prevent="submit()"
                    >
                      <div v-if="errors" class="form-group row">
                        <label for="" class="col-md-3 control-label"></label>
                        <div class="col-md-7">
                          <ul>
                            <li
                              class="text-danger"
                              v-for="error in errors"
                              v-bind:key="error"
                            >
                              {{ error }}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"
                          >First Name</label
                        >
                        <div class="col-md-7">
                          <input
                            type="text"
                            class="form-control"
                            id="first_name"
                            v-model="firstName"
                            required
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
                            v-model="lastName"
                            required
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"
                          >Username</label
                        >
                        <div class="col-md-7">
                          <input
                            type="text"
                            class="form-control"
                            id="username"
                            v-model="username"
                            required
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"
                          >Email Address</label
                        >
                        <div class="col-md-7">
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="email"
                            required
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"
                          >Password</label
                        >
                        <div class="col-md-7">
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model="password"
                            required
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-md-3 control-label"
                          >Confirm Password</label
                        >
                        <div class="col-md-7">
                          <input
                            type="password"
                            class="form-control"
                            id=""
                            v-model="passwordConfirmation"
                            required
                          />
                        </div>
                      </div>
                      <br />
                      <br />
                      <div>
                        <div class="form-group row">
                          <label for="" class="col-md-3 control-label"
                            >City</label
                          >
                          <div class="col-md-7">
                            <input
                              type="text"
                              class="form-control"
                              id="city"
                              v-model="city"
                              placeholder="City"
                              required
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="" class="col-md-3 control-label"></label>
                          <div class="col-md-7">
                            <multiselect
                              v-model="state"
                              :options="states"
                              :multiple="false"
                              :close-on-select="true"
                              :clear-on-select="false"
                              :preserve-search="true"
                              placeholder="Choose your State"
                              label="name"
                              track-by="name"
                              :preselect-first="true"
                            >
                              <template
                                slot="selection"
                                slot-scope="{ values, isOpen }"
                                ><span
                                  class="multiselect__single"
                                  v-if="values.length &amp;&amp; !isOpen"
                                  >{{ state }}</span
                                ></template
                              >
                            </multiselect>
                          </div>
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class=" col-md-12 ">
                            <button
                              v-on:click="validateLocation()"
                              class="btn btn-primary-outlined btn-sm float-right"
                            >
                              Validate Location
                            </button>
                          </div>
                        </div>
                        <br />
                      </div>
                      <div>
                        <div class="form-group row">
                          <label for="" class="col-md-3 control-label"
                            >Location</label
                          >
                          <div class="col-md-7">
                            <input
                              type="text"
                              class="form-control"
                              id="city"
                              v-model="location"
                              placeholder="Location"
                              required
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-check">
                        <input
                          id="termsAndConditionsAgreement"
                          type="checkbox"
                          class="checkbox-custom form-check-input"
                          v-model="termsAndConditionsAgreement"
                          checked="false"
                          required
                        />
                        <label
                          for="checkbox-1"
                          class="checkbox-custom-label form-check-label"
                          >I have read and agree to the terms and
                          conditions</label
                        >
                      </div>
                      <div class="form-check">
                        <input
                          id="disclaimerAgreement"
                          type="checkbox"
                          class="checkbox-custom form-check-input"
                          v-model="disclaimerAgreement"
                          checked="false"
                          required
                        />
                        <label
                          for="checkbox-1"
                          class="checkbox-custom-label form-check-label"
                          >I have ready and agree to the SellMeIn
                          disclaimer</label
                        >
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModalLong2"
                      >
                        Read Agreement
                      </button>
                      <button type="submit" class="btn btn-primary float-right">
                        Create Account
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="grid-wrapper section">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-12 element-content pt-5">
              <div class="display-single_element">
                <div
                  class="modal fade quick-view-drone"
                  id="exampleModalLong2"
                  tabindex="-1"
                  role="dialog"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-body">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-hidden="true"
                        >
                          <i class="fa fa-close"></i>
                        </button>
                        <div class="media flex-wrap">
                          <div class="media-body">
                            <h2>Terms and Conditions</h2>
                            <p>
                              This is the agreement
                            </p>
                            <h2>Disclaimer</h2>
                            <p>
                              This is the agreement
                            </p>
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

      <!-- MAIN CONTENT SECTION -->
      <section
        class="mainContent clearfix signUp"
        v-if="termsAndDisclaimerToggle == true"
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="panel panel-default">
                <div class="panel-heading"><h3>Terms and Agreements</h3></div>
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
                    <h4>These are terms and conditions</h4>
                    <h4>This is a disclaimer</h4>
                    <div class="form-group">
                      <label
                        >I have read and agree to the terms and
                        conditions</label
                      >
                      <input
                        type="checkbox"
                        class="form-control"
                        v-model="termsAndConditionsAgreement"
                        checked="false"
                      />
                    </div>
                    <div class="form-group">
                      <label
                        >I have ready and agree to the SellMeIn
                        disclaimer</label
                      >
                      <input
                        type="checkbox"
                        class="form-control"
                        v-model="disclaimerAgreement"
                        checked="false"
                      />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">
                      Submit
                    </button>
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
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data: function() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      image: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      city: "",
      state: "",
      location: "",
      states: [
        { name: "Alabama" },
        { name: "Alaska" },
        { name: "Arizona" },
        { name: "Arkansas" },
        { name: "California" },
        { name: "Colorado" },
        { name: "Conneticut" },
        { name: "Deleware" },
        { name: "Florida" },
        { name: "Georgia" },
        { name: "Hawaii" },
        { name: "Idaho" },
        { name: "Illinois" },
        { name: "Indiana" },
        { name: "Iowa" },
        { name: "Kansas" },
        { name: "Kentucky" },
        { name: "Louisiana" },
        { name: "Maine" },
        { name: "Maryland" },
        { name: "Massachusetts" },
        { name: "Michigan" },
        { name: "Minnesota" },
        { name: "Mississippi" },
        { name: "Missouri" },
        { name: "Montana" },
        { name: "Nebraska" },
        { name: "Nevada" },
        { name: "New Hampshire" },
        { name: "New Jersey" },
        { name: "New Mexico" },
        { name: "New York" },
        { name: "North Carolina" },
        { name: "North Dakota" },
        { name: "Ohio" },
        { name: "Oklahoma" },
        { name: "Oregon" },
        { name: "Pennsylvania" },
        { name: "Rhode Island" },
        { name: "South Carolina" },
        { name: "South Dakota" },
        { name: "Tennessee" },
        { name: "Texas" },
        { name: "Utah" },
        { name: "Vermont" },
        { name: "Virginia" },
        { name: "Washington" },
        { name: "West Virginia" },
        { name: "Wisconsin" },
        { name: "Wyoming" },
      ],
      termsAndConditionsAgreement: false,
      disclaimerAgreement: false,
      errors: [],
      termsAndDisclaimerToggle: false,
    };
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
      formData.append("first_name", this.firstName);
      formData.append("last_name", this.lastName);
      formData.append("username", this.username);
      formData.append("email", this.email);
      if (this.image) {
        formData.append("image", this.image);
      }
      formData.append("password", this.password);
      formData.append("password_confirmation", this.passwordConfirmation);
      formData.append("location", this.location);
      formData.append(
        "terms_and_conditions_agreement",
        this.termsAndConditionsAgreement
      );
      formData.append("disclaimer_agreement", this.disclaimerAgreement);

      axios
        .post("/api/users", formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
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
    validateLocation: function() {
      axios
        .get(
          `https://us-zipcode.api.smartystreets.com/lookup?auth-id=1f0a605e-51dc-c94f-41c7-ba9353288bec&auth-token=B8M2uIdYBPXkdi1tNTII&city=${this.city}&state=${this.state.name}`
        )
        .then((response) => {
          console.log(this.state);
          console.log(this.city);
          console.log(response.data);
          this.location = `${response.data[0]["city_states"][0]["city"]}, ${response.data[0]["city_states"][0]["state_abbreviation"]}`;
        });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
