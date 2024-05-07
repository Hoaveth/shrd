<template>
    <div class="modal" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-overlay"> <!-- Add modal overlay -->
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Order</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            

            <!-- <div class="card"> -->
                    <div class="nk-block-des text-soft">
                      <p>Shipping Details</p>
                    </div>
                    <!-- <div class="card-inner-group"> -->
                      <div class="form-group">
                        <label for="first_name">First Name:</label>
                        <input type="text" class="form-control" id="first_name" v-model="shippingAddress.first_name">
                      </div>
                      <div class="form-group">
                        <label for="last_name">Last Name:</label>
                        <input type="text" class="form-control" id="last_name" v-model="shippingAddress.last_name">
                      </div>
                      <div class="form-group">
                        <label for="company">Company:</label>
                        <input type="text" class="form-control" id="company" v-model="shippingAddress.company">
                      </div>
                      <div class="form-group">
                        <label for="address1">Address:</label>
                        <input type="text" class="form-control" id="address1" v-model="shippingAddress.address1">
                      </div>
                      <div class="form-group">
                        <label for="address2">Apartment, suite, etc.:</label>
                        <input type="text" class="form-control" id="address2" v-model="shippingAddress.address2">
                      </div>
                      <div class="form-group">
                        <label for="zip">Postal Code:</label>
                        <input type="text" class="form-control" id="zip" v-model="shippingAddress.zip">
                      </div>
                      <div class="form-group">
                        <label for="city">City:</label>
                        <input type="text" class="form-control" id="city" v-model="shippingAddress.city">
                      </div>
                      <div class="form-group">
                        <label for="phone">Phone:</label>
                        <input type="text" class="form-control" id="city" v-model="shippingAddress.phone">
                      </div>
                      <div class="form-group">
                      <label>Country:</label>
                      <select v-model="selectedCountry" class="custom-select" @change="findRegions()" required>
                        <option v-for="country in countryOptions" :key="country.value" :value="country.value">{{ country.label }}</option>
                      </select>
                      </div>
                      <div class="form-group">
                      <label>Province:</label>
                      <select v-model="selectedRegion" class="custom-select" required>
                        <option v-for="province in regionOptions" :key="province.value" :value="province.value">{{ province.label }}</option>
                      </select>
                      </div>
                      <!-- <div class="card-inner position-relative card-tools-toogle min-height-550 x-scroll">
                        <div class="nk-block-des text-soft">
                          <p>Selected Items:.</p>
                        </div>
                        <div class="card-inner p-0">
                          <div class="shopping-cart">
                            <div class="cart-items"> -->
                              <!-- <DataTable :value="order.line_items">
                                <Column header="Image">
                                  <template #body="slotProps">
                                    <div class="user-card">
                                      <span class="tb-product">
                                        <img :src="slotProps.data.image_src" :alt="slotProps.data.title" style="max-width: 50px; max-height: 50px;">
                                      </span>
                                    </div>
                                  </template>
                                  </Column>
                                  <Column field="title" header="Title"></Column>
                                  <Column field="price" header="Price"></Column>
                                  <Column field="quantity" header="Quantity"></Column>
                                </DataTable> -->
                            <!-- </div>
                            <div class="row">
                              <div class="col-md-6">
                              </div>
                              <div class="col-md-6">
                                  <div class="cart-summary">
                                      <div>
                                        <label for="financial-status">Financial Status:</label>
                                        <select id="financial-status" class="form-select" v-model="selectedFinancialStatus">
                                            <option value="pending">Pending</option>
                                            <option value="paid">Paid</option>
                                            <option value="partially_paid">Partially Paid</option>
                                        </select>
                                      </div>  
                                      <div>
                                        <label for="fulfillment-status">Fulfillment Status:</label>
                                        <select id="fulfillment-status" class="form-select" v-model="selectedFulfillmentStatus">
                                            <option value="unfulfilled">Unfulfilled</option>
                                            <option value="partial">Partial</option>
                                            <option value="fulfilled">Fulfilled</option>
                                        </select>
                                      </div>
                                  </div>
                              </div> -->
                          <!-- </div>
                          </div>
                        </div>
                      </div> -->
                    <!-- </div>        
                </div> -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateOrder">Save changes</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Inertia } from '@inertiajs/inertia';
  import Swal from 'sweetalert2';
  
  export default {
    props: {
      order: Object,
      countries: Array
    },
    data() {
      return {
        editedOrder: {}, 
        shippingAddress: {
          first_name: null,
          last_name: null,
          company: null,
          address1: null,
          address2: null,
          zip: null,
          city: null,
          country: null,
          province: null,
          phone: null,
          country: null,
          country_code: null,
          province: null,
          province_code: null
        },
        selectedCountry: null,
        countries: this.countries,
        provinces: null,
        selectedRegion: null
        // selectedFinancialStatus: this.order.financial_status,
        // selectedFulfillmentStatus: this.order.fulfillment_status
      };
    },
    watch: {
      order: {
        immediate: true, 
        handler(newValue) {
          this.editedOrder = Object.assign({}, newValue);
        }
      }
    },
    mounted() {
      this.assignValues()
    },
    computed:{
      countryOptions(){
            return this.countries.countries.map(country => ({
                label: country.name,
                value: country.id
            }));
        },
        regionOptions(){
          if(this.provinces!=null){
            return this.provinces.map(province => ({
                label: province.name,
                value: province.id
            }));
          }
        },
    },
    methods: {
      async updateOrder(){
        this.showLoadingAlert()
        
        var shippingCountry = this.findCountryById(this.selectedCountry);
          if(shippingCountry){
            this.shippingAddress.country = shippingCountry.name;
            this.shippingAddress.country_code = shippingCountry.code;
            var shippingRegion = this.findRegionsById(this.selectedRegion);
            if(shippingRegion){
              this.shippingAddress.province = shippingRegion.name;
              this.shippingAddress.province_code = shippingRegion.code;
            }else{
              this.shippingAddress.province = null;
              this.shippingAddress.province_code = null;
            }
          }else{
            this.shippingAddress.country = null;
            this.shippingAddress.country_code = null;
          }
          
        const allNull = Object.values(this.shippingAddress).every(value => value === null);

        if (allNull) {
          this.closeLoadingAlert();
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "No Input Made!",
          });
        } else {
          this.order.shipping_address = this.shippingAddress;
          this.order.shopId = localStorage.getItem('selectedStore');

          Inertia.put('/order/update', this.order, {
                onSuccess: (page) => {
                  
                this.closeLoadingAlert();
                this.$emit('close');
                    this.successMessage = page.props.onSuccess;
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: "Order updated successfully!",
                    });
                },
                onError: errors => {
                this.$emit('close');
                this.closeLoadingAlert();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errors.email || errors.password,
                    });
                }
            });
        }
      },
      findCountryByCountryCode(code){
        var selectedCountryId = this.countries.countries.find(country => country.code === code);
        this.provinces = selectedCountryId.provinces
        return selectedCountryId.id;
      },
      findCountryById(id){
        var selectedCountryId = this.countries.countries.find(country => country.id === id);
        return selectedCountryId;
      },
      findRegionByCode(code){
        var selectedRegion = this.provinces.find(province => province.code === code);
        return selectedRegion.id;
      },
      assignValues(){
        if(this.order.shipping_address != null){
          this.shippingAddress = this.order.shipping_address
          this.selectedCountry = this.findCountryByCountryCode(this.order.shipping_address.country_code)
          this.selectedRegion = this.findRegionByCode(this.order.shipping_address.province_code)
        }
      },
      closeModal() {
        this.$emit('close');
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
      findRegionsById(id){
        var region = this.provinces.find(province => province.id === id);
        return region;
      },
      findRegions(){
        this.selectedRegion = null;
        let countries = this.countries.countries;
        let selectedCount = countries.find(country => country.id === this.selectedCountry);

        this.provinces = selectedCount.provinces;
      }
    }
  }
  </script>
  
  <style scoped>
      .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
      z-index: 999; /* Ensure it's above other elements */
      }
      .modal-dialog {
        width: 1000px;
      }
      .modal-body{
        height: 500px;
        overflow-y: scroll;
      }
      .custom-select {
        display: block;
        width: 100%;
        padding: 0.375rem 0.75rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }
      
.modal-content,
  .modal-header,
  .modal-title,
  .modal-body {
    background-color: #2c3e50; /* Dark background color */
    color: #fff; /* Light text color */
  }

  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent dark background for backdrop */
  }

  .close {
    color: #fff; /* Light close button color */
  }
  </style>
  