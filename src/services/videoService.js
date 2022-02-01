import http from "./httpService";
import apiUrl from "../config";

const apiEndpoint = apiUrl.apiUrl;
export function getVideos() {
  return http.get(apiEndpoint);
}
