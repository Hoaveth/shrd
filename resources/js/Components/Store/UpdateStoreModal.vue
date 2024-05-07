<template>
  <div class="modal" tabindex="-1" role="dialog" style="display: block;">
    <div class="modal-overlay"> <!-- Add modal overlay -->
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Store</h5>
          <button type="button" class="close" @click="closeModal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="shopify_name">Shopify Name:</label>
            <input type="text" class="form-control" id="shopify_name" v-model="editedStore.shopify_name">
          </div>
          <div class="form-group">
            <label for="shopify_domain">Shopify Domain:</label>
            <input type="text" class="form-control" id="shopify_domain" v-model="editedStore.shopify_domain">
          </div>
          <div class="form-group">
            <label for="shopify_key">Shopify Key:</label>
            <input type="text" class="form-control" id="shopify_key" v-model="editedStore.shopify_key">
          </div>
          <div class="form-group">
            <label for="shopify_secret">Shopify Secret:</label>
            <input type="text" class="form-control" id="shopify_secret" v-model="editedStore.shopify_secret">
          </div>
          <div class="form-group">
            <label for="shopify_token">Shopify Token:</label>
            <input type="text" class="form-control" id="shopify_token" v-model="editedStore.shopify_token">
          </div>
          <div class="form-group">
            <label for="shopify_description">Shopify Description:</label>
            <input type="text" class="form-control" id="shopify_description" v-model="editedStore.shopify_description">
          </div>
          <!-- Add more form fields as needed for editing user information -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary" @click="updateStore">Save changes</button>
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
  props: ['store'],
  data() {
    return {
      editedStore: {} // Initialize editedStore object to store edited user information
    };
  },
  watch: {
    store: {
      immediate: true, // Watch for changes to the user prop immediately
      handler(newValue) {
        // Copy user data to editedStore when user prop changes
        this.editedStore = Object.assign({}, newValue);
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async updateStore() {
      this.showLoadingAlert();
      // Implement update/edit functionality here
      
          this.$emit('close');
            Inertia.put(`/update-store`, this.editedStore,{
                onSuccess: (page) => {
                    this.closeLoadingAlert();
                    this.successMessage = page.props.onSuccess;
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: this.successMessage,
                    });
                },
                onError: errors => {
                    this.closeLoadingAlert();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errors,
                    });
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

