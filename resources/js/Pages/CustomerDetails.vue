<template>
    <div class="nk-content ">
        <div class="container">
            <div class="nk-content-inner">
                <div class="nk-content-body">
                    <div class="nk-block-head nk-block-head-sm">
                        <div class="nk-block-between g-3">
                            <div class="nk-block-head-content">
                                <h4>{{ this.shop.shopify_name }}</h4>
                            </div>
                            <nav>
                                    <ul class="breadcrumb breadcrumb-arrow">
                                        <li class="breadcrumb-item"><a href="#" @click="gotoAllCustomers()">Home</a></li>
                                        <li class="breadcrumb-item"><a href="#" @click="gotoAllCustomers()">Customers</a>
                                        </li>
                                        <li class="breadcrumb-item active">{{ fullName || "Customer Details" }}</li>
                                    </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="nk-block">
                        <div class="row g-gs">
                            <div class="col-lg-4 col-xl-4 col-xxl-3">
                                <div class="card">
                                    <div class="card-inner-group">
                                        <div class="card-inner">
                                            <div class="user-card user-card-s2">
                                                <div class="user-avatar lg bg-primary">
                                                    <span>{{ getInitials }}</span>
                                                </div>
                                                <div class="user-info" @mouseover="hoverCustomerName = true"
                                                    @mouseleave="hoverCustomerName = false">
                                                    <h5>{{ fullName }}
                                                        <a href="#" v-if="hoverCustomerName"
                                                            @click.prevent="copyToClipboard(fullName)"
                                                            class="btn btn-icon btn-trigger btn-tooltip"
                                                            aria-label="Copy Full Name"
                                                            data-bs-original-title="Copy Full Name">
                                                            <em class="icon ni ni-copy"></em>
                                                        </a>
                                                    </h5>
                                                    <span class="sub-text" @mouseover.stop="hoverCustomerEmail = true"
                                                        @mouseleave.stop="hoverCustomerEmail = false">
                                                        {{ this.customerDetails.email }}
                                                        <a href="#" v-if="hoverCustomerEmail"
                                                            @click.prevent="copyToClipboard(this.customerDetails.email)"
                                                            class="btn btn-icon btn-trigger btn-tooltip"
                                                            aria-label="Copy Email" data-bs-original-title="Copy Email">
                                                            <em class="icon ni ni-copy"></em>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="card-inner card-inner-sm">
                                            <ul class="btn-toolbar justify-center gx-1">
                                                <li><a href="#" class="btn btn-trigger btn-icon"><em
                                                            class="icon ni ni-shield-off"></em></a></li>
                                                <li><a href="#" class="btn btn-trigger btn-icon"><em
                                                            class="icon ni ni-mail"></em></a></li>
                                                <li><a href="#" class="btn btn-trigger btn-icon"><em
                                                            class="icon ni ni-bookmark"></em></a></li>
                                                <li><a href="#" class="btn btn-trigger btn-icon text-danger"><em
                                                            class="icon ni ni-na"></em></a></li>
                                            </ul>
                                        </div> -->
                                        <div class="card-inner">
                                            <div class="row text-center">
                                                <div class="col-6">
                                                    <div class="profile-stats"><span class="amount">{{
                                                        this.customerDetails.orders_count }}</span><span
                                                            class="sub-text">Total Orders</span></div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="profile-stats"><span class="amount">{{
                                                        this.customerDetails.currency + " "
                                                        + this.customerDetails.total_spent }}</span><span
                                                            class="sub-text">Total Spent</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-inner">
                                            <h6 class="overline-title mb-2">Short Details</h6>
                                            <div class="row g-3">
                                                <div class="col-sm-6 col-md-4 col-lg-12" @mouseover="hoverCustomerId = true"
                                                    @mouseleave="hoverCustomerId = false">
                                                    <span class="sub-text">User ID:</span>
                                                    <span>{{ extractedCustomerId }}</span>
                                                    <a href="#" v-if="hoverCustomerId"
                                                        @click.prevent="copyToClipboard(extractedCustomerId)"
                                                        class="btn btn-icon btn-trigger btn-tooltip"
                                                        aria-label="Copy Customer ID"
                                                        data-bs-original-title="Copy Customer ID">
                                                        <em class="icon ni ni-copy"></em>
                                                    </a>
                                                </div>
                                                <div class="col-sm-6 col-md-4 col-lg-12"
                                                    @mouseover="hoverBillingEmail = true"
                                                    @mouseleave="hoverBillingEmail = false"><span class="sub-text">Billing
                                                        Email:</span><span>{{ this.customerDetails.email }}</span>
                                                    <a href="#" v-if="hoverBillingEmail"
                                                        @click.prevent="copyToClipboard(this.customerDetails.email)"
                                                        class="btn btn-icon btn-trigger btn-tooltip"
                                                        aria-label="Copy Billing Email"
                                                        data-bs-original-title="Copy Billing Email">
                                                        <em class="icon ni ni-copy"></em>
                                                    </a>
                                                </div>
                                                <div class="col-sm-6 col-md-4 col-lg-12"
                                                    @mouseover="hoverBillingAddress = true"
                                                    @mouseleave="hoverBillingAddress = false"><span class="sub-text">Billing
                                                        Address:</span><span>{{ customerAddress }}</span>
                                                    <a href="#" v-if="hoverBillingAddress"
                                                        @click.prevent="copyToClipboard(customerAddress)"
                                                        class="btn btn-icon btn-trigger btn-tooltip"
                                                        aria-label="Copy Billing Address"
                                                        data-bs-original-title="Copy Billing Address">
                                                        <em class="icon ni ni-copy"></em>
                                                    </a>
                                                </div>
                                                <div class="col-sm-6 col-md-4 col-lg-12"
                                                    @mouseover="hoverPhoneNumber = true"
                                                    @mouseleave="hoverPhoneNumber = false"><span class="sub-text">Phone
                                                        Number:</span><span>{{ this.customerDetails.phone }}</span><a
                                                        href="#" v-if="hoverPhoneNumber"
                                                        @click.prevent="copyToClipboard(this.customerDetails.phone)"
                                                        class="btn btn-icon btn-trigger btn-tooltip"
                                                        aria-label="Copy Phone Number"
                                                        data-bs-original-title="Copy Phone Number">
                                                        <em class="icon ni ni-copy"></em>
                                                    </a></div>
                                                <div class="col-sm-6 col-md-4 col-lg-12"><span class="sub-text">Last
                                                        Login:</span><span>15 Feb, 2019 01:02 PM</span></div>
                                                <div class="col-sm-6 col-md-4 col-lg-12">
                                                    <span class="sub-text">Email Verification Status</span>
                                                    <span :class="emailVerificationStatus.class" class="lead-text">{{
                                                        emailVerificationStatus.text }}</span>
                                                </div>

                                                <div class="col-sm-6 col-md-4 col-lg-12"><span class="sub-text">Created
                                                        At:</span><span>{{ formattedDate }}</span></div>
                                            </div>
                                        </div>
                                        <div class="card-inner">
                                            <h6 class="overline-title mb-2">Notes</h6>
                                            <div class="nk-block">
                                                <div class="nk-block-head nk-block-head-sm nk-block-between">
                                                    <h5 class="title"></h5><a href="#" class="link link-sm" @click.prevent="openAddNoteModal">+ Add
                                                        Note</a>
                                                </div>
                                                <div class="bq-note">
                                                    <div class="bq-note-item">
                                                        <div class="bq-note-text">
                                                            <p> {{ this.customerDetails.note }} </p>
                                                        </div>
                                                        <div class="bq-note-meta"><a href="#" @click.prevent="openDeleteModal"
                                                                class="link link-sm link-danger">Delete Note</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8 col-xl-8 col-xxl-9">
                                <div class="card">
                                    <div class="card-inner card-min-height">
                                        <div class="nk-block">
                                            <div class="overline-title-alt mb-2 mt-2">Total Spent</div>
                                            <div class="profile-balance d-flex justify-content-between align-items-center">
                                                <div class="profile-balance-group gx-4">
                                                    <div class="profile-balance-sub">
                                                        <div class="profile-balance-amount">
                                                            <div class="number">{{ this.customerDetails.total_spent }}
                                                                <small class="currency currency-usd">{{ this.customerDetails.currency }}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="add-button">
                                                    <a href="#" class="btn-add btn btn-icon btn-primary float-end" @click.prevent="goToCreateOrder"> <em class="icon ni ni-plus"></em></a>                                                </div>
                                            </div>
                                        </div>
                                        <div class="nk-block">
                                            <order-content :orders="customerOrders" :shop="storeId" :customer="customerDetails"
                                                @updated="handleUpdate" :key="orderContentKey" :countries="this.countries"></order-content>
                                        </div>
                                        <!-- <div class="nk-block">
                                            <h6 class="lead-text mb-3">Payment Methods</h6>
                                            <div class="row g-3">
                                                <div class="col-xl-12 col-xxl-6">
                                                    <div class="card">
                                                        <div class="card-inner">
                                                            <div class="d-flex align-items-center justify-content-between">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="icon-circle icon-circle-lg"><em
                                                                            class="icon ni ni-visa"></em></div>
                                                                    <div class="ms-3">
                                                                        <h6 class="lead-text">Visa Card <span
                                                                                class="text-soft ml-1">**** 1955</span></h6>
                                                                        <span class="sub-text">Expires Nov 2023</span>
                                                                    </div>
                                                                </div>
                                                                <ul
                                                                    class="btn-toolbar justify-center gx-1 me-n1 flex-nowrap">
                                                                    <li><a href="#" class="btn btn-trigger btn-icon"><em
                                                                                class="icon ni ni-edit"></em></a></li>
                                                                    <li><a href="#" class="btn btn-trigger btn-icon"><em
                                                                                class="icon ni ni-trash"></em></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-12 col-xxl-6">
                                                    <div class="card">
                                                        <div class="card-inner">
                                                            <div class="d-flex align-items-center justify-content-between">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="icon-circle icon-circle-lg bg-indigo"><em
                                                                            class="icon ni ni-american-express"></em></div>
                                                                    <div class="ms-3">
                                                                        <h6 class="lead-text">American Express <span
                                                                                class="text-soft ml-1">**** 4352</span></h6>
                                                                        <span class="sub-text">Expires Feb 2024</span>
                                                                    </div>
                                                                </div>
                                                                <ul
                                                                    class="btn-toolbar justify-center gx-1 me-n1 flex-nowrap">
                                                                    <li><a href="#" class="btn btn-trigger btn-icon"><em
                                                                                class="icon ni ni-edit"></em></a></li>
                                                                    <li><a href="#" class="btn btn-trigger btn-icon"><em
                                                                                class="icon ni ni-trash"></em></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-12 col-xxl-6">
                                                    <div class="card">
                                                        <div class="card-inner">
                                                            <div class="d-flex align-items-center justify-content-between">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="icon-circle icon-circle-lg bg-orange"><em
                                                                            class="icon ni ni-mc"></em></div>
                                                                    <div class="ms-3">
                                                                        <h6 class="lead-text">Mastercard <span
                                                                                class="text-soft ml-1">**** 9478</span></h6>
                                                                        <span class="sub-text text-danger">Expired</span>
                                                                    </div>
                                                                </div>
                                                                <ul
                                                                    class="btn-toolbar justify-center gx-1 me-n1 flex-nowrap">
                                                                    <li><a href="#" class="btn btn-trigger btn-icon"><em
                                                                                class="icon ni ni-edit"></em></a></li>
                                                                    <li><a href="#" class="btn btn-trigger btn-icon"><em
                                                                                class="icon ni ni-trash"></em></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-12 col-xxl-6"><button
                                                        class="h-100 w-100 bg-white card round-sm p-4 d-flex align-items-center justify-content-center"
                                                        data-bs-toggle="modal" data-bs-target="#add-card"><span
                                                            class="text-soft">Add New Card</span></button></div>
                                            </div>
                                        </div> -->
                                        <!-- <div class="nk-block">
                                            <h6 class="lead-text">Connect to Facebook</h6>
                                            <div class="card">
                                                <div class="card-inner">
                                                    <div class="between-center flex-wrap flex-md-nowrap g-3">
                                                        <div class="media media-center gx-3 wide-xs">
                                                            <div class="media-object"><em
                                                                    class="icon icon-circle icon-circle-lg ni ni-facebook-f"></em>
                                                            </div>
                                                            <div class="media-content">
                                                                <p>You have successfully connected with your facebook
                                                                    account, you can easily log in using your account too.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div class="nk-block-actions flex-shrink-0"><a href="#"
                                                                class="btn btn-lg btn-danger">Revoke Access</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 class="lead-text">Connect to Google</h6>
                                            <div class="card">
                                                <div class="card-inner">
                                                    <div class="between-center flex-wrap flex-md-nowrap g-3">
                                                        <div class="media media-center gx-3 wide-xs">
                                                            <div class="media-object"><em
                                                                    class="icon icon-circle icon-circle-lg ni ni-google"></em>
                                                            </div>
                                                            <div class="media-content">
                                                                <p>You can connect with your google account. <em
                                                                        class="d-block text-soft">Not connected yet</em></p>
                                                            </div>
                                                        </div>
                                                        <div class="nk-block-actions flex-shrink-0"><a href="#"
                                                                class="btn btn-lg btn-dim btn-primary">Connect</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nk-block-head nk-block-head-sm">
                                                <div class="nk-block-head-content">
                                                    <h6 class="nk-block-title">Import Contacts <a href="#"
                                                            class="link link-primary ms-auto">Import from Google</a></h6>
                                                    <div class="nk-block-des">
                                                        <p>You have not imported contacts from your mobile phone.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
            <CustomerUpdateModal v-if="selectedCustomerUpdate" :customer="selectedCustomerUpdate" @close="closeUpdateCustomer"></CustomerUpdateModal>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { Inertia } from '@inertiajs/inertia';
