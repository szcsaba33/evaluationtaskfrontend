<template>
  <div >
    <Header
      :numCorrect="numCorrect"
      :numTotal="numTotal"
      :amount="amount"
      :selectedCategory="selectedCategory"
      :selectedDifficulty="selectedDifficulty"
      :selectedType="selectedType"
      :optionsCat="optionsCat"
      :optionsDiff="optionsDiff"
      :optionsType="optionsType"
    />
    <label></label>
    <b-container class="bv-example-row" v-if="!gameStarted">
      <StartBox v-if="!gameStarted"
                :gameStart="gameStart"
                :optionsCat="optionsCat"
                :optionsDiff="optionsDiff"
                :optionsType="optionsType"
      />
    </b-container>

    <b-container class="bv-example-row" v-if="!gameFinished && gameStarted">
      <b-row   >
        <b-col sn="6" >
          <QuestionBox
            v-if="questions.length"
            :currentQuestion="questions[index]"
            :next="next"
            :increment="increment"
            :numTotal="numTotal"
            :gameFinish="gameFinish"
            :amount="amount"
          />
        </b-col>
      </b-row>
    </b-container>

    <b-container class="bv-example-row" v-if="gameFinished">
      <FinishBox
        :numCorrect="numCorrect"
        :numTotal="numTotal"
        :newGame="newGame"
      />
    </b-container>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import QuestionBox from '../components/QuestionBox.vue'
import FinishBox from '../components/FinishBox'
import StartBox from '../components/StartBox'
import QuizHistory from '@/components/QuizHistory'

export default {
  name: 'app',
  components: {
    StartBox,
    FinishBox,
    Header,
    QuestionBox
  },
  data () {
    return {
      questions: [],
      index: 0,
      numCorrect: 0,
      numTotal: 0,
      gameFinished: false,
      amount: 0,
      gameStarted: false,
      selectedCategory: '',
      selectedDifficulty: '',
      selectedType: '',
      optionsCat: [
        { value: '', text: 'Any Category' },
        { value: '9', text: 'General Knowledge' },
        { value: '10', text: 'Books' },
        { value: '11', text: 'Film' },
        { value: '12', text: 'Music' },
        { value: '13', text: 'Musicals & Theatres' },
        { value: '14', text: 'Television' },
        { value: '15', text: 'Video Games' },
        { value: '16', text: 'Board Games' },
        { value: '17', text: 'Science & Nature' },
        { value: '18', text: 'Computers' },
        { value: '19', text: 'Mathematics' },
        { value: '20', text: 'Mythology' },
        { value: '21', text: 'Sports' },
        { value: '22', text: 'Geography' },
        { value: '23', text: 'History' },
        { value: '24', text: 'Politics' },
        { value: '25', text: 'Art' },
        { value: '26', text: 'Celebrities' },
        { value: '27', text: 'Animals' },
        { value: '28', text: 'Vehicles' },
        { value: '29', text: 'Comics' },
        { value: '30', text: 'Gadgets' },
        { value: '31', text: 'Japanese Anime & Manga' },
        { value: '32', text: 'Cartoon & Animations' }
      ],
      optionsDiff: [
        { value: '', text: 'Any Difficulty' },
        { value: 'easy', text: 'Easy' },
        { value: 'medium', text: 'Medium' },
        { value: 'hard', text: 'Hard' }
      ],
      optionsType: [
        { value: '', text: 'Any Type' },
        { value: 'multiple', text: 'Multiple Choice' },
        { value: 'boolean', text: 'True / False' }
      ],
      nickname: 'Nickname'

    }
  },
  methods: {
    next () {
      this.index++
    },
    increment (isCorrect) {
      if (isCorrect) {
        this.numCorrect++
      }
      this.numTotal++
    },
    gameFinish () {
      this.gameFinished = true
      QuizHistory.methods.addQuizResult(this.numCorrect, this.numTotal, this.nickname)
    },
    gameStart (actAmount, actSelected, actDiff, actType, actNickname) {
      if (actAmount < 51 && actAmount > 0) {
        this.amount = Number(actAmount)
        this.selectedCategory = actSelected
        this.selectedDifficulty = actDiff
        this.selectedType = actType
        this.nickname = actNickname
        this.gameFetch()
        this.gameStarted = true
      }
    },
    newGame () {
      this.questions = []
      this.index = 0
      this.numCorrect = 0
      this.numTotal = 0
      this.gameFinished = false
      this.amount = 10
      this.gameStarted = false
    },
    gameFetch () {
      fetch('https://opentdb.com/api.php?amount=' + this.amount.toString() + '&category=' + this.selectedCategory + '&difficulty=' + this.selectedDifficulty + '&type=' + this.selectedType,
        { method: 'get'
        }).then((response) => {
        return response.json()
      })
        .then((jsonData) => {
          this.questions = jsonData.results
        })
    }

  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
