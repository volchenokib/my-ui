<template>
  <div
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    class="loader"
    style="height: 23px; width: 23px;"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="21.904761904761905 21.904761904761905 43.80952380952381 43.80952380952381"
      style="transform: rotate(0deg);"
    >
      <circle
        fill="transparent"
        cx="43.80952380952381"
        cy="43.80952380952381"
        r="20"
        stroke-width="3.8095238095238093"
        stroke-dasharray="125.664"
        stroke-dashoffset="125.66370614359172px"
        class="loader__overlay"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "custom-loader"
};
</script>


<style lang="scss" scoped>
.loader {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  &__overlay {
    animation: progress-circular-dash 1.4s ease-in-out infinite;
    stroke-linecap: round;
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0px;
    stroke: white;
    z-index: 2;
    transition: all 0.6s ease-in-out;
  }
  svg {
    animation: progress-circular-rotate 1.4s linear infinite;
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }
}

@keyframes progress-circular-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125px;
  }
}

@keyframes progress-circular-rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>