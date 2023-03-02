<template>
  <div class="entry">
    <div class="entry__item">
      <PullIcon />
      <h5 class="entry__title">{{entryData.name}}</h5>
      <button class="entry__remove-btn" @click="remove">Удалить</button>
    </div>
  </div>
</template>
<script>
import PullIcon from "@/assets/pull.svg";

export default {
  props: {
    entryData: {
      type: Object
    },
  },
  methods: {
    remove() {
      this.$emit('removeEntry', this.entryData.id);
    }
  },
  components: {
    PullIcon
  }
  
}

</script>
<style lang="scss">
@import "@/assets/styles/mixins";

.entry {
  &__item {
    padding: 5px 10px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:active {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
  }

  &__title {
    @include small();
    font-weight: 400;
    margin-left: 10px;
    color: var(--color-bg);
  }

  &__remove-btn {
    padding: 8px 16px;
    background-color: var(--font-color);;
    border: 1px solid var(--font-color-ghost);
    cursor: pointer;
    margin-left: auto;
  }
}
</style>