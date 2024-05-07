<template>
    <div>
        <div v-if="showCustomerModal" class="modal fade show" id="modalForm" aria-modal="true" role="dialog"
            style="display: block;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Customer Info</h5>
                        <button type="button" class="close" @click="closeModal">
                            <em class="icon ni ni-cross"></em>
                        </button>
                    </div>
                    <div class="modal-body">
                        <dynamic-form :submit-form="submitForm" :form-render-key="formRenderKey" :form-data="formData"
                            :formSchema="formSchema" :storeId="storeId" :add-field="addField"></dynamic-form>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showCustomerModal" class="modal-backdrop fade show" style="display: block;"></div>
    </div>
</template>

  
<script>
import DynamicForm from '../DynamicForm.vue';
import { Inertia } from '@inertiajs/inertia';

export default {
    data() {
        return {
            formData: this.getInitialFormData(),
            formRenderKey: 0,
            storeId: this.storeId
        }
    },
    components: {
        DynamicForm
    },
    props: {
        showCustomerModal: Boolean,
        customerData: Object,
        storeId:String,
        formSchema: {
            type: Array,
            required: true
        }
    },
    watch: {
        showCustomerModal(newVal) {
            if (newVal) {
                this.populateFormData();
            }
        }
    },
    methods: {
        closeModal() {
            Object.assign(this.formData, this.getInitialFormData());
            this.$emit('update:showCustomerModal', false);
        },
        getInitialFormData() {
            return {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                addresses: [this.getDefaultAddress()],
                shop: this.storeId
            };
        },
        getDefaultAddress() {
            return {
                address1: '',
                city: '',
                province: '',
                zip: '',
                country: '',
            };
        },
        populateFormData() {
            if (this.customerData) {
                this.formData = { ...this.customerData };
            } else {
                Object.assign(this.formData, this.getInitialFormData());
            }
        },
        addField(arrayFieldName) {
            const newItem = this.getDefaultItemForArray(arrayFieldName);

            if (newItem) {
                this.formData[arrayFieldName] = [...this.formData[arrayFieldName], newItem];
                this.formRenderKey++;
            }

        },
        getDefaultItemForArray(arrayFieldName) {
            // Define the default item structure based on the array field name
            switch (arrayFieldName) {
                case 'addresses':
                    return {
                        address1: '',
                        city: '',
                        province: '',
                        zip: '',
                        country: ''
                    };
                // Add cases for other arrays as needed
                default:
                    return null;
            }
        },
        submitForm() {
            const url = this.customerData ? `/customers/${this.customerData.id}` : '/customers/';
            const method = this.customerData ? 'put' : 'post';

            Inertia[method](url, this.formData, {
                onSuccess: (page) => {
                    this.closeModal();
                    // Delay the event emission to ensure the modal is closed before refreshing
                    // if (page.props.customers) {
                    //     setTimeout(() => {
                            this.$emit('customersUpdated', page.props.customers);
                    //     }, 10000);
                    // }
                },
                onError: (errors) => {
                    // Handle errors here
                }
            });
        },



    }
};
</script>
  
<style scoped>
/* Your component-specific styles here */
.modal-body{
    height: 500px;
    overflow-x: scroll;
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
  