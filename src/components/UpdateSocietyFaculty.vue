<template>
   <v-container grid-list-lg class="elevation-10 logincontainer">
   <!-- layout for venues -->
      <v-layout row wrap>
      <v-flex class="hidden-sm-and-down" md3>
        <v-subheader class="fields">Select User</v-subheader>
      </v-flex>
        <v-flex xs12 md8>
          <v-select 
            :items="users"
            v-model="userid"
            item-text="username"
            item-value="_id"        
            label="Select User"
            autocomplete
            prepend-icon="account_circle"
            v-on="{blur:getuser}"
            
          ></v-select>
        </v-flex>
      </v-layout>

   <v-layout row wrap>
    <v-flex class="hidden-sm-and-down" md3>
      <v-subheader class="fields">Name</v-subheader>
    </v-flex>
    <v-flex xs12 md8>
       <v-text-field
      label="Name"
       prepend-icon="face"
      v-model="user[0].name"
      required
    ></v-text-field>
    </v-flex>
  </v-layout>

  <v-layout row wrap>
    <v-flex class="hidden-sm-and-down" md3>
      <v-subheader class="fields">Email</v-subheader>
    </v-flex>
    <v-flex xs12 md8>
       <v-text-field
      label="Email"
       prepend-icon="email"
      v-model="user[0].email"
      required
    ></v-text-field>
    </v-flex>
  </v-layout>

  <!--  -->
    <v-layout v-show="headrec">
  <v-flex class="hidden-sm-and-down" md3>
      <v-subheader class="fields">Head</v-subheader>
  </v-flex>

  <v-flex xs12 md8>
    <v-select 
      :items="user[1]"
      v-model="user[0].headId"
      item-text="name"
      item-value="_id"        
      label="Select Head"
      autocomplete
      prepend-icon="person"
    ></v-select>
  </v-flex>
  </v-layout>

    <v-layout justify-center>
       <v-btn round color="primary">Register</v-btn>

  </v-layout>

   </v-container>   
</template>


<script>
import { debounce } from "lodash";

import HeaderlessRequest from "@/services/HeaderlessRequest";
// import HeaderRequest from "@/services/HeaderRequest";

export default {
  data() {
    return {
      err: null,
      users: [],
      userid: "",
      headrec: null,
      user: [
        {
          id: null,
          email: null,
          name: null,
          headId: null
        },
        [
          {
            id: null,
            name: null
          }
        ]
      ]
    };
  },
  beforeCreate: async function() {
    try {
      const response = await CommonRequest.validateUser();
      if (response.data.flag != 5) {
        this.$router.push("/login");
      }
    } catch (error) {
      if (error) {
        this.$router.push("/login");
      }
    }
  },
  created: async function() {
    try {
      const response = await HeaderlessRequest.getAllUsers();
      this.users = response.data.user;
    } catch (err) {
      if (err) console.log(err);
    }
  },
  methods: {
    getuser: debounce(async function() {
      try {
        const response = await HeaderlessRequest.userbyId({
          id: this.userid
        });
        this.user = response.data.details;
        if (_.size(this.user) > 1) this.headrec = true;
        else this.headrec = false;
      } catch (err) {}
    }, 200)
  }
};
</script>


<style lang="scss" scoped>
.fields {
  font-size: 1.2rem;
  font-weight: bold;
  transform: translateY(7px);
}

.logincontainer {
  border-radius: 10px;
  margin-top: 15px;
  transform: translateX(60px);
  background-color: white;
}

@media screen and (min-width: 401px) and (max-width: 500px) {
  .logincontainer {
    transform: translateX(43px);
  }
}

@media screen and (max-width: 400px) {
  .logincontainer {
    transform: translateX(30px);
  }
}

.flex-center {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}
</style>