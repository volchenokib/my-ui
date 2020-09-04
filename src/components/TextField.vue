<template>
  <div :class="['v-input', 'v-text-field', classes]">
    <div class="v-input__control">
      <div class="v-input__slot">
        <div class="v-text-field__slot">
          <label
            for="input-928"
            :class="['v-label', {'v-label--active': value || isFocused}, {'v-label--disabled': disabled}]"
            style="left: 0px; right: auto; position: absolute;"
          >Name</label>
          <input
            :value="value"
            :autofocus="autofocus"
            :disabled="disabled"
            class="input"
            id="input-928"
            type="text"
            ref="input"
            @focus="onFocus"
            @blur="onBlur"
            @input="onInput"
          />
        </div>
      </div>
      <div class="v-text-field__details" v-if="showDetails">
        <div class="v-messages error--text" role="alert">
          <div class="v-messages__wrapper">
            <div class="v-messages__message">{{messagesToDisplay}}</div>
          </div>
        </div>
        <!-- <div class="v-counter">0 / 10</div> -->
      </div>
    </div>
  </div>
</template>


<script>
// TODO:
// - анимация бордера в состоянии  active/blur
// - состояние error

export default {
  name: "TextField",
  props: {
    value: {
      required: false
    },
    autofocus: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    hideDetails: {
      type: [Boolean, String],
      required: false,
      default: "auto"
    },
    errorCount: {
      type: [Number, String],
      default: 1
    },
    errorMessages: {
      type: [String, Array],
      default: () => []
    },
    rules: {
      type: [String, Array],
      default: () => []
    }
  },

  data() {
    return {
      hasState: false,
      isFocused: false,
      lazyValue: this.value
    };
  },

  mounted() {
    this.autofocus && this.tryAutofocus();
  },

  watch: {
    value(val) {
      this.lazyValue = val;
    },
    rules: {
      handler(newVal, oldVal) {
        if (deepEqual(newVal, oldVal)) return;
        this.validate();
      },
      deep: true
    }
    // isFocused(val) {
    //   // Should not check validation if disabled
    //   if (!val && !this.disabled) {
    //     this.hasFocused = true;
    //     this.validateOnBlur && this.$nextTick(this.validate);
    //   }
    //   this.updateValue(val);
    // }
    // isFocused: "updateValue"
  },

  computed: {
    classes() {
      return {
        "v-input--has-state": this.hasState,
        "v-input--is-focused": this.isFocused,
        "v-input--is-label-active": this.isLabelActive,
        "v-input--is-disabled": this.disabled
      };
    },
    isLabelActive() {
      return this.isDirty;
    },
    isDirty() {
      return !!this.lazyValue;
    },
    hasMessages() {
      return true; // this.validationTarget.length > 0
    },
    messagesToDisplay() {
      // if (this.hasHint) return [this.hint]

      if (!this.hasMessages) return [];

      return this.validations
        .map(validation => {
          if (typeof validation === "string") return validation;

          const validationResult = validation(this.internalValue);

          return typeof validationResult === "string" ? validationResult : "";
        })
        .filter(message => message !== "");
    },
    hasDetails() {
      return this.messagesToDisplay.length > 0;
    },
    showDetails() {
      return (
        this.hideDetails === false ||
        (this.hideDetails === "auto" && this.hasDetails)
      );
    },
    internalValue: {
      get() {
        return this.lazyValue;
      },
      set(val) {
        this.lazyValue = val;
        this.$emit("input", this.lazyValue);
      }
    },
    validations() {
      return this.validationTarget.slice(0, Number(this.errorCount));
    },
    validationTarget() {
      if (this.internalErrorMessages.length > 0) {
        return this.internalErrorMessages;
      } else return [];
    },
    internalErrorMessages() {
      return this.genInternalMessages(this.errorMessages);
    }
  },

  methods: {
    onFocus(e) {
      if (!this.$refs.input) return;

      if (document.activeElement !== this.$refs.input) {
        return this.$refs.input.focus();
      }

      if (!this.isFocused) {
        this.isFocused = true;
        e && this.$emit("focus", e);
      }
    },
    onBlur(e) {
      this.isFocused = false;
      e && this.$nextTick(() => this.$emit("blur", e));
    },
    onInput(e) {
      const target = e.target;
      this.internalValue = target.value;
      // this.badInput = target.validity && target.validity.badInput
    },
    tryAutofocus() {
      if (
        !this.autofocus ||
        typeof document === "undefined" || // ?
        !this.$refs.input ||
        document.activeElement === this.$refs.input
      )
        return false;

      this.$refs.input.focus();

      return true;
    },
    genInternalMessages(messages) {
      if (!messages) return [];
      else if (Array.isArray(messages)) return messages;
      else return [messages];
    },
    deepEqual(a, b) {
      if (a === b) return true;

      //   if (a instanceof Date && b instanceof Date) {
      //     // If the values are Date, they were convert to timestamp with getTime and compare it
      //     if (a.getTime() !== b.getTime()) return false;
      //   }

      if (a !== Object(a) || b !== Object(b)) {
        // If the values aren't objects, they were already checked for equality
        return false;
      }

      const props = Object.keys(a);

      if (props.length !== Object.keys(b).length) {
        // Different number of props, don't bother to check
        return false;
      }

      return props.every(p => deepEqual(a[p], b[p]));
    }
  }
};
</script>


