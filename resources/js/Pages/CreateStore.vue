

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
                                        <li class="breadcrumb-item active">Store Management</li>
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
                                    <div class="card-inner position-relative card-tools-toggle min-height-655">
                                      <div class="container">
                                        <div class="overline-title-alt mb-2 mt-2">Store Management</div>
                                        <form @submit.prevent="createStore">
                                          <div class="form-group">
                                            <label for="shopify_name" >Shopify Name:</label>
                                            <input type="text" id="shopify_name" v-model="store.shopify_name" class="form-control" required>
                                          </div>
                                          <div class="form-group">
                                            <label for="shopify_domain">Shopify Domain:</label>
                                            <input type="text" id="shopify_domain" v-model="store.shopify_domain" class="form-control" required>
                                          </div>
                                          <div class="form-group">
                                            <label for="shopify_key">Shopify Key:</label>
                                            <input type="text" id="shopify_key" v-model="store.shopify_key" class="form-control" required>
                                          </div>
                                          <div class="form-group">
                                            <label for="shopify_secret">Shopify Secret:</label>
                                            <input type="text" id="shopify_secret" v-model="store.shopify_secret" class="form-control" required>
                                          </div>
                                          <div class="form-group">
                                            <label for="shopify_token">Shopify Token:</label>
                                            <input type="text" id="shopify_token" v-model="store.shopify_token" class="form-control" required>
                                          </div>
                                          <div class="form-group" style="grid-column: span 2;">
                                            <label for="shopify_name" >Shopify Description:</label>
                                            <input type="text" id="shopify_description" v-model="store.shopify_description" class="form-control" required>
                                          </div>
                                          <button type="submit" class="btn btn-primary" style="width: fit-content;">Create Store</button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-lg-8 col-xl-8 col-xxl-9">
                              <div class="card card-bordered">
                                  <div class="card-inner-group">
                                      <div class="card-inner position-relative card-tools-toogle min-height-655 x-scroll">
                                        <div class="nk-block-des text-soft">
                                          <p>You have total {{ this.stores.length }} stores.</p>
                                        </div>
                                        <div class="card-inner p-0">
                                          <DataTable :value="stores" stripedRows :paginator="true" :rows="5" :rowsPerPageOptions="[5,10,20]"
                                          sortMode="multiple" :metaKeySelection="false" removableSort dataKey="id" class="nk-tb-list nk-tb-ulist">
                                            <template #empty> No store found. </template>
                                            <Column field="shopify_name" header="Name" styleClass="nk-tb-col"></Column>
                                            <Column field="shopify_domain" header="Domain" ></Column>
                                            <Column field="shopify_description" header="Description" ></Column>
                                            <Column>
                                              <template #body="slotProps" class="nk-tb-item">
                                                  <div class="nk-tb-col nk-tb-col-tools" @mouseenter="hoverOrder = slotProps.data.id"
                                                      @mouseleave="hoverOrder = null">

                                                      <ul class="nk-tb-actions gx-1">
                                                          <li>
                                                              <div><a href="#" class=" btn btn-icon btn-trigger" @click.prevent="updateStoreDetails(slotProps.data)">
                                                                <em class="icon ni ni-edit-alt" ></em></a>
                                                              </div>
                                                          </li>
                                                          <li>
                                                              <div><a href="#" class=" btn btn-icon btn-trigger" @click.prevent="deleteStore(slotProps.data)">
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
          
      <UpdateStoreModal v-if="selectedStore" :store="selectedStore" @close="closeUpdateStore"></UpdateStoreModal>
      </div>
  </div>
</template>

<script>
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import UpdateStoreModal from '../Components/Store/UpdateStoreModal.vue';

export default {
  
  components:{
        UpdateStoreModal
    },
  data() {
    return {
      store: {
        shopify_name: '',
        shopify_domain: '',
        shopify_key: '',
        shopify_secret: '',
        shopify_token: '',
        shopify_description: ''
      },
      successMessage: '',
      stores: this.stores,
      selectedStore: null
    };
  },
  props:{
    onSuccess : String,
    stores: Array
  },
  methods: {
    async createStore() {
      const url = '/create-store';
        Inertia.post(url, this.store, {
          onStart: () => {
            this.showLoadingAlert();
          },
          onSuccess: (page) => {
            this.closeLoadingAlert;
            this.store.shopify_name = '';
            this.store.shop = '';
            this.store.shopify_domain = '';
            this.store.shopify_key = '';
            this.store.shopify_secret = '';
            this.store.shopify_token = '';
            this.store.shopify_description = '';
            this.successMessage = page.props.onSuccess;

            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: this.successMessage,
            });
          },
          onError: (error) => {
            this.closeLoadingAlert();
                console.error('Error registering store:', error);
          }
      });
    },
    async deleteStore(store) {
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
      const url = '/delete-store';
      Inertia.post(url, store, {
        onStart: () => {
          this.showLoadingAlert();
        },
        onSuccess: (page) => {
          this.closeLoadingAlert();
          this.successMessage = page.props.onSuccess;

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: this.successMessage,
          });
        },
        onError: (error) => {
          this.closeLoadingAlert;
          console.error('Error deleting store:', error);
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
        updateStoreDetails(store){
          this.selectedStore = store;
          console.log(this.selectedStore)
        },
        closeUpdateStore(){
          this.selectedStore = null;
        }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.min-height-655{
  height: 572px;
}
.x-scroll {
  overflow-x:scroll;
}
.p-datatable-table {
  height: 500px !important;
}

label {
  color: #526484 !important;
}
</style>
