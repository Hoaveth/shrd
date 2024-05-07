

<template>
  <div class="nk-content ">
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
                                      <li class="breadcrumb-item"><a href="#" @click="gotoAllCustomers()">Home</a></li>
                                        <li class="breadcrumb-item active">User Management</li>
                                    </ul>
                                </nav>
                            </div><!-- .nk-block-head-content -->
                        </div><!-- .nk-block-between -->
                    </div><!-- .nk-block-head -->
                  <div class="nk-block">
                      <div class="row g-gs">
                          <div class="col-lg-4 col-xl-4 col-xxl-3">
                              <div class="card card-bordered">
                                  <div class="card-inner-group">
                                    <div class="card-inner position-relative card-tools-toggle min-height-550">
                                      <div class="container">
                                        <div class="overline-title-alt mb-2 mt-2">User Management</div>
                                        <form @submit.prevent="createUser" class="form">
                                          <div class="form-group">
                                            <label for="name" >Name:</label>
                                            <input type="text" id="name" v-model="user.name" class="form-control" required>
                                          </div>
                                          <div class="form-group">
                                            <label for="email" >Email:</label>
                                            <input type="email" id="email" v-model="user.email" class="form-control" required>
                                            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                                          </div>
                                          <div class="form-group">
                                            <label for="password" >Password:</label>
                                            <input type="password" id="password" v-model="user.password" class="form-control" required>
                                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                                          </div>
                                          <div class="form-group">
                                            <label for="password_confirmation">Confirm Password:</label>
                                            <input type="password" id="password_confirmation" v-model="user.password_confirmation" class="form-control" required>
                                          </div>
                                          <button type="submit" class="btn btn-primary">Create User</button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-lg-8 col-xl-8 col-xxl-9">
                              <div class="card card-bordered">
                                  <div class="card-inner-group">
                                      <div class="card-inner position-relative card-tools-toogle min-height-550 x-scroll">
                                        <div class="nk-block-des text-soft">
                                          <p>You have total {{ this.users.length }} users.</p>
                                        </div>
                                        <div class="card-inner p-0">
                                          <DataTable :value="users" stripedRows :paginator="true" :rows="5" :rowsPerPageOptions="[5,10,20]"
                                          sortMode="multiple" :metaKeySelection="false" removableSort dataKey="id" class="nk-tb-list nk-tb-ulist">
                                            <template #empty> No customers found. </template>
                                            <!-- <Column expander style="width: 5rem" /> -->
                                            <Column field="name" header="Name" styleClass="nk-tb-col">
                                              <template #body="slotProps">
                                                  <div class="user-card">
                                                      <div class="user-avatar bg-primary">
                                                          <span>{{ slotProps.data.name[0]}}</span>
                                                      </div>
                                                      <div class="user-info">
                                                          <span class="tb-lead">{{ slotProps.data.name }}</span>
                                                      </div>
                                                  </div>
                                              </template>
                                            </Column>
                                            <Column field="email" header="Email" ></Column>
                                            <Column field="user">
                                              <template #body="slotProps" class="nk-tb-item">
                                                  <div class="nk-tb-col nk-tb-col-tools" @mouseenter="hoverOrder = slotProps.data.id"
                                                      @mouseleave="hoverOrder = null">

                                                      <ul class="nk-tb-actions gx-1">
                                                          <li>
                                                              <div><a href="#" class=" btn btn-icon btn-trigger" @click.prevent="updateUserDetails(slotProps.data)">
                                                                <em class="icon ni ni-edit-alt" ></em></a>
                                                              </div>
                                                          </li>
                                                          <li>
                                                              <div><a href="#" class=" btn btn-icon btn-trigger" @click.prevent="deleteUser(slotProps.data)">
                                                                <em class="icon ni ni-trash-alt" ></em></a>
                                                              </div>
                                                          </li>
                                                      </ul>
                                                  </div>
                                              </template>

                                              </Column>
                                          </DataTable>
                                        </div>
                                      </div>
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <UpdateUserModal v-if="selectedUser" :user="selectedUser" @close="closeUpdateUser"></UpdateUserModal>

      </div>
  </div>
</template>

<script>
import UpdateUserModal from '../Components/User/UpdateUserModal.vue';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import DataTable from 'primevue/datatable';

export default {
  components:{
        UpdateUserModal
    },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ""
      },
      errors: {
        email: '',
        password: ''
      },
      successMessage: '',
      users: this.users,
      selectedUser: null
    };
  },
  props:{
      onSuccess : String,
      users: Array
  },
  methods: {
    async createUser() {
      const url = '/create-user/';

            Inertia.post(url, this.user, {
              onStart: () => {
                this.showLoadingAlert();
              },
                onSuccess: (page) => {
                    this.closeLoadingAlert();
                    this.errors.email = '';
                    this.errors.password = ''
                    this.user.name = '';
                    this.user.email = '';
                    this.user.password = '';
                    this.user.password = '';
                    this.user.password_confirmation = '';

                    this.successMessage = page.props.onSuccess;

                    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: this.successMessage, // Assuming your response contains a success message
                    });
                },
                onError: (error) => {
                  this.closeLoadingAlert();
                      this.errors.email = error.email;
                      this.errors.password = error.password;
                      this.successMessage = '';
                      console.error('Error registering user:', error);
                }
            });
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
        updateUserDetails(user){
          this.selectedUser = user;
          console.log(this.selectedUser)
        },
        closeUpdateUser(){
          this.selectedUser = null;
        },
        async deleteUser(user) {
          const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if(confirmation.isConfirmed){
          
          const url = '/delete-user';

          Inertia.post(url, user, { 
            onStart:() => {
              this.showLoadingAlert();
            },
              onSuccess: (page) => {
                this.closeLoadingAlert();
                  this.successMessage = page.props.onSuccess;

                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "User deleted successfully!", 
                  });
              },
              onError: (error) => {
                this.closeLoadingAlert;
                  // Handle errors here
                    // If validation errors exist, set them to the errors object
                    // this.errors = errors.response;
                    console.error('Error deleting store:', error);
              }
          });
        }
        },
  }
};
</script>

<style scoped>
.min-height-550 {
  height: 550px;
}

.x-scroll {
  overflow-x: scroll;
}

label {
  color: #526484 !important;
}

/* Add your component-specific styles here */
</style>
