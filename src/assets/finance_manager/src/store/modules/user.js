export default {
    state: {
        userAccount: {
            account: '',
            password: ''
        },
        menu:[],
        activeUrl:''
    },
    mutations: {
        setAccount(state, payload) {
            state.userAccount = payload;
        },
        setMenu(state,payload) {
            state.menu = payload.menu;
        },
        setActiveUrl(state,payload){
            state.activeUrl = payload.path;
        }
    }
}