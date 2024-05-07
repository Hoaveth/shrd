<template>
    <div class="nk-content-inner">
        <div class="nk-content-body">
            <div class="nk-block-head nk-block-head-sm">
                <div class="nk-block-between">
                    <div class="nk-block-head-content">
                        <h3 class="nk-block-title page-title">Orders</h3>
                    </div>
                    <div class="nk-block-head-content">
                        <div class="toggle-wrap nk-block-tools-toggle"><a href="#"
                                class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em
                                    class="icon ni ni-more-v"></em></a>
                            <div class="toggle-expand-content" data-content="pageMenu">
                                <ul class="nk-block-tools g-3">
                                    <li>
                                        <div class="form-control-wrap">
                                            <div class="form-icon form-icon-right"><em class="icon ni ni-search"></em>
                                            </div><input type="text" v-model="filters['global'].value"
                                                class="form-control" id="default-04" placeholder="Search anything...">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nk-block">
                <DataTable class="nk-tb-list nk-tb-ulist" v-model:expandedRows="expandedOrders"
                    v-model:filters="filters" v-model:selection="selectedOrders" sortMode="multiple" removableSort
                    :value="filteredOrders" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    style="min-height: 300px;" @order-deleted="handleOrderDeleted" selectionMode="multiple">
                    <template #empty> No orders found. </template>
                    <Column expander style="width: 5rem" />
                    <Column field="order_number" header="Order #" sortable>

                        <template #body="slotProps">
                            <a href="#" @click="goToOrderDetails(slotProps.data.id, this.shop)">
                                <span>{{ "#" + slotProps.data.order_number }}</span>
                            </a>
                        </template>
                    </Column>
                    <Column field="formattedCreatedDate" header="Date" sortable>
                    </Column>
                    <Column v-if="!hasCustomerData" field="formattedCustomerName" header="Customer" sortable>
                    </Column>
                    <Column field="financial_status" header="Financial Status" sortable>

                        <template #body="slotProps">
                            <span v-html="financialStatusTemplate(slotProps.data)"></span>
                        </template>
                    </Column>
                    <Column field="fulfillment_status" header="Fulfillment Status" sortable>

                        <template #body="slotProps">
                            <span v-html="fulfillmentStatusTemplate(slotProps.data)"></span>
                        </template>
                    </Column>
                    <Column field="formattedTotalItems" header="Purchased" sortable>
                    </Column>
                    <Column field="total_price" header="Total" sortable>

                        <template #body="slotProps">
                            <span v-html="totalPriceTemplate(slotProps.data)"></span>
                        </template>
                    </Column>
                    <Column>

                        <template #body="slotProps" class="nk-tb-item">
                            <div class="nk-tb-col nk-tb-col-tools" @mouseenter="hoverOrder = slotProps.data.id"
                                @mouseleave="hoverOrder = null">

                                <ul class="nk-tb-actions gx-1">
                                    <!-- Your other li elements -->
                                    <!-- <li
                                        :class="{ 'nk-tb-action': hoverOrder === slotProps.data.id, 'nk-tb-action-hidden': hoverOrder !== slotProps.data.id }">
                                        <a href="#" class="btn btn-icon btn-trigger btn-tooltip"
                                            aria-label="Mark as Delivered" data-bs-original-title="Mark as Delivered">
                                            <em class="icon ni ni-truck"></em>
                                        </a>
                                    </li> -->
                                    <li
                                        :class="{ 'nk-tb-action': hoverOrder === slotProps.data.id, 'nk-tb-action-hidden': hoverOrder !== slotProps.data.id }">
                                        <a href="#" @click.prevent="goToOrderDetails(slotProps.data.id)"
                                            class="btn btn-icon btn-trigger btn-tooltip" aria-label="View Order"
                                            data-bs-original-title="View Order">
                                            <em class="icon ni ni-eye"></em>
                                        </a>
                                    </li>
                                    <li>
                                        <div class="dropdown me-n1"><a href="#"
                                                class="dropdown-toggle btn btn-icon btn-trigger"
                                                data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <ul class="link-list-opt no-bdr">
                                                    <li><a href="#"
                                                            @click.prevent="goToOrderDetails(slotProps.data.id)"><em
                                                                class="icon ni ni-eye"></em><span>Order
                                                                Details</span></a></li>
                                                    <li><a href="#"
                                                            @click.prevent="deleteOrder(slotProps.data.id)"><em
                                                                class="icon ni ni-trash"></em><span>Delete Order
                                                                </span></a></li>
                                                    <li><a href="#"
                                                            @click.prevent="updateOrder(slotProps.data)"><em
                                                                class="icon ni ni-edit"></em><span>Update Order
                                                                </span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </template>

                    </Column>

                    <template #expansion="slotProps">
                        <div class="p-3">
                            <h5>Order #{{ slotProps.data.order_number }}</h5>
                            <DataTable :value="slotProps.data.line_items" sortMode="multiple" removableSort paginator
                                :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" style="min-height: 300px;"
                                selectionMode="multiple">
                                <template #empty> No products found. </template>
                                <Column field="title" header="Name" sortable></Column>
                                <Column field="variant_title" header="Variant" sortable></Column>
                                <Column field="vendor" header="Vendor" sortable></Column>
                                <Column field="price" header="Price" sortable></Column>
                                <Column field="grams" header="Grams" sortable></Column>
                                <Column field="quantity" header="Quantity" sortable></Column>
                            </DataTable>
                        </div>
                    </template>
                </DataTable>
            </div>
        </div>
        <!-- <OrderUpdateModal v-if="selectedOrderUpdate" :countries="this.countries" :order="selectedOrderUpdate" @close="closeUpdateOrder()"></OrderUpdateModal> -->
        <OrderUpdateModal v-if="selectedOrderUpdate" :countries="this.countries"  :order="selectedOrderUpdate" @close="closeUpdateOrder()"></OrderUpdateModal>
    </div>
