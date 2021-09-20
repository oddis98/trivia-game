const API_URL = "https://opentdb.com/api";

export const TriviaAPI = {
  /**
   *
   * @returns an array with error = null, and the trivia categories that are fetched from the opentdb database on success
   * @returns an array with error = error and an empty array on fail.
   */
  async getCategories() {
    try {
      const categories = await fetch(`${API_URL}_category.php`);
      const { trivia_categories } = await categories.json();

      return [null, trivia_categories];
    } catch (error) {
      return [error.message, []];
    }
  },

  /**
   *
   * @returns an array with error = null, and the result with a token for the opentdb database on success.
   * @returns an array with error = error and an empty array on fail.
   */
  async getToken() {
    try {
      const response = await fetch(`${API_URL}_token.php?command=request`);
      const result = await response.json();
      return [null, result];
    } catch (error) {
      return [error.message, []];
    }
  },

  /**
   *
   * @param {*} params is a URLSearchParams object from store/index.js (vuex state).
   * @returns an array with error = null, and the result with an array containing objects with questions from the opentdb database on success.
   * @returns an array with error = error and an empty array on fail.
   */
  async getQuestions(params) {
    try {
      const response = await fetch(`${API_URL}.php?${params.toString()}`);
      const result = await response.json();

      return [null, result];
    } catch (error) {
      return [error.message, []];
    }
  },
};
