<template>
  <div class="container">
    <img class="header" src="@/assets/header.jpg" alt="header" />
    <div class="card">
      <div v-if="login">
        <p>Welcome {{ user.username }}</p>
        <p>Highscore: {{ user.highscore }}</p>
      </div>

      <Login v-if="!login" @buttonClicked="handleLoginButtonClick" />
      <Selectors v-if="login" @startClick="handleStartButtonClick"></Selectors>
    </div>
  </div>
</template>

<script>
/**
 * This component is the Start Screen view.
 */
import { mapState, mapMutations, mapActions } from "vuex";
import Login from "@/components/Login/Login";
import Selectors from "@/components/Selectors/Selectors";
export default {
  name: "Home",
  /**
   * Local state to check if user is logged in.
   */
  data() {
    return {
      login: false,
    };
  },
  components: {
    Login,
    Selectors,
  },

  /**
   * Fetches user from vuex state.
   */
  computed: {
    ...mapState(["user"]),
  },

  methods: {
    /**
     * Fetches mutations and actions from vuex state.
     */
    ...mapMutations(["setUser"]),
    ...mapActions(["getTriviaQuestions"]),

    /**
     * Starts the game and retrieves questions.
     * This method gets executed from Selectors child component.
     */
    handleStartButtonClick() {
      this.$router.push("/trivia");
      this.getTriviaQuestions();
    },

    /**
     * Updates user in vuex state.
     * Sets login to loggedIn (true)
     * This method gets executed from Login child component.
     */
    handleLoginButtonClick({ user, loggedIn }) {
      this.setUser(user);
      this.login = loggedIn;
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

.header {
  width: 50vw;
  margin-top: 5vh;
  margin-bottom: 5vh;
  border-radius: 1rem;
}
</style>
