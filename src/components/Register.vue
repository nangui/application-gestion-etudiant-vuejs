<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel blue lighten-2 white-text center">
            <h3>Enregistrement</h3>
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
              <button v-on:click="register" class="btn btn-large grey lighten-4 black-text">S'enregistrer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importer firebase
import firebase from 'firebase'

// Importer vue-dialog
import Vue from "vue"
import VuejsDialog from "vuejs-dialog"

Vue.use(VuejsDialog)

export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register: function(e) {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.$dialog.alert(`Compte ${user.email} créé avec succès`)
        this.$router.go({path: this.$router.path})
      })
      .catch(err => this.$dialog.alert(err.message))


      e.preventDefault()
    }
  }
}
</script>
