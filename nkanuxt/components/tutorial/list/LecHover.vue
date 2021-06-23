<template>
  <p @mouseover="hovered=true" @mouseleave="hovered=false">{{ hovered ? row.lecture.verbose_name : row.lecture.name }}</p>
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
  // methods: {
  //   abbr: function (text) {
  //     let returnStr = "";
  //     var split_names = text.trim().split(" ");
  //     let abbrL = split_names;
  //     abbrL.forEach((element) => {
  //       returnStr = returnStr + element[0] + ". ";
  //     });
  //     return returnStr;
  //   },
  // }
};
</script>