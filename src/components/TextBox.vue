<script>
export default {
  name: "TextBox",
  data() {
    return {
      message: "Hello World! I'm ayo omotosho and this is my first vue app",
    };
  },
};
</script>

<template>
  <div class="text-box">
    <input type="text" v-model="input" />
    <div class="words">
      <p>{{ message }}</p>
    </div>
  </div>
</template>
