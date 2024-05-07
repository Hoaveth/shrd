<script>
import Guest from '@/Layouts/Guest.vue'
export default {
    layout: Guest
}
</script>

<script setup>
import BreezeInput from '@/Components/Input.vue'
import BreezeLabel from '@/Components/Label.vue'
import BreezeValidationErrors from '@/Components/ValidationErrors.vue'

import { useForm } from '@inertiajs/inertia-vue3'

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'))
}
</script>
<template>
    <Head title="Forgot Password" />

    <div class="nk-block-head">
        <div class="nk-block-head-content">
            <h5 class="nk-block-title">Forget Password?</h5>
            <div class="nk-block-des">
                <p>No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</p>
            </div>
        </div>
    </div><!-- .nk-block-head -->

    <div v-if="status" class="mb-4 text-sm">
        {{ status }}
    </div>

    <BreezeValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
        <div class="form-group">
            <div class="form-label-group">
                <BreezeLabel for="email" value="Email" />
            </div>
            <div class="form-control-wrap">
                <BreezeInput id="email" type="email" v-model="form.email" required autofocus autocomplete="username" />
            </div>
        </div><!-- .form-group -->
        <div class="form-group">
            <button class="btn btn-lg btn-primary btn-block" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">Email Password Reset Link</button>
        </div>
    </form>
</template>