<style lang="scss" scoped>
.v-input {
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  font-size: 16px;
  letter-spacing: normal;
  max-width: 100%;
  text-align: left;
  &--is-label-active {
  }
  &--has-state {
  }
  &--is-disabled {
    color: rgba(0, 0, 0, 0.38);
  }
}

.v-text-field {
  margin-top: 4px;
  padding-top: 12px;
  &__detailss {
    display: flex;
    flex: 1 0 auto;
    max-width: 100%;
    min-height: 14px;
    overflow: hidden;
  }
}

.v-input__control {
  display: flex;
  flex-direction: column;
  height: auto;
  flex-grow: 1;
  flex-wrap: wrap;
  min-width: 0;
  width: 100%;
}

.v-input__slot {
  align-items: center;
  color: inherit;
  cursor: text;
  display: flex;
  margin-bottom: 8px;
  min-height: inherit;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  width: 100%;
  &::before {
    content: "";
    border-color: rgba(0, 0, 0, 0.42);
    border-style: solid;
    border-width: thin 0 0;
    bottom: -1px;
    left: 0;
    position: absolute;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    width: 100%;
  }
}

.v-input--is-disabled .v-input__slot::before {
  // prettier-ignore
  border-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.38), 0px, rgba(0, 0, 0, 0.38), 2px, transparent 2px, transparent 4px) 1 repeat;
}

.v-input--is-focused:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:before {
  border-color: #1867c0;
  border-width: medium 0 0;
}

.v-text-field:not(.v-input--is-focused):hover
  > .v-input__control
  > .v-input__slot:before {
  border-color: rgba(0, 0, 0, 0.87);
}

.v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  display: flex;
  flex: 1 1 auto;
  position: relative;
}

.v-label {
  color: rgba(0, 0, 0, 0.6);
  height: 20px;
  line-height: 20px;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  position: absolute;
  font-size: 16px;
  min-height: 8px;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  &--active {
    transform: translateY(-18px) scale(0.75);
  }
  &--disabled {
    color: rgba(0, 0, 0, 0.38);
  }
}

.v-input--is-focused
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > .v-label--active {
  color: #1867c0;
}

.input {
  color: rgba(0, 0, 0, 0.87);
  background-color: transparent;
  border-style: none;
  max-height: 2rem;
  flex: 1 1 auto;
  line-height: 20px;
  outline: none;
  padding: 8px 0;
  max-width: 100%;
  min-width: 0;
  width: 100%;
}

.v-input--is-focused
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  .input {
  caret-color: #6200ea;
}

.v-input--is-disabled
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  .input {
  color: rgba(0, 0, 0, 0.38);
}

.v-text-field__details {
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  min-height: 14px;
  overflow: hidden;
}

.v-messages {
  color: rgba(0, 0, 0, 0.6);
  flex: 1 1 auto;
  font-size: 12px;
  min-height: 14px;
  min-width: 1px;
  position: relative;
  &__wrapper {
  }
  &__message {
    line-height: 12px;
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }
}

.v-counter {
  color: rgba(0, 0, 0, 0.6);
  margin-left: 8px;
  white-space: nowrap;
  flex: 0 1 auto;
  font-size: 12px;
  min-height: 12px;
  line-height: 12px;
}

.error {
  &--text {
    caret-color: #ff5252 !important;
    color: #ff5252 !important;
    text-align: left;
  }
}
</style>