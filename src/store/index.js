import { createStore } from 'vuex'
import userModule from './user.js'
// import directoryModule from './directory.js'

const store = createStore({
 
    modules: {
        user: userModule,
    
    }
})

export default store