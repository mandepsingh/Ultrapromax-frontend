const userName = window.localStorage.getItem("userName");
const userId = window.localStorage.getItem("userId");

export const inititalState = { name:  userName, userId : userId};

export const reducer = (state, action) => {
    if (action.type === "USER") {   
        return {
            name : action.name,
            userId : action.userid
        };  
    }
}