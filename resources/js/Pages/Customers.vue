<template>
    <Toast></Toast>
    <div class="nk-content">
        <div class="container">
            <div class="nk-content-inner">
                <div class="nk-content-body">
                    <div class="nk-block-head nk-block-head-sm">
                        <div class="nk-block-between g-3">
                            <div class="nk-block-head-content">
                                <h4>{{ this.shopName }}</h4>
                            </div><!-- .nk-block-head-content -->
                            <div class="nk-block-head-content">
                                <nav>
                                    <ul class="breadcrumb breadcrumb-arrow">
                                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                                        <li class="breadcrumb-item active">Customers</li>
                                    </ul>
                                </nav>
                            </div><!-- .nk-block-head-content -->
                        </div><!-- .nk-block-between -->
                    </div><!-- .nk-block-head -->
                    <div class="nk-block">
                        <div class="card card-bordered card-stretch">
                            <div class="card-inner-group">
                                <div></div>
                                <div class="card-inner position-relative card-tools-toggle">
                                    <div class="nk-block-des text-soft">
                                        <p>You have total {{ customerCount }} customers.</p>
                                    </div>
                                    <div class="card-tools">
                                        <!-- First Row of Search Inputs -->
                                        <div class="row gx-3 gy-2 align-items-center">
                                            <!-- Customer ID -->
                                            <div class="col-md-3">
                                                <div class="form-control-wrap">
                                                    <input type="text" class="form-control" placeholder="Customer ID"
                                                        v-model="search.customer_id">
                                                </div>
                                            </div>
                                            <!-- First Name -->
                                            <div class="col-md-3">
                                                <div class="form-control-wrap">
                                                    <input type="text" class="form-control" placeholder="First Name"
                                                        v-model="search.first_name">
                                                </div>
                                            </div>
                                            <!-- Last Name -->
                                            <div class="col-md-3">
                                                <div class="form-control-wrap">
                                                    <input type="text" class="form-control" placeholder="Last Name"
                                                        v-model="search.last_name">
                                                </div>
                                            </div>
                                            <!-- Phone Number -->
                                            <div class="col-md-3">
                                                <div class="form-control-wrap">
                                                    <input type="text" class="form-control" placeholder="Phone Number"
                                                        v-model="search.phone">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Second Row of Search Inputs -->
                                        <div class="row gx-3 gy-2 align-items-center mt-2">
                                            <!-- Email -->
                                            <div class="col-md-3">
                                                <div class="form-control-wrap">
                                                    <input type="email" class="form-control" placeholder="Email"
                                                        v-model="search.email">
                                                </div>
                                            </div>
                                            <!-- Postal Code -->
                                            <div class="col-md-3">
                                                <div class="form-control-wrap">
                                                    <input type="text" class="form-control" placeholder="Postal/Zip Code"
                                                        v-model="search.zip">
                                                </div>
                                            </div>
                                            <!-- State -->
                                            <div class="col-md-3">
                                                <div class="form-control-wrap">
                                                    <input type="text" class="form-control" placeholder="State"
                                                        v-model="search.province">
                                                </div>
                                            </div>
                                            <div class="col-md-3"></div>
                                            <div class="col-md-3">
                                                <div class="form-wrap w-150px">
                                                    <select class="form-select js-select2 js-select2-sm"
                                                        v-model="selectedAction" data-search="off"
                                                        data-placeholder="Select action">
                                                        <option value="default" disabled>Select action</option>
                                                        <option value="delete">Delete Customer</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="btn-wrap">
                                                    <span class="d-none d-md-block"><button
                                                            class="btn btn-dim btn-outline-light"
                                                            :disabled="!isAnyCustomerSelected"
                                                            @click="performSelectedAction">Apply</button></span>
                                                    <span class="d-md-none">
                                                        <button class="btn btn-dim btn-outline-light btn-icon"
                                                            :disabled="!isAnyCustomerSelected"
                                                            @click="performSelectedAction"><em
                                                                class="icon ni ni-arrow-right"></em></button>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-wrap w-150px">
                                                    <select class="form-select store-select js-select2 js-select2-sm"
                                                        v-model="selectedShop" data-search="off" @change="searchCustomers"
                                                        data-placeholder="Select Store">
                                                        <option v-for="store in storeOptions" :key="store.value" :value="store.value">
                                                            {{ store.label }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col d-flex justify-content-end">
                                                <div class="toggle-wrap nk-block-tools-toggle">
                                                <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1"
                                                    data-target="pageMenu"><em class="icon ni ni-menu-alt-r"></em></a>
                                                    <div class="toggle-expand-content" data-content="pageMenu">
                                                        <ul class="nk-block-tools g-3">
                                                            <!-- <li><a href="#" class="btn btn-white btn-outline-light"><em
                                                                    class="icon ni ni-download-cloud"></em><span>Export</span></a></li> -->
                                                            <li class="nk-block-tools-opt">
                                                                <div class="drodown">
                                                                    <a href="#" class="dropdown-toggle btn btn-icon btn-primary"
                                                                        data-bs-toggle="dropdown"><em class="icon ni ni-plus"></em></a>
                                                                    <div class="dropdown-menu dropdown-menu-end">
                                                                        <ul class="link-list-opt no-bdr">
                                                                            <li><a href="#" @click.prevent="toggleCustomerModal"><span>Add
                                                                                        Customer</span></a></li>
                                                                            <!-- <li><a href="#"><span>Import Booking</span></a></li> -->
                                                                        </ul>
                                                                    </div>
                                                                    <customer-modal :formSchema="customerSchema"
                                                                        :storeId ="this.selectedShop"
                                                                        :customer-data="editingCustomer"
                                                                        @customersUpdated="searchCustomers()"
                                                                        :show-customer-modal="showCustomerModal"
                                                                        @update:showCustomerModal="value => showCustomerModal = value" />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                &nbsp;
                                                <div class="btn-wrap mr-2">
                                                    <button class="btn btn-primary" @click="performSearch">
                                                        <em class="icon ni ni-search"></em> Search
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div><!-- .card-inner -->
                                <div class="card-inner p-0">
                                    <DataTable sortMode="multiple" v-model:selection="selectedCustomers" removableSort
                                        :value="displayedCustomers" paginator :rows="5"
                                        :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id" class="nk-tb-list nk-tb-ulist"
                                        :metaKeySelection="false" @row-click="onRowSelected"
                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="{first} to {last} of {totalRecords}">
                                        <template #empty> No customers found. </template>
                                        <Column selectionMode="multiple"></Column>
                                        <Column field="customer" header="Customer" sortable styleClass="nk-tb-col">
                                            <template #body="slotProps">
                                                <div class="user-card">
                                                    <div class="user-avatar bg-primary">
                                                        <span>{{ getInitials(slotProps.data.first_name,
                                                            slotProps.data.last_name) }}</span>
                                                    </div>
                                                    <div class="user-info">
                                                        <span class="tb-lead">{{ slotProps.data.first_name }} {{
                                                            slotProps.data.last_name }}</span>
                                                        <span>{{ slotProps.data.email }}</span>
                                                    </div>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column field="orders_count" header="Order Count" sortable
                                            styleClass="nk-tb-col tb-col-md"></Column>
                                        <Column field="address" header="Address" sortable styleClass="nk-tb-col tb-col-lg">
                                            <template #body="slotProps">
                                                {{ this.getAddress(slotProps.data) }}
                                            </template>
                                        </Column>
                                        <Column field="phone" header="Phone" styleClass="nk-tb-col tb-col-xxl"></Column>
                                        <Column field="created_at" header="Creation Date" sortable
                                            styleClass="nk-tb-col tb-col-lg"></Column>
                                            <Column field="user">
                                              <template #body="slotProps" class="nk-tb-item">
                                                  <div class="nk-tb-col nk-tb-col-tools" @mouseenter="hoverOrder = slotProps.data.id"
                                                      @mouseleave="hoverOrder = null">

                                                      <ul class="nk-tb-actions gx-1">
                                                          <li>
                                                              <div><a href="#" class=" btn btn-icon btn-trigger" @click.prevent="updateCustomerDetails(slotProps.data)">
                                                                <em class="icon ni ni-edit-alt" ></em></a>
                                                              </div>
                                                          </li>
                                                      </ul>
                                                  </div>
                                              </template>

                                              </Column>
                                    </DataTable>
                                </div>
                            </div><!-- .card-inner-group -->
                        </div><!-- .card -->
                    </div><!-- .nk-block -->

                    <CustomerUpdateModal v-if="selectedCustomerUpdate" 
                        :customer="selectedCustomerUpdate" @close="closeUpdateCustomer"></CustomerUpdateModal>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import CustomerModal from '../Components/Customer/CustomerModal.vue';
import CustomerUpdateModal from '../Components/Customer/CustomerUpdateModal.vue';
import { Inertia } from '@inertiajs/inertia';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Swal from 'sweetalert2'

export default {
    mounted() {
        (async () => {
            this.initializeSearchFromQuery(this.$props.query);
            if(this.search.store_name != '' && this.search.store_name != null)
            {
                const normalizedSearchName = this.search.store_name.toLowerCase().replace(/\s/g, '');

                // Find the store ignoring case and spaces
                const foundStore = this.storeOptions.find(store => 
                    store.label.toLowerCase().replace(/\s/g, '') === normalizedSearchName
                );
                if (foundStore) {
                    localStorage.setItem('selectedStore', foundStore.value); 
                    localStorage.setItem('shopName', foundStore.label);
                } else if (this.search.store_name) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'The store name does not exist!',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem('selectedStore'); // Remove the selected store from localStorage

                            // Manipulate URL to remove the store_name query parameter
                            let url = new URL(window.location);
                            url.searchParams.delete('store_name'); // Remove the store_name query parameter

                            // Update the URL without reloading the page
                            window.history.pushState({}, '', url);

                            window.location.reload(); // Now reload the page
                        }
                    });
                }
            }
            if(localStorage.getItem('selectedStore') == null){
                this.shopName = this.shop.shopify_name;
            }else{
                this.shopName = localStorage.getItem('shopName');
                this.selectedShop = localStorage.getItem('selectedStore');
                await this.searchCustomers();
            }

            // Perform search if there are query parameters
            if (this.hasQueryParams()) {
                this.performSearch();
                this.$nextTick(() => {
                    if (this.displayedCustomers.length === 1) {
                        let customerId = this.displayedCustomers[0].id;
                        this.navigateWithInertiaEvents(`/customer/${customerId}/${this.selectedShop}`, {
                            onStart: () => {
                                this.showLoadingAlert();
                            },
                            onFinish: () => {
                                this.closeLoadingAlert();
                            }
                        });
                    }
                });
            }
        })();
    },
    computed: {
        storeOptions(){
            return this.stores.map(store => ({
                label: store.shopify_name,
                value: store.id
            }));
        },
        isAnyCustomerSelected() {
            return this.selectedCustomers.length > 0;
        },
        hasErrors() {
            if (Array.isArray(this.errors) && this.errors.length > 0) {
                return true;
            }
            else if (this.errors && typeof this.errors === 'object' && Object.keys(this.errors).length > 0) {
                let errorMessages = this.errors['errors'];
                return Object.keys(errorMessages).length > 0;
            }
            return false;
        }

    },
    watch: {
        hasErrors(newVal) {
            if (newVal) {
                if (Array.isArray(this.errors)) {
                    this.errors.forEach(message => console.error(message));
                }
                else if (newVal && typeof this.errors === 'object' && this.errors !== null) {
                    let errorMessages = this.errors['errors'];
                    // Loop through each key in the errors object
                    Object.keys(errorMessages).forEach(key => {
                        // Check if the value associated with the key is an array
                        if (Array.isArray(errorMessages[key])) {
                            // Log each error message for that key
                            errorMessages[key].forEach(message => console.error(key + ": " + message));
                        }
                    });
                }
            }
        }
    }
    ,
    components: {
        CustomerModal,
        DataTable,
        Column,
        CustomerUpdateModal
    },
    props: {
        query: {
            type: [Array, Object],
            default: () => []
        },
        customers: Array,
        stores: {
            type: Array,
            default: () => []
        },
        shop: Object,
        testData: String,
        errors: {
            type: [Array, Object],
            default: () => []
        }
    },
    data() {
        return {
            isLoading: false,
            selectedCustomers: [],
            selectedAction: 'default',
            selectedShop: this.shop.id,
            selectAll: false,
            editingCustomer: null,
            showCustomerModal: false,
            localCustomers: this.customers,
            displayedCustomers: [],
            shop: this.shop,
            shopName: this.shop.shopify_name,
            customerCount: this.customers.length,
            stores: this.stores,
            testData: this.testData,
            selectedCustomerUpdate: null,
            customerSchema: [
                { type: 'text', label: 'First Name', model: 'first_name', rules: 'required', class: 'form-control' },
                { type: 'text', label: 'Last Name', model: 'last_name', rules: 'required', class: 'form-control' },
                { type: 'email', label: 'Email', model: 'email', rules: 'required|email', class: 'form-control' },
                { type: 'tel', label: 'Phone', model: 'phone', class: 'form-control' },
                // Address fields
                {
                    type: 'array',
                    model: 'addresses',
                    label: 'Addresses',
                    schema: [
                        { type: 'text', label: 'Address', model: 'address1', class: 'form-control' },
                        { type: 'text', label: 'City', model: 'city', class: 'form-control' },
                        { type: 'text', label: 'Province', model: 'province', class: 'form-control' },
                        { type: 'text', label: 'ZIP Code', model: 'zip', class: 'form-control' },
                        { type: 'text', label: 'Country', model: 'country', class: 'form-control' }
                    ]
                }

            ],
            search: {
                customer_id: '',
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                zip: '',
                province: '',
                store_name: ''
            },
        };
    },
    watch: {
        localCustomers(newVal, oldVal) {
        // This function will be called anytime `this.localCustomers` changes.
        this.performSearch();
        
    }
    },
    methods: {
        updateCustomerDetails(customer){
          this.selectedCustomerUpdate = customer;
        },
        closeUpdateCustomer(){
          this.selectedCustomerUpdate = null;
          this.searchCustomers();
        },
        async searchCustomers() {
        try {
            this.showLoadingAlert();
            var locStore = this.selectedShop;
            var response;
            if(locStore == null){
                response = await fetch(`/customers-search?shop='none'`);
            }else{
                response = await fetch(`/customers-search?shop=${locStore}`);  
            }
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            var data = await response.json();
            this.localCustomers = data; 
            this.displayedCustomers = [];
            localStorage.setItem('selectedStore', this.selectedShop); 
            this.customerCount = this.localCustomers.length;
            var foundObject = (this.stores).find(item => item.id == this.selectedShop);
            this.shopName = foundObject.shopify_name;
            localStorage.setItem('shopName', this.shopName);
            return data;
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally{
            this.closeLoadingAlert();
        }
        },
        onRowSelected(event) {
            localStorage.setItem('selectedStore', this.selectedShop); // Save data to localStorage
            const customerData = event.data;
                if (customerData && customerData.id) {
                    this.navigateWithInertiaEvents(`/customer/${customerData.id}/${this.selectedShop}`, {
                        onStart: () => {
                            this.showLoadingAlert();
                        },
                        onFinish: () => {
                            this.closeLoadingAlert();
                        }
                    });
                }
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
        initializeSearchFromQuery(query) {
            this.search.customer_id = query.customer_id || '';
            this.search.first_name = query.first_name || '';
            this.search.last_name = query.last_name || '';
            this.search.phone = query.phone || '';
            this.search.email = query.email || '';
            this.search.zip = query.zip || '';
            this.search.province = query.province || '';
            this.search.store_name = query.store_name || '';
        },
        hasQueryParams() {
            const query = this.$props.query;
            return Object.keys(query).length > 0;
        },
        getInitials(firstName, lastName) {
            const firstInitial = firstName ? firstName.charAt(0) : '';
            const lastInitial = lastName ? lastName.charAt(0) : '';
            return firstInitial + lastInitial || '';
        },
        performSelectedAction() {
            if (this.selectedAction === 'delete') {
                this.deleteCustomers();
            } else if (this.selectedAction === 'default') {
                // Handle default selection (usually no action)
            }
            // ... other conditions for additional actions
        },
        async deleteCustomers() {
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
                let customerIdsToDelete = this.selectedCustomers
                .map(customer => customer.id);

            if (customerIdsToDelete.length === 0) {
                Swal.fire('Error', 'Please select at least one customer to delete.', 'error');
                return;
            }
            this.showLoadingAlert();
            Inertia.post('/customers/delete', { customer_ids: customerIdsToDelete, shop: this.selectedShop}, {
                onSuccess: (page) => {
                    if (page.props.customers) {
                        this.refreshCustomerList(page.props.customers); 
                        this.searchCustomers();
                        this.displayedCustomers = [];
                        this.$nextTick(() => { 
                            this.closeLoadingAlert();
                            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                        });
                    }
                },
                onError: errors => {
                    console.error('Error deleting customers:', errors);
                    this.closeLoadingAlert();
                    Swal.fire('Failed!', 'There was an error deleting the customers.', 'error');
                    // Handle errors (e.g., show an error message)
                }
            });
            }
            
        },
        editCustomer(customer) {
            this.editingCustomer = customer;
            this.toggleCustomerModal();
        },
        toggleCustomerModal() {
            this.showCustomerModal = !this.showCustomerModal;
        },
        getAddress(customer) {
            return customer.addresses && customer.addresses[0] && customer.addresses[0].address1
                ? customer.addresses[0].address1
                : 'N/A';
        }
        ,
        refreshCustomerList(customers) {
            this.performSearch();
            this.localCustomers = customers;
            this.selectedCustomers = [];
        },
        // buildQueryString() {
        //     const params = new URLSearchParams();
        //     if (this.search.customer_id) params.set('customer_id', this.search.customer_id);
        //     if (this.search.first_name) params.set('first_name', this.search.first_name);
        //     if (this.search.last_name) params.set('last_name', this.search.last_name);
        //     if (this.search.phone) params.set('phone', this.search.phone);
        //     if (this.search.email) params.set('email', this.search.email);
        //     if (this.search.zip) params.set('zip', this.search.zip);
        //     if (this.search.province) params.set('province', this.search.province);
        //     if (this.selectedShop) params.set('storeId', this.selectedShop);
        //     return params.toString();
        // },
        performSearch() {
            this.showLoadingAlert();
            setTimeout(function() {
                Swal.close();
            }, 2000);
            
            localStorage.setItem('selectedStore', this.selectedShop); 
            this.customerCount = this.localCustomers.length;
            var foundObject = this.stores.find(item => item.id == this.selectedShop);
            this.shopName = foundObject.shopify_name;
            localStorage.setItem('shopName', this.shopName);
            this.displayedCustomers = [];
            const isSearchEmpty = !this.search.customer_id && !this.search.first_name && !this.search.last_name &&
                !this.search.phone && !this.search.email && !this.search.zip && !this.search.province;
            
                if (isSearchEmpty) {
                    this.displayedCustomers = [];
                }
                else {
                this.displayedCustomers = this.localCustomers.filter(customer => {
                    const matchesAddress = customer.addresses && customer.addresses.some(address => {
                        return (
                            (this.search.zip === '' || (address.zip && address.zip.toLowerCase().includes(this.search.zip.toLowerCase()))) &&
                            (this.search.province === '' || (address.province && address.province.toLowerCase().includes(this.search.province.toLowerCase())))
                        );
                    });

                    return (
                        (this.search.customer_id === '' || (customer.id && customer.id.toString().toLowerCase().includes(this.search.customer_id.toLowerCase()))) &&
                        (this.search.first_name === '' || (customer.first_name && customer.first_name.toLowerCase().includes(this.search.first_name.toLowerCase()))) &&
                        (this.search.last_name === '' || (customer.last_name && customer.last_name.toLowerCase().includes(this.search.last_name.toLowerCase()))) &&
                        (this.search.phone === '' || (customer.phone && customer.phone.toLowerCase().includes(this.search.phone.toLowerCase()))) &&
                        (this.search.email === '' || (customer.email && customer.email.toLowerCase().includes(this.search.email.toLowerCase()))) &&
                        (customer.addresses ? matchesAddress : true)
                    );
                });
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
        }
    },
    
}
</script>

<style scoped>
    .col-md-3 .store-select{
        width: 172%;
    }
</style>  
<style>/* If you prefer scoped styles, you can add Dashlite-specific styles here */</style>
  