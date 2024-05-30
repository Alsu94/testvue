<template>
  <v-container>

    <div class="filter">
      <v-form>
        <v-row class="ma-0" >
          <v-col>
            <label>Name</label>
            <v-text-field outlined hide-details class="input" v-model="name"></v-text-field>
          </v-col>
          <v-col>
            <label>Status</label>
            <v-select
                :items="statuses"
                outlined
                class="input"
                hide-details
                v-model="status"
            ></v-select>
          </v-col>
          <v-col >
            <div><label style="opacity: 0">2323</label></div>
            <div class="d-flex">
              <div class="mt-1 ">
                <v-btn class="pa-6" @click.prevent="search">search</v-btn>
              </div>
              <div class="mt-1 ml-4">
                <v-btn class="pa-6" @click.prevent="resetFilter">reset</v-btn>
              </div>
            </div>

          </v-col>
          <v-col >
            <div><label style="opacity: 0">2323</label></div>

          </v-col>
        </v-row>

      </v-form>
    </div>

    <section class="cards my-6">

        <div class="card-item" v-for="(person, index) in people" :key="index">
          <v-card :class="{'card': $vuetify.breakpoint.smAndUp, 'card-sm': $vuetify.breakpoint.xs}">
            <div class="card-image">
              <img :src="person.image" alt="character" >
            </div>

            <div class="card-body pa-4">

              <div>
                <div class="card-title mb-1"><h2>{{person.name}}</h2></div>
                <div class="card-subtitle d-flex align-center">
                  <div class="status-icon "></div>
                  <div>{{person.status}} - {{person.species}}</div>
                </div>
              </div>

              <div class="my-4">
                <div class="card-item__title mb-1">Last known location:</div>
                <div class="card-item__subtitle">
                  <a href="#">{{person.location.name}}</a>
                </div>
              </div>

              <div>
                <div class="card-item__title mb-1">First seen in:</div>
                <div class="card-item__subtitle">
                  <a href="#">
                    {{person.first_episode}}
                  </a>
                </div>
              </div>

            </div>
          </v-card>
        </div>



    </section>

    <div class="text-center">
      <v-pagination
          v-model="page"
          :length="pages"
          @input="nextPage"

      ></v-pagination>
    </div>

  </v-container>
</template>

<script setup>
// import { ref, getCurrentInstance, inject  } from "vue";
// import { ref, inject  } from "vue";
import { ref, set  } from "vue";
import { api } from "@/services/api";

// const app = getCurrentInstance();
// app.provide('axios', axiosInstance);
// const axios = inject('axios');

const people = ref([]);
const page = ref(1);
const pages = ref(1);
const count = ref(30);
const name = ref('');
const statuses = ref(['alive', 'dead', 'unknown']);
const status = ref('');

const getCharacters = (page, count, filter = null ) => {
  api.getCharacters(page, count, filter).then(response => {
    console.log(response);
    people.value = response.data.results
    pages.value = response.data.info.pages;
    people.value.forEach(el => {
      api.getEpisode(el.episode[0]).then(response => {
        set(el, 'first_episode', response.data.name)
      })
    })
    console.log(people);
  });
}
getCharacters(page.value, count.value);

const nextPage = (current_page) => {
  console.log(current_page)
  getCharacters(current_page, count);
}

const resetFilter = () => {
  name.value = '';
  status.value = '';
  getCharacters(page.value, count.value);
}

const search = () => {
  let filter = '';
  if (name.value.length > 0) {
    filter = `&name=${name.value}`;
  }
  if (status.value.length > 0) {
    filter = `${filter}&status=${status.value}`
  }
  getCharacters(page.value, count.value, filter);
}


</script>
