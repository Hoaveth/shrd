<script setup>
import { usePage } from "@inertiajs/inertia-vue3";
import { computed, onMounted, reactive } from "vue";

const page = usePage()
const user = computed(() => page.props.value.auth.user)
</script>
<template>
    <div class="nk-header nk-header-fixed is-light">
        <div class="container-fluid">
            <div class="nk-header-wrap">
                <div class="nk-header-brand ms-3 ms-xl-0">
                    <a href="#" class="logo-link">
                        <img class="logo-light logo-img" src="../../images/favicon_lightning.png"
                            srcset="../../images/favicon_lightning.png" alt="logo">
                        <img class="logo-dark logo-img" src="../../images/favicon_lightning.png"
                            srcset="../../images/favicon_lightning.png" alt="logo-dark">
                    </a>
                </div>
                <div class="nk-header-tools">
                    <ul class="nk-quick-nav">
                        <li class="dropdown user-dropdown">
                            <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                                <div class="user-toggle">
                                    <div class="user-avatar sm">
                                        <img v-if="user.photo_url != null" :src="user.photo_url" />
                                        <em v-else class="icon ni ni-user-alt"></em>
                                    </div>
                                    <div class="user-info d-none d-md-block">
                                        <div class="user-status">Welcome back!</div>
                                        <div v-if="user" class="user-name dropdown-indicator">{{ user.name }}</div>
                                    </div>
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1">
                                <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                    <div class="user-card">
                                        <div class="user-avatar">
                                            <img v-if="user.photo_url != null" :src="user.photo_url" />
                                            <em v-else class="icon ni ni-user-alt"></em>
                                        </div>
                                        <div class="user-info">
                                            <span v-if="user" class="lead-text">{{ user.name }}</span>
                                            <span v-if="user" class="sub-text">{{ user.email }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown-inner">
                                    <ul class="link-list">
                                        <li><a href="#"><em class="icon ni ni-user-alt"></em><span>View Profile</span></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="dropdown-inner">
                                    <ul class="link-list">
                                        <li>
                                            <Link :href="route('logout')" method="post" as="button"><em
                                                class="icon ni ni-signout"></em><span>Sign out</span></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li><!-- .dropdown -->
                        <li class="dropdown notification-dropdown me-n1">
                            <a href="#" class="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                                <!-- <div class="icon-status icon-status-info"></div> -->
                                <em class="icon ni ni-setting-alt"></em>
                            </a>
                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-end dropdown-menu-s1">
                                <!-- <div class="dropdown-head">
                                    <a href="#">Mark All as Read</a>
                                </div> -->
                                <div class="dropdown-body">
                                    <div class="nk-notification">
                                        <div class="nk-notification-item dropdown-inner">
                                            <a href="#" @click="goToCreateUser()">User Management</a>
                                        </div>
                                        <div class="nk-notification-item dropdown-inner">
                                            <a href="#" @click="goToCreateStore()">Store Management</a>
                                        </div>
                                    </div><!-- .nk-notification -->
                                </div><!-- .nk-dropdown-body -->
                            </div>
                        </li><!-- .dropdown -->
                    </ul><!-- .nk-quick-nav -->
                </div><!-- .nk-header-tools -->
            </div><!-- .nk-header-wrap -->
        </div><!-- .container-fliud -->
    </div>
</template>
<script>
import { Inertia } from '@inertiajs/inertia';
import Swal from "sweetalert2";
export default {
    data() {
    return {

    };
  },
  methods:{
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
    goToCreateUser(){
        const url = '/create-user';

        this.navigateWithInertiaEvents(url, {
            onStart: () => {
                this.showLoadingAlert();
            },
            onFinish: () => {
                this.closeLoadingAlert();
            }
        });
    },
    goToCreateStore(){
        const url = '/create-store';
        this.navigateWithInertiaEvents(url, {
            onStart: () => {
                this.showLoadingAlert();
            },
            onFinish: () => {
                this.closeLoadingAlert();
            }
        });
    },
  }
}
</script>
<style scoped>
.link-list button {
    background: none;
    border: 0;
    outline: 0;
    display: flex;
    align-items: center;
    color: #526484;
    font-size: 13px;
    line-height: 1.4rem;
    font-weight: 500;
    padding: 0.575rem 0;
    position: relative;
}</style>