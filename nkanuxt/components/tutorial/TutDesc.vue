<template>
  <div
    v-if="hover"
    class= "w-1/5 mt-3 h-auto translate-y-8 bg-nkayellow absolute rounded-xl shadow-2xl"
  >
    <span class="triangle"></span>
    <div
    v-if="(corpus==='')"
      class="loader ease-linear rounded-full mx-auto my-12 border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
    ></div>
    <p
      class="select-none overflow-ellipsis p-4 translate-y-10 text-justify text-m text-black relative"
    >
      {{ corpus }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    corpus: {
      type: String,
      default: "",
    },
    hover: {
      type: Boolean,
      default: false,
    },
  }
};
//class="w-1/5 mt-3 h-auto translate-y-8 bg-gray-600 absolute rounded bg-opacity-50 shadow-2xl"
</script>

<style scoped>
.triangle {
  border-width: 0 6px 6px;
  border-color: transparent;
  border-bottom-color: gray;
  position: absolute;
  top: -6px;
  left: 17%;
}

.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>