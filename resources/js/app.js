require('./bootstrap')

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import Authenticated from './Layouts/Authenticated'
import { Head, Link } from '@inertiajs/inertia-vue3'
import ContentHeader from '@/Components/ContentHeader.vue'
import { defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import axios from 'axios';
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primevue/resources/themes/saga-blue/theme.css'  //theme
import 'primevue/resources/primevue.min.css'            //core css
import 'primeicons/primeicons.css'    
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataView from 'primevue/dataview';
import DialogService from 'primevue/dialogservice';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'

defineRule('required', required);
defineRule('email', email);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    // Persistent layout, Code splitting & dynamic imports
    resolve: async (name) => {
        let page = (await import(`./Pages/${name}.vue`)).default

        page.layout ??= Authenticated

        return page
    },
    setup({ el, app, props, plugin }) {
        const vueApp = createApp({ render: () => h(app, props) })
            .use(plugin)
            .component('Head', Head)
            .component('Link', Link)
            .component('ContentHeader', ContentHeader)
            .mixin({ methods: { route } });

        vueApp.use(PrimeVue);
        vueApp.use(ToastService);
        vueApp.component('DataView', DataView);
        vueApp.component('DataTable', DataTable);
        vueApp.component('Column', Column);
        vueApp.component('Toast', Toast);
        vueApp.component('TabView', TabView);
        vueApp.component('TabPanel', TabPanel);
        vueApp.component('DialogService', DialogService);
        vueApp.component('Dialog', Dialog);
        vueApp.component('Tag', Tag);
        vueApp.mount(el);
    },
})

InertiaProgress.init({ color: '#4B5563' })
