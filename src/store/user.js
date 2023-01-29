import axios from 'axios'
import Swal from 'sweetalert2'

const user = {
  namespaced: true,
  state() {
    return {
      accessToken: localStorage.getItem('access_token')
        ? localStorage.getItem('access_token')
        : '',
      refreshToken: localStorage.getItem('refreshToken')
        ? localStorage.getItem('refreshToken')
        : '',
      isLoginIn: localStorage.getItem('isLogin')
      ? localStorage.getItem('isLogin')
      : '',
      userEmail: localStorage.getItem('userName')
        ? localStorage.getItem('userName')
        : '',
      rootDirectoryId: localStorage.getItem('rootDirectoryId')
      ? localStorage.getItem('rootDirectoryId')
      : '',
      directoryList: [],
  
    }
  },
  getters: {
    isLogin(state) {
      return state.isLoginIn
    },
    getUser(state) {
      return state.userEmail
    },
    getAccessToken(state) {
      return state.accessToken
    },
    allDirectories(state) {
      return state.directoryList
    },

    detectIsChild(state) {
      return state.directoryList.length === 0
     
    }
    // isAuthenticated: state => state.accessToken != null
  },
  mutations: {
    setTokens(state, data) {
      console.log(data.data)
      state.accessToken = data.data.access_token
      localStorage.setItem('access_token', state.accessToken)
      state.refreshToken = data.data.refresh_token
      localStorage.setItem('refreshToken', state.refreshToken)
      state.isLoggedIn = true
      localStorage.setItem('isLogin', state.isLoggedIn)
      state.rootDirectoryId = data.data.root_directory_id
      localStorage.setItem('rootDirectoryId', data.data.root_directory_id)
    },
    removeTokens(state) {
      state.accessToken = null
      state.refreshToken = null
    },
    setUserEmail(state, email) {
      state.userEmail = email
      localStorage.setItem('userName', email)
    },
    setTokenRefresh(state, data) {
      state.accessToken = data.access_token
      localStorage.setItem('access_token', state.accessToken)
      state.refreshToken = data.refresh_token
      localStorage.setItem('refreshToken', state.refreshToken)
    },
    setDirectoryList(state, data) {
      state.directoryList = data
    },


  },
  actions: {
    async register({ commit }, payload) {
      const url = 'https://challenge.spexa.dev/user/login'
      try {
        const res = await axios.post(
          url,
          { email: payload.email, password: payload.password },
          {
            credentials: 'include',
          },
        )
        const data = await res.data.data
        console.log(data)
        for (const key in data) {
          if (key === 'refresh_token') {
            console.log(key)
            Swal.fire({
              title: 'You are register all ready!',
              text: 'Plz Login To Account.',
              toast: true,
              icon: 'warning',
              showConfirmButton: false,
              position: 'center',
              timer: 2000,
              timerProgressBar: true,
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async login({ commit }, payload) {
      const url = 'https://challenge.spexa.dev/user/login'

      const res = await axios.post(
        url,
        { email: payload.email, password: payload.password },
        {
          // credentials: 'include',
        },
      )
      const data = res.data

      commit('setTokens', data)
      commit('setUserEmail', payload.email)
      // commit('setRefreshToken', response.data.refreshToken)
    },
    logout({ commit }) {
      localStorage.removeItem('access_token')
      commit('removeTokens')
    },

    async refreshToken({ commit,state }) {
      // Make a request to the server to get a new access token using the refresh token
      const url = 'https://challenge.spexa.dev/user/refresh'

      const refreshToken = state.refreshToken
      console.log(refreshToken);
      const res = await axios.post(
        url,
        { refresh_token: refreshToken },
        {
          credentials: 'include',
        },
      )
      const data = await res.data.data
      console.log(data);
      commit('setTokenRefresh', data)
    },

    async createDirectory({ commit, dispatch }, payload) {
      try {
        // const rootDirectoryId = localStorage.getItem('rootDirectoryId')
        const access_token = localStorage.getItem('access_token')
        console.log(access_token)
        const res = await axios.post(
          `https://challenge.spexa.dev/directory/${payload.id}`,

          { title: payload.title },
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
            // credentials: 'include',
          },
        )
        const data = res.data.data.directories
        commit('setDirectoryList', data)
        Swal.fire({
         
          text: 'Your directory is created!',
          toast: true,
          // icon: 'error',
          showConfirmButton: false,
          position: 'bottom',
          color:'#fff',
          background: '#282828',
          timer: 2000,
          timerProgressBar: true,
        })
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          console.log('jwt expire');
          dispatch('refreshToken')
          console.log(payload);
          return dispatch('createDirectory', payload)
        }
        return Promise.reject(error)
    }
    },
    async fetchDirectory({ commit,dispatch }, payload) {
      try {
       
        // const refreshToken = localStorage.getItem('refreshToken')
        // dispatch('refreshToken',refreshToken)
        const access_token = localStorage.getItem('access_token')
        const res = await axios.get(
          `https://challenge.spexa.dev/directory/${payload.id}`,
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
            // credentials: 'include',
          },
        )
        const data = await res.data.data.directories
        

        commit('setDirectoryList', data)
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          console.log('jwt expire');
          dispatch('refreshToken')
          console.log(payload);
          return dispatch('fetchDirectory', payload)
        }
        return Promise.reject(error)
    }
    },

    async deleteDirectory({ commit, dispatch }, payload) {
      try {
        const rootDirectoryId = localStorage.getItem('rootDirectoryId')
        const access_token = localStorage.getItem('access_token')
        console.log(access_token)
        const res = await axios.delete(
          `https://challenge.spexa.dev/directory/${payload.id}`,
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
            // credentials: 'include',
          },
          { title: payload.title },
        )

        await dispatch('fetchDirectory', { id: rootDirectoryId })
        Swal.fire({
          text: 'Your directory is deleted!',
          toast: true,
          // icon: 'error',
          showConfirmButton: false,
          position: 'bottom',
          color:'#fff',
          background: '#282828',
          timer: 2000,
          timerProgressBar: true,
        })
   
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          console.log('jwt expire');
          dispatch('refreshToken')
          console.log(payload);
          return dispatch('deleteDirectory', payload)
        }
        return Promise.reject(error)
    }
    },
  },
}


export default user
