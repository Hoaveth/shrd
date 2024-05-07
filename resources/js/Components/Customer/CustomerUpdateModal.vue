<template>
    <div class="modal" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-overlay"> <!-- Add modal overlay -->
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Customer</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
            <label for="first_name">First Name:</label>
            <input type="text" class="form-control" id="first_name" v-model="editedCustomer.first_name">
          </div>
          
          <div class="form-group">
            <label for="last_name">Last Name:</label>
            <input type="text" class="form-control" id="last_name" v-model="editedCustomer.last_name">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" v-model="editedCustomer.email">
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="number" class="form-control" id="phone" v-model="editedCustomer.phone">
          </div>

          <div v-for="(address, index) in editedCustomer.addresses" :key="index">
            <card>
              <div class="form-group">
                <label for="address1">Address:</label>
                <input type="text" class="form-control" id="address1" v-model="address.address1">
              </div>
              <div class="form-group">
                <label for="city">City:</label>
                <input type="text" class="form-control" id="city" v-model="address.city">
              </div>
              <div class="form-group">
                <label for="province">Province:</label>
                <input type="text" class="form-control" id="province" v-model="address.province">
              </div>
              <div class="form-group">
                <label for="zip">Zip Code:</label>
                <input type="text" class="form-control" id="zip" v-model="address.zip">
              </div> 
              <div class="form-group">
                <label for="country">Country:</label>
                <input type="text" class="form-control" id="country" v-model="address.country">
              </div>
            </card>
          </div>
          <!-- <button @click="addAddress">Add Address</button> -->
          <!-- <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" v-model="editedCustomer.password">
          </div>
          <div class="form-group">
            <label for="password_confirmation">Password Confirmation:</label>
            <input type="password" class="form-control" id="password_confirmation" v-model="editedCustomer.password_confirmation">
          </div> -->
            <!-- Add more form fields as needed for editing customer information -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCustomer">Save changes</button>
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
    props: ['customer'],
    data() {
      return {
        editedCustomer: {} // Initialize editedCustomer object to store edited customer information
      };
    },
    watch: {
      customer: {
        immediate: true, // Watch for changes to the customer prop immediately
        handler(newValue) {
          // Copy customer data to editedCustomer when customer prop changes
          this.editedCustomer = Object.assign({}, newValue);
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      async updateCustomer() {
        this.showLoadingAlert()
        // Implement update/edit functionality here
        var shopId = localStorage.getItem('selectedStore');
        var url = '/customers/'+this.customer.id+'/'+shopId
                      
              Inertia.put(url, this.editedCustomer,{
                  onSuccess: (page) => {
                    this.$emit('close');
                    this.closeLoadingAlert();
                  },
                  onError: errors => {
                      Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: errors,
                      });
                  },
                  onFinish: () =>{
                    this.$emit('customersUpdated');
                  }
              });
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
    },
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
      .modal-body{
            height: 500px;
            overflow-y: scroll;
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
  