<template>
    <div class="nk-content ">
      <div class="container">
        <div class="nk-content-inner">
          <div class="nk-content-body">
            <div class="nk-block-head nk-block-head-sm">
              <div class="nk-block-between g-3">
                
                <div class="nk-block-head-content">
                  <nav>
                    <ul class="breadcrumb breadcrumb-arrow">
                      <li class="breadcrumb-item"><a href="#" @click="gotoAllCustomers()">Home</a></li>
                      <li class="breadcrumb-item"><a href="#" @click="gotoAllCustomers()">Customers</a></li>
                      <li class="breadcrumb-item"><a href="#"
                          @click="goToCustomerPage(this.customer.id)">{{
                          customerFullName || "Customer Details"}}</a></li>
                      <li class="breadcrumb-item"><a href="#" @click="gotoAllOrders()"> Orders </a></li>     
                      <li class="breadcrumb-item active">Create Order</li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div class="nk-block">
              <div class="row g-gs">
                <div class="col-lg-4 col-xl-4 col-xxl-3">
                  <div class="card card-bordered">
                    <div class="card-inner-group">
                      <div class="card-inner position-relative card-tools-toggle min-height-550">
                        <div class="container">
                        <div class="overline-title-alt mb-2 mt-2">Select Products</div>
                          <div class="product-browsing">
                            <div class="product-list">
                              <!-- Sample product cards -->
                              <div class="product-card" v-for="product in products" :key="product.id" @click="addToCart(product)">
                                <img :src="product.image_src" :alt="product.title" />                             
                                <div class="product-details">
                                    <h3>{{ product.title }}</h3>
                                    <p>{{ product.price }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
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
                          <p>Selected Items:.</p>
                        </div>
                        <div class="card-inner p-0">
                          <div class="shopping-cart">
                            <div class="cart-items">
                              <!-- Display items added to cart -->
                              <div v-if="cartItems.length === 0">
                                <p>No items selected</p>
                             </div>
                              <DataTable :value="cartItems" v-if="cartItems.length > 0">
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
                                  <Column>
                                    <template #body="slotProps">
                                      <span class="badge bg-danger" @click="removeFromCart(slotProps.data)">Remove</span>
                                    </template>
                                  </Column>
                                </DataTable>
                              <!-- <div class="cart-item" v-for="(item, index) in cartItems" :key="index">
                                <img :src="item.image_src" :alt="item.title">
                                <div class="item-details">
                                  <h5>{{ item.title }}</h5>
                                  <p>{{ item.price }} x {{ item.quantity }}</p>
                                </div>
                                <button class="btn btn-danger" @click="removeFromCart(index)">Remove</button>
                              </div> -->
                            </div>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="cart-summary" v-if="cartItems.length > 0">
                                  <p>Total Items: {{ totalItems }}</p>
                                  <p>Subtotal: {{ calculateSubtotal() }}</p>
                                  <p>Tax: {{ calculateTax() }}</p>
                                  <p><strong>Total: {{ calculateTotal() }}</strong></p>
                                  <button class="btn btn-primary" @click="submitOrderData()">Submit Order</button>
                                </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="cart-summary" v-if="cartItems.length > 0">
                                      <div>
                                        <label for="financial-status">Financial Status:</label>
                                        <select id="financial-status" class="form-select" v-model="selectedFinancialStatus">
                                            <option value="pending">Pending</option>
                                            <option value="paid">Paid</option>
                                            <option value="partially_paid">Partially Paid</option>
                                            <!-- Add more options as needed -->
                                        </select>
                                      </div>  
                                      <div>
                                        <label for="fulfillment-status">Fulfillment Status:</label>
                                        <select id="fulfillment-status" class="form-select" v-model="selectedFulfillmentStatus">
                                            <option value="unfulfilled">Unfulfilled</option>
                                            <option value="partial">Partial</option>
                                            <option value="fulfilled">Fulfilled</option>
                                            <!-- Add more options as needed -->
                                        </select>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { Inertia } from '@inertiajs/inertia';
import InputNumber from 'primevue/inputnumber';
import Swal from 'sweetalert2';
export default {
    data() {
      return {
        products: this.products,
        customerId: this.customer.id,
        customer: this.customer,
        customerFullName: '',
        cartItems: [],
        taxRate: 0.0, // Sample tax rate
        selectedFinancialStatus: "pending",
        selectedFulfillmentStatus: "unfulfilled"
      };
    },
    mounted() {
      this.getCustomerFullName();
    },
    computed: {
      totalItems() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
      }
    },
    props:{
        products: {
            type: Array,
            default: () => []
        },
        customer: Object
    },
    methods: {
      getCustomerFullName() {
            if (this.customer) {
                let fullName = '';
                if (this.customer.first_name) {
                    fullName += this.customer.first_name;
                }
                if (this.customer.last_name) {
                    if (fullName.length > 0) {
                        fullName += ' '; // Add a space if first name is also there
                    }
                    fullName += this.customer.last_name;
                }
                this.customerFullName = fullName;
            }
            return '';
        },
      addToCart(product) {
        const existingItem = this.cartItems.find(item => this.isEqualProduct(item, product));
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cartItems.push({...product, quantity: 1});
        }
        },
        isEqualProduct(product1, product2) {
        // Compare all properties that determine the equality of products
        return product1.id === product2.id  /* Add other comparison conditions if necessary */;
      },
      prepareOrderData() {
        const lineItems = this.cartItems.map(item => ({
            variant_id: item.id,
            quantity: item.quantity,
            price: item.price
        }));

        let customer = {
            id: this.customerId
        }

        return {
        order: {
            line_items: lineItems,
            customer: customer,
            financial_status: this.selectedFinancialStatus,
            email: this.customer.email,
            fulfillment_status: this.selectedFulfillmentStatus
        }
        };
      },
      removeFromCart(itemToRemove) {
        const index = this.cartItems.findIndex(item => item === itemToRemove);
        if (index !== -1) {
          this.cartItems.splice(index, 1);
        }
      },
      calculateSubtotal() {
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      calculateTax() {
        return (this.calculateSubtotal() * this.taxRate).toFixed(2);
      },
      calculateTotal() {
        return (this.calculateSubtotal() + parseFloat(this.calculateTax()));
      },
      fetchProducts() {
        
        this.showLoadingAlert();
        var shopId = localStorage.getItem('selectedStore');
        var url = '/products/'+shopId;
        // Make an API call to fetch Shopify products
        // You can use Axios or Vue Resource here
        Inertia.get(url)
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            console.error('Error fetching Shopify products:', error);
          });

          this.closeLoadingAlert();
      },
      async submitOrderData() {
        this.showLoadingAlert();
        
        var orderData = this.prepareOrderData()
        var shopId = localStorage.getItem('selectedStore');

        console.log(orderData);
        const url = '/order/create/'+shopId+'/'+this.customerId;

            Inertia.post(url, orderData, {
                onSuccess: (page) => {
                    this.closeLoadingAlert();
                    this.successMessage = page.props.onSuccess;
                    this.cartItems = [];
                    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: this.successMessage, // Assuming your response contains a success message
                    });
                },
                onError: (error) => {
                  this.closeLoadingAlert;
                    // Handle errors here
                      // If validation errors exist, set them to the errors object
                      // this.errors = errors.response;
                      console.error('Error registering store:', error);
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
      goToCustomerPage(customerId) {
            var shopId = localStorage.getItem('selectedStore');
            this.navigateWithInertiaEvents(`/customer/${customerId}/${shopId}`, {
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
        
    gotoAllOrders() {
            var shopId = localStorage.getItem('selectedStore');

            console.log('1234');
            this.navigateWithInertiaEventsWithShop
                (`/orders`, shopId, {
                    onStart: () => {
                        this.showLoadingAlert();
                    },
                    onFinish: () => {
                        this.closeLoadingAlert();
                    }
                });
        },
        
  navigateWithInertiaEventsWithShop(url, shop_id, { onStart = () => { }, onFinish = () => { } } = {}) {
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

            // var fullUrl = url+'?shop='+shop_id;
            var fullUrl = url+'/'+shop_id;
            Inertia.visit(fullUrl);
        },
  },
  

  };
  </script>
  
  <style scoped>
  /* Styles for order container */
  .order-container {
    display: flex;
  }
  
  /* Styles for product browsing section */
  .product-browsing {
    flex: 1;
    padding: 20px;
    height: 600px;
    overflow-y: scroll;
  }
  
  /* Styles for shopping cart section */
  .shopping-cart {
    flex: 1;
    padding: 20px;
  }
  
  .product-card {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .product-card img {
    width: 50px; /* Adjust image width as needed */
    height: auto;
    margin-right: 10px;
  }

  .product-details {
    display: grid;
    grid-template-rows: auto 1fr; /* Title above the price */
    gap: 5px; /* Gap between title and price */
    flex: 1; /* Take remaining space */
  }

  /* Styles for product title */
  .product-card h3 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }

  /* Styles for product price */
  .product-card p {
    margin: 0;
    font-size: 14px;
  } 
  
  .cart-items {
    max-height: 400px;
    overflow-y: scroll;
  }
  /* Styles for cart items */
  .cart-item {
    display: flex;
    align-items: flex-start; /* Align items to the start */
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }

  .cart-item img {
    width: 70px;
    height: 50px;
    margin-right: 10px;
  }

  /* Styles for item details */
  .item-details {
    flex: 1; /* Occupy remaining space */
  }
  
  /* Styles for cart summary */
  .cart-summary {
    margin-top: 20px;
  }

  .min-height-550 {
    height: 685.2px;
  }

  .remove-button {
    width: 50px; /* Fixed width */
    background-color: red; /* Change button background color to red */
    color: white; /* Change button text color to white */
    border: none; /* Remove button border */
    cursor: pointer; /* Change cursor to pointer */
  }

  /* Styles for submit button */
  .submit-button {
    background-color: blue; /* Change button background color to blue */
    color: white; /* Change button text color to white */
    border: none; /* Remove button border */
    cursor: pointer; /* Change cursor to pointer */
  }
  
  /* Add your component-specific styles here */
  </style>
  