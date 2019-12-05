import Vue from 'vue'
import Router from 'vue-router'

const HomePage = resovle => {
    require(['@/pages/HomePage.vue'], resovle)
};
const DetailPage = resovle => {
    require(['@/pages/DetailPage.vue'], resovle)
};

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home-page',
        component: HomePage,
    },
    {
        path: '/:id',
        name: 'detail-page',
        component: DetailPage,
    }]
})
