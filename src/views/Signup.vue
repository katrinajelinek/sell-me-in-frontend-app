<template>
  <div class="signup">
    <h1>Signup</h1>
    <div>
      <button @click="openUploadModal">Choose a profile picture</button>
    </div>
    <div v-if="image">
      <img :src="`${image}`" type="" width="700" height="500" />
    </div>
    <form v-on:submit.prevent="submit()">
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="firstName" />
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="lastName" />
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="username" />
      </div>
      <!-- <div class="form-group">
        <label>Upload an Image:</label>
        <input
          type="file"
          class="form-control"
          v-on:change="setFile($event)"
          ref="fileInput"
        />
      </div> -->
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input
          type="password"
          class="form-control"
          v-model="passwordConfirmation"
        />
      </div>
      <div v-if="termsAndDisclaimerToggle == true">
        <h4>These are terms and conditions</h4>
        <h4>This is a disclaimer</h4>
        <div class="form-group">
          <label>I have ready and agree to the terms and conditions</label>
          <input
            type="checkbox"
            class="form-control"
            v-model="termsAndConditionsAgreement"
            checked="false"
          />
        </div>
        <div class="form-group">
          <label>I have ready and agree to the SellMeIn disclaimer</label>
          <input
            type="checkbox"
            class="form-control"
            v-model="disclaimerAgreement"
            checked="false"
          />
        </div>
      </div>
      <div v-if="termsAndDisclaimerToggle == false">
        <button v-on:click="termsAndDisclaimerToggle = true">
          click to read terms and conditions agreement
        </button>
      </div>

      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      image: "",
      email: "",
      password: "",
      passwordConfirmation: "",
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
  },
};
</script>
