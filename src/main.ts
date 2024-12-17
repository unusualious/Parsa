import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import "bootstrap";
import 'primeicons/primeicons.css'; // PrimeIcons stylesheet  
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'; // Import ToastService  
import Toast from 'primevue/toast'; // Import Toast Component  

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
   theme:{
       preset: Aura,
   },
})

// Register components globally  
app.component('Toast', Toast); 
app.use(ToastService);

app.mount('#app')
