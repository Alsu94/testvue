<template>
  <v-app >
    <header class="d-flex justify-center align-center">
      <div class="align-center header-title py-6">
        The Rick and Morty API
      </div>
    </header>
    <v-main class="black">
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
