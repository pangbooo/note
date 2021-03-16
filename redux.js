function createStore(reducer){
    let state = null;
    let listeners = [];
    const subscribe = (listener) => listeners.push(listener)
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    }
    
    dispatch();
    return { getState, dispatch, subscribe}
}

const initalState = {
    color: "red",
    text: 'abc'
}
function themeReducer (state = initalState, action){
    switch(action.type){
        case 'CHANGE_COLOR':
            return {...state, color: action.payload.color}
        case 'B':
            return {...state, text: action.payload.text}
        default:
            return state
    }
}

const store = createStore(themeReducer )

