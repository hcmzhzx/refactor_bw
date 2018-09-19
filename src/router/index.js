import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import search from '@/components/search'
import ucenter from '@/components/ucenter'
import userInfo from '@/components/userInfo'
import company from '@/components/company'
import account from '@/components/account'
import visitor from '@/components/visitor'
import user from '@/components/user'
import articles from '@/components/articles'
import read from '@/components/read'
import visitorArticle from '@/components/visitor_article'



Vue.use(Router)

export default new Router({
   routes: [
      {
         path: '/',
         name: 'index',
         component: index,
         meta:{title:'首页',keepAlive:false}
      },
      {
         path: '/search',
         name: 'search',
         component: search,
         meta:{title:'搜索',keepAlive:false}
      },
      {
         path: '/ucenter',
         name: 'ucenter',
         component: ucenter,
         meta:{title:'个人中心',keepAlive:false}
      },
      {
         path: '/userInfo',
         name: 'userInfo',
         component: userInfo,
         meta:{title:'基本信息',keepAlive:false}
      },
      {
         path: '/company',
         name: 'company',
         component: company,
         meta:{title:'选择所属公司',keepAlive:false}
      },
      {
         path: '/account',
         name: 'account',
         component: account,
         meta:{title:'提现账户',keepAlive:false}
      },
      {
         path: '/visitor',
         name: 'visitor',
         component: visitor,
         meta:{title:'访客记录',keepAlive:false}
      },
      {
         path: '/user',
         name: 'user',
         component: user,
         meta:{title:'人脉分析',keepAlive:false}
      },
      {
         path: '/articles',
         name: 'articles',
         component: articles,
         meta:{title:'我的文章',keepAlive:false}
      },
      {
         path: '/read',
         name: 'read',
         component: read,
         meta:{title:'阅读',keepAlive:false}
      },
      {
         path: '/visitor/article',
         name: 'visitor_article',
         component: visitorArticle,
         meta:{title:'文章访客',keepAlive:false}
      },












      {path: '*', redirect: '/'},
   ],
   //mode: 'history'
})
