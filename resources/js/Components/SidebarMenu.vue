<script setup>
import { usePage } from "@inertiajs/inertia-vue3";
import { computed } from "vue";

const page = usePage()
const user = computed(() => page.props.value.auth.user)
</script>
<template>
    <div class="nk-sidebar nk-sidebar-fixed" data-content="sidebarMenu">
        <div class="nk-sidebar-element nk-sidebar-head">
            <div class="nk-menu-trigger">
                <a href="#" class="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em class="icon ni ni-arrow-left"></em></a>
                <a href="#" class="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em class="icon ni ni-menu"></em></a>
            </div>
            <div class="nk-sidebar-brand">
                <Link :href="route('customers.index')" class="logo-link nk-sidebar-logo">
                    <img class="logo-light logo-img" src="../../images/shopify_app.png" srcset="../../images/shopify_app.png" alt="logo">
                    <img class="logo-dark logo-img" src="../../images/shopify_app.png" srcset="../../images/shopify_app.png" alt="logo-dark">
                </Link>
            </div>
        </div>
        <div class="nk-sidebar-element nk-sidebar-body">
            <div class="nk-sidebar-content">
                <div class="nk-sidebar-menu" data-simplebar>
                    <ul class="nk-menu">
                        <li class="nk-menu-heading">
                            <h6 class="overline-title text-primary-alt">Menu</h6>
                        </li>
                        <li class="nk-menu-item">
                            <Link :href="route('home.dashboard')" :class="{'active': $page.component.includes('dashboard')}" class="nk-menu-link">
                                <span class="nk-menu-icon"><em class="icon ni ni-meter"></em></span>
                                <span class="nk-menu-text">Dashboard</span>
                            </Link>
                        </li>
                        <li class="nk-menu-item">
                            <Link :href="route('customers.index')" :class="{'active': $page.component.includes('customers')}" class="nk-menu-link">
                                <span class="nk-menu-icon"><em class="icon ni ni-user-list-fill"></em></span>
                                <span class="nk-menu-text">Customers</span>
                            </Link>
                        </li>
                        <li class="nk-menu-item">
                            <Link :href="route('orders.index')" :class="{'active': $page.component.includes('orders')}" class="nk-menu-link">
                                <span class="nk-menu-icon"><em class="icon ni ni-cart-fill"></em></span>
                                <span class="nk-menu-text">Orders</span>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>