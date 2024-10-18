import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import Tables from './views/Employee.vue'
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
  },
  {
    path: '/annual-leave',
    name: 'annual-leave',
    component: AnnualLeave,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: "/early",
    name: "/early",
    component:  EarlyForm,
  },
  {
    path: "/late-request",
    name: "/late-request",
    component: LateForm,
  },
  {
    path: "/mission-request",
    name: "/mission-request",
    component: MissionForm,
  },
  {
    path: "/missedScan-request",
    name: "/missedScan-request",
    component: MissedScan,
  },
  {
    path: "/companyActivity-request",
    name: "/companyActivity-request",
    component: CompanyActivity,
  },
  {
    path: "/annual-request",
    name: "/annual-request",
    component: AnnualLeave,
  },
  {
    path: "/sick-request",
    name: "/sick-request",
    component: SickLeave,
  },
  {
    path: "/maternity-request",
    name: "/maternity-request",
    component: MaternityLeave,
  },
  {
    path: "/Special-request",
    name: "/Special-request",
    component:SpecialLeave,
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables,
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements,
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
