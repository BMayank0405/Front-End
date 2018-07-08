import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "Main",
      component: () =>
        import ("@/components/Main")
    },
    {
      path: "/register",
      name: "Register",
      component: () =>
        import ("@/components/Register")
    },
    {
      path: "/login",
      name: "Login",
      component: () =>
        import ("@/components/Login")
    },
    {
      path: "/createEvent",
      name: "CreateEvent",
      component: () =>
        import ("@/components/CreateEvent")
    },
    {
      path: "/societyHome",
      name: "SocietyHome",
      component: () =>
        import ("@/components/SocietyHome")
    },
    {
      path: "/editEvent",
      name: "EventEdit",
      component: () =>
        import ("@/components/EventEdit")
    },

    {
      path: "/facultyHome",
      name: "FacultyHome",
      component: () =>
        import ("@/components/FacultyHome")
    },
    {
      path: "/adminHome",
      name: "AdminHome",
      component: () =>
        import ("@/components/AdminHome")
    },
    {
      path: "/UpdateSocietyFaculty",
      name: "UpdateSocietyFaculty",
      component: () =>
        import ("@/components/UpdateSocietyFaculty")
    },
    {
      path: "/removeSocietyFaculty",
      name: "removeSocietyFaculty",
      component: () =>
        import ("@/components/removeSocietyFaculty")
    },
    {
      path: "/Status",
      name: "Status",
      component: () =>
        import ("@/components/Status")
    },
    {
      path: "/History",
      name: "History",
      component: () =>
        import ("@/components/History")
    },
    {
      path: "/pendingEvents",
      name: "PendingEvents",
      component: () =>
        import ("@/components/PendingEvents")
    }
  ]
});
