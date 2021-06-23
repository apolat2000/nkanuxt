<template>
  <div
    class="_border _padding-1 _display-flex _flex-direction-column _justify-items-start"
    v-if="comment.userId"
  >
    <div class="_display-flex _justify-items-start _align-items-center">
      <img
        alt="avatar"
        width="48"
        height="48"
        @click="$router.push(`/users/${comment.userId._id}`)"
        class="rounded-full w-10 h-10 shadow-lg cursor-pointer _rounded-circle"
        :src="getImage()"
      />
      <div class="_display-flex flex-row _justify-content-space-between _width-100">
        <div class="_display-flex _flex-direction-column _justify-items-start _margin-left-2">
          <p
            @click="$router.push(`/users/${comment.userId._id}`)"
            class="_margin-bottom-0 _text-purple _font-weight-semibold"
          >
            @{{ comment.userId.username }}
          </p>
          <p class="_margin-top-0 _text-gray">
            {{ niceDate(comment.creation_date) }}
          </p>
        </div>
        <p class="_text-gray">Was asked<br>{{ getScope() }}.</p>
      </div>
    </div>
    <div class="_margin-y-1">
      <h5 class="_margin-bottom-1 _text-black _width-100">
        {{ comment.value }}
      </h5>

      <div v-if="isCommenter()">
        <i-button circle outline title="Delete Comment" @click="deleteComment()">
          <i class="trash icon _margin-0" />
        </i-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    comment: {},
  },
  methods: {
    getScope() {
      return this.comment.visibility === "TUTOR"
        ? "to the tutor"
        : this.comment.visibility === "CLASS"
        ? "to the class"
        : "to everyone";
    },
    niceDate: function (myDate) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dateObj = new Date(myDate);
      const month = monthNames[dateObj.getMonth()];
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      const hours =
        String(dateObj.getHours()).length === 1
          ? "0" + dateObj.getHours()
          : dateObj.getHours();
      const mins =
        String(dateObj.getMinutes()).length === 1
          ? "0" + dateObj.getMinutes()
          : dateObj.getMinutes();
      const output = day + " " + month + " " + year + ", " + hours + ":" + mins;
      return output;
    },
    getImage() {
      console.log(this.comment.userId);
      console.log(this.comment.userId.img_path);
      if (this.comment.userId) {
        if (this.comment.userId.img_path) {
          console.log('hey');
          return "http://localhost:3000/" + this.comment.userId.img_path;
        }
      }
      return "https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png";
    },
    isCommenter() {
      return this.comment.userId._id === localStorage.getItem("userID");
    },
    async deleteComment() {
      try {
        var res = await axios.delete(
          "http://localhost:3000/discussion/" + this.$route.params.id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
              CommentId: this.comment._id,
            },
          }
        );
        if (res.status === 200) {
          this.$emit("reloadComments");
        }
      } catch (err) {
        alert("An error occured");
        console.log(err);
      }
    },
  },
};
</script>
