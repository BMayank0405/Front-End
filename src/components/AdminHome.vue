<template>
  <v-app>
    <navbar></navbar>
    <v-container class="elevation-20" grid-list-lg>
      <v-layout row wrap align-center style="min-height:80vh">
  
        <page-header>
          <span slot="pageheader" class="flex-center">Welcome &nbsp;<span style="text-transform:capitalize">{{this.$store.state.name}}</span>&nbsp; Sir</span>
        </page-header>
        <page-svg></page-svg>
  
         <page-buttons :btns="btns"></page-buttons>
  
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import CommonRequest from "@/services/CommonRequest";
//code-splitted imports
const Navbar = () => import("./Navbar");
const PageHeader = () => import("./Commons/PageHeader");
const PageSvg = () => import("./Commons/PageSvg");
const Buttons = () => import("./Commons/Buttons");

export default {
  components: {
    navbar: Navbar,
    "page-header": PageHeader,
    "page-svg": PageSvg,
    "page-buttons": Buttons
  },
  data() {
    return {
      btns: [
        {
          name: "Add Society/Faculty",
          icon: "person_add",
          to: "/Register"
        },
        {
          name: "Update Society/Faculty",
          icon: "update",
          to: "/UpdateSocietyFaculty"
        },
        {
          name: "Add/Remove Venue",
          icon: "add_location",
          to: "/UpdateSocietyFaculty"
        },
        {
          name: "Remove Society",
          icon: "voice_over_off",
          to: "/UpdateSocietyFaculty"
        }
      ]
    };
  },
  beforeCreate: async function() {
    try {
      let fac = 5;
      const response = await CommonRequest.validateUser();
      if (response.data.flag != fac) this.$router.push("/login");
    } catch (error) {
      if (error) this.$router.push("/login");
    }
  }
};
</script>



<style lang="scss" scoped>
.container {
  width: 50%;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background-image: -webkit-gradient(
      linear,
      50% 0%,
      50% 100%,
      color-stop(0%, rgba(255, 255, 255, 0.15)),
      color-stop(100%, rgba(0, 0, 0, 0.25))
    ),
    -webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(50%, rgba(255, 255, 255, 0.15)), color-stop(50%, rgba(255, 255, 255, 0)), color-stop(100%, rgba(255, 255, 255, 0)));
  & > .grid-list-lg > .layout .flex {
    padding: 0;
  }
}

.flex-center {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

@media screen and (max-width: 700px) {
  .container {
    width: 90%;
  }
}

@media screen and (min-width: 701px) and (max-width: 900px) {
  .container {
    width: 80%;
  }
}
</style>




