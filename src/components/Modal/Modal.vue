<template>
  <div class="modal">
    <div class="modal__head">
      <slot name="header"></slot>
    </div>
    <div class="modal__body">
      <slot name="body"></slot>
    </div>
    <div class="modal__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }
}
</script>
<style lang="scss">
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f6f6f6;
  box-shadow: 0 0 6px rgba(60,60,60,.16);
  padding: 30px;
  z-index: 100;

  &__head {
    margin: 0 0 20px;
  }

  &__close-btn {
    background: none;
    border: 0;
    cursor: pointer;
  }

&__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>