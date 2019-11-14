<template>

    <div >
        <b-jumbotron>
            <b-row class="my-1">
                <b-col sm="2" >
                    <label >Number of Questions:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input :id="`type-number`" :type="'number'" v-model="amount" :state="maxAmount" aria-describedby="input-live-feedback"></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">Min 1, Max 50</b-form-invalid-feedback>
                </b-col>
                <b-form-invalid-feedback id="input-live-feedback">Max 50</b-form-invalid-feedback>

            </b-row>

            <b-row>
                <b-col sm="2">
                    <label >Select category:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-select v-model="selectedCat" :options="optionsCat"></b-form-select>
                </b-col>
            </b-row>
            <label></label>
            <b-row>
                <b-col sm="2">
                    <label >Select difficulty:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-select v-model="selectedDiff" :options="optionsDiff"></b-form-select>
                </b-col>
            </b-row>

            <label></label>

            <b-row>
                <b-col sm="2">
                    <label >Select type:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-select v-model="selectedType" :options="optionsType"></b-form-select>
                </b-col>
            </b-row>

            <label></label>

            <b-row>
                <b-col>
                    <b-button @click="gameStart(amount, selectedCat, selectedDiff, selectedType)" >Start</b-button>
                </b-col>
            </b-row>
        </b-jumbotron>
    </div>

</template>

<script>
export default {
  name: 'StartBox',
  props: [
    'gameStart',
    'optionsCat',
    'optionsDiff',
    'optionsType'
  ],
  computed: {
    maxAmount () {
      return !!(this.amount <= 50 && this.amount > 0)
    }
  },
  data () {
    return {
      selectedCat: '',
      amount: 10,
      selectedDiff: '',
      selectedType: ''

    }
  }
}
</script>

<style scoped>

</style>
