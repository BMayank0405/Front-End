<template>
  <v-toolbar app dark color="primary" :extended="width && searchBar" style="position:relative !important">
  
    <v-btn class="navbar__buttons transparent" flat to="/">
      <v-toolbar-title>
        <v-avatar :size="size">  
        <img src="../assets/logo.png">
        </v-avatar>
        <h1 class="fomo">FOMO</h1>
      </v-toolbar-title>
    </v-btn>
  
    <v-spacer></v-spacer>
  
    <div v-if="searchBar" :class="{ order: width}" class="list__items">
      <v-select prepend-icon="search" slot="extended" multiple :items="societies" v-model="society" item-text="username" persistent-hint item-value="_id" label="Search Event By Society" autocomplete @blur="search()">
      </v-select>
    </div>
    <v-btn class="navbar__buttons" v-if="this.$store.state.isloggedIn" @click.native.stop="changepwd = true" :icon="width" :flat="!width" :depressed="!width">
      <v-avatar>
        <v-icon dark>security</v-icon>
      </v-avatar>
      <span class="hidden-sm-and-down">Change Password</span>
    </v-btn>
  
    <v-dialog v-model="changepwd" max-width="500">
      <change-password @clicked="updatePassword"></change-password>
    </v-dialog>
  
    <v-btn class="navbar__buttons" v-if="this.$store.state.isloggedIn" :icon="width" :flat="!width" @click="redirect()" :depressed="!width">
      <v-avatar class="teal society-name">
        <span class="white--text headline"> {{this.$store.state.name[0]}} </span>
      </v-avatar>
      <span class="hidden-sm-and-down" style="text-transform:capitalize;">{{this.$store.state.name}}</span>
    </v-btn>
  
    <v-btn class="navbar__buttons" v-if="!this.$store.state.isloggedIn" to="/login" :icon="width" :flat="!width" :depressed="!width">
        <v-avatar>
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
      <span class="hidden-sm-and-down">LogIn</span>
    </v-btn>
    <v-btn class="navbar__buttons" v-else @click="logout()" :icon="width" :flat="!width" :depressed="!width">
      <v-avatar>
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
      <span class="hidden-sm-and-down">LogOut</span>
    </v-btn>
  </v-toolbar>
</template>


<script>
import CommonRequest from "@/services/CommonRequest";
import HeaderlessRequest from "@/services/HeaderlessRequest";
import { debounce } from "lodash";

const ChangePassword = () => import("./Dialogs/ChangePassword");

export default {
  props: {
    searchBar: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "change-password": ChangePassword
  },
  data() {
    return {
      title: "FOMO",
      width: window.innerWidth < 700,

      changepwd: false,
      password: null,

      eventSuccess: false,
      eventSuccessMessage: "",
      eventFail: false,
      eventFailMessage: "",

      society: [],
      societies: []
    };
  },
  created: async function() {
    if (!this.$store.state.isloggedIn || this.searchBar) {
      const response = await HeaderlessRequest.getSocieties();

      this.societies = response.data.user;
      this.societies.push({
        username: "All",
        _id: null
      });
    }
  },
  methods: {
    redirect: function() {
      let soc = ["0", "1", "2"];
      let fac = ["3", "4"];
      if (soc.includes(this.$store.state.flag))
        this.$router.push("/societyHome");
      else if (fac.includes(this.$store.state.flag))
        this.$router.push("/facultyHome");
      else if (this.$store.state.flag == "5") this.$router.push("/adminHome");
    },
    logout: async function() {
      this.$store.dispatch("logout");

      this.$router.push("/login");
    },
    updatePassword: async function(value) {
      try {
        const response = await CommonRequest.changepassword({
          password: value
        });
        this.eventSuccessMessage =
          "Your Password reset link has been mailed to you.";
        this.eventSuccess = true;
      } catch (error) {
        if (error) console.log(error.response.data);
        else
          this.eventFailMessage =
            "Internal Server Error.Please check after some time.";
        this.eventFail = true;
      }
    },
    search: debounce(function() {
      this.$emit("search", this.society);
    }, 800)
  },
  computed: {
    size: function() {
      if (this.width) return "36px";
      else return "46px";
    }
  }
};
</script>

<style lang="scss" scoped>
.society-name {
  height: 38px !important;
  width: 38px !important;
}

.order {
  order: 1 !important;
  margin-left: 2rem !important;
}
.fomo {
  display: inline-block;
  -webkit-transform: translateY(3px);
  transform: translateY(6px);
  margin-left: 5px;
  background: -webkit-linear-gradient(
    #fff,
    #d8d8d8e6,
    #fff,
    #afadadc9,
    #484747,
    #fff
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  font-family: "Berkshire Swash", cursive !important;
}

.navbar__buttons {
  font: {
    family: "Lora", serif;
    size: 1.24rem;
  }
  margin: {
    left: 0px;
    right: 0px;
  }
  &:hover,
  &:focus {
    background-color: transparent;
  }
  text-transform: capitalize;
  @media screen and (max-width: 699px) {
    & {
      margin: {
        left: 6px;
        right: 6px;
      }
    }
  }
}

@media screen and (max-width: 699px) {
  .navbar__buttons:first-of-type {
    margin-left: 0px !important;
  }
  .fomo {
    font-size: 1.5rem;
  }
}
</style>
