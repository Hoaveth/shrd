<script>
export default {
    props: { 
    },
    data() {
        return {
            timelineItems: [
                { type: 'info', date: '2022-01-01', event: 'Event 1' },
                { type: 'success', date: '2022-02-15', event: 'Event 2' },
                { type: 'info', date: '2022-03-20', event: 'Event 3' },
                { type: 'success', date: '2022-04-10', event: 'Event 4' },
            ],
        }
    },
}
</script>

<template>
    <div>
      <h1>Timeline Demo</h1>
      <Timeline :value="timelineItems" align="alternate">
        <template #item="{item}">
          <div class="p-3">
            <div class="p-badge" :class="{'p-badge-info': item.type === 'info', 'p-badge-success': item.type === 'success'}">
              {{ item.type }}
            </div>
            <div>{{ item.date }}</div>
            <div>{{ item.event }}</div>
          </div>
        </template>
      </Timeline>
    </div>
  </template>
