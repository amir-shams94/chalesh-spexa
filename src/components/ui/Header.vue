<template>
  <div class="q-pa-md">
   
          
    <q-header reveal elevated class="bg-white">
        <q-toolbar>
          <div class="q-gutter-sm">
            <q-btn @click="logout" class=" q-mr-md" color="white" text-color="black" label="logout" />
      <q-chip>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
     {{userName}}
      </q-chip>
    </div>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>Quasar Framework</q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

  </div>
</template>
<script setup>
import { computed, } from 'vue';
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'
const store = useStore()
const userName = computed(() => store.getters['user/getUser'])
const router = useRouter()

function logout() {
  store.dispatch('user/logout')
  router.push('/register')
  
}
</script>
<style>

.bg-white{
  background:#fff;
  color: #282828;
}
</style>