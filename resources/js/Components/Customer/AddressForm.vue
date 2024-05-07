<template>
    <div>
        <div class="form-group">
            <label class="form-label" for="address1">Address</label>
            <div class="form-control-wrap">
                <input type="text" class="form-control" id="address1" placeholder="123 Oak St">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label" for="city">City</label>
            <div class="form-control-wrap">
                <input type="text" class="form-control" id="city" placeholder="Ottawa">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label" for="province">Province</label>  
            <div class="form-control-wrap">
                <input type="text" class="form-control" id="province" placeholder="ON">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label" for="zip">Zip Code</label>
            <div class="form-control-wrap">
                <input type="text" class="form-control" id="zip" placeholder="123 ABC">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label" for="country">Country</label>
            <div class="form-control-wrap">
                <input type="text" class="form-control" id="country" placeholder="CA">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            address: {
                address1: '',
                city: '',
                province: '',
                zip: '',
                country: ''
            }
        };
    },
    // You might want to include methods, computed properties, or watchers as needed
};
</script>

<style scoped>
/* Your styles here */
</style>
