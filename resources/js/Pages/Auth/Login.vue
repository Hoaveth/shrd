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
    canResetPassword: Boolean,
    status: String,
})

const form = useForm({
    email: '',
    password: '',
    remember: false
})

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    })
}
</script>
<template>

    <div class="nk-block-head">
        <div class="nk-block-head-content">
            <h5 class="nk-block-title">Sign-In</h5>
            <div class="nk-block-des">
                <p>Access the Portal using your email and passcode.</p>
            </div>
        </div>
    </div><!-- .nk-block-head -->

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
            <div class="form-label-group">
                <BreezeLabel for="password" value="Password" />
                <Link :href="route('password.request')" class="link link-primary link-sm" tabindex="-1">Forgot Password?</Link>
            </div>
            <div class="form-control-wrap">
                <BreezeInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required autofocus autocomplete="current-password" />
            </div>
        </div><!-- .form-group -->
        <div class="form-group">
            <button class="btn btn-lg btn-primary btn-block" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">Sign in</button>
        </div>
    </form>
</template>