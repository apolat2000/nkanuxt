<template>
  <div class="bg-gradient-to-t from-indigo-800 via-blue-600 to-indigo-800 h-full w-full text-gray-700">
    <div class="grid grid-cols-1 row-span-5 mx-4">
      <h1 class="text-base md:text-lg lg:text-xl font-bold mx-auto my-0 pt-8 pb-0 text-white uppercase">
        {{ tutName }}
      </h1>
      <h2 class="text-xs md:text-sm lg:text-base font-light mx-auto my-0 py-0 text-white">
        {{ isActive ? 'Active' : 'Inactive'}}
      </h2>
      <a
        @click="$router.push({ params: { page: 'summary' } })"
        :class="this.page === 'summary' ? this.classChosen : classNot"
        >Summary</a
      >
      <a
        @click="$router.push({ params: { page: 'announcements' } })"
        :class="this.page === 'announcements' ? this.classChosen : classNot"
        >Announcements</a
      >
      <a
        @click="$router.push({ params: { page: 'documents' } })"
        :class="this.page === 'documents' ? this.classChosen : classNot"
        >Documents</a
      >
      <a
        @click="$router.push({ params: { page: 'feed' } })"
        :class="this.page === 'feed' ? this.classChosen : classNot"
        >Feed</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "tut-page-side",
  props: {
    page: { type: String, default: "summary" },
    tutName: { type: String, default: "Tutorial" },
    isActive: { type: Boolean, default: false}
  },
  data() {
    return {
      open: false,
      classNot:
        "border border-black block px-3 py-2 mt-2 text-xs md:text-base lg:text-lg font-bold text-white bg-gray-600 rounded-lg focus:text-black hover:text-white hover:bg-gray-500 focus:outline-none focus:shadow-outline",
      classChosen:
        "block rounded-lg px-3 py-2 mt-2 text-xs md:text-base lg:text-lg font-bold text-gray-900 bg-nkayellow hover:text-gray-900 hover:bg-yellow-300 focus:text-black focus:outline-none focus:shadow-outline",
    };
  },
};
</script>
