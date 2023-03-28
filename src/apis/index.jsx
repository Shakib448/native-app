import axios from "axios";

const instances = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default instances;
