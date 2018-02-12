<template>
  <div id="edit-etudiant">
    <h3>Editer l'etudiant</h3>
    <form @submit.prevent="updateEtudiant" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input disabled="disabled" type="text" v-model="etudiant_id" required>
        </div>
        <div class="input-field col s12">
          <input type="text" v-model="nom" required>
        </div>
        <div class="input-field col s12">
          <input type="text" v-model="niveau" required>
        </div>
        <div class="input-field col s12">
          <input type="text" v-model="dept" required>
        </div>
        <router-link class="btn grey" v-bind:to="{name: 'view-etudiant', params: {etudiant_id: etudiant_id}}">
          <i class="fa fa-reply"></i>
        </router-link>
        <button type="submit" class="btn red">
          <i class="fa fa-save"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'edit-etudiant',
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
    updateEtudiant() {
      db.collection('etudiants').where('etudiant_id', '==', this.$route.params.etudiant_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {

            doc.ref.update({
              etudiant_id: this.etudiant_id,
              nom: this.nom,
              niveau: this.niveau,
              dept: this.dept
            })
            .then(() => {
              this.$router.push({name: 'view-etudiant', params: {etudiant_id: this.etudiant_id}})
            })
            .catch(err => console.log(err))
        })
      })
    }
  }
}
</script>
