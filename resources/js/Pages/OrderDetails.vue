<template>
    <div class="nk-content ">
        <div class="container">
            <div class="nk-content-inner">
                <div class="nk-content-body">
                    <div class="nk-block-head nk-block-head-sm">
                        <div class="nk-block-between g-3">
                            <div class="nk-block-head-content"><h4>{{ this.shop.shopify_name }}</h4></div>
                            <div class="nk-block-head-content">
                                <ul class="breadcrumb breadcrumb-arrow">
                                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#" @click="gotoAllCustomers()">Customers</a>
                                    </li>
                                    <li class="breadcrumb-item"><a href="#"
                                            @click="goToCustomerPage(this.customer.id)">{{
                                        customerFullName || "Customer Details" }}</a></li>
                                    <li class="breadcrumb-item"><a href="#" @click="gotoAllOrders()"> Orders </a></li>
                                    <li class="breadcrumb-item active">{{ "#" + orderDetail.order_number }}</li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    <div class="nk-block ">
                        <div class="row g-gs">
                            <div class="col-lg-3 col-xl-3 col-xxl-3 ">
                                <div class="card nk-block-scrollable">
                                    <div class="card-inner">
                                        <div class="nk-block">
                                            <h6 class="overline-title mb-2">Notes</h6>
                                            <div class="nk-block">
                                                <div class="nk-block-head nk-block-head-sm nk-block-between">
                                                    <h5 class="title"></h5><a href="#" class="link link-sm" @click.prevent="openAddNoteModal">+ Add
                                                        Note</a>
                                                </div>
                                                <div class="bq-note">
                                                    <div class="bq-note-item">
                                                        <div class="bq-note-text">
                                                            <p> {{ this.order.note }} </p>
                                                        </div>
                                                        <div class="bq-note-meta"><a href="#" @click.prevent="openDeleteModal"
                                                                class="link link-sm link-danger">Delete Note</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Payment Method Section -->

                                    <div class="card-inner">
                                        <h6 class="overline-title mb-2">Payment Method</h6>
                                        <div
                                            v-if="orderDetail.payment_gateway_names && orderDetail.payment_gateway_names.length > 0">
                                            <ul>
                                                <li v-for="(method, index) in orderDetail.payment_gateway_names"
                                                    :key="index">{{ formatGatewayName(method) }}</li>
                                            </ul>
                                        </div>
                                        <div v-else>
                                            <p>N/A</p>
                                        </div>
                                    </div>

                                    <div class="card-inner">
                                        <h6 class="overline-title mb-2">Shipping Details</h6>
                                        <div v-if="orderDetail.shipping_lines && orderDetail.shipping_lines.length > 0">
                                            <ul>
                                                <li v-for="(shipping, index) in orderDetail.shipping_lines"
                                                    :key="'shipping-' + index">
                                                    <strong>{{ shipping.title }}:</strong> {{ shipping.price | currency
                                                    }} ({{ shipping.code }})
                                                </li>
                                            </ul>
                                        </div>
                                        <div v-else>
                                            <p>N/A</p>
                                        </div>
                                    </div>
                                    <div class="card-inner">
                                        <h5 class="overline-title mb-2">Refund Details </h5> 
                                        <div v-if="orderDetail.refunds && orderDetail.refunds.length > 0">
                                            <div v-for="(refund, index) in orderDetail.refunds" :key="refund.id"
                                                class="refund-detail mb-4">
                                                <div class="col-12">
                                                    <h6 class="title mb-2">Refund #{{ index + 1 }}</h6>
                                                </div>
                                                <div class="col-sm-6 col-md-6 col-lg-12"
                                                    v-for="transaction in refund.transactions" :key="transaction.id">
                                                    <div><span class="label">Amount:</span> <span class="value">{{
                                        transaction.amount }} {{ transaction.currency }}</span>
                                                    </div>
                                                    <div><span class="label">Gateway:</span> <span class="value">{{
                                        formatGatewayName(transaction.gateway) }}</span></div>
                                                    <div><span class="label">Status:</span> <span class="value">{{
                                        formatGatewayName(transaction.status) }}</span></div>
                                                    <div><span class="label">Processed At:</span> <span class="value">{{
                                        formatDate(transaction.processed_at) }}</span></div>
                                                    <div v-if="transaction.message">
                                                        <div><span class="label">Message:</span> <span class="value">{{
                                        transaction.message }}</span></div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6 col-md-6 col-lg-12"
                                                    v-if="refund.order_adjustments && refund.order_adjustments.length > 0">
                                                    <div v-for="adjustment in refund.order_adjustments"
                                                        :key="adjustment.id">
                                                        <div><span class="label">Adjustment Reason:</span> <span
                                                                class="value">{{ adjustment.reason }}</span></div>
                                                        <div><span class="label">Adjustment Amount:</span> <span
                                                                class="value">{{
                                        adjustment.amount_set.presentment_money.amount }} {{
                                        adjustment.amount_set.presentment_money.currency_code
                                    }}</span></div>
                                                    </div>
                                                </div>
                                                <div class="col-12" v-if="refund.note">
                                                    <div><span class="label">Note:</span> <span class="value">{{
                                        refund.note }}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p>No refunds available.</p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div class="col-lg-5 col-xl-5 col-xxl-6">
                                <div class="card nk-block-scrollable">
                                    <div class="card-inner">
                                    <span v-if="canBeFullyRefunded()" class="badge bg-danger float-end mb-2" @click="fullRefund()">Full Refund</span>
                                        <div class="nk-block">
                                            <DataTable :value="this.orderDetail.line_items" class="nk-tb-list">
                                                <Column>
                                                    <template #body="slotProps">
                                                        <div class="user-card">
                                                            <span class="tb-product">
                                                                <img :src="this.getProductImage(slotProps.data)"
                                                                    :alt="slotProps.data.name" class="thumb">
                                                            </span>
                                                            <div class="user-info">
                                                                <span class="tb-lead"> {{ slotProps.data.name }}
                                                                    <span
                                                                        class="dot dot-success d-md-none ms-1"></span></span><span>QTY:
                                                                    {{ slotProps.data.quantity }}</span>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </Column>
                                                <Column header="Price">

                                                    <template #body="slotProps">
                                                        {{ getProductPrice(slotProps.data) }}
                                                    </template>
                                                </Column>
                                                <Column header="Status">
                                                    <template #body="slotProps">
                                                        <span v-if="isRefunded(slotProps.data)" class="badge bg-warning">Refunded</span>
                                                    </template>
                                                </Column>
                                                <Column header="Action">
                                                    <template #body="slotProps">
                                                        <!-- <span v-html="canBeRefunded(slotProps.data)"></span> -->
                                                        <span v-if="canBeRefunded(slotProps.data)" class="badge bg-danger" @click="refundItem(slotProps.data)">Refund</span>
                                                    </template>
                                                </Column>
                                            </DataTable>
                                        </div>
                                        <div class="nk-block">
                                            <div class="row g-3">
                                                <div class="col-xl-12">
                                                    <div class="card">
                                                        <div class="card-inner">
                                                            <div class="between-center flex-wrap flex-md-nowrap g-3">
                                                                <table class="table table-borderless">
                                                                    <tbody>
                                                                        <tr v-if="showSubtotal">
                                                                            <td colspan="2">Subtotal</td>
                                                                            <td colspan="2">{{ retrieveAllQuantity + " items" }}</td>
                                                                            <td>{{ this.getProductSubTotal() }}</td>
                                                                        </tr>
                                                                        <!-- Total Discounts -->
                                                                        <tr>
                                                                            <td colspan="2">Total Discounts</td>
                                                                            <td colspan="2"></td>
                                                                            <td>-{{ orderDetail.current_total_discounts | currency }}</td>
                                                                        </tr>
                                                                        <!-- Total Taxes -->
                                                                        <tr>
                                                                            <td colspan="2">Total Taxes</td>
                                                                            <td colspan="2"></td>
                                                                            <td>{{ orderDetail.current_total_tax | currency }}</td>
                                                                        </tr>
                                                                        <!-- Shipping Cost (Assuming shipping is included in total price) -->
                                                                        <tr>
                                                                            <td colspan="2">Shipping Cost</td>
                                                                            <td colspan="2"></td>
                                                                            <td v-if="orderDetail.total_shipping_price_set && orderDetail.total_shipping_price_set.shop_money.amount > 0">
                                                                                {{ orderDetail.total_shipping_price_set.shop_money | currency }}
                                                                            </td>
                                                                            <td v-else>N/A</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colspan="2">Total</td>
                                                                            <td colspan="2"></td>
                                                                            <td>{{ this.getProductTotal() }}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-xl-4 col-xxl-3">
                                <div class="card nk-block-scrollable">
                                    <div class="card-inner-group">
                                        <div class="card-inner">
                                            <div class="user-card user-card-s2">
                                                <div class="user-info">
                                                    <h5 @mouseover="hoverCustomerFullName = true"
                                                        @mouseleave="hoverCustomerFullName = false">
                                                        {{ this.customerFullName }}
                                                        <a href="#" v-if="hoverCustomerFullName"
                                                            @click.prevent="copyToClipboard(this.customerFullName)"
                                                            class="btn btn-icon btn-trigger btn-tooltip"
                                                            aria-label="Copy Full Name"
                                                            data-bs-original-title="Copy Full Name">
                                                            <em class="icon ni ni-copy"></em>
                                                        </a>
                                                    </h5>
                                                    <span class="sub-text" @mouseover="hoverCustomerContact = true"
                                                        @mouseleave="hoverCustomerContact = false">
                                                        {{ this.customer.email }} <br> {{ this.customer.phone }}
                                                        <a href="#" v-if="hoverCustomerContact"
                                                            @click.prevent="copyToClipboard(this.customer.email + ' / ' + this.customer.phone)"
                                                            class="btn btn-icon btn-trigger btn-tooltip"
                                                            aria-label="Copy Contact Info"
                                                            data-bs-original-title="Copy Contact Info">
                                                            <em class="icon ni ni-copy"></em>
                                                        </a>
                                                    </span>
                                                    <span class="sub-text">
                                                        <a href="#" @click.prevent="gotoShopify()"
                                                            class="btn btn-icon btn-trigger btn-tooltip"
                                                            aria-label="Go to Shopify"
                                                            data-bs-original-title="Go to Shopify">
                                                            <em class="icon ni ni-bag-fill"></em>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-inner">
                                            <div class="row text-center">
                                                <div class="col-6">
                                                    <div class="profile-stats"><span
                                                            :class="'badge ' + this.getFinancialStatusClass(this.orderDetail.financial_status)">{{
                                        this.formatFinancialStatus(this.orderDetail.financial_status)
                                    }}</span><span class="sub-text">Order Status</span></div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="profile-stats"><span
                                                            :class="'badge ' + this.getFulfillmentStatusClass(this.orderDetail.fulfillment_status)">{{
                                        this.formatFulfillmentStatus(this.orderDetail.fulfillment_status)
                                    }}</span><span class="sub-text">Shipping Status</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-inner">
                                            <h6 class="overline-title mb-2">Information Details</h6>
                                            <div class="row g-3">
                                                <div class="col-12">
                                                    <span class="sub-text">Order Created:</span> {{
                                            formatDate(orderDetail.created_at) }}
                                                </div>
                                                <div class="col-12">
                                                    <span class="sub-text">Order Processed:</span> {{
                                        formatDate(orderDetail.processed_at) }}
                                                </div>
                                                <div class="col-12">
                                                    <span class="sub-text">Last Updated:</span> {{
                                        formatDate(orderDetail.updated_at) }}
                                                </div>
                                                <div class="col-12"
                                                    v-if="orderDetail.fulfillments && orderDetail.fulfillments.length > 0">
                                                    <span class="sub-text">Fulfillment Date:</span> {{
                                        formatDate(orderDetail.fulfillments[0].created_at) }}
                                                </div>
                                                <div class="col-12" v-if="orderDetail.cancelled_at">
                                                    <span class="sub-text">Cancelled At:</span> {{
                                        formatDate(orderDetail.cancelled_at) }}
                                                </div>
                                                <div class="col-sm-6 col-md-6 col-lg-12" v-if="hasShippingAddress"
                                                    @mouseover="hoverShippingAddress = true"
                                                    @mouseleave="hoverShippingAddress = false">
                                                    <span class="sub-text">Shipping Address:</span>
                                                    <div v-for="(line, index) in shippingAddressLines"
                                                        :key="'shipping-' + index">
                                                        {{ line }}
                                                    </div>
                                                    <a href="#" v-if="hoverShippingAddress"
                                                        @click.prevent="copyToClipboard(shippingAddressLines.join('\n'))"
                                                        class="btn btn-icon btn-trigger btn-tooltip"
                                                        aria-label="Copy Shipping Address"
                                                        data-bs-original-title="Copy Shipping Address">
                                                        <em class="icon ni ni-copy"></em>
                                                    </a>
                                                </div>

                                                <div class="col-sm-6 col-md-6 col-lg-12" v-if="this.order.billing_address"
                                                    @mouseover="hoverBillingAddress = true"
                                                    @mouseleave="hoverBillingAddress = false">
                                                    <span class="sub-text">Billing Address:</span>
                                                    <div v-for="(line, index) in billingAddressLines"
                                                        :key="'billing-' + index">
                                                        {{ line }}
                                                    </div>
                                                    <a href="#" v-if="hoverBillingAddress"
                                                        @click.prevent="copyToClipboard(billingAddressLines.join('\n'))"
                                                        class="btn btn-icon btn-trigger btn-tooltip"
                                                        aria-label="Copy Billing Address"
                                                        data-bs-original-title="Copy Billing Address">
                                                        <em class="icon ni ni-copy"></em>
                                                    </a>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                            <div class="card nk-block-scrollable">
                                    <div class="card-inner">
                                        <div>
                                                <h6 class="overline-title mb-2">Timeline Details</h6>
                                                <Timeline :value="this.events">
                                                    <template #opposite="slotProps">
                                                        <div class="timeline-item timeline-item-left">
                                                        <div class="timeline-item-content justify-content">
                                                            <small class="p-text-secondary">{{ formatDate(slotProps.item.created_at) }}</small>
                                                        </div>
                                                        </div>
                                                    </template>
                                                    <template #content="{item}">
                                                        <div class="timeline-item timeline-item-right">
                                                        <div class="timeline-item-content">
                                                            <small class="p-text-secondary timeline-status">{{ getEventVerb(item.verb) }}</small>
                                                            <p>{{ checkLinkRefs(item.message) ? item.message : item.message  }}</p>
                                                            <!-- Add other Shopify order event details here -->
                                                        </div>
                                                        </div>
                                                    </template>
                                                </Timeline>
                                            </div>
                                    </div>
                    
                </div>
            </div>
        </div>
        <OrderRefundModal v-if="lineItemRefund" :lineItem="this.lineItemRefund" :orderId="this.orderDetail.id" :shop="this.shop" @close="hideRefundModal()"></OrderRefundModal>
        <!-- <OrderUpdateModal :order="selectedOrderUpdate"></OrderUpdateModal> -->
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Inertia } from '@inertiajs/inertia';
import Tag from 'primevue/tag';
import Swal from 'sweetalert2';
import moment from 'moment';
import Timeline from 'primevue/timeline';
import OrderUpdateModal from '@/Components/Order/OrderUpdateModal.vue';
import OrderRefundModal from '@/Components/Order/OrderRefundModal.vue';




