<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>Min correct answers</th>
        <th>Average correct answers</th>
        <th>Average total answers</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{quizStats.minNumCorrect}}</td>
        <td>{{quizStats.averageNumCorrect}}</td>
        <td>{{quizStats.averageNumTotal}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'QuizStats',
  data () {
    return {
      quizStats: []
    }
  },
  mounted () {
    axios.get('https://evaluationtask.herokuapp.com/proxy/quizresult-performance')
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        this.quizStats = jsonData
      })
  },
  created () {
  }
}
</script>

<style scoped>

</style>
