<template>
  <button
    type="button"
    :class="[
			'button',
			'elevation',
			{ 'button--disabled': disabled },
			{ 'button--outlined': outlined },
		]"
    :style="{ backgroundColor: color, borderColor: color }"
    :disabled="disabled"
    :loading="loading"
    @click="buttonClickHandler"
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
// TODO:
// сделать кнопки текст + иконка, иконка
// аутлайн кнопка
// подключить несколько историй в индекс файл
// почему контролсы не работают на вкладке канва
// анимация для кнопки
import CustomLoader from "@/components/CustomLoader";

/**
 * The my-btn component replaces the standard html button with a material design theme and a multitude of options.
 */

export default {
  name: "my-btn",
  components: { CustomLoader },

  props: {
    /**
     *  Applies specified color to the control
     */
    color: {
      type: String,
      required: false,
      default: "#1867c0",
    },
    /**
     * Removes the ability to click or target the component
     */
    disabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    /**
     *  Adds a loading icon animation
     */
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },

    /**
     *  Makes the background transparent and applies a thin border.
     */
    outlined: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    buttonClickHandler() {
      /**
       *  Event that is emitted when the component is clicked
       */
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  cursor: pointer;
  font-size: 1em;
  height: 36px;
  min-width: 64px;
  outline: 0;
  padding: 0 16px;
  position: relative;
  text-transform: uppercase;
  transition-duration: 1s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    border-radius: inherit;
    bottom: 0;
    color: #ffffff;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
    background-color: currentColor;
  }
  &:hover {
    opacity: 0.8;
  }
  &:not(.button--outlined):focus::before {
    opacity: 0.24;
  }
  &:not(.button--outlined):focus {
    box-shadow: none !important;
  }
  &:not(.button--disabled) {
    will-change: box-shadow;
  }
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
  &--color {
    background-color: #6200ea;
  }
  &--disabled {
    color: rgba(0, 0, 0, 0.26) !important;
    cursor: auto;
    background-color: rgba(0, 0, 0, 0.12) !important;
    border-color: rgba(0, 0, 0, 0.12) !important;
  }
  &--outlined {
    background-color: transparent !important;
    border: thin solid;
  }
}

// .elevation {
//   box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
//     0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
// }
</style>
