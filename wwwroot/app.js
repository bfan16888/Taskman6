const routes=[
    {path:'/home',component:home},
    {path:'/employee',component:employee},
    {path:'/task',component:task}
]

const router=new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')