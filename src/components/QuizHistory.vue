<template>
    <div>
          <table class="table">
              <thead>
                  <tr>
                    <th>Search by name:</th>
                    <th>
                      <b-form  v-on:submit.prevent="refreshQuizResultsByName">
                        <b-form-input :id="`type-name`"  v-model="searchByName" ></b-form-input>
                      </b-form>
                    </th>
                    <th>
                      <b-button @click="refreshQuizResultsByName">Search</b-button>
                    </th>
                  </tr>
              </thead>
              <thead>
              <tr>
                  <th>Name</th>
                  <th>Correct answers</th>
                  <th>Total answers</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="actualQuiz in quizResults" v-bind:key="actualQuiz.id">
                  <td>{{actualQuiz.name}}</td>
                  <td>{{actualQuiz.numCorrect}}</td>
                  <td>{{actualQuiz.numTotal}}</td>
              </tr>
              </tbody>
          </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'QuizHistory',
  components: {

  },
  data () {
    return {
      quizResults: [],
      searchByName: ''
    }
  },
  methods: {
    refreshQuizResults () {
      axios.get('https://evaluationtask.herokuapp.com/api/quizresult')
        .then((response) => {
          this.quizResults = response.data
        })
    },
    addQuizResult (numCorrect, numTotal, name) {
      axios.post('https://evaluationtask.herokuapp.com/api/quizresult',
        {
          'id': 0,
          'name': name,
          'numCorrect': numCorrect,
          'numTotal': numTotal
        }
      )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    refreshQuizResultsByName () {
      if (this.searchByName === '') this.refreshQuizResults()
      else {
        axios.get('https://evaluationtask.herokuapp.com/api/quizresult/name/' + this.searchByName)
          .then((response) => {
            this.quizResults = response.data
          })
      }
    }

  },
  created () {
    this.refreshQuizResults()
  }
}
</script>

<style scoped>
</style>
