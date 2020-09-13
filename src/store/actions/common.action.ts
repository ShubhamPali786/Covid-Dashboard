export const commonActionTypes={
    SET_LOADING:'[Common] Set Loading'
}

const setLoading=(status:boolean)=>{
    return{type:commonActionTypes.SET_LOADING,status}
};

export const commonActions={setLoading}