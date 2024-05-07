<script setup></script>
<template>
    <div class="nk-app-root">
        <!-- main @s -->
        <div class="nk-main ">
            <!-- wrap @s -->
            <div class="nk-wrap nk-wrap-nosidebar">
                <!-- content @s -->
                <div class="nk-content ">
                    <div class="nk-split nk-split-page nk-split-md">
                        <div class="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                            <div class="nk-block nk-block-middle nk-auth-body">
                                <div class="brand-logo pb-5">
                                    <Link :href="route('login')" class="logo-link">
                                        <img class="logo-light logo-img logo-img-lg" src="../../images/shopify_app.png" srcset="../../images/shopify_app.png" alt="logo">
                                        <img class="logo-dark logo-img logo-img-lg" src="../../images/shopify_app.png" srcset="../../images/shopify_app.png" alt="logo-dark">
                                    </Link>
                                </div>
                                <slot />
                            </div><!-- .nk-block -->
                            <div class="nk-block nk-auth-footer">
                                <div class="mt-3">
                                    <p>&copy; 2023 Getlive.help</p>
                                </div>
                            </div><!-- .nk-block -->
                        </div><!-- .nk-split-content -->
                        <div class="nk-split-content nk-split-stretch bg-abstract decorative-bg"></div><!-- .nk-split-content -->
                    </div><!-- .nk-split -->
                </div>
                <!-- wrap @e -->
            </div>
            <!-- content @e -->
        </div>
        <!-- main @e -->
    </div>
</template>
<style scoped>
.decorative-bg {
    background: url('../../themes/dashlite-v3.1.3/img/embossed-diamond.png');
}
</style>