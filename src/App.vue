<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  line-height: 1;
  font-size: 22px;
}
#app {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background: rgb(13, 0, 228);
  background: linear-gradient(
    149deg,
    rgba(13, 0, 228, 1) 0%,
    rgba(0, 155, 227, 1) 50%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>
