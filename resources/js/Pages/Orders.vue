<template>
    <div class="container-fluid">
        <order-content :orders="localOrders" :key="orderContentKey" @updated="handleUpdate" ></order-content>
        
    </div>
</template>
  
<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import OrderContent from '../Components/Order/OrderContent.vue';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default {
    components: {
        DataTable,
        Column,
        OrderContent
    },
    data() {
        return {
            localOrders: this.orders,
            orderContentKey: 0
        };
    },
    mounted() {
        // this.fetchOrders();
    },
    props: {
        orders: Array,
        errors: {
            type: [Array, Object],
            default: () => []
        },
    },
    methods: {
        showLoadingAlert() {
            Swal.fire({
                title: 'Please wait...',
                html: 'Data is being processed.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        },
        closeLoadingAlert() {
            Swal.close();
        },
        fetchOrders() {
            this.showLoadingAlert();
            let params = {};            
            var shopId = localStorage.getItem('selectedStore');

            // var url = '/orders/'+shopId;
            var url = '/orders'
            setTimeout(() => { 
                Inertia.get(url, { shop: shopId }, {
                only: ['orders'],
                preserveState: true,
                onSuccess: response => {
                    this.localOrders = response.props.orders;
                },
                onError: error => {
                    console.error('Error fetching orders:', error);
                    // Handle error (e.g., show a notification)
                }
            });
                this.closeLoadingAlert();
            }, 3000);
            
        },
        handleUpdate() {
            this.componentKey += 1;
        },
    }
}
</script>

  
<style>
/* If you prefer scoped styles, you can add Dashlite-specific styles here */
</style>
  