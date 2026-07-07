import { getEvents } from "../repositories/json.repository.js";

export async function listEvents() {
  return getEvents();
}