export default {
    data() {
        return {
            orderDetail: this.order,
            orderProducts: this.products,
            customer: this.order.customer,
            hoverCustomerFullName: false,
            hoverCustomerContact: false,
            hoverShippingAddress: false,
            hoverBillingAddress: false,
            events: this.events,
            shop: this.shop,
            isRefundModalShown: false,
            lineItemRefund: null
        }
    },
    props: {
        order: {
            type: Object,
            default: () => null
        },
        products: {
            type: Array,
            default: () => []
        },
        errors: {
            type: [Array, Object],
            default: () => []
        },
        events: {
            type: Array,
            default: () => []
        },
        shop: {
            type: Object,
            default: () => null
        }
    },
    components: {
        DataTable,
        Column,
        Tag,
        Timeline,
        OrderRefundModal
    },
    computed: {
        retrieveAllQuantity() {
            let totalQuantity = 0;
            if (Array.isArray(this.orderDetail.line_items)) {
                this.orderDetail.line_items.forEach(item => {
                    if (item.quantity) {
                        totalQuantity += item.quantity;
                    }
                });
            }
            return totalQuantity;
        }
        ,
        hasShippingAddress(){
            return this.order.shipping_address != null;
        },
        shippingAddressLines() {
            const address = this.order && this.order.shipping_address;
            if (!address) return [];

            let lines = [];

            // Adding name
            if (address.name) {
                lines.push(address.name);
            }

            // Adding company name if exists
            if (address.company) {
                lines.push(address.company);
            }

            // Adding the first and second line of the address
            let addressLine = '';
            if (address.address1) {
                addressLine += address.address1;
            }
            if (address.address2) {
                addressLine += (addressLine ? ', ' : '') + address.address2;
            }
            if (addressLine) {
                lines.push(addressLine);
            }

            // Adding city, province, and zip
            let cityLine = '';
            if (address.city) {
                cityLine += address.city;
            }
            if (address.province_code) {
                cityLine += (cityLine ? ' ' : '') + address.province_code;
            }
            if (address.zip) {
                cityLine += (cityLine ? ' ' : '') + address.zip;
            }
            if (cityLine) {
                lines.push(cityLine);
            }

            // Adding country if it exists
            if (address.country) {
                lines.push(address.country);
            }

            return lines;
        },
        billingAddressLines() {
            const address = this.order && this.order.billing_address;
            if (!address) return [];

            let lines = [];

            // Adding name
            if (address.name) {
                lines.push(address.name);
            }

            // Adding company name if exists
            if (address.company) {
                lines.push(address.company);
            }

            // Adding the first and second line of the address
            let addressLine = '';
            if (address.address1) {
                addressLine += address.address1;
            }
            if (address.address2) {
                addressLine += (addressLine ? ', ' : '') + address.address2;
            }
            if (addressLine) {
                lines.push(addressLine);
            }

            // Adding city and zip
            let cityLine = '';
            if (address.city) {
                cityLine += address.city;
            }
            if (address.zip) {
                cityLine += (cityLine ? ' ' : '') + address.zip;
            }
            if (cityLine) {
                lines.push(cityLine);
            }

            // Adding country if it exists
            if (address.country) {
                lines.push(address.country);
            }

            return lines;
        },
        customerFullName() {
            if (this.customer) {
                let fullName = '';
                if (this.customer.first_name) {
                    fullName += this.customer.first_name;
                }
                if (this.customer.last_name) {
                    if (fullName.length > 0) {
                        fullName += ' '; // Add a space if first name is also there
                    }
                    fullName += this.customer.last_name;
                }
                return fullName;
            }
            return '';
        },
        customerInitials() {
            if (this.customer && (this.customer.first_name || this.customer.last_name)) {
                let initials = '';
                if (this.customer.first_name) {
                    initials += this.customer.first_name.charAt(0).toUpperCase();
                }
                if (this.customer.last_name) {
                    initials += this.customer.last_name.charAt(0).toUpperCase();
                }
                return initials;
            }
            return '';
        },
        showSubtotal() {
            return this.orderDetail !== null &&
                this.orderDetail.subtotal_price_set !== null &&
                this.orderDetail.subtotal_price_set.presentment_money !== null;
        },
    },
    methods: {
        canBeFullyRefunded(){
            return this.orderDetail.refunds.length == 0;
        },
        fullRefund(){
            let shopId = localStorage.getItem('selectedStore');

            var refundData = {
                refundAmount: this.orderDetail.total_price,
                orderId: this.orderDetail.id,
                shopId:  shopId,
                lineItems: this.orderDetail.line_items
            }
            console.log(refundData);

            this.openFullRefundModal(refundData);

        },
        fetchUpdatedOrderDetails() {
            let orderId = this.orderDetail.id;

            // Call the API to fetch updated order details
            
            let shopId = localStorage.getItem('selectedStore');
            
            this.navigateWithInertiaEvents(`/order?order_id=${orderId}&shop_id=${shopId}`, {
                onStart: () => {
                    this.showLoadingAlert();
                },
                onFinish: () => {
                    this.closeLoadingAlert();
                }
            });
        },
        updateOrderDetails(orderDetails) {
            this.orderDetail = orderDetails; // Update orderDetails with the updated data
        },
        canBeRefunded(line_item){
            let ret = "<span class='badge bg-danger' @click='refundItem(line_item)'>Refund</span>";
            let forRefund = true;
            if(this.orderDetail.refunds.length == 0){
                ret = '<span class="badge bg-danger" @click="refundItem(line_item)">Refund</span>';
                forRefund = true;
            }else if(this.orderDetail.refunds.length == this.orderDetail.line_items.length){
                ret = '<span class="badge bg-success">Refunded</span>';
                forRefund = false;
            }else{
                const allRefundItems = this.orderDetail.refunds.flatMap(refund => refund.refund_line_items);

                const isRefunded = allRefundItems.some(refundItem => refundItem.line_item_id === line_item.id);
                if(isRefunded){
                    forRefund = false;
                    ret = '<span class="badge bg-success">Refunded</span>';
                }else{
                    forRefund = true;
                    `<span class='badge bg-danger' @click="refundItem(${JSON.stringify(line_item)})">Refund</span>`;
                }
            }
            
            // this.orderDetail.refunds
            // console.log(line_item.id)
            // console.log(this.orderDetail.refunds)
            // console.log(isRefunded)

            return forRefund;
            // this.lineItemRefund = line_item
        },
        isRefunded(line_item){
            let refunded = false;
            if(this.orderDetail.refunds.length == 0){
                refunded = false;
            }else if(this.orderDetail.refunds.length == this.orderDetail.line_items.length){
                refunded = true;
            }else{
                const allRefundItems = this.orderDetail.refunds.flatMap(refund => refund.refund_line_items);

                const isRefunded = allRefundItems.some(refundItem => refundItem.line_item_id === line_item.id);
                if(isRefunded){
                    refunded = true;
                }else{
                    refunded = false;
                }
            }
            return refunded;
        },
        refundItem(line_item){
            console.log(line_item)
            this.lineItemRefund = line_item
        },
        showRefundModal(){
            this.isRefundModalShown = true;
        },
        hideRefundModal(){
            this.isRefundModalShown = false;
            this.lineItemRefund = null;
            // this.
        },
        formatGatewayName(gatewayName) {
            if (!gatewayName || typeof gatewayName !== 'string') return '';
            return gatewayName.charAt(0).toUpperCase() + gatewayName.slice(1).toLowerCase();
        },
        formatDate(dateTimeStr) {
            if (!dateTimeStr) return 'N/A';
            return moment(dateTimeStr).format('MMMM D, YYYY h:mm A');
        },
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
        },
        navigateWithInertiaEventsWithShop(url, shop_id, { onStart = () => { }, onFinish = () => { } } = {}) {
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

            // var fullUrl = url+'?shop='+shop_id;
            var fullUrl = url+'/'+shop_id;
            Inertia.visit(fullUrl);
        },
        gotoAllCustomers() {
            this.navigateWithInertiaEvents(`/customers`, {
                onStart: () => {
                    this.showLoadingAlert();
                },
                onFinish: () => {
                    this.closeLoadingAlert();
                }
            });
        },
        gotoShopify() {
            this.showLoadingAlert();
            setTimeout(() => {
                this.closeLoadingAlert();
                window.open(this.orderDetail.order_status_url, '_blank');
            }, 1000);

        },
        gotoAllOrders() {
            var shopId = localStorage.getItem('selectedStore');

            this.navigateWithInertiaEventsWithShop
                (`/orders`, shopId, {
                    onStart: () => {
                        this.showLoadingAlert();
                    },
                    onFinish: () => {
                        this.closeLoadingAlert();
                    }
                });
        },
        goToCustomerPage(customerId) {
            var shopId = localStorage.getItem('selectedStore');
            this.navigateWithInertiaEvents(`/customer/${customerId}/${shopId}`, {
                onStart: () => {
                    this.showLoadingAlert();
                },
                onFinish: () => {
                    this.closeLoadingAlert();
                }
            });
        },
        getProductImage(productItem) {
            var orderProduct = this.retrieveOrderProductVariant(productItem);
            if (orderProduct && orderProduct.variant.image_id && orderProduct.product.images) {
                let image = orderProduct.product.images.find(img => img.id === orderProduct.variant.image_id);
                return image ? image.src : null;
            } else if (orderProduct && orderProduct.product.image) {
                return orderProduct.product.image.src;
            }
            return null;
        },
        getProductPrice(productItem) {
            var currencyAmount = productItem && productItem.price_set && productItem.price_set.presentment_money;
            if (currencyAmount && currencyAmount.amount != null && currencyAmount.currency_code != null) {
                return currencyAmount.currency_code + " " + currencyAmount.amount;
            }
            return null;
        },
        getProductSubTotal() {
            var subtotalAmount = this.orderDetail && this.orderDetail.subtotal_price_set && this.orderDetail.subtotal_price_set.presentment_money;
            if (subtotalAmount && subtotalAmount.amount != null && subtotalAmount.currency_code != null) {
                return subtotalAmount.currency_code + " " + subtotalAmount.amount;
            }
            return "N/A";
        },
        getProductTotal() {
            var totalAmount = this.orderDetail && this.orderDetail.total_price_set && this.orderDetail.total_price_set.presentment_money;
            if (totalAmount && totalAmount.amount != null && totalAmount.currency_code != null) {
                return totalAmount.currency_code + " " + totalAmount.amount;
            }
            return "N/A";
        },
        getProductVendor(productItem) {

        },
        getProductVariant(productItem) {

        },
        retrieveOrderProductVariant(productItem) {
            let productId = productItem.product_id;
            let orderProducts = this.orderProducts;

            for (let item of orderProducts) {
                if (item.product.id === productId) {
                    return item;
                }
            }

            return null;
        },
        copyToClipboard(textToCopy) {
            if (navigator.clipboard) {
                // Use Clipboard API when available
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        console.log('Text copied to clipboard:', textToCopy);
                        // Optionally, show a success message to the user
                    })
                    .catch(err => {
                        console.error('Failed to copy text:', err);
                        // Optionally, handle errors (e.g., show an error message)
                    });
            } else {
                // Fallback for browsers without Clipboard API support
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                // Optionally, show a success message to the user
                console.log('Text copied to clipboard:', textToCopy);
            }
        },
        getFulfillmentStatusClass(status) {
            const statusClassMap = {
                fulfilled: 'bg-success',
                partial: 'bg-warning',
                // Add other status to class mappings as needed
            };
            return statusClassMap[status] || 'bg-primary';
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
        getEventVerb(verb){
            var verbName = ""
            switch(verb){
                case "placed" : 
                    verbName = "Placed";
                    break;
                case "confirmation_number_generated" :
                    verbName = "Confirmation Number Generated";
                    break;
                case "sale_success" :
                    verbName = "Paid";
                    break;
                case "mail_sent" :
                    verbName = "Mail Sent";
                    break;
                case "note_created" :
                    verbName = "Added Note";
                    break;
                case "note_updated" :
                    verbName = "Updated Note";
                    break;
                case "comment" :
                    verbName = "Added Comment";
                    break;
                case "confirmed" :
                    verbName = "Confirmed";
                    break;
                case "fulfillment_success" :
                    verbName = "Fulfilled";
                    break;
                case "closed" :
                    verbName = "Closed";
                    break;
                case "re_opened" :
                    verbName = "Reopened";
                    break;
                case "refund_success" :
                    verbName = "Refunded";
                    break;
                default:
                    verbName = verbName;
            }
            return verbName;
        },
        checkLinkRefs(message){
            var draftOrderMatch = message.includes('<a');

            return ;
        },
        openFullRefundModal(refundData) {
            Swal.fire({
                title: 'Why do you want to refund this order?',
                input: 'textarea',
                // inputValue: this.order.note,
                inputPlaceholder: 'Order did not arrive.',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                confirmButtonColor: '#6576ff',
                cancelButtonText: 'Cancel',
                showLoaderOnConfirm: true,
                preConfirm: (reason) => {
                    // You can perform validation or any other actions here
                    if(reason == ""){
                        Swal.showValidationMessage('No reason made.');
                    }else{
                        refundData['reason'] = 'Full Refund: ' + reason;
                        // Make a POST request using Inertia
                        Inertia.post('/order/full-refund', refundData, {
                            onStart: () => {
                                this.showLoadingAlert();
                            },
                            onSuccess: (page) => {
                                this.$emit('close');
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Success!',
                                    text: "Refund details added successfully!",
                                });
                            },
                            onError: errors => {
                                this.$emit('close');
                                console.log(errors)
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: errors.email || errors.password,
                                });
                            },
                            onFinish: () =>{
                            console.log('finish')
                            this.fetchUpdatedOrderDetails()
                            }
                        });
                    }
                }
            });
        },
        openAddNoteModal() {
            Swal.fire({
                title: 'Enter your note',
                input: 'text',
                inputValue: this.order.note,
                inputPlaceholder: 'Enter your note',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                confirmButtonColor: '#6576ff',
                cancelButtonText: 'Cancel',
                showLoaderOnConfirm: true,
                preConfirm: (note) => {
                // You can perform validation or any other actions here
                if(this.order.note == note){
                    Swal.showValidationMessage('No changes made.');
                }else{
                    var shopId = localStorage.getItem('selectedStore');
                    return axios.put('/order/update-note', { 
                        order_id: this.order.id,
                        shop_id: shopId   ,
                        note
                        })
                        .then(response => {
                            if (!response.data.success) {
                                throw new Error(response.data.message || 'Failed to add note');
                            }
                            this.order.note = note;
                            return response.data;
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Request failed: ${error}`);
                        });
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                const note = result.value;
                Swal.fire({
                    icon: 'success',
                    title: 'Note updated successfully!',
                    confirmButtonText: 'Ok'
                });
                }
            }).catch(error => {
                Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                });
            });
        },
        openDeleteModal(){
            Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to delete this note. This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    var note = '';
                    var shopId = localStorage.getItem('selectedStore');
                    return axios.put('/order/update-note', { 
                        order_id: this.order.id,
                        shop_id: shopId,
                        note
                        })
                        .then(response => {
                            if (!response.data.success) {
                                throw new Error(response.data.message || 'Failed to add note');
                            }
                            this.order.note = note;
                            Swal.fire({
                                icon: 'success',
                                title: 'Note deleted successfully!',
                                confirmButtonText: 'Ok'
                            });
                            return response.data;
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Request failed: ${error}`);
                        });
                    }
                });
        }
    }
}
</script>

<style scoped>
.label {
    font-weight: bold;
    margin-right: 5px;
}

.value {
    font-size: 0.95em;
    /* Adjust the font size to your liking */
}

.title {
    font-size: 1.1em;
    /* Slightly larger title for refund sections */
}

.refund-detail {
    border-bottom: 1px solid #eee;
    /* Optional: adds a subtle line between refunds */
    padding-bottom: 10px;
    /* Adds some spacing at the bottom of each refund detail */
    margin-bottom: 10px;
    /* Adds spacing between refund detail sections */
}

.nk-block-scrollable {
  min-height: 800px; /* Set your desired minimum height */
  max-height: 800px; /* Set your desired maximum height */
  overflow-y: auto; /* Enables vertical scrolling if content exceeds max-height */
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  margin-bottom: 1rem;
}

.timeline-item-content {
  flex: 1;
}

.timeline-item-left,
.timeline-item-right {
  position: relative;
}

.timeline-item-left {
  width: 200px;
}

::v-deep(.p-timeline-event-opposite) {
    flex: none;
}


</style>
