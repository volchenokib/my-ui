<template>
  <button
    type="button"
    :class="['button', {'button--disabled': disabled}]"
    disabled="disabled"
    @click="onClick"
  >
    <span class="button__content" v-if="!loading">
      <!-- @slot The default Vue slot. Button text. -->
      <slot></slot>
    </span>
    <span class="button__loader" v-else>
      <!-- @slot Custom loader. For loader component -->
      <slot name="loader">
        <custom-loader />
      </slot>
    </span>
  </button>
</template>

<script>
import CustomLoader from "@/components/CustomLoader";

/**
 * It's just a button
 */

export default {
  name: "basic-button",
  components: { CustomLoader },

  props: {
    /**
     * Removes the ability to click or target the component
     */
    disabled: {
      type: Boolean,
      required: true,
      default: false
    },
    /**
     *  Adds a loading icon animation
     */
    loading: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  background-color: #6200ea;
  border: 1px solid #6200ea;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  position: relative;
  &__content {
    color: #ffffff;
    text-transform: uppercase;
  }
  &__loader {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  &--disabled {
    color: rgba(0, 0, 0, 0.26) !important;
    cursor: auto;
    background-color: rgba(0, 0, 0, 0.12) !important;
    border-color: rgba(0, 0, 0, 0.12) !important;
  }
}
</style>
