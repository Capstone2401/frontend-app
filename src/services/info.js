import axios from "axios";

async function getAllAttributes() {
  const response = await axios.get("/api/info/attributes");
  return response.data;
}

async function getAllEventNames() {
  const response = await axios.get("/api/info/eventNames");
  return response.data;
}

export default {
  getAllAttributes,
  getAllEventNames,
};
