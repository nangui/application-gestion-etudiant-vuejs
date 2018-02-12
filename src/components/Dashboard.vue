<template>
  <div id="dashboard">

    <!-- Liste des étudiants -->
    <transition-group name="bounce" tag="ul" class="collection with-header">
      <li class="collection-header indigo" v-bind:key="1">
        <h4 class="center-align">Liste étudiants</h4>
      </li>
      <li v-for="etudiant in etudiants" v-bind:key="etudiant.id"
      class="collection-item">
      <div class="chip">
          {{ etudiant.niveau }}
        </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{ etudiant.etudiant_id }} : {{ etudiant.nom }}
        <router-link class="secondary-content"
        v-bind:to="{name: 'view-etudiant', params: {etudiant_id: etudiant.etudiant_id}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </transition-group>
    <!-- Fin liste étudiants -->

    <!-- Bouton ajout étudiant -->
    <btn-add-etudiant />
  </div>
</template>

<script>
// Importer vue2-animate
require('vue2-animate/dist/vue2-animate.min.css')
// Importer la base de donnée dans firebaseInit
import db from './firebaseInit'

// Importer le bouton Add etudiant
import BtnAddEtudiant from './BtnAddEtudiant'
export default {
  name: 'dashboard',
  components: {
    BtnAddEtudiant
  },
  data() {
    return {
      etudiants: []
    }
  },
  created() {
    db.collection("etudiants").orderBy('dept').get().then
    (querySnapshot => {
        querySnapshot.forEach(doc => {
            // console.log(doc.id, " => ", doc.data())
            const data = {
              'id': doc.id,
              'etudiant_id': doc.data().etudiant_id,
              'nom': doc.data().nom,
              'dept': doc.data().dept,
              'niveau': doc.data().niveau
            }
            this.etudiants.push(data)
        })
    })
  }

}
</script>

