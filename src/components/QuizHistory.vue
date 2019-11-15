<template>
    <div>
          <table class="table">
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
      quizResults: []
    }
  },
  methods: {
    refreshQuizResults () {
      fetch('https://evaluationtask.herokuapp.com/proxy/quizresult',
        { method: 'get'
        }).then((response) => {
        return response.json()
      })
        .then((jsonData) => {
          this.quizResults = jsonData
        })
    },
    addQuizResult (numCorrect, numTotal) {
      axios.post('https://evaluationtask.herokuapp.com/proxy/quizresult',
        {
          'id': 0,
          'name': 'User',
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
    }

  },
  created () {
    this.refreshQuizResults()
  }
}
</script>

<style scoped>
</style>
