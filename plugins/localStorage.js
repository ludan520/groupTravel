import createPersistedState from 'vuex-persistedstate'
export default ({store})=>{
    window.onNuxtReady(()=>{
        createPersistedState({
            ket:"store" // 读取本地存储的数据到store
        })(store)
    })
}