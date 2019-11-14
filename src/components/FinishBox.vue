<template >
    <div class="question-box-container" >
        <b-jumbotron>
            <template v-slot:header>
                Finished
                <hr class="my-4">
            </template>
            <template v-slot:lead>
                <h2> Result: {{numCorrect}}/{{numTotal}} </h2>
            </template>
            <b-button @click="newGame">New Game</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
  name: 'FinishBox',
  props: [
    'numCorrect',
    'numTotal',
    'newGame'
  ]
}
</script>

<style scoped>
    .list-group{
        margin-bottom: 15px;
    }
</style>
