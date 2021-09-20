<template>
  <div class="container">
    <div class="card">
      <Questions />
    </div>
  </div>
</template>

<script>
/**
 * This component is the Trivia View.
 */
import { mapState } from "vuex";
import Questions from "@/components/Trivia/Questions";
export default {
  name: "Trivia",
  components: {
    Questions,
  },

  created() {
    if (this.user === "") {
      this.$router.push("/");
    }
  },

  /**
   * Fetches state from vuex state.
   */
  computed: {
    ...mapState(["user", "questions", "questionIndex"]),
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
.card {
  background: rgb(251, 251, 251);
  padding: 1rem;
  border-radius: 0.3rem;
  box-shadow: 10px 10px 10px rgb(0, 53, 122);
}
</style>
