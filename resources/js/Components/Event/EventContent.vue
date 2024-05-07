<template>
    <div class="nk-content-inner">
        <div class="nk-content-body">
            <div class="nk-block-head nk-block-head-sm">
                <div class="nk-block-between">
                    <div class="nk-block-head-content">
                        <h3 class="nk-block-title page-title">Recent Activities</h3>
                    </div>
                </div>
            </div>
            <div class="nk-block">
                <Timeline v-if="events.length > 0" :value="events" class="w-full md:w-20rem">
                    <template #content="slotProps">
                        {{ slotProps.item.status }}
                    </template>
                </Timeline>
            </div>
        </div>
    </div>
</template>


<script>
import Timeline from 'primevue/timeline';

export default {
    props: {
    },
    data() {
        return {
            events: [] // Will hold the events after fetching from the API
        }
    },
    components: {
        Timeline
    },
    methods: {
    },
    mounted() {
    }
}
</script>