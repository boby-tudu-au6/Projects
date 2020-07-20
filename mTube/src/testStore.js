// const initState = {
//   posts:[],
//   todos:[]
// }

// // reducers
// function myreducer(state=initState,action){
//   switch(action.type){
//     case "ADD_TODO": return {...state,todos:[...state.todos,action.todo]}
//      default:
//        return state
//   }
// }
// // actions
// const todoAction = {type:"ADD_TODO",todo:{work:"buy milk", isCompleted:false}}

// // store
// const store = createStore(myreducer)
// store.subscribe(()=>{
//   console.log("state updated")
//   console.log(store.getState())
// })
// store.dispatch(todoAction)
// store.dispatch({type:"ADD_TODO",todo:{work:"take shower", isCompleted:false}})