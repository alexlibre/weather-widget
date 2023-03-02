<template>
    <div class="time">
        <h1>{{ currentTime }}</h1>
    </div>
</template>
<script>
import moment from 'moment';

export default {
    data() {
        return {
            time: Date.now()
        }
    },
    computed: {
        currentTime() {
            return moment(this.time).format("HH:mm:ss");
        }
    },
    methods: {
        getTime() {
            setInterval(() => {
                this.time = Date.now()
            }, 1000)
        }
    },
    mounted() {
        this.getTime();
    }
}
</script>