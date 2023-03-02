<template>
    <div class="news">
        <h2 class="news__header" @click="fetchNews">Новости</h2>
        <div class="news__wrapper f-carousel" id="newsCarousel">
            <div class="news__item f-carousel__slide" v-for="item in news" :key="item.url" data-fancybox>
                <div class="news__row">
                    <p class="news__date">{{publishTime(item.publishedAt)}}</p>
                    <p class="news__source">{{item.author}}</p>
                </div>
                <a :href="item.url" class="news__text" target="_blank">{{item.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
// import {Carousel } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox.css";

// const container = document.getElementById("newsCarousel");
// const options = { infinite: false };
// new Carousel(container, options);

export default {
    data() {
        return {

        }
    },
    methods: {
        ...mapActions({
            fetchNews: 'newsModule/fetchNews',
        }),
        publishTime(t) {
            return moment(t).format("DD-MM-YYYY HH:mm");
        },
    },
    computed: {
        ...mapState({
            news: state => state.newsModule.news[0],
        }),
    },
    mounted() {
        this.fetchNews();
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins";
.news {
  &__row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__wrapper {
    padding: .5rem 0;
    display: flex;
    align-items: flex-start;
    gap: 8rem;
    overflow: auto;
  }

  &__item {
    flex: 1 0 calc((100% / 3) - (8rem / 3 * 2));
  }

  &__date {
    @include small();
  }

  &__source {
    @include small();
    color: var(--font-color-ghost);
  }

  &__text {
    @include text();
    line-height: 1.6;
    text-decoration: none;
    color: inherit;
  }
}

@media screen and (orientation: portrait) {
  .news {
    &__item {
      flex: 1 0 calc((100% / 2) - (8rem / 2));
    }
  }
}
</style>