<template>
  <tr id="tutitem" :class="active">
    <td class="px-6 py-4">
      <div class="flex items-center">
        <div>
          <div id="lecture" class="text-sm font-medium text-gray-900">
            {{ tutorial.lecture.verbose_name }}
          </div>
          <div class="text-sm text-gray-500">
            Subtitle
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4" @mouseover="hover = true; visibility(hover)" @mouseleave="hover = false; visibility(hover)" >
      <div class="text-sm text-gray-900">{{ tutorial.title }}</div>
      <div ref="desc" class="hidden">
        <span class="triangle"></span>
        <p class="overflow-ellipsis m-1 translate-y-10 text-left text-sm text-black relative">
            {{ putDotAtEnd(tutorial.description) }}
        </p>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex text-sm text-left font-medium text-gray-900">
            {{ tutorial.frequency }}<br>{{ tutorial.first_date }}.
        </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div class="flex-shrink-0 h-10 w-10">
          <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="">
        </div>
    </td>
    <td class="pl-6 py-4 whitespace-nowrap">
        <div class="flex text-sm text-center font-medium text-gray-900">
            <span style="font-size: 1.5em">
              <i class="sign in icon"></i>
            </span>
        </div>
    </td>
  </tr>
</template>

<script>
//child of TutList.vue
export default {
  //components: { TutDesc },
  props: {
    tutorial: {
      default: {}
    }
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    active: function() {
      if(typeof(this.tutorial.is_active) === "boolean") {
        return this.tutorial.is_active ? "bg-green-100" : "bg-red-100"
      }
      return "hidden"
    }
  },
  methods: {
    visibility: function(hvr) {
      console.log(hvr);
      hvr ? this.$refs.desc.setAttribute("class", "w-1/5 mt-3 h-auto translate-y-8 " + this.active + " border border-gray-400 absolute rounded shadow-2xl") : this.$refs.desc.setAttribute("class", "hidden")
    },
    putDotAtEnd: function(toBePut) {
      if (typeof(toBePut) === "string") return toBePut.slice(-1) == '.' ? toBePut : toBePut + '.';
      else return '';
    }
  }

}
</script>