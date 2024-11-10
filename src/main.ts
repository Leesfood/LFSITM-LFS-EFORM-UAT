import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

import DashboardLayout from './components/DashboardLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';
import { create, NButton, NSelect, NInput, NDatePicker, NForm, NFormItem, NTimePicker, NLoadingBarProvider, NUpload, NUploadDragger, NIcon, NText, NP } from 'naive-ui';

try {
  const app = createApp(App);
  const naive = create({
    components: [
      NButton,
      NSelect,
      NInput,
      NDatePicker,
      NForm,
      NFormItem,
      NTimePicker,
      NLoadingBarProvider,
      NUpload,
      NUploadDragger,
      NIcon,
      NText,
      NP
    ]
  });

  app.component('DefaultLayout', DashboardLayout);
  app.component('EmptyLayout', EmptyLayout);

  app.use(naive);
  app.use(router);

  app.mount('#app');
} catch (error) {
  console.error("Error during app initialization:", error);
}
