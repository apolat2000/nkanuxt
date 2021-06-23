<template>
  <i-container>
    <i-row>
      <i-column
        xl="6"
        lg="8"
        md="10"
        sm="12"
        xs="12"
        class="_margin-x-auto _margin-bottom-1"
      >
        <i-alert variant="warning" :show="showAlert">
          <p>All fields are required! Please fill {{ oblig }}.</p>
        </i-alert>
      </i-column>
    </i-row>
    <i-row>
      <i-column
        xl="4"
        lg="6"
        md="6"
        sm="8"
        xs="12"
        class="_margin-x-auto _background-gray-20 _padding-1"
      >
        <form method="POST" @submit.prevent="checkForm">
          <i-form-group>
            <i-form-label>Lecture</i-form-label>
            <i-select
              v-model="lecture"
              placeholder="Choose a lecture"
              @input="
                $emit('getTitles', lecture);
                buttonValue = 'amk';
              "
            >
              <i-select-option
                v-for="lec in lectures"
                :key="lec.value"
                :value="lec.value"
                :label="lec.text"
              />
            </i-select>
          </i-form-group>

          <i-form-group>
            <i-form-label>Title</i-form-label>
            <i-input
              v-model.trim="title"
              placeholder="A brief description."
              @input="$emit('updatedTitle', title)"
            />
          </i-form-group>

          <i-form-group>
            <i-form-label>Frequency</i-form-label>
            <i-select v-model="frequency" placeholder="Tutorial's scheduling">
              <i-select-option
                v-for="freq in frequencies"
                :key="freq"
                :value="freq"
                :label="freq"
              />
            </i-select>
          </i-form-group>

          <i-form-group>
            <i-form-label>Class size</i-form-label>
            <i-input-number
              v-model="classsize"
              :min="1"
              :max="15"
              placeholder="1 to 15.."
            />
          </i-form-group>

          <i-form-group>
            <i-form-label>Allow... </i-form-label>
            <i-radio-group v-model="joinFreely">
              <i-radio :value="true">
                everyone to join.
              </i-radio>
              <i-radio :value="false">
                after you accept join request.
              </i-radio>
            </i-radio-group>
          </i-form-group>

          <i-form-group>
            <i-form-label>Select date</i-form-label>
            <br>
            <!-- <flat-pickr
              v-model="firstdate"
              :config="{
                minDate: Date(),
                altInput: true,
                dateFormat: 'Z',
                altFormat: 'j.n.Y, H:i:S.',
                enableTime: true,
                time_24hr: true,
              }"
            /> -->
          </i-form-group>
          <i-form-group>
            <i-form-label>Description</i-form-label>
            <i-textarea
              v-model="description"
              placeholder="Tell your future students about your tutorial in detail. You can update this anytime you like."
            />
          </i-form-group>
          <i-form-group class="_display-flex _flex-direction-row-reverse">
            <i-button
              variant="primary"
              type="submit"
            >
              <i-icon icon="plus" class="_margin-right-1" size="sm" />Create
              new tutorial
            </i-button>
          </i-form-group>
        </form>
      </i-column>
    </i-row>
  </i-container>
</template>

<script>
// import flatPickr from "vue-flatpickr-component";
// import "flatpickr/dist/flatpickr.css";
import axios from 'axios'

export default {
  props: {
    tutorial: {
      type: Object,
      default: () => {}
    },
    pageTitle: {
      type: String,
      default: 'Create New Tutorial'
    }
  },
  data () {
    return {
      joinFreely: true,
      showAlert: false,
      oblig: 'First Name',
      buttonValue: 'Create Tutorial',
      title: '',
      frequency: '',
      firstdate: '01.01.0001, 00:00:00.',
      classsize: 1,
      description: '',
      lecture: '',
      lectures: [],
      frequencies: ['WEEKLY', 'MONTHLY', 'IRREGULAR', 'ONE-SHOT']
    }
  },
  created () {
    this.firstdate = this.now()

    if (Object.keys(this.tutorial || {}).length !== 0) {
      this.buttonValue = 'Edit Tutorial'
    }

    axios
      .get('http://localhost:3000/lectures/is-no-query')
      .then((response) => {
        console.log(response.data)
        response.data.forEach((lecture) => {
          this.lectures.push({
            value: lecture._id,
            text: lecture.verbose_name
          })
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
  methods: {
    now () {
      return new Date().toISOString()
    },
    checkForm: function createTutorial () {
      if (!this.lecture) {
        console.log(this.lecture)
        this.oblig = 'Lecture'
        this.showAlert = true
      } else if (!this.title) {
        this.oblig = 'Title'
        this.showAlert = true
      } else if (!this.frequency) {
        this.oblig = 'Frequency'
        this.showAlert = true
      } else if (!this.classsize) {
        this.oblig = 'Class Size'
        this.showAlert = true
      } else if (!this.firstdate) {
        this.oblig = 'First Date & Time'
        this.showAlert = true
      } else if (!this.description) {
        this.oblig = 'Description'
        this.showAlert = true
      } else {
        const tut = {
          class_size: this.classsize,
          tutor: localStorage.getItem('userID'),
          lecture: this.lecture,
          title: this.title,
          students: [],
          first_date: this.firstdate,
          frequency: this.frequency,
          description: this.description,
          is_active: true,
          join_freely: this.joinFreely
        }
        console.log(tut)
        axios
          .post('http://localhost:3000/tutorials/is-no-query', tut, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
          })
          .then((response) => {
            console.log(response.data)
            this.$router.push({
              name: 'tutorial-page',
              params: { id: response.data, page: 'summary' }
            })
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }
  }
}
</script>
