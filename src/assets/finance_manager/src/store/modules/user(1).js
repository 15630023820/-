import router from '@/router'
export default {
    state: {
        userAccount: {
            account: '',
            password: ''
        },
        menu: [],
        activeUrl: '',
        cacheTags: []
    },
    getters: {
        getCacheTags(state) {
            return state.cacheTags
        }
    },
    mutations: {
        setAccount(state, payload) {
            state.userAccount = payload;
        },
        setMenu(state, payload) {
            state.menu = payload.menu;
        },
        setActiveUrl(state, payload) {
            state.activeUrl = payload.path;
        },
        addCacheTag(state, payload) {
            if (state.cacheTags.some(tag => tag.title === payload.title)) return;
            state.cacheTags.push(payload)
        },
        removeTag(state, removeTag) {
            let index = state.cacheTags.findIndex(tag => {
                return tag.title === removeTag.title;
            });
            if (index !== -1) {
                state.cacheTags.splice(index, 1);
            }
            // tag删除完毕默认去首页
            if (state.cacheTags.length === 0) return router.push("/dashboard");

            // 关掉的非自己时，不做任何处理
            if (router.currentRoute.name !== removeTag.route.name)return 
            console.log(router.currentRoute,'当前路由',removeTag.route.name);
            // 不止一个，删除的是自己，需要路由切换
            // 由于删除元素位置发生了变化，后一个就是index当前索引，前一个是-1
            let nextTag = state.cacheTags[index] || state.cacheTags[index -1];
            // 最后一个的时候，前后都没有
            nextTag && router.push(nextTag.route);
        }
    }
}