import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:"hash",
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/intention',
                    component: () => import(/* webpackChunkName: "intention" */ '../components/page/Intention.vue'),
                    meta: { title: '意图测试' }
                },
                {
                    path: '/ner',
                    component: () => import(/* webpackChunkName: "ner" */ '../components/page/Ner.vue'),
                    meta: { title: 'NER测试' }
                },
                {
                    path: '/item',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/Item.vue'),
                    meta: { title: '项目测试' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/similar',
                    component: () => import(/* webpackChunkName: "similar" */ '../components/page/Similar.vue'),
                    meta: { title: '相似度测试' }
                },
                {
                    path: '/add_test_data',
                    component: () => import(/* webpackChunkName: "add_test_data" */ '../components/page/ManageTestData.vue'),
                    meta: { title: '测试数据管理' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
