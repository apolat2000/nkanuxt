<template>
  <div class="_display-flex _flex-direction-column _justify-content-start">
    <i-form
      class="_margin-x-4 _diplay-flex _flex-direction-column _width-25"
      @submit.prevent="handleSubmit"
      accept-charset="UTF-8"
      method="post"
    >
      <i-textarea v-model="comment_content" :placeholder="place_holder" />
      <div class="_display-flex _justify-items-center">
        <i-select
          @input="place_holder = typ === 'ask' ? '🤔' : '🤓'"
          v-model="typ"
        >
          <i-select-option :value="'ask'" label="ask" />
          <i-select-option :value="'say'" label="say" />
        </i-select>
        <i-select v-model="to">
          <i-select-option :value="'CLASS'" label="to the class" />
          <i-select-option :value="'TUTOR'" label="to the tutor" />
          <i-select-option :value="'ALL'" label="to all" />
        </i-select>
        <i-button
          ><img style="height: 21px" src="../../../assets/lightning.png"
        /></i-button>
      </div>
    </i-form>
    <div class="_margin-x-4" id="task-comments">
      <feed-item
        @reloadComments="reloadComment()"
        v-bind:key="comment._id"
        v-for="comment in comments"
        :comment="comment"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import FeedItem from "./FeedItem.vue";
export default {
  components: { FeedItem },
  props: {
    tutorialId: String,
    isTutor: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: false },
    scope: { type: String, default: "global" },
  },
  data() {
    return {
      comments: [],
      comment_content: "",
      place_holder: "🤔",
      to: "CLASS",
      typ: "ask",
    };
  },
  async mounted() {
    this.grabComments();
  },
  methods: {
    getScope() {
      return this.isTutor ? "tutor" : this.isStudent ? "student" : "global";
    },
    reloadComment() {
      this.grabComments();
    },
    handleSubmit: async function postComment() {
      if (this.comment_content !== "") {
        try {
          let comment = {
            value: this.comment_content,
            userId: localStorage.getItem("userID"),
            isAsk: this.typ === "ask" ? true : false,
            visibility: this.to,
          };
          console.log(comment);
          var res = await axios.post(
            "http://localhost:3000/discussion/" + this.tutorialId,
            comment,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
              },
            }
          );
          if (res.status === 200) {
            this.grabComments();
            this.comment_content = "";
          }
        } catch (err) {
          alert("An error occured: ", err);
        }
      }
      return false;
    },
    async grabComments() {
      try {
        let result = await axios.get(
          "http://localhost:3000/discussion/" + this.tutorialId,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
              Scope: this.scope,
            },
          }
        );
        this.comments = result.data;
      } catch (err) {
        console.log(err.message);
        localStorage.clear();
        this.$router.push("/login");
        this.$root.$refs.Navbar.reloadNav();
        console.log("Logged out");
      }
    },
  },
};
</script>
