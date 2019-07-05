
// 用户管理
export const state = () => {
    return {
        userInfo: {
            token: "",
            user: {}
        },
    }

}
// 同步
export const mutations = {
    // 保存用户信息到state
    setUserInfo(state,data){
        state.userInfo=data;
    },
    // 清除用户数据
    cleanUserInfo(state,info){
        if(process.bowser){
            localStorage.removeItem("userInfo");
        }
        state.userInfo={}
    }
};
// 异步

export const actions = {
    login({commit}, data){
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: data
        }).then(res => {
            const data = res.data;
            commit("setUserInfo", data);
            return data;
        })
    }
};