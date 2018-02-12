import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ViewEtudiant from '@/components/ViewEtudiant'
import NewEtudiant from '@/components/NewEtudiant'
import EditEtudiant from '@/components/EditEtudiant'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/new",
      name: "new-etudiant",
      component: NewEtudiant
    },
    {
      path: "/edit/:etudiant_id",
      name: "edit-etudiant",
      component: EditEtudiant
    },
    {
      path: "/:etudiant_id",
      name: "view-etudiant",
      component: ViewEtudiant
    }
  ]
});
