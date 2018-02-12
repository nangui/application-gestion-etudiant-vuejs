import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ViewEtudiant from '@/components/ViewEtudiant'
import NewEtudiant from '@/components/NewEtudiant'
import EditEtudiant from '@/components/EditEtudiant'
import Login from '@/components/Login'
import Register from "@/components/Register"
import firebase from 'firebase'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/new",
      name: "new-etudiant",
      component: NewEtudiant,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:etudiant_id",
      name: "edit-etudiant",
      component: EditEtudiant,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:etudiant_id",
      name: "view-etudiant",
      component: ViewEtudiant,
      meta: {
        requiresAuth: true
      }
    }
  ]
});


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Tester si l'utilisateur n'est pas connecté
    if(!firebase.auth().currentUser){
      // Aller sur la page login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // S'il est connecté alors lui envoyer sur la page demandé
      next();
    }
  } if(to.matched.some(record => record.meta.requiresGuest)) {
      // Tester si l'utilisateur est connecté
      if (firebase.auth().currentUser) {
        // Aller sur la page d'acceuil
        next(
          {
            path:
              "/",
            query: {
              redirect:
                to.fullPath
            }
          }
        );
      } else {
        // S'il est connecté alors lui envoyer sur la page demandé
        next();
      }
  } else {
    next();
  }
})

export default router
