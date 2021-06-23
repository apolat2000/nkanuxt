<template>
  <div>
      <img @click="$router.push('users/'+row.tutor._id)" v-if="row.tutor" width="32" class="border _rounded-circle" :src="ppStr(row.tutor.img_path)">
  </div>
</template>

<script>
export default {
  name: "LecHover",
  props: ["row"],
  data() {
      return {
          hovered: false
      }
  },
  methods: {
      ppStr: function(img_path) {
          return img_path === "" ? "http://localhost:3000/profilepics/defUser.png" : "http://localhost:3000/"+img_path
      }
  },
};
</script>