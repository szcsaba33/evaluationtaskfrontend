<template>
    <div class="question-box-container" >
        <b-jumbotron >
            <template v-slot:lead>
                {{ decoder(currentQuestion.question) }}
            </template>

            <hr class="my-4">

            <b-list-group>
                <b-list-group-item
                        v-for="(answer, index) in answers"
                        :key="index"
                        @click="selectAnswer(index)"
                        v-bind:style=answerClass(index)>
                    {{ decoder(answer) }}
                </b-list-group-item>
            </b-list-group>

            <b-button variant="primary" @click="submitAnswer"
                      :disabled="selectedIndex === null || answered">Submit</b-button>
            <b-button v-if="numTotal < amount"
                      @click="next" variant="success" href="#"
                      :disabled="!answered">Next</b-button>

            <b-button v-if="numTotal >= amount"
                      @click="gameFinish"
                      variant="success" href="#">
                Finish
            </b-button>
        </b-jumbotron>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function,
    numTotal: Number,
    gameFinish: Function,
    amount: Number
  },
  data: function () {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false

    }
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler () {
        this.selectedIndex = null
        this.shuffleAnswers()
        this.answered = false
      }
    }
  },
  computed: {
    answers () {
      let answers = [...this.currentQuestion.incorrect_answers]
      answers.push(this.currentQuestion.correct_answer)
      return answers
    }
  },
  methods: {
    selectAnswer (index) {
      this.selectedIndex = index
    },
    submitAnswer () {
      let isCorrect = false
      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true
      }
      this.answered = true
      this.increment(isCorrect)
    },
    shuffleAnswers () {
      let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
      this.shuffledAnswers = _.shuffle(answers)
      this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
    },
    answerClass (index) {
      let answerClass = ''
      if (!this.answered && this.selectedIndex === index) {
        answerClass = { background: 'lightblue' }
      } else if (this.answered && this.correctIndex === index) {
        answerClass = { background: 'green' }
      } else if (this.answered &&
            this.selectedIndex === index &&
            this.correctIndex !== index
      ) {
        answerClass = { background: 'red' }
      }
      return answerClass
    },
    decoder (str) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = str
      return textArea.value
    }
  },
  mounted () {
    this.shuffleAnswers()
  }
}
</script>

<style scoped>
    .list-group{
        margin-bottom: 15px;
    }
    .list-group-item:hover {
        background: aliceblue;
        cursor: pointer;
    }
    .btn {
        margin: 0 5px;
    }
    .selected {
        background: blue
    }
    .correct {
        background-color: lightgreen;
    }
    .incorrect {
        background-color: red;
    }
</style>
