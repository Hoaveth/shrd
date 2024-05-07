<template>
    <Form @submit="submitForm" :initial-values="formData" :key="formRenderKey">
        <div class="form-group" v-for="field in formSchema" :key="field.model">
            <button v-if="field.type === 'array'" @click="addField('addresses')" type="button"
                class="btn btn-lg btn-primary">Add Address</button>
            <div v-if="field.type === 'array'">

                <FieldArray :name="field.model">
                    <template v-slot="{ fields }">
                        <div v-for="(item, index) in fields" :key="index">
                            <div v-for="nestedField in field.schema" :key="nestedField.model">
                                <label class="form-label" :for="nestedField.model">{{ nestedField.label }}</label>
                                <Field :id="`${field.model}-${nestedField.model}-${index}`"
                                    :name="`${field.model}[${index}].${nestedField.model}`"
                                    v-model="formData[field.model][index][nestedField.model]"
                                    :type="nestedField.type" :class="nestedField.class" />
                                <span class="invalid">
                                    <ErrorMessage :name="`${field.model}[${index}].${nestedField.model}`" />
                                </span>
                            </div>
                        </div>
                    </template>
                </FieldArray>
            </div>

            <div v-if="field.type !== 'array'">
                <label class="form-label" :for="field.model">{{ field.label }}</label>
                <div class="form-control-wrap">
                    <Field :class="field.class" :id="field.model" :name="field.model" :type="field.type"
                        :rules="field.rules" v-model="formData[field.model]" />
                    <span class="invalid">
                        <ErrorMessage class="invalid" :name="field.model" />
                    </span>
                </div>

            </div>
        </div>
            <input :id="shop" :name="shop" :value="storeId" hidden>
        <div>
            <div class="form-group"><button type="submit" class="btn btn-lg btn-primary">Save Informations</button></div>
        </div>

    </Form>
</template>
  
<script>
import { Field, Form, ErrorMessage, FieldArray } from 'vee-validate';

export default {
    components: {
        Field, Form, ErrorMessage, FieldArray
    },
    props: {
        formSchema: {
            type: Array,
            required: true
        },
        formData: {
            type: Object,
            required: true
        },
        addField: {
            type: Function,
            required: false
        },
        submitForm: {
            type: Function,
            required: false
        },
        formRenderKey: {
            type: Number,
            required: true
        },
        storeId: String
    }

};
</script>
  
<style>
    label{
        color: white !important;
    }
</style>