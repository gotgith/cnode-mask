import Vue from 'vue'
import Router from 'vue-router'
import PostList from "../components/PostList"
import Article from '../components/Article'
import UserInfo from  '../components/UserInfo'
import SlideBar from "../components/SlideBar";


Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'root',
            path: '/', // 指定要跳转的路径
            components: {    // 指定要跳转的组件
                main: PostList
            }
        },
        {
            name: 'post_content',
            path: '/topic/:id&author=:name', // 指定要跳转的路径
            components: {    // 指定要跳转的组件
                main: Article,
                slidebar: SlideBar
            }
        },
        {
            name: 'user_info',
            path: '/userinfo/:name', // 指定要跳转的路径
            components: {    // 指定要跳转的组件
                main: UserInfo
            }
        },
        // {
        //     name: 'elite_content',
        //     path: '/elite/', // 指定要跳转的路径
        //     components: {    // 指定要跳转的组件
        //         main: Elite
        //     }
        // },
        {
            name: 'tab',
            path: '/:tab',
            components: {
              main: PostList
            }
        }
    ]
})
