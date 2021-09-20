<template>
  <div>
    <article class="selectors">
      <label for="username">Username</label>
      <input type="text" name="username" @input="handleInputChange" />
    </article>
    <button type="submit" @click="handleLogin">Login / Register</button>
  </div>
</template>

<script>
import { LoginAPI } from "@/api/LoginAPI";

export default {
  name: "Login",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    /**
     * Tries to log in a user based on this.input. If the login fails (user not in database),
     * register the user in the database and try to login again.
     * @returns an event to the parent component containing the user and loggedIn = true.
     */
    async handleLogin() {
      if (this.input === "" || this.input.includes(" ")) {
        return alert("Please do not include spaces or leave the field blank");
      }
      const registeredUser = await LoginAPI.login({ username: this.input });
      if (registeredUser.length == 0) {
        await LoginAPI.register({ username: this.input });
        const newUser = await LoginAPI.login({ username: this.input });
        return this.$emit("buttonClicked", {
          user: newUser[0],
          loggedIn: true,
        });
      }
      this.$emit("buttonClicked", { user: registeredUser[0], loggedIn: true });
    },

    /**
     * Updates this.input when the input field changes.
     */
    handleInputChange(e) {
      this.input = e.target.value;
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

button {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid black;
  width: 100%;
}

input {
  padding: 0.5rem;
}
</style>
