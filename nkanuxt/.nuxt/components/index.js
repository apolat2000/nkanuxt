import { wrapFunctional } from './utils'

export { default as AuthLoginForm } from '../../components/auth/LoginForm.vue'
export { default as ProfileUsrPage } from '../../components/profile/UsrPage.vue'
export { default as CommonFoot } from '../../components/common/Foot.vue'
export { default as CommonNavbar } from '../../components/common/Navbar.vue'
export { default as TutorialTutDesc } from '../../components/tutorial/TutDesc.vue'
export { default as TutorialTutForm } from '../../components/tutorial/TutForm.vue'
export { default as TutorialTutItem } from '../../components/tutorial/TutItem.vue'
export { default as TutorialTutPageLoading } from '../../components/tutorial/TutPageLoading.vue'
export { default as TutorialTutPageSide } from '../../components/tutorial/TutPageSide.vue'
export { default as TutorialTutSum } from '../../components/tutorial/TutSum.vue'
export { default as TutorialTutsSide } from '../../components/tutorial/TutsSide.vue'
export { default as TutorialAnnoun } from '../../components/tutorial/announ/Announ.vue'
export { default as TutorialFeed } from '../../components/tutorial/feed/Feed.vue'
export { default as TutorialFeedItem } from '../../components/tutorial/feed/FeedItem.vue'
export { default as TutorialListIsActive } from '../../components/tutorial/list/IsActive.vue'
export { default as TutorialListLecHover } from '../../components/tutorial/list/LecHover.vue'
export { default as TutorialListTutList } from '../../components/tutorial/list/TutList.vue'
export { default as TutorialListTutorPp } from '../../components/tutorial/list/TutorPp.vue'

export const LazyAuthLoginForm = import('../../components/auth/LoginForm.vue' /* webpackChunkName: "components/auth-login-form" */).then(c => wrapFunctional(c.default || c))
export const LazyProfileUsrPage = import('../../components/profile/UsrPage.vue' /* webpackChunkName: "components/profile-usr-page" */).then(c => wrapFunctional(c.default || c))
export const LazyCommonFoot = import('../../components/common/Foot.vue' /* webpackChunkName: "components/common-foot" */).then(c => wrapFunctional(c.default || c))
export const LazyCommonNavbar = import('../../components/common/Navbar.vue' /* webpackChunkName: "components/common-navbar" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialTutDesc = import('../../components/tutorial/TutDesc.vue' /* webpackChunkName: "components/tutorial-tut-desc" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialTutForm = import('../../components/tutorial/TutForm.vue' /* webpackChunkName: "components/tutorial-tut-form" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialTutItem = import('../../components/tutorial/TutItem.vue' /* webpackChunkName: "components/tutorial-tut-item" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialTutPageLoading = import('../../components/tutorial/TutPageLoading.vue' /* webpackChunkName: "components/tutorial-tut-page-loading" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialTutPageSide = import('../../components/tutorial/TutPageSide.vue' /* webpackChunkName: "components/tutorial-tut-page-side" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialTutSum = import('../../components/tutorial/TutSum.vue' /* webpackChunkName: "components/tutorial-tut-sum" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialTutsSide = import('../../components/tutorial/TutsSide.vue' /* webpackChunkName: "components/tutorial-tuts-side" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialAnnoun = import('../../components/tutorial/announ/Announ.vue' /* webpackChunkName: "components/tutorial-announ" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialFeed = import('../../components/tutorial/feed/Feed.vue' /* webpackChunkName: "components/tutorial-feed" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialFeedItem = import('../../components/tutorial/feed/FeedItem.vue' /* webpackChunkName: "components/tutorial-feed-item" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialListIsActive = import('../../components/tutorial/list/IsActive.vue' /* webpackChunkName: "components/tutorial-list-is-active" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialListLecHover = import('../../components/tutorial/list/LecHover.vue' /* webpackChunkName: "components/tutorial-list-lec-hover" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialListTutList = import('../../components/tutorial/list/TutList.vue' /* webpackChunkName: "components/tutorial-list-tut-list" */).then(c => wrapFunctional(c.default || c))
export const LazyTutorialListTutorPp = import('../../components/tutorial/list/TutorPp.vue' /* webpackChunkName: "components/tutorial-list-tutor-pp" */).then(c => wrapFunctional(c.default || c))
