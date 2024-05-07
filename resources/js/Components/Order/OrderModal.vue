<template>
    <Dialog v-model:visible="isVisible" modal @update:visible="handleVisibilityChange">
        <div class="modal-body modal-body-md">
            <div class="nk-modal-head mb-3 mb-sm-4">
                <h4 class="nk-modal-title title">Order <small class="text-primary">{{ order.name }}</small></h4>
            </div>
            <div class="nk-block">
                <div class="nk-block-between flex-wrap g-3 pb-1">
                    <div class="nk-tnx">
                        <!-- <div class="nk-tnx-type-badge mr-2">
                            <span
                                class="nk-tnx-type-icon bg-warning-dim text-warning icon ni ni-arrow-up-right"></span><span
                                class="nk-tnx-type-icon text-secondary icon ni ni-paypal-alt"></span>
                        </div> -->
                        <div class="nk-tnx-text">
                            <h5 class="title">{{ formatTotalPriceWithCurrency }}</h5>
                            <span class="sub-text mt-n1">{{ this.order.formattedCreatedDate }}</span>
                        </div>
                    </div>
                    <ul class="align-center flex-wrap gx-3">
                        <li>
                            <span class="badge badge-md bg-primary">{{ this.order.formattedFulfillmentStatus }}</span>
                        </li>
                    </ul>
                </div>
                <div class="divider md stretched"></div>
                <h6 class="title">Order Details</h6>
                <div class="row gy-1">
                    <div class="col-md-6">
                        <span class="sub-text">Confirmation Number</span>
                        <span class="caption-text text-break">{{ formatConfirmationNumber }}</span>
                    </div>
                    <div class="col-md-6">
                        <span class="sub-text">Financial Status</span>
                        <span class="caption-text text-break">{{ this.order.formattedFinancialStatus }}</span>
                    </div>
                    <div class="col-md-6">
                        <span class="sub-text">Fulfillment Status</span>
                        <span class="caption-text text-break">{{ this.order.formattedFulfillmentStatus }}</span>
                    </div>
                    <div class="col-md-6">
                        <span class="sub-text">Order Date</span>
                        <span class="caption-text text-break">{{ formatOrderDate }}</span>
                    </div>
                    <div class="col-md-6">
                        <span class="sub-text">Placed By</span>
                        <span class="caption-text">
                            {{ formatCustomerID }}
                            <span class="small text-soft nk-tooltip" :title="formatCustomerFullNameWithEmail"
                                :data-original-title="formatCustomerFullNameWithEmail"><em
                                    class="icon ni ni-info-fill"></em></span>
                        </span>
                    </div>
                    <div class="col-md-6">
                        <span class="sub-text">Payment Gateway</span>
                        <span class="caption-text align-center">{{ formatPaymentGateways }}
                        </span>
                    </div>
                </div>
                <div class="divider md stretched"></div>
                <h6 class="title">Ordered Product/s Details</h6>
                <div class="row gy-2">
                    <DataTable :value="order.line_items" sortMode="multiple" removableSort paginator :rows="5"
                        :rowsPerPageOptions="[5, 10, 20, 50]" style="min-height: 300px;" selectionMode="multiple">
                        <template #empty> No products found. </template>
                        <Column field="title" header="Name" sortable></Column>
                        <Column field="variant_title" header="Variant" sortable></Column>
                        <Column field="vendor" header="Vendor" sortable></Column>
                        <Column field="price" header="Price" sortable></Column>
                        <Column field="grams" header="Grams" sortable></Column>
                        <Column field="quantity" header="Quantity" sortable></Column>
                    </DataTable>
                </div>
                <div class="divider md stretched"></div>
                <h6 class="title">Additional Details</h6>
                <div class="row gy-3">
                    <div class="col-lg-6">
                        <span class="sub-text">Shipping Address</span>
                        <span class="caption-text align-center">{{ formatAddress(this.order.shipping_address) }}</span>
                    </div>
                    <div class="col-lg-6">
                        <span class="sub-text">Billing Address</span>
                        <span class="caption-text align-center">{{ formatAddress(this.order.billing_address) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>
  
<script>
import moment from 'moment';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';

export default {
    mounted() {
    },
    props: {
        visible: Boolean,
        order: {
            type: [Array, Object],
            default: () => []
        }
    },
    components: {
        Dialog,
        DataTable
    },
    data() {
        return {
            isVisible: this.visible,
        };
    },
    methods: {
        handleVisibilityChange(value) {
            this.isVisible = value;
            if (!value) {
                this.$emit('close'); // Emit an event when the modal is closed
            }
        },
        formatAddress(address) {
            let formattedAddress = '';
            if (address.first_name && address.last_name) {
                formattedAddress += `${address.first_name} ${address.last_name}\n`;
            }
            if (address.company) {
                formattedAddress += `${address.company}\n`;
            }
            if (address.address1) {
                formattedAddress += `${address.address1}\n`;
            }
            if (address.city || address.zip) {
                formattedAddress += `${address.city ? address.city + ' ' : ''}${address.zip ? address.zip : ''}\n`;
            }
            if (address.country) {
                formattedAddress += `${address.country}`;
            }

            return formattedAddress.trim(); // Trim to remove any trailing newlines
        }
    },
    watch: {
        visible(newVal) {
            this.isVisible = newVal;
        }
    },
    computed: {
        formatTotalPriceWithCurrency() {
            return this.order.total_price && this.order.currency ? `${this.order.total_price} ${this.order.currency}` : 'N/A';
        },
        formatOrderDate() {
            return this.order.created_at ? moment(this.order.created_at).format('MMM D, YYYY') : 'N/A';
        },
        formatCustomerID() {
            return this.order.customer && this.order.customer.id ? this.order.customer.id : 'N/A';
        },
        formatCustomerFullNameWithEmail() {
            return this.order.formattedCustomerName && this.order.customer && this.order.customer.email ? `${this.order.formattedCustomerName} (${this.order.customer.email})` : 'N/A';
        },
        formatConfirmationNumber() {
            return this.order.confirmation_number ? this.order.confirmation_number : 'N/A';
        },
        formatPaymentGateways() {
            if (Array.isArray(this.order.payment_gateway_names) && this.order.payment_gateway_names.length > 0) {
                return this.order.payment_gateway_names.map(gateway => {
                    return gateway.charAt(0).toUpperCase() + gateway.slice(1);
                }).join(', ');
            }
            return 'N/A';
        }
    }
};
</script>
  