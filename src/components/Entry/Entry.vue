<template>
  <div class="entry">
    <div class="entry__item">
      <PullIcon />
      <h5 class="entry__title">{{entryData.name}}</h5>
      <button class="entry__remove-btn" @click="remove">Remove</button>
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
    margin-left: 10px;
  }

  &__remove-btn {
    padding: 8px 16px;
    background-color: white;
    border: 1px solid gainsboro;
    cursor: pointer;
    margin-left: auto;

    &:hover {
      background-color: rgb(252, 194, 194);
      border-color: rgb(252, 194, 194);
    }
  }
}
</style>