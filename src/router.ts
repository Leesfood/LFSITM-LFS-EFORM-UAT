import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import UIElements from './views/UIElements.vue'
import Login from './views/Login.vue'
import Modal from './views/Modal.vue'
import Card from './views/Card.vue'
import Blank from './views/Blank.vue'
import AnnualLeave from './views/Leave/AnnualLeave.vue'
import EarlyForm from './views/Leave/EarlyForm.vue'
import LateForm from './views/Leave/LateForm.vue'
import MissionForm from './views/Leave/MissionForm.vue'
import MissedScan from './views/Leave/MissedScan.vue'
import CompanyActivity from './views/Leave/CompanyActivity.vue'
import SickLeave from './views/Leave/SickLeave.vue'
import MaternityLeave from './views/Leave/MaternityLeave.vue'
import SpecialLeave from './views/Leave/SpecialLeave.vue'
import Profile from './views/Profile.vue'
import AddEmployee from './views/Employees/Add.vue'
import Employee from './views/Employee.vue'
import View from './views/Employees/View.vue'
import Edit from './views/Employees/Edit.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: '/annual-leave',
    name: 'annual-leave',
    component: AnnualLeave,
    meta: { roles: ['1', '2'] }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: "/early",
    name: "/early",
    component: EarlyForm,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: "/late-request",
    name: "/late-request",
    component: LateForm,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: "/mission-request",
    name: "/mission-request",
    component: MissionForm,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: "/missedScan-request",
    name: "/missedScan-request",
    component: MissedScan,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: "/companyActivity-request",
    name: "/companyActivity-request",
    component: CompanyActivity,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: "/annual-request",
    name: "/annual-request",
    component: AnnualLeave,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: "/sick-request",
    name: "/sick-request",
    component: SickLeave,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: "/maternity-request",
    name: "/maternity-request",
    component: MaternityLeave,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: "/Special-request",
    name: "/Special-request",
    component: SpecialLeave,
    meta: { roles: ['1', '2','0'] }
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
    meta: { roles: [ '2'] }
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
    meta: { roles: [ '2'] }
  },
  {
    path: '/employee',
    name: 'employee',
    component: Employee,
    meta: { roles: ['1', '2'] }
  },
  {
    path: '/employee/add',
    name: 'Add-Employee',
    component: AddEmployee,
    meta: { roles: ['1', '2'] }
  },
  {
    path: '/employee/:id/view',
    name: 'view-Employee',
    component: View,
    meta: { roles: ['1', '2'] }
  },
  {
    path: '/employee/:id/edit',
    name: 'edit-Employee',
    component: Edit,
    meta: { roles: ['1', '2'] }
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements,
    meta: { roles: [ '2'] }
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
    meta: { roles: [ '2'] }
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
    meta: { roles: [ '2'] }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]; // Define roles as an array of strings in RouteMeta
  }
}

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('userRole') || '0';

  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router
