import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Login = (resolve) => {
  import('@/components/login').then((module) => {
    resolve(module)
  })
};
const Home = (resolve) => {
  import('@/components/home').then((module) => {
    resolve(module)
  })
};
const Work = (resolve) => {
  import('@/components/work').then((module) => {
    resolve(module)
  })
};
const Contact = (resolve) => {
  import('@/components/contact').then((module) => {
    resolve(module)
  })
};
const ContactDept = (resolve) => {
  import('@/components/contact_dept').then((module) => {
    resolve(module)
  })
};
const Msgs = (resolve) => {
  import('@/components/msgs').then((module) => {
    resolve(module)
  })
};
const Notices = (resolve) => {
  import('@/components/notices').then((module) => {
    resolve(module)
  })
};
const NoticeDetail = (resolve) => {
  import ('@/components/notice_detail').then((module) => {
    resolve(module)
  })
};
const Navbars = (resolve) => {
  import('@/components/navbars').then((module) => {
    resolve(module)
  })
};
const ChangeUserShortcut = (resolve) => {
  import('@/components/change_user_shortcut').then((module) => {
    resolve(module)
  })
};
const NavbarDetail = (resolve) => {
  import('@/components/navbar_detail').then((module) => {
    resolve(module)
  })
};
const NewJb = (resolve) => {
  import('@/components/new_flow/jb').then((module) => {
    resolve(module)
  })
};
const ApplyShow = (resolve) => {
  import('@/components/apply_show').then((module) => {
    resolve(module)
  })
};
const Salarys = (resolve) => {
  import('@/components/salarys').then((module) => {
    resolve(module)
  })
};
const WorkCategory = (resolve) => {
  import('@/components/work_category_list').then((module) => {
    resolve(module)
  })
};
const WorkCategoryDetail = (resolve) => {
  import('@/components/work_show').then((module) => {
    resolve(module)
  })
};
const Meeting = (resolve) => {
  import('@/components/meeting').then((module) => {
    resolve(module)
  })
};
const Punch = (resolve) => {
  import ('@/components/punch').then((module) => {
    resolve(module)
  })
};
const Test = (resolve) => {
  import('@/components/test').then((module) => {
    resolve(module)
  })
};
export default new Router({
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          name: Notices,
          path: 'notices',
          component: Notices,
          children: [{
            name: NoticeDetail,
            path: 'notice_detail',
            component: NoticeDetail
          }]
        },
      ]
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
    {
      path: '/work',
      name: "Work",
      component: Work,
      children: [{
        name: WorkCategory,
        path: 'category',
        component: WorkCategory,
        children: [{
          name: WorkCategoryDetail,
          path: 'detail',
          component: WorkCategoryDetail
        }]
      }]
    },
    {
      path: '/contact',
      name: "Contact",
      component: Contact,
      children: [
        {
          name: ContactDept,
          path: 'dept',
          component: ContactDept
        }
      ]
    },
    {
      path: '/msgs',
      name: "Msgs",
      component: Msgs
    },
    {
      path: '/change_user_shortcut',
      name: "ChangeUserShortcut",
      component: ChangeUserShortcut
    },
    {
      path: '/navbars',
      name: "Navbars",
      component: Navbars,
    },
    {
      name: NavbarDetail,
      path: '/navbars/detail',
      component: NavbarDetail,
      children: [{
        name: ApplyShow,
        path: 'apply_show',
        component: ApplyShow
      }, {
        name: Salarys,
        path: 'salarys',
        component: Salarys
      }]
    },
    {
      name: NewJb,
      path: '/navbars/new_flow/jb',
      component: NewJb
    },
    {
      name: Meeting,
      path: '/meeting',
      component: Meeting
    },
    {
      name: Punch,
      path: '/punch',
      component: Punch
    },
  ]
})
