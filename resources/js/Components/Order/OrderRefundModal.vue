<template>
    <div class="modal" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-overlay"> <!-- Add modal overlay -->
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Refund</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card card-bordered">
                    <div class="card-inner-group">
                      <div class="card-inner position-relative card-tools-toogle min-height-550 x-scroll">
                        <div class="nk-block-des text-soft">
                          <p>Items Details:</p>
                        </div>
                        <div class="card-inner p-0">
                            <div class="row">
                                <div class="col-md-4"><strong>Item:</strong></div>
                                <div class="col-md-8"><span>{{ this.lineItem.name }}</span></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4"><strong>Quantity:</strong></div>
                                <div class="col-md-8"><span>{{ this.lineItem.quantity }}</span></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4"><strong>Price:</strong></div>
                                <div class="col-md-8"><span>{{ this.lineItem.price }}</span></div>
                            </div>
                            <br>
                            <form @submit.prevent="submitRefund">
                            <!-- Refund Amount -->
                            <div class="form-group">
                                <label for="refundAmount">Refund Amount:</label>
                                <input type="number" :max="maxAmount" id="refundAmount" v-model="refundAmount" class="form-control" required>
                            </div>
                            <!-- Reason for Refund -->
                            <div class="form-group">
                                <label for="refundReason">Reason for Refund:</label>
                                <textarea id="refundReason" v-model="refundReason" class="form-control" required></textarea>
                            </div>
                            <!-- Submit Button -->
                            <!-- <button type="submit" class="btn btn-primary">Submit Refund</button> -->
                        </form>
                        </div>
                      </div>
                    </div>        
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal()">Close</button>
            <button type="button" class="btn btn-primary" @click="submitRefund()">Save changes</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Inertia } from '@inertiajs/inertia';
  import Swal from 'sweetalert2';
import { parse } from 'postcss';
  
  export default {
    data() {
      return {
        refundAmount: null,
        refundReason: '',
        orderId: this.orderId,
        shopId: this.shop.id,
        lineItemId: this.lineItem.id,
        lineItemQty: this.lineItem.quantity,
        lineItem: this.lineItem,
        maxAmount: parseInt(this.lineItem.price)
      };
    },
    props: {
        orderId: Number,
        shop: Object,
        lineItem: Object
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      parsePriceToMax(){
        return parseFloat(this.lineItem.price);   
      },
      submitRefund() {
        
      console.log('refundData');
      // Prepare refund data
      var refundData = {
        refundAmount: this.refundAmount,
        refundReason: this.refundReason,
        orderId: this.orderId,
        shopId:  this.shopId,
        lineItemId: this.lineItemId,
        lineItemQty: this.lineItemQty// Replace with the actual order ID
      };

      console.log(refundData);

      // Make a POST request using Inertia
      Inertia.post('/order/create-refund', refundData, {
        onStart: () => {
            this.showLoadingAlert();
        },
        onSuccess: (page) => {
            this.$emit('close');
            // console.log(page.orderDetails)
            // this.$emit('refundCreated');

            // this.$emit('refundCreated', page.orderDetails);
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
    },
    fetchUpdatedOrderDetails(){
      let orderId = this.orderId;

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
      .modal-dialog {
        width: 1000px;
      }
  </style>
  