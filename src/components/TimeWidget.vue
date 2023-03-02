<template>
    <div class="time">
        <h1>{{ currentTime }}</h1>
        <h3 class="time__date">{{ currentDay }}</h3>
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
        },
        currentDay() {
            return moment(this.time).locale('ru').format("DD MMMM YYYY");
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

<style lang="scss" scoped>
@import "@/assets/styles/mixins";
.time {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 2rem;
    
    &__date {
        @include text();
        align-self: flex-end;
        font-weight: 900;
        margin-top: 0.5rem;
    }
}

@media screen and (orientation: portrait) {
    .time {
        &__date {
            align-self: flex-start;
        }
        position: relative;
    }
}
</style>