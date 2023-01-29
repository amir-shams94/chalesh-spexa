<template>
    <div>
        <div class="row">
        <div class="col-md-4 q-pl-lg" >
          <q-breadcrumbs class="text-grey-10" active-color="dark">
      <template v-slot:separator>
        <q-icon
          size="1.2em"
          name="arrow_forward"
          color="dark"
        />
      </template>
    
      <q-breadcrumbs-el label='Home'  icon="home"  :to="{name:'home'}"/>
      <q-breadcrumbs-el label='Directory'  to="/directory" />
    


    </q-breadcrumbs>
        </div>
      </div>
        <router-view>
    
        </router-view>
    </div>
    </template>
    <script setup>
import { useRoute } from 'vue-router';
import { ref,watch } from 'vue'
const path = ref('')
const route = useRoute()
path.value = route.path

// path.value = path.value.slice(1,3)
console.log(path.value);


    </script>