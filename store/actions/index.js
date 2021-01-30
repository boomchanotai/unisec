
export const increment = number => {
    return{
        type : 'INCREMENT',
        payload : number
    }
}

export const decrement = number => {
    return{
        type : 'DECREMENT',
        payload : number
    }
}

export const setUser = user => {
    return{
        type : 'SETUSER',
        payload : user
    }
}