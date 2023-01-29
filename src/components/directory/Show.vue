<template>
    <div>
        <div>

            <div class="row q-mt-xl ">
                <div v-if="detect" class="col-xs-6 col-sm-6 col-md-4 align-center">

                    <span class="material-icons" style="font-size: 216px;">
                        cloud_upload
                    </span>
                    <h5 class="title"> there is noting to show </h5>
                    <q-btn color="black" @click="prompt = true" class="full-width" label="Create directory" />


                </div>
                <div v-else class="row col-md-12">
                    <div class="col-md-2 q-ml-lg q-mb-lg" v-for="dir in directories" :key="dir.id">
                        <q-card flat bordered class="my-card">
                            <q-card-section>
                                <q-icon size="200px" name="folder" color="dark" @click="" />

                                <h6 class="text-h6 text-center" style="margin:0px">{{ dir.title }}</h6>
                            </q-card-section>


                        </q-card>
                    </div>

                    <div class="col-md-2 q-ml-sm">

                        <q-btn round icon="add" @click="prompt = true" color="black" size=".75rem" />
                    </div>

                </div>





            </div>
        </div>


        <div class="q-pa-md q-gutter-sm">



            <q-dialog v-model="prompt" persistent>


                <q-card style="min-width: 350px">
                    <q-card-section>
                        <div class="text-h6">Create Directory</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-input dense v-model="directory" autofocus @keyup.enter="prompt = false" />
                    </q-card-section>
                    <div class="row justify-align-center">
                        <q-card-actions align="right" class="text-primary">
                            <q-btn color="black" label="Cancel" v-close-popup />
                            <q-btn color="dark" label="Create" v-close-popup @click="addDirectory(directory)" />
                        </q-card-actions>
                    </div>


                </q-card>

            </q-dialog>
        </div>

    </div>
</template>



<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
const route = useRoute()


const prompt = ref('')

const directory = ref('')
const store = useStore()
const rootId = ref('')
const itemToShow = ref(false)
prompt.value = false


route.value = route.params.id
async function fetchdirectory() {

    await store.dispatch('user/fetchDirectory', { id: route.value })


}
async function addDirectory() {
    await store.dispatch('user/createDirectory', { title: directory.value, id: route.value })
    fetchdirectory()
}

fetchdirectory()
const directories = computed(() => store.getters['user/allDirectories'])
const detect = computed(() => {
    return store.getters['user/detectIsChild']
})


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