import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const POST = "post";
const GET = "get";
// const PUT = "put";
// const DELETE = "delete";
// const PATCH = "patch";

export const mock = new MockAdapter(axios, {
  delayResponse: 1000,
  onNoMatch: "throwException",
});

const apiRequest = async ({ method, url, payload = {} }) => {
  try {
    let config = {
      url: url,
      method: method,
      data: payload,
    };

    const response = await axios(config);

    console.log("response api ", response);

    return response.data;
  } catch (error) {
    console.log("error api ", error);
    throw error?.data || error?.response?.data;
  }
};

const get = ({ url, payload }) =>
  apiRequest({
    url: url,
    payload,
    method: GET,
  });

const post = ({ url, payload }) =>
  apiRequest({
    method: POST,
    url: url,
    payload: payload,
  });

export default { get, post };
