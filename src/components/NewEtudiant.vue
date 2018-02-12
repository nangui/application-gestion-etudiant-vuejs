<template>
  <div id="new-etudiant">
    <h3>Nouvel etudiant</h3>
    <form @submit.prevent="saveEtudiant" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="etudiant_id" required>
          <label>ID Etudiant</label>
        </div>
        <div class="input-field col s12">
          <input type="text" v-model="nom" required>
          <label>Nom</label>
        </div>
        <div class="input-field col s12">
          <input type="text" v-model="niveau" required>
          <label>Niveau</label>
        </div>
        <div class="input-field col s12">
          <input type="text" v-model="dept" required>
          <label>Département</label>
        </div>
        <router-link class="btn grey" to="/">
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
  name: 'new-etudiant',
  data() {
    return {
      etudiant_id: null,
      nom: null,
      dept: null,
      niveau: null
    }
  },
  methods: {
    saveEtudiant() {
      db.collection('etudiants').add({
        etudiant_id: this.etudiant_id,
        nom: this.nom,
        niveau: this.niveau,
        dept: this.dept
      })
      .then(docRef =>
        this.$router.push('/')
      )
      .catch(err => console.log(err))
    }
  }
}
</script>
