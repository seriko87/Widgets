const GlobalReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REMOVE_WIDGET':
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === action.payload) {
            return { ...item, status: !item.status };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
export default GlobalReducer;