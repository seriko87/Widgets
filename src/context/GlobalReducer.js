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
    case 'SET_USER_CORDS':
      return {
        ...state,
        location: action.payload,
      };
    case 'ADD_CRYPTO':
      return {
        ...state,
        cryptoData: [...state.cryptoData, action.payload],
      };
    case 'REMOVE_CRYPTO':
      return {
        ...state,
        cryptoData: state.cryptoData.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default GlobalReducer;
