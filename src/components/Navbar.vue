<template>
  <nav>
    <div class="nav-wrapper indigo">
      <router-link to="/"
          class="brand-logo">
          Gestion Etudiants
        </router-link>
      <div class="container">
        <ul class="right">
          <li v-if="isLoggedIn"><span class="email black-text">{{ currentUser }}</span></li>
          <li v-if="isLoggedIn"><router-link to="/">Tableau de bord</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">S'authentifier</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">S'enregistrer</router-link></li>
          <li v-if="isLoggedIn"><button v-on:click="logout" class="btn grey">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'navbar',
    data() {
      return {
        isLoggedIn: false,
        currentUser: false
      }
    },
    created() {
      if(firebase.auth().currentUser) {
        this.isLoggedIn = true
        this.currentUser = firebase.auth().currentUser.email
      }
    },
    methods: {
      logout: function() {
        firebase.auth()
        .signOut()
        .then(() => {
          this.$router.go({path: this.$router.path})
        })
      }
    }

  }
</script>

<style scoped>
  .email {
    padding-right: 10%
  }
</style>
