 

export default{
    state:{
        user:{
            account:'',
            password:''
        },
        menu:{
            menuList:[]
        },
         activeUrl:'',
    },
    getters:{
        user(state){
            return state.user
        }
    },
    mutations:{
        setUser(state,payload){
            console.log('payload',payload)
            state.user = payload
        },
        setMenuList(state,payload){
            state.menu.menuList = payload
        },
        setActiveUrl(state,payload){
            state.activeUrl = payload.path
        }
    },
    actions:{
        setUser({commit},payload){
            commit('setUser',payload)
        }
    }
}