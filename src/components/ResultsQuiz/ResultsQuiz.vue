<template>
  <div class="card">
    <p v-html="question.question"></p>
    <p
      :class="{
        wrong:
          answer === question.answer && answer !== question.correct_answer
            ? true
            : false,
        correct: answer === question.correct_answer,
      }"
      class="answer"
      v-for="answer in answers"
      :key="answer"
      :value="answer"
      v-html="answer"
    ></p>
  </div>
</template>

<script>
/**
 * This component shows the question and all the answers to that question with correct color indicators on the Result view.
 */
export default {
  name: "ResultsQuiz",
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      answers: [
        this.question.correct_answer,
        ...this.question.incorrect_answers,
      ],
    };
  },
};
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(251, 251, 251);
  padding: 1rem;
  border-radius: 0.3rem;
  box-shadow: 10px 10px 10px rgb(0, 53, 122);
  width: 30rem;
  margin: 0.5rem 0;
}

.answer {
  padding: 1rem;
  margin: 0.5rem 0.5rem;
  border-bottom: 1px solid black;
  width: 20rem;
}

p {
  margin: 0.5rem 0;
}
.wrong {
  color: red;
}
.correct {
  color: rgb(0, 190, 0);
}
</style>
