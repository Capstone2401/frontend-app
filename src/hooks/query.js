import { useReducer, useCallback } from "react";
import queryReducer from "../reducers/query";

function useQueryReducer() {
  const initialState = {
    isLoading: false,
    error: null,
    data: [{ aggregationType: null, timeUnit: null, values: [] }],
  };

  const [state, dispatch] = useReducer(queryReducer, initialState);
  return [state, useCallback(dispatch, [dispatch])];
}

export { useQueryReducer };
