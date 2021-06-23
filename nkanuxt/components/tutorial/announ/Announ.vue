<template>
  <div>
    <i-container fluid>
      <i-row v-if="isTutor">
        <i-column xs="12">
          <div>
            {{ corpus }}
            <i-alert dismissible :show="alertVisible" variant="warning">
              <template slot="icon">
                <i-icon icon="warning" />
              </template>
              <p>
                Some quick example text to build on the alert title and make up
                the bulk of the alert's content.
              </p>
            </i-alert>
            <i-form
              v-model="textArea"
              class="_margin-x-4 _diplay-flex _flex-direction-column _width-50"
              accept-charset="UTF-8"
              method="post"
              @submit.prevent="handleSubmit"
            >
              <i-form-group>
                <i-textarea
                  v-model="corpus"
                  :schema="textArea.input"
                  placeholder="Share an announcement with your students."
                />
              </i-form-group>
              <i-form-group>
                <div class="_display-flex _justify-items-center">
                  <i-select v-model="variant">
                    <i-select-option :value="'USUAL'" label="Usual" />
                    <i-select-option :value="'INFO'" label="Info" />
                    <i-select-option :value="'WARNING'" label="Warning" />
                  </i-select>
                  <i-select v-model="importance">
                    <i-select-option :value="1" label="Kinda important" />
                    <i-select-option :value="2" label="Important" />
                    <i-select-option :value="3" label="Really important" />
                  </i-select>
                  <i-button>
                    <img
                      style="height: 21px"
                      src="../../../assets/lightning.png"
                    >
                  </i-button>
                </div>
              </i-form-group>
            </i-form>
          </div>
        </i-column>
      </i-row>
      <i-row v-for="anns in chunkedAnnouncements" :key="anns[0]._id">
        <i-column
          v-for="ann in anns"
          :key="ann._id"
          style="margin-top: 5px; margin-bottom: 5px"
          xs="12"
          md="6"
          lg="4"
        >
          <i-card
            :size="annSize(ann.importance)"
            :variant="annVariant(ann.variant)"
          >
            <template slot="header">
              <p>
                <i-icon
                  :icon="
                    ann.variant === 'WARNING'
                      ? 'warning'
                      : ann.variant === 'INFO'
                        ? 'info'
                        : 'envelope'
                  "
                />
                {{ niceDate(ann.creation_date) }}
              </p>
            </template>
            <p>
              {{ ann.corpus }}
            </p>
          </i-card>
        </i-column>
      </i-row>
    </i-container>
  </div>
</template>

<script>
import axios from 'axios'
// import chunk from "chunk";

export default {
  props: {
    tutorialId: String,
    isTutor: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: false },
    scope: { type: String, default: 'global' }
  },
  data () {
    return {
      importance: 1, // 1 === 'KINDA, 2 === 'IMPORTANT', 3 === 'REALLY'
      announcements: [],
      variant: 'USUAL', // enum: ['WARNING', 'INFO', 'USUAL']
      corpus: '',
      alertVisible: false,
      textArea: this.$inkline.form({
        input: {
          validators: [
            { rule: 'required' },
            { rule: 'maxLength', value: 1000 }
          ]
        }
      })
    }
  },
  async mounted () {
    const resAnn = await axios.get(
      'http://localhost:3000/announcement/' + this.tutorialId,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          Page: 'announcements'
        }
      }
    )

    this.announcements = resAnn.data
  },
  // computed: {
  //   chunkedAnnouncements() {
  //     return chunk(this.announcements, 3);
  //   },
  // },
  methods: {
    annVariant (text) {
      switch (text) {
        case 'WARNING':
          return 'warning'
        case 'INFO':
          return 'info'
        default:
          return 'success'
      }
    },
    annSize (importance) {
      switch (importance) {
        case 1:
          return 'sm'
        case 2:
          return 'md'
        default:
          return 'lg'
      }
    },
    niceDate (myDate) {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const dateObj = new Date(myDate)
      const month = monthNames[dateObj.getMonth()]
      const day = String(dateObj.getDate()).padStart(2, '0')
      const year = dateObj.getFullYear()
      const hours =
        String(dateObj.getHours()).length === 1
          ? '0' + dateObj.getHours()
          : dateObj.getHours()
      const mins =
        String(dateObj.getMinutes()).length === 1
          ? '0' + dateObj.getMinutes()
          : dateObj.getMinutes()
      const output = day + ' ' + month + ' ' + year + ', ' + hours + ':' + mins
      return output
    },
    handleSubmit: async function postAnnouncement () {
      if (this.corpus !== '' && this.corpus.length <= 1000) {
        try {
          const announcement = {
            corpus: this.corpus,
            userId: localStorage.getItem('userID'),
            variant: this.variant,
            importance: this.importance
          }
          console.log(announcement)
          const res = await axios.post(
            'http://localhost:3000/announcement/' + this.tutorialId,
            announcement,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
              }
            }
          )
          if (res.status === 200) {
            this.grabAnnouncements()
            this.corpus = ''
          }
        } catch (err) {
          alert('An error occured: ', err)
        }
      }
    },
    async grabAnnouncements () {
      const resAnn = await axios.get(
        'http://localhost:3000/announcement/' + this.tutorialId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
            Page: 'announcements'
          }
        }
      )

      this.announcements = resAnn.data
    }
  }
}
</script>
