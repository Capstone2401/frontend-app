import axios from "axios";

async function eventsBy(params, options) {
  const response = await axios.get(`/api/query/${params.category}`, {
    params,
    ...options,
  });

  return response.data;
}

export default {
  eventsBy,
};
