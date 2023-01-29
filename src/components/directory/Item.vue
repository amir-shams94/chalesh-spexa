<template>
    <div>
        <div>

                    <div class="col-md-2 q-ml-lg q-mb-lg">
                        <q-card flat bordered class="my-card">
                            <q-card-section>
                                <q-icon size="200px" name="folder" color="dark" @click="goToDirectory()" />
                                <q-btn color="" round flat icon="more_horiz" class="btn-folder">
                                    <q-menu cover auto-close>
                                        <q-list>
                                            <q-item clickable>
                                                <q-item-section @click="remove = true" >Remove </q-item-section>
      
                                            </q-item>
                                            <q-item clickable>
                                             <router-link :to="{name:'showDirectory',params:{name:props.directories.title,id:props.directories.id}}">   <q-item-section >open</q-item-section></router-link>
                                            </q-item>

                                        </q-list>

                                    </q-menu>

                                </q-btn>
                                <h6 class="text-h6 text-center" style="margin:0px">{{ props.directories.title }}</h6>
                            </q-card-section>


                        </q-card>
                    </div>
                </div>
                <div class="q-pa-md q-gutter-sm">



                    <q-dialog v-model="remove" persistent>


<q-card style="min-width: 350px">
    <q-card-section>
        <div class="text-h6">Delete Directory</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
        <p>
            Are you sure you want delete  {{props.directories.title}} directory!?
        </p>

    </q-card-section>
    <div class="row justify-align-center">
        <q-card-actions align="right" class="text-primary">
            <q-btn color="black" label="Cancel" v-close-popup />
            <q-btn color="dark" label="ok" v-close-popup @click="deleteDirectory(props.directories.title,props.directories.id)"/>
        </q-card-actions>
    </div>


</q-card>

</q-dialog>

</div>

    </div>
</template>



<script setup>
import { useRoute } from 'vue-router';

import { ref, computed ,defineProps} from 'vue'
import { useStore } from 'vuex'
const props = defineProps({
    directories:Object
})



const route = useRoute()


const remove = ref('')

const directory = ref('')
const store = useStore()
const rootId = ref('')
const itemToShow = ref(false)
remove.value = false

route.value = route.params.id
async function deleteDirectory(title,id) {
    console.log(title,id)
    await store.dispatch('user/deleteDirectory', {title: title,id:id})
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
.swal-modal {
  background-color: rgba(28,28,28);
  border: 3px solid white;
}
</style>