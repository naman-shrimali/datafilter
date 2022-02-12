<!-- views/NotFound.vue -->

<template>
  <div class="NotFound">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card height="400" color="transparent" flat align-center>
            <div class="display-3 mt-5 ml-2">Page not found.</div>
            <br />
            <div class="grey--text lighten-5 ml-2">
              The page you are trying to get to never existed in this reality,
              or has migrated to a parallel universe.
            </div>
            <div class="paragraph-text mt-2 ml-2">
              <br />
              <br />Try going back to home page and repeating your action.
              <br />
              <v-row class="mt-4" align="center" justify="center">
              <router-link :to="{ name: 'Home' }"><v-btn><h2 class="text-404">Home</h2></v-btn></router-link>
              </v-row>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
.NotFound {
    text-align:center;
}
  .paragraph-text {
    font-size: 18px;
  }
  .text-404 {
      color:black;
      text-decoration: none;
  }
</style>