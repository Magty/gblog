import NProgress from 'nprogress';
import { Message } from 'element-ui';
import router from '@/router';
import store from '@/store';
import { getToken } from './auth';
import 'nprogress/nprogress.css';

const whiteList = ['/login']; // 不重向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/',
      });
      NProgress.done();
    } else { // 实时拉取用户信息
      store.dispatch('GetUserInfo').then((res) => {
        console.log(res);
        next();
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => {
          Message.error(`拉取用户信息失败，请重新登录！${err}`);
          next({
            path: '/',
          });
        });
      });
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next('/login');
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
