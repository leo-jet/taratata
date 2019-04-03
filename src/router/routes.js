
const routes = [
  {
    path: '/',
    component: () => import('layouts/principal.vue'),
    children: [
      { path: '', component: () => import('pages/classes/classes.vue') },
      { path: 'compte', component: () => import('pages/compte/compte.vue') },
      { path: 'cours/:id', component: () => import('pages/cours/cours.vue') },
      { path: 'classe/:idClasse', component: () => import('pages/classe/classe.vue') }
    ]
  },
  {
    path: '/profil',
    component: () => import('layouts/utilisateur.vue'),
    children: [
      { path: 'login', component: () => import('pages/connexion/connexion.vue') },
      { path: 'inscription', component: () => import('pages/inscription/inscription.vue') }, 
      { path: 'confirmation', component: () => import('pages/confirmation/confirmation.vue') }, 
      { path: 'passoublie', component: () => import('pages/recupererPass/recupere.vue') }, 
      { path: 'information', component: () => import('pages/information/information.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
