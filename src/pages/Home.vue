<template>

    <div class="row">
        <div class="col-md-4 q-pl-lg">
            <q-breadcrumbs class="text-grey-10" active-color="dark">
                <template v-slot:separator>
                    <q-icon size="1.2em" name="arrow_forward" color="dark" />
                </template>

                <q-breadcrumbs-el label='Home' icon="home" />




            </q-breadcrumbs>
        </div>
    </div>
    <div class="row q-mt-xl ">
        <div class="row col-md-12">
            <div class="col-md-2 q-ml-lg q-mb-lg" v-if="rootId.value !== ''">
                <q-card flat bordered class="my-card" style="
    cursor: pointer;
">
                    <q-card-section>
                        <q-icon size="200px" name="folder" color="dark" @click="goToDirectory()" />


                        <h6 class="text-h6 text-center" style="margin:0px">root</h6>
                    </q-card-section>


                </q-card>
            </div>









        </div>
    </div>


</template>



<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
const route = useRouter()
const prompt = ref('')
const isLogin = ref('')
const directory = ref('')
const store = useStore()
const rootId = ref('')
const itemToShow = ref(false)
prompt.value = false

async function addDirectory() {


    store.dispatch('user/createDirectory', { title: directory.value })
}
async function fetchdirectory() {
    store.dispatch('user/fetchDirectory')
}
isLogin.value = computed(() => store.getters['user/getUser'])

rootId.value = computed(() => {
    return localStorage.getItem('rootDirectoryId')
})
function goToDirectory() {

    route.push('/directory')
}


</script>


<style scoped>
.align-center {
    margin: 0 auto;
    text-align: center
}

.title {
    margin-bottom: 11px;
    margin-top: 0;

}

.btn-folder {

    position: absolute;
    top: 0;
    right: 0;

}
</style>