</template>


<script>
import OrderUpdateModal from '..//Order/OrderUpdateModal.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import OrderModal from '../../Components/Order/OrderModal.vue'
import moment from 'moment';
import { FilterMatchMode } from 'primevue/api'
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default {
    mounted() {
        console.log(this.localOrders);
        this.localOrders.forEach(order => {
            order.formattedCreatedDate = this.formatDate(order.created_at);
            order.formattedCustomerName = this.getCustomerFullName(order);
            order.formattedFinancialStatus = this.formatFinancialStatus(order.financial_status);
            order.formattedFulfillmentStatus = this.formatFulfillmentStatus(order.fulfillment_status);
            order.formattedTotalItems = this.calculatePurchasedItems(order);
        })
    },
    components: {
        DataTable,
        Column,
        OrderModal,
        OrderUpdateModal
    },
    data() {
        return {
            localOrders: this.orders,
            selectedOrders: [],
            expandedOrders: [],
            hoverOrder: null,
            customerDetails: this.customer,
            countries: this.countries,
            shop: this.shop,
            selectedOrderUpdate: null,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            },
        };
    },
    props: {
        orders: {
            type: Array,
            default: []
        },
        customer: {
            type: Object,
            default: null
        },
        shop: String,
        countries: Array

    },
    watch: {
        filteredOrders(newVal, oldVal) {
            this.$emit('updated');
        }
    },
    computed: {
        hasCustomerData() {
            return this.customerDetails != null;
        },
        filteredOrders() {
            let searchTerm = this.filters.global.value ? this.filters.global.value.toLowerCase() : '';

            return this.localOrders.filter(order => {
                // Check if any of the fields contain the search term
                const matchesId = order.id.toString().toLowerCase().includes(searchTerm);
                const matchesDate = order.formattedCreatedDate && order.formattedCreatedDate.toLowerCase().includes(searchTerm);
                const matchesCustomer = order.formattedCustomerName && order.formattedCustomerName.toLowerCase().includes(searchTerm);
                const matchesFinancialStatus = order.formattedFinancialStatus && order.formattedFinancialStatus.toLowerCase().includes(searchTerm);
                const matchesFulfillmentStatus = order.formattedFulfillmentStatus && order.formattedFulfillmentStatus.toLowerCase().includes(searchTerm);
                const matchesTotalItems = order.formattedTotalItems && order.formattedTotalItems.toString().toLowerCase().includes(searchTerm);
                const matchesTotalPrice = order.total_price && order.total_price.toString().toLowerCase().includes(searchTerm);

                // Return true if any field matches the search term
                return matchesId || matchesDate || matchesCustomer || matchesFinancialStatus ||
                    matchesFulfillmentStatus || matchesTotalItems || matchesTotalPrice;
            });
        }
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
        totalPriceTemplate(order) {
            return order.total_price && order.currency ? order.currency + ' ' + order.total_price : 'N/A';
        },
        orderNumberTemplate(order) {
            return `<a href="/order?order_id=${order.id}">${order.order_number}</a>`;
        },
        financialStatusTemplate(order) {
            let statusClass = this.getFinancialStatusClass(order.financial_status);
            let statusLabel = this.formatFinancialStatus(order.financial_status);
            return `<span class="badge ${statusClass}">${statusLabel}</span>`;
        },
        fulfillmentStatusTemplate(order) {
            let statusClass = this.getFulfillmentStatusClass(order.fulfillment_status);
            let statusLabel = this.formatFulfillmentStatus(order.fulfillment_status);
            return `<span class="badge ${statusClass}">${statusLabel}</span>`;
        },
        dateTemplate(dateString) {
            return this.formatDate(dateString);
        },
        calculatePurchasedItems(order) {
            if (order.line_items.length === 1 && order.line_items[0].quantity === 1) {
                return order.line_items[0].title;
            } else if (order.line_items.length > 1 || order.line_items[0].quantity > 1) {
                const totalItems = order.line_items.reduce((sum, item) => sum + item.quantity, 0);
                return totalItems + ' items';
            } else {
                return 'N/A';
            }
        },
        formatFinancialStatus(status) {
            const statusMap = {
                pending: 'Pending',
                paid: 'Paid',
                partially_paid: 'Partially Paid',
                refunded: 'Refunded',
                voided: 'Voided',
                partially_refunded: 'Partially Refunded',
                unpaid: 'Unpaid'
            };
            return statusMap[status] || 'N/A';
        },
        getFinancialStatusClass(status) {
            const statusClassMap = {
                paid: 'bg-success',
                unpaid: 'bg-warning',
                // Add other status to class mappings as needed
            };
            return statusClassMap[status] || 'bg-primary';
        },
        formatFulfillmentStatus(status) {
            const statusMap = {
                fulfilled: 'Shipped',
                partial: 'Partially Shipped',
            };
            return statusMap[status] || 'TBD';
        },
        getCustomerFullName(order) {
            if (order.customer && order.customer.first_name && order.customer.last_name) {
                return `${order.customer.first_name} ${order.customer.last_name}`;
            }
            return 'N/A';
        },
        getFulfillmentStatusClass(status) {
            const statusClassMap = {
                fulfilled: 'bg-success',
                partial: 'bg-warning',
                // Add other status to class mappings as needed
            };
            return statusClassMap[status] || 'bg-primary';
        },
        formatDate(dateString) {
            return moment(dateString).format('MMM D, YYYY h:mm:ss A');
        },
        clearFilter() {
            this.filters.global.value = null;
        },
        goToOrderDetails(orderId,shopId) {
            if(shopId == undefined){
                shopId = localStorage.getItem('selectedStore');
            }
            this.navigateWithInertiaEvents(`/order?order_id=${orderId}&shop_id=${shopId}`, {
                onStart: () => {
                    this.showLoadingAlert();
                },
                onFinish: () => {
                    this.closeLoadingAlert();
                }
            });
        },
        async deleteOrder(orderId) {
            var shopId = localStorage.getItem('selectedStore');
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete them!',
                cancelButtonText: 'No, cancel!'
            });
            if (result.isConfirmed) { 
                var url = '/order/delete/'+shopId+'/'+orderId+'/'+this.customerDetails.id
                Inertia.post(url, {
                onSuccess: (page) => {
                },
                onError: (error) => {
                    this.closeLoadingAlert;
                    console.error('Error deleting store:', error);
                }
                });
                this.handleOrderDeleted(orderId);
            }
        },
        updateOrder(order) {
            this.selectedOrderUpdate = order;
            console.log(order);
        },
        closeUpdateOrder(){
          this.selectedOrderUpdate = null;
        },
        handleOrderDeleted(orderId) {
            this.showLoadingAlert();
            this.localOrders = this.localOrders.filter(order => order.id != orderId);
            setTimeout(function() {
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Deleted Order Successfully!', // Assuming your response contains a success message
                  });
            }, 8000);
        },
        navigateWithInertiaEvents(url, { onStart = () => { }, onFinish = () => { } } = {}) {
            const startHandler = () => {
                onStart();
                Inertia.off('start', startHandler); 
            };

            const finishHandler = (event) => {
                if (event.detail.visit.completed) {
                    onFinish();
                    Inertia.off('finish', finishHandler); 
                }
            };

            Inertia.on('start', startHandler);
            Inertia.on('finish', finishHandler);

            Inertia.visit(url);
        }
    }
}
</script>