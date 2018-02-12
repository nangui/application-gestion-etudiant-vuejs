<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel indigo white-text center">
            <h3>Authentification</h3>
            <form>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="text" id="email" v-model="email">
                <label for="email">Email</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input type="password" id="password" v-model="password">
                <label for="password">Mot de passe</label>
              </div>
              <button v-on:click="login" class="btn btn-large grey lighten-4 black-text">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
// Importer vue-dialog
import Vue from "vue"
import VuejsDialog from "vuejs-dialog"

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function(e) {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.$dialog.alert(`Authentification réussi ${user.email}`)
        this.$router.go({path: this.$router.path})
      })
      .catch(err => this.$dialog.alert('erreur : '))

      e.preventDefault()
    }
  }
}
</script>
