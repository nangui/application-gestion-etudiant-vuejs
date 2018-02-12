<template>
  <div id="view-etudiant">
     <!-- Liste des étudiants -->
    <transition-group name="bounce" tag="ul" class="collection with-header">
      <li class="collection-header indigo" v-bind:key="1">
        <h4 class="center-align">{{ nom }}</h4>
      </li>
      <li class="collection-item" v-bind:key="2">ID Etudiant : {{ etudiant_id }}</li>
      <li class="collection-item" v-bind:key="3">Département : {{ dept }}</li>
      <li class="collection-item" v-bind:key="4">Niveau      : {{ niveau }}</li>
    </transition-group>
    <!-- Fin liste étudiants -->
    <router-link class="btn grey" to="/">
      <i class="fa fa-reply"></i>
    </router-link>
    <button @click="deleteEtudiant" class="btn red">
      <i class="fa fa-user-times"></i>
    </button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{name: 'edit-etudiant', params: {etudiant_id: etudiant_id}}" class="btn-floating btn-large waves-effect waves-light pulse red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
// Importer vue2-animate
require('vue2-animate/dist/vue2-animate.min.css')

// Importer vue-dialog
import Vue from "vue"
import VuejsDialog from "vuejs-dialog"

import db from './firebaseInit'
import BtnAddEtudiant from './BtnAddEtudiant'

Vue.use(VuejsDialog)

export default {
  name: 'view-etudiant',
  components: {
    BtnAddEtudiant
  },
  data() {
    return {
      etudiant_id: null,
      nom: null,
      dept: null,
      niveau: null
    }
  },
  beforeRouteEnter: (to, from, next) => {
    db.collection('etudiants').where('etudiant_id', '==', to.params.etudiant_id).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
          vm.etudiant_id = doc.data().etudiant_id
          vm.nom = doc.data().nom
          vm.niveau = doc.data().niveau
          vm.dept = doc.data().dept
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      db.collection('etudiants').where('etudiant_id', '==', this.$route.params.etudiant_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {

            this.etudiant_id = doc.data().etudiant_id
            this.nom = doc.data().nom
            this.niveau = doc.data().niveau
            this.dept = doc.data().dept

        })
      })
    },
    deleteEtudiant() {
      this.$dialog.confirm('Voulez-vous supprimer?', {
         loader: true,
         okText: 'Valider',
         cancelText: 'Annuler',
         animation: 'bounce',
      })
        .then((dialog) => {
          setTimeout(() => {
            db.collection('etudiants').where('etudiant_id', '==', this.$route.params.etudiant_id).get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {

                doc.ref.delete()
                this.$router.push('/')
              })
            })
            dialog.close();
          }, 2500)
        })
        .catch(() => {
          console.log('Non')
        })
    }
  }
}
</script>
