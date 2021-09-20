<template>
  <div>
    <div v-if="isLoading">
      <h1>Loading...</h1>
    </div>
    <div v-else-if="error">
      <h1>{{ error }}</h1>
    </div>
    <div v-else>
      <p v-html="questions[questionIndex].question"></p>
      <div class="answers">
        <button
          v-for="answer in answers"
          :key="answer"
          :value="answer"
          @click="onButtonClick"
          v-html="answer"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Displays the current question on questionIndex. Also shows the available answers to be selected.
 * Shows loading while questions is loading and an error if there is an error.
 */
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "Questions",

  /**
   * Fetches state values from vuex state.
   * Fetches getters from vuex state.
   */
  computed: {
    ...mapState([
      "questions",
      "questionIndex",
      "isLoading",
      "error",
      "numberOfQuestions",
      "user",
    ]),
    ...mapGetters(["answers"]),
  },

  /**
   * Fetches Trivia questions on creation with current token and values in state. (to be used when user hits replay)
   */
  created() {
    this.getTriviaQuestions();
  },

  methods: {
    /**
     * Fetches mutations and action from state.
     */
    ...mapMutations(["setAnswer", "setQuestionIndex"]),
    ...mapActions(["nextQuestion", "answerQuestion", "getTriviaQuestions"]),

    /**
     * Adds the clicked answer to the user object in vuex state.
     * If the user is on the last question, send the user to the result view.
     * If not show next question.
     */
    onButtonClick(answer) {
      this.setAnswer(answer.target.value);
      if (this.numberOfQuestions - 1 > this.questionIndex) {
        this.nextQuestion();
      } else {
        this.setQuestionIndex(0);
        this.$router.push("/result");
      }
    },
  },
};
</script>

<style scoped>
.answers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  border: 1px solid black;
  background: rgb(156, 252, 255);
  width: 14rem;
}

p {
  margin: 1rem 0;
}
</style>
