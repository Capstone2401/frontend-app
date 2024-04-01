import { useCallback, useReducer } from "react";

function useQueryReducer() {
  const initialState = {
    isLoading: false,
    error: null,
    data: null,
  };
  const handleSetQueryData = useCallback((data) => {
    const copy = JSON.parse(JSON.stringify(data)).reverse();
    copy.forEach((record) => {
      record.value = record.calculated_value;
      delete record.calculated_value;
    });

    return copy;
  }, []);

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

  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, useCallback(dispatch, [dispatch])];
}

export default useQueryReducer;
