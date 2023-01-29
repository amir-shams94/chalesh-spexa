<template>
 
<q-layout class="bg-siler">
<Header v-if="route.name != 'register' && route.name != 'login' "/>

  <q-page-container>
    
    <q-page>
    
    <router-view></router-view>
    </q-page>
  </q-page-container>

</q-layout>

</template>

<script setup>
import Header from '@/components/ui/Header.vue'
// import { computed } from 'vue';
// import {ref} from 'vue'
import { useRoute } from 'vue-router'



const route = useRoute()









</script>

<style>
.bg-siler {
  background: #f3f3f3 !important
  ;
}
a{
  color: #282828;
    text-decoration: none;
}
</style>
