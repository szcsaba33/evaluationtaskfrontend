<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>Min correct answers</th>
        <th>Max correct answers</th>
        <th>Average correct answers</th>
        <th>Average total answers</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{quizStats.minNumCorrect}}</td>
        <td>{{quizStats.maxNumCorrect}}</td>
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
    axios.get('https://evaluationtask.herokuapp.com/api/quizresult-performance')
      .then(response => (this.quizStats = response.data))
  }
}
</script>

<style scoped>

</style>
