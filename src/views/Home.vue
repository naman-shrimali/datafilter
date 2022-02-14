<template>
<div class="home-page">
  <v-flex color="primary">
      <h1>Click to explore Data Sheet....</h1>
        <v-btn id="start-btn" @click= "$router.push({name: 'datafilter'})">Click Me</v-btn>
  </v-flex>
  </div>
</template>

<script>
  export default {
        name: 'Home',  
  }
</script>

<style>
.home-page {
  display: flex;
  text-align: center;
  align-items: center;
  height: 100vh;
  
}
#start-btn {
  background-color:#f2e863;
}
</style>