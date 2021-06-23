import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  AuthLoginForm: () => import('../../components/auth/LoginForm.vue' /* webpackChunkName: "components/auth-login-form" */).then(c => wrapFunctional(c.default || c)),
  CommonFoot: () => import('../../components/common/Foot.vue' /* webpackChunkName: "components/common-foot" */).then(c => wrapFunctional(c.default || c)),
  CommonNavbar: () => import('../../components/common/Navbar.vue' /* webpackChunkName: "components/common-navbar" */).then(c => wrapFunctional(c.default || c)),
  TutorialTutDesc: () => import('../../components/tutorial/TutDesc.vue' /* webpackChunkName: "components/tutorial-tut-desc" */).then(c => wrapFunctional(c.default || c)),
  TutorialTutForm: () => import('../../components/tutorial/TutForm.vue' /* webpackChunkName: "components/tutorial-tut-form" */).then(c => wrapFunctional(c.default || c)),
  TutorialTutItem: () => import('../../components/tutorial/TutItem.vue' /* webpackChunkName: "components/tutorial-tut-item" */).then(c => wrapFunctional(c.default || c)),
  TutorialTutPageLoading: () => import('../../components/tutorial/TutPageLoading.vue' /* webpackChunkName: "components/tutorial-tut-page-loading" */).then(c => wrapFunctional(c.default || c)),
  TutorialTutPageSide: () => import('../../components/tutorial/TutPageSide.vue' /* webpackChunkName: "components/tutorial-tut-page-side" */).then(c => wrapFunctional(c.default || c)),
  TutorialTutSum: () => import('../../components/tutorial/TutSum.vue' /* webpackChunkName: "components/tutorial-tut-sum" */).then(c => wrapFunctional(c.default || c)),
  TutorialTutsSide: () => import('../../components/tutorial/TutsSide.vue' /* webpackChunkName: "components/tutorial-tuts-side" */).then(c => wrapFunctional(c.default || c)),
  ProfileUsrPage: () => import('../../components/profile/UsrPage.vue' /* webpackChunkName: "components/profile-usr-page" */).then(c => wrapFunctional(c.default || c)),
  TutorialAnnoun: () => import('../../components/tutorial/announ/Announ.vue' /* webpackChunkName: "components/tutorial-announ" */).then(c => wrapFunctional(c.default || c)),
  TutorialFeed: () => import('../../components/tutorial/feed/Feed.vue' /* webpackChunkName: "components/tutorial-feed" */).then(c => wrapFunctional(c.default || c)),
  TutorialFeedItem: () => import('../../components/tutorial/feed/FeedItem.vue' /* webpackChunkName: "components/tutorial-feed-item" */).then(c => wrapFunctional(c.default || c)),
  TutorialListIsActive: () => import('../../components/tutorial/list/IsActive.vue' /* webpackChunkName: "components/tutorial-list-is-active" */).then(c => wrapFunctional(c.default || c)),
  TutorialListLecHover: () => import('../../components/tutorial/list/LecHover.vue' /* webpackChunkName: "components/tutorial-list-lec-hover" */).then(c => wrapFunctional(c.default || c)),
  TutorialListTutList: () => import('../../components/tutorial/list/TutList.vue' /* webpackChunkName: "components/tutorial-list-tut-list" */).then(c => wrapFunctional(c.default || c)),
  TutorialListTutorPp: () => import('../../components/tutorial/list/TutorPp.vue' /* webpackChunkName: "components/tutorial-list-tutor-pp" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
