<template>
  <i-datatable
    :count-column="false"
    :columns="columns"
    :rows="rows"
    :footer="false"
    @tr-click="goToTutorial"
  >
  </i-datatable>
</template>

<script>
import axios from "axios";
import IsActive from "./IsActive";
import LecHover from "./LecHover";
import TutorPp from "./TutorPp";

export default {
  name: "TutorialsList",
  data() {
    return {
      columns: [
        { title: "Lecture", path: "lecture", component: LecHover },
        { title: "Title", path: "title" },
        { title: "Scheduling", path: "scheduling" },
        { title: "Tutor", path: "tutor", component: TutorPp },
        { title: "", path: "isActive", component: IsActive },
      ],
      rows: [],
      tutorials: [],
      corpus: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/tutorials/is-no-query", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      })
      .then((response) => {
        console.log(response.data[0]);
        this.tutorials = response.data;
        this.listTuts();
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    getDesc: function (hovered, index) {
      if (hovered === "lecture") {
        axios
          .get(
            "http://localhost:3000/lecture/" + this.tutorials[index].lecture._id
          )
          .then((response) => {
            this.rows[index].lectureDesc = response.data.description;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    goToTutorial: function (event, row, rowIndex) {
      this.$router.push("/tutorials/" + this.rows[rowIndex].id + "/summary");
    },
    listTuts: function () {
      for (var i = 0; i < this.tutorials.length; i++) {
        this.rows.push({
          lecture: this.tutorials[i].lecture,
          title: this.tutorials[i].title,
          scheduling: this.tutorials[i].frequency,
          tutor: this.tutorials[i].tutor,
          isActive: this.tutorials[i].is_active,
          id: this.tutorials[i]._id,
        });
      }
    },
  },
};
</script>