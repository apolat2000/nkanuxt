<template>
  <i-container fluid>
    <i-row top-xs class="_padding-1">
      <i-column xs="12" sm="8" style="height: 100%">
        <div
          style="height: 100%"
          class="_border _border-color-gray-70 _background-gray-20 _rounded _padding-1 _margin-bottom-1"
        >
          <h4>Announcements</h4>
          <div
            style="padding-left: 2.5px; padding-right: 2.5px"
            class="_display-flex _justify-content-space-between"
          >
            <div
              style="
                margin-left: 2.5px;
                margin-right: 2.5px;
                margin-top: 5px;
                margin-bottom: 5px;
              "
              class="_width-25"
              v-for="ann in announcements"
              :key="ann._id"
            >
              <i-card
                :size="annSize(ann.importance)"
                :variant="annVariant(ann.variant)"
              >
                <p>
                  {{ ann.corpus }}
                </p>
                <template slot="footer">
                  <p>
                    <i-icon
                      :icon="
                        ann.variant === 'WARNING'
                          ? 'warning'
                          : ann.variant === 'INFO'
                          ? 'info'
                          : ''
                      "
                    />
                    {{ niceDate(ann.creation_date) }}
                  </p>
                </template>
              </i-card>
            </div>
          </div>
        </div>
      </i-column>
      <i-column xs="6" sm="4" style="height: 100%">
        <div
          style="height: 100%"
          class="_border _border-color-gray-70 _background-gray-20 _rounded _padding-1"
        >
          <h4>Meeting</h4>
          <div class="_display-flex _flex-direction-column _align-items-center">
            <p class="my-3 text-base md:text-lg lg:text-2xl font-semibold">
              {{ niceDate(first_date_nr) }}
            </p>
            <div class="w-2/3 sm:w-1/3 my-3">
              <i-button variant="secondary">Meet!</i-button>
            </div>
          </div>
        </div>
      </i-column>
      <i-column
        xs="6"
        class="_height-100 _display-xs-block _display-sm-none _display-md-none _display-lg-none _display-lg-none _display-xl-none"
      >
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _padding-1"
        >
          <h4>Tutor</h4>
          <div class="_display-flex _flex-direction-column _align-items-center">
            <h3 class="_margin-bottom-0">
              {{ tutor.first_name }} {{ tutor.last_name }}
            </h3>
            <h4 class="_margin-top-0 _margin-bottom-2 _text-gray-70">
              @{{ tutor.username }}
            </h4>
            <div>
              <router-link
                :to="{ name: 'user-page', params: { id: tutor._id } }"
              >
                <img
                  v-if="imgURI"
                  :src="imgURI"
                  width="100"
                  class="_rounded-circle"
                />
              </router-link>
            </div>
          </div>
        </div>
      </i-column>
    </i-row>
    <i-row top-xs class="_padding-1">
      <i-column xs="12" sm="8" class="_height-100">
        <div
          class="_position-static _border _border-color-gray-70 _background-gray-20 _rounded _padding-1"
        >
          <h4
            style="cursor: pointer"
            @click="$router.push({ params: { page: 'documents' } })"
          >
            Documents
          </h4>
          <div class="_display-flex _flex-direction-row _align-items-stretch">
            <div
              @mouseenter="newDocHover = true"
              @mouseleave="newDocHover = false"
              class="_width-25 _padding-1 _display-flex _flex-direction-column _justify-content-center _align-items-center"
            >
              <img src="../../assets/doc.png" class="image -thumbnail" />
              <div
                style="width: 12%; height: 36%; opacity: 0.8; cursor: pointer"
                v-if="newDocHover"
                @click="tellViewClickedOnNewDoc"
                class="_rounded-circle _background-gray-90 _position-absolute _display-flex _flex-direction-column _justify-content-center _align-items-center"
              >
                <i-icon size="lg" icon="plus" />
              </div>
            </div>
            <div
              v-for="doc in docs"
              :key="doc._id"
              class="_width-25 _padding-1 _margin-1 _border _border-color-gray-40 _background-white _rounded _text-center"
            >
              <p>{{ doc.title }}</p>
            </div>

            <div
              v-if="docs_sliced"
              class="_width-25 _display-flex _flex-direction-column _justify-content-center"
            >
              <span class="_text-center _align-middle"><h1>...</h1></span>
            </div>
          </div>
        </div>
      </i-column>
      <i-column xs="4" class="_display-xs-none _display-sm-block _height-100">
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _padding-1"
        >
          <h4>Tutor</h4>
          <div class="_display-flex _flex-direction-column _align-items-center">
            <h3 class="_margin-bottom-0">
              {{ tutor.first_name }} {{ tutor.last_name }}
            </h3>
            <h4 class="_margin-top-0 _margin-bottom-2 _text-gray-70">
              @{{ tutor.username }}
            </h4>
            <div>
              <router-link :to="`/users/${tutor._id}`">
                <img
                  v-if="imgURI"
                  :src="imgURI"
                  width="100"
                  class="_rounded-circle"
                />
              </router-link>
            </div>
          </div>
        </div>
      </i-column>
    </i-row>
    <i-row top-xs class="_padding-1">
      <i-column xs="12" class="_height-100">
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _padding-1"
        >
          <h4>Description</h4>

          <p>{{ putDotAtEnd(description || "") }}</p>
        </div>
      </i-column>
    </i-row>
  </i-container>
</template>

<script>
export default {
  name: "tut-page",
  data() {
    return {
      newDocHover: false,
    };
  },
  props: {
    students: Array,
    class_size: Number,
    tutor: Object,
    lecture: Object,
    title: String,
    first_date_nr: Number,
    frequency: String,
    description: String,
    is_active: Boolean,
    isTutor: Boolean,
    isStudent: Boolean,
    imgURI: {
      type: String,
      default: "http://localhost:3000/profilepics/defUser.png",
    },
    loaded: Boolean,
    docs: Array,
    docs_sliced: Boolean,
    announcements: Array,
  },
  methods: {
    tellViewClickedOnNewDoc: function () {
      this.$emit("clickedOnNewDoc");
    },
    annVariant: function (text) {
      switch (text) {
        case "WARNING":
          return "warning";
        case "INFO":
          return "info";
        default:
          return "success";
      }
    },
    annSize: function (importance) {
      switch (importance) {
        case 1:
          return "sm";
        case 2:
          return "md";
        default:
          return "lg";
      }
    },
    putDotAtEnd: function (text) {
      return text.slice(-1) === "." ? text : text + ".";
    },
    getFirstName: function () {
      return this.tutor ? this.tutor.first_name : "error";
    },
    getLastName: function () {
      return this.tutor ? this.tutor.last_name : "error";
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
  },
};
</script>

<style scoped>
.puls {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  -webkit-animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>