import OrderContent from '../Components/Order/OrderContent.vue';
import Swal from 'sweetalert2';
import Timeline from 'primevue/timeline';
import { integer } from '@vee-validate/rules';
import CustomerUpdateModal from '../Components/Customer/CustomerUpdateModal.vue';


export default {
    mounted() {
        this.store = localStorage.getItem('selectedStore');
    },
    computed: {
        fullName() {
            return `${this.customerDetails.first_name} ${this.customerDetails.last_name}`;
        },
        formattedDate() {
            return moment(this.customerDetails.created_at).format('MM-DD-YYYY hh:mmA');
        },
        extractedCustomerId() {
            return this.customerDetails.id;
        },
        emailVerificationStatus() {
            return this.customerDetails.verified_email
                ? { text: 'Verified', class: 'text-success' }
                : { text: 'Not Verified', class: 'text-warning' };
        },
        getInitials() {
            let firstInitial = this.customerDetails.first_name ? this.customerDetails.first_name.charAt(0) : '';
            let lastInitial = this.customerDetails.last_name ? this.customerDetails.last_name.charAt(0) : '';
            return firstInitial + lastInitial || '';
        },
        customerAddress() {
            let address = this.customerDetails.default_address ||
                (this.customerDetails.addresses && this.customerDetails.addresses[0]);

            if (!address) {
                return 'Address not available';
            }

            let formattedAddress = [];
            if (address.address1) formattedAddress.push(address.address1);
            if (address.address2) formattedAddress.push(address.address2);
            if (address.city) formattedAddress.push(address.city);
            if (address.province) formattedAddress.push(address.province);
            if (address.country) formattedAddress.push(address.country);
            if (address.zip) formattedAddress.push(address.zip);

            return formattedAddress.join(', ');
        },
    },
    watch: {}
    ,
    components: {
        OrderContent,
        Timeline
    },
    props: {
        customer: Object,
        orders: Array,
        shop: Object,
        events: Array,
        storeId: String,
        countries: Object,
        errors: {
            type: [Array, Object],
            default: () => []
        },
    }
    ,
    data() {
        return {
            hoverCustomerName: false,
            hoverCustomerEmail: false,
            hoverCustomerId: false,
            hoverBillingEmail: false,
            hoverPhoneNumber: false,
            hoverBillingAddress: false,
            customerDetails: this.customer,
            customerOrders: this.orders,
            shop: this.shop,
            events: this.events,
            storeId: this.storeId,
            countries: this.countries.countries,
            orderContentKey: 0,
            newNote: "",
            selectedCustomerUpdate: null
        };
    },
    methods: {
        updateCustomerDetails(customer){
          this.selectedCustomerUpdate = customer;
          console.log(this.selectedCustomerUpdate)
        },
        closeUpdateCustomer(){
          this.selectedCustomerUpdate = null;
        },
        goToCustomerDetails(customerId) {
            // Implement the logic to navigate to customer details
            console.log('Navigating to customer details for:', customerId);
            // You might use Vue Router or another method to navigate
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
        gotoAllCustomers() {
            this.navigateWithInertiaEvents('/customers', {
                onStart: () => {
                    this.showLoadingAlert();
                },
                onFinish: () => {
                    this.closeLoadingAlert();
                }
            });
        },
        handleUpdate() {
            this.componentKey += 1;
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
        formatDate(dateTimeStr) {
            if (!dateTimeStr) return 'N/A';
            return moment(dateTimeStr).format('MMMM D, YYYY h:mm A');
        },
        openAddNoteModal() {
            Swal.fire({
                title: 'Enter your note',
                input: 'textarea',
                inputValue: this.customerDetails.note,
                inputPlaceholder: 'Enter your note',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                confirmButtonColor: '#6576ff',
                cancelButtonText: 'Cancel',
                showLoaderOnConfirm: true,
                preConfirm: (note) => {
                // You can perform validation or any other actions here
                if(this.customerDetails.note == note){
                    Swal.showValidationMessage('No changes made.');
                }else{
                    return axios.put('/customer/update-note', { 
                        customer_id: this.customerDetails.id,
                        shop_id: this.storeId   ,
                        note
                        })
                        .then(response => {
                            if (!response.data.success) {
                                throw new Error(response.data.message || 'Failed to add note');
                            }
                            this.customerDetails.note = note;
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
        goToCreateOrder(){
            var shopId = localStorage.getItem('selectedStore');
            const url = '/order/create/'+shopId+'/'+this.customerDetails.id;

            this.navigateWithInertiaEvents(url, {
                onStart: () => {
                    this.showLoadingAlert();
                },
                onFinish: () => {
                    this.closeLoadingAlert();
                }
            });
        },
        async openDeleteModal(){
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to delete this note. This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            this.showLoadingAlert();
            var note = '';
            Inertia.put('/customer/update-note', {customer_id: this.customerDetails.id, shop_id: this.storeId, note},{
                onSuccess: (page) => {
                    // Assuming you want to update the note in the component state
                    this.customerDetails.note = note;
                    Swal.fire({
                        icon: 'success',
                        title: 'Note updated successfully!',
                        confirmButtonText: 'Ok'
                    });
                }
            },{
                onError: errors =>{
                    console.error('Error deleting customers:', errors);
                    this.closeLoadingAlert();
                    Swal.fire('Failed!', 'There was an error deleting the customers.', 'error');
                }
            });
        }
    }
}
</script>

<style scoped>
    .card-min-height{
        min-height: 1040.35px;
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