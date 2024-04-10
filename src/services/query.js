import axios from "axios";

async function eventsBy(body, options) {
  const response = await axios.post(
    `/api/query/${body.category}`,
    body,
    options,
  );

  return response.data;
}

export default {
  eventsBy,
};
