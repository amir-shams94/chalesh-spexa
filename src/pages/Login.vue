<template>
   
    <div class="q-pa-md " style="max-width: 400px;margin: 0px auto;position: relative;top: 6rem;">
        <h4>Try the product out for</h4>
        <q-form @submit="register(email,pass)" @reset="onReset" class="q-gutter-md ">
            <q-input filled   v-model="email" label="UserName *"  hint="UserName" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input filled type="text" v-model="pass" label="Password *" lazy-rules :rules="[
                val => val !== null && val !== '' || 'Please type your Password'
            ]" />



            <div>

                <q-btn color="black" class="full-width" label="Login" type="submit" />
            </div>
        </q-form>

    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import {useStore} from 'vuex'
const email = ref('')
const pass = ref('')
const store = useStore()
const route = useRouter()
async function register()
 {
  
   await  store.dispatch('user/login', {email:email.value,password:pass.value})

    route.push({ name: 'home' })
}
// function goToHome() {
// }
</script>
<style>
.bg-white {
    background-color: beige;
}
</style>