<template>
  <div>
    <article class="selectors">
      <label for="numberOfQuestions">Number of questions</label>
      <input
        type="number"
        @input="onNumberOfQuestionsChange"
        min="1"
        max="50"
        name="numberOfQuestions"
      />

      <label for="difficultyLevel">Difficulty Level</label>
      <select type="text" @input="onDifficultyChange" name="difficultyLevel">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label for="category">Category</label>
      <select type="text" name="category" @input="onCategoryChange">
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </article>
    <button type="button" @click="onStartButtonClick">Start</button>
  </div>
</template>

<script>
/**
 * This component displays different inputs for number of questions, difficulty and genre.
 * They save the values to vuex state on change.
 */
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "Selectors",

  /**
   * When component is created, it fetches the categories from the opentdb api.
   */
  async created() {
    await this.getTriviaCategories();
    this.setNumberOfQuestions("");
  },

  /**
   * Fetches state values from vuex state.
   */
  computed: {
    ...mapState([
      "error",
      "categories",
      "numberOfQuestions",
      "difficulty",
      "selectedCategory",
      "isLoading",
    ]),
  },

  methods: {
    /**
     * Fetches mutations from vuex state.
     */
    ...mapMutations([
      "setNumberOfQuestions",
      "setSelectedCategory",
      "setDifficulty",
    ]),

    /**
     * Fetches actions from vuex state.
     */
    ...mapActions(["getTriviaCategories"]),

    /**
     * Checks if numberOfQuestions is blank, below 1 or above 50: return nothing.
     * If not emit an event to parent component.
     */
    onStartButtonClick() {
      if (
        this.numberOfQuestions === "" ||
        parseInt(this.numberOfQuestions) < 1 ||
        parseInt(this.numberOfQuestions) > 50
      ) {
        return alert(
          "Invalid question amount. Select a number between 1 and 50"
        );
      }
      this.$emit("startClick");
    },

    /**
     * Updates different vuex states
     */
    onNumberOfQuestionsChange(e) {
      this.setNumberOfQuestions(e.target.value);
    },
    onCategoryChange(e) {
      this.setSelectedCategory(e.target.value);
    },
    onDifficultyChange(e) {
      this.setDifficulty(e.target.value);
    },
  },
};
</script>

<style scoped>
.selectors {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
}

input {
  padding: 0.5rem;
}

select {
  padding: 0.5rem;
}

button {
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid black;
}
</style>
