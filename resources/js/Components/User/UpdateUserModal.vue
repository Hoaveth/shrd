<template>
    <div class="modal" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-overlay"> <!-- Add modal overlay -->
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" v-model="editedUser.name">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" v-model="editedUser.email">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" v-model="editedUser.password">
          </div>
          <div class="form-group">
            <label for="password_confirmation">Password Confirmation:</label>
            <input type="password" class="form-control" id="password_confirmation" v-model="editedUser.password_confirmation">
          </div>
            <!-- Add more form fields as needed for editing user information -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateUser">Save changes</button>
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
    props: ['user'],
    data() {
      return {
        editedUser: {} // Initialize editedUser object to store edited user information
      };
    },
    watch: {
      user: {
        immediate: true, // Watch for changes to the user prop immediately
        handler(newValue) {
          // Copy user data to editedUser when user prop changes
          this.editedUser = Object.assign({}, newValue);
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      async updateUser() {
        this.showLoadingAlert();
          Inertia.put('/update-user', this.editedUser, {
              onSuccess: (page) => {
              this.$emit('close');
                  this.successMessage = page.props.onSuccess;
                      console.log('23'+page)
                  Swal.fire({
                      icon: 'success',
                      title: 'Success!',
                      text: "User updated successfully!",
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
  