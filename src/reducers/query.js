const handleSetQueryData = (data) => {
  const copy = JSON.parse(JSON.stringify(data));
  copy.forEach((calculation) => calculation.values.reverse());
  return copy;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        isLoading: false,
        error: null,
        data: handleSetQueryData(action.payload),
      };
    case "FETCH_ERROR":
      return { isLoading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

export default reducer;
