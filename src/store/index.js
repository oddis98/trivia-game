import Vue from "vue";
import Vuex from "vuex";
import { TriviaAPI } from "../api/TriviaAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    numberOfQuestions: 1,
    difficulty: "easy",
    selectedCategory: "9",
    categories: [""],
    questionIndex: 0,
    questions: [],
    error: "",
    token: "",
    isLoading: true,
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setQuestions: (state, payload) => {
      state.questions = payload;
    },
    setAnswer: (state, payload) => {
      state.questions[state.questionIndex].answer = payload;
    },
    setQuestionIndex: (state, payload) => {
      state.questionIndex = payload;
    },
    setNumberOfQuestions: (state, payload) => {
      state.numberOfQuestions = payload;
    },
    setDifficulty: (state, payload) => {
      state.difficulty = payload;
    },
    setSelectedCategory: (state, payload) => {
      state.selectedCategory = payload;
    },
    setCategories: (state, categories) => {
      state.categories = categories;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setToken: (state, payload) => {
      state.token = payload;
    },
    setLoading: (state, payload) => {
      state.isLoading = payload;
    },
  },
  getters: {
    /**
     *
     * @param {*} state is the state.
     * @returns a randomized array of the different answer choices. So that the correct answer will not always be in the same spot.
     */
    answers: (state) => {
      const answers = [
        ...state.questions[state.questionIndex].incorrect_answers,
        state.questions[state.questionIndex].correct_answer,
      ];
      const randomizer = (answer) => {
        for (let i = answer.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [answer[i], answer[j]] = [answer[j], answer[i]];
        }
        return answer;
      };
      return randomizer(answers);
    },

    /**
     *
     * @param {*} state is the state.
     * @returns the length of questions times 10.
     */
    maxScore: (state) => {
      return state.questions.length * 10;
    },
  },
  actions: {
    /**
     * Fetches a token from the opentdb api.
     * if the response_code is 0, set the token value in state.
     * if not set error.
     */
    async getTriviaToken({ commit }) {
      try {
        const [error, response] = await TriviaAPI.getToken();
        if (response.response_code === 0) {
          commit("setToken", response.token);
        } else {
          commit("setError", `Error getting token ${error}`);
        }
      } catch (e) {
        commit("setError", e.message);
      }
    },

    /**
     * Sets loading to true, while data is being fetched.
     * Resets questionIndex to 0.
     * Sets error to be "".
     *
     * if there is no token, get new token.
     *
     * Creates some urlOptions and parses them to a URLSearchParams object.
     * Fetches the questions from the opentdb api with urlOptions as param.
     * Sets questions to be the questions from the response.
     *
     * If error occurs, set error to be e.message.
     * Set loading to false.
     */
    async getTriviaQuestions({ state, commit }) {
      commit("setLoading", true);
      commit("setQuestionIndex", 0);
      commit("setError", "");

      if (state.token === "") {
        await this.dispatch("getTriviaToken");
      }

      try {
        const urlOptions = {
          amount: state.numberOfQuestions,
          difficulty: state.difficulty,
          category: state.selectedCategory,
          token: state.token,
        };

        const params = new URLSearchParams(urlOptions);
        const response = await TriviaAPI.getQuestions(params);
        commit("setQuestions", response[1].results);
      } catch (e) {
        commit("setError", e.message);
        commit("setLoading", false);
      }
      commit("setLoading", false);
    },

    /**
     * Sets loading to true, while gathering data.
     * Sets the categories in state and sets error in vuex state (this will be null on success)
     *
     * Sets loading to be false
     */
    async getTriviaCategories({ commit }) {
      commit("setLoading", true);
      try {
        const [error, categories] = await TriviaAPI.getCategories();

        commit("setCategories", categories);
        commit("setError", error);
      } catch (e) {
        commit("setError", e.message);
      }
      commit("setLoading", false);
    },

    /**
     * Sets questionIndex to increase by 1
     */
    nextQuestion({ state, commit }) {
      commit("setQuestionIndex", state.questionIndex + 1);
    },
  },
});
