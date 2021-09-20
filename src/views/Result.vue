<template>
  <div class="container">
    <h1>Results</h1>
    <h4>{{ score }} / {{ maxScore }}</h4>
    <div class="btn-div">
      <button @click="onReplayButtonClick">Replay</button>
      <button @click="onHomeButtonClick">Home</button>
    </div>

    <ResultsQuiz
      v-for="question in questions"
      :key="question.id"
      :value="question.id"
      :question="question"
    ></ResultsQuiz>
  </div>
</template>

<script>
/**
 * This component is the Result view.
 */
import { mapGetters, mapState } from "vuex";
import ResultsQuiz from "@/components/ResultsQuiz/ResultsQuiz";
import { LoginAPI } from "@/api/LoginAPI";
export default {
  name: "Trivia",
  components: {
    ResultsQuiz,
  },

  /**
   * Local state for temporary score value.
   */
  data() {
    return {
      score: 0,
    };
  },

  /**
   * On created, update score to be equal to all the correctly answered questions * 10.
   * Runs onScoreComputed.
   */
  created() {
    if (this.user === "") {
      this.$router.push("/");
    }
    this.score = this.questions.reduce((score, question) => {
      return question.answer === question.correct_answer
        ? score + 10
        : score + 0;
    }, 0);
    this.onScoreComputed();
  },

  /**
   * Fetches state values and a getter from vuex state.
   */
  computed: {
    ...mapState(["questions", "user"]),
    ...mapGetters(["maxScore"]),
  },
  methods: {
    /**
     * Send user to /trivia which resets the game and gives the user new questions with the same
     * category, difficulty and amount of questions.
     */
    onReplayButtonClick() {
      this.$router.push("/trivia");
    },

    /**
     * Returns the user to the start view.
     */
    onHomeButtonClick() {
      this.$router.push("/");
    },

    /**
     * Checks if local score is larger than the user's highscore and updates the database if that is the case.
     */
    async onScoreComputed() {
      if (this.user.highscore < this.score) {
        await LoginAPI.updateHighScore(this.user.id, this.score);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.card {
  background: rgb(251, 251, 251);
  padding: 1rem;
  border-radius: 0.3rem;
  box-shadow: 10px 10px 10px rgb(0, 53, 122);
}
h1 {
  padding: 1rem;
  margin-top: 1rem;
  color: #ffffff;
  font-size: 14rem;
}
.btn-div {
  display: flex;
  justify-content: space-around;
  width: 20rem;
}
button {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid black;
}
h4 {
  margin: 1rem 0;
  color: #ffffff;
}
</style>
