import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://roubepc.discloud.app/',
});