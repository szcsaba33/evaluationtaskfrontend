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
export default {
  name: 'QuizStats',
  data () {
    return {
      quizStats: []
    }
  },
  mounted () {
    fetch('https://evaluationtask.herokuapp.com/proxy/quizresult-performance',
      { method: 'get'
      })
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        this.quizStats = jsonData
      })
  }
}
</script>

<style scoped>

</style>
