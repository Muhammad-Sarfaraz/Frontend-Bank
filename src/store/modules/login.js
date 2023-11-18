export default {
    namespaced: true,
    state: {
        user: {},
        token:'',
    },
    actions: {
        setUser(context,user){
            context.commit("setUser",user)
        },
        setToken(context,token){
            context.commit("setToken",token)
        }
    },
    mutations: {
        setUser(state,payload){
            state.user = payload;
        },
        setToken(state,payload){
            state.token = payload;
        },
    }
}