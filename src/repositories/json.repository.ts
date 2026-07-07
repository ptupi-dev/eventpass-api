import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Event, Ticket, User } from "../types.js";

const dataDirectory = join(process.cwd(), "src", "data");

async function readJsonFile<T>(fileName: string): Promise<T> {
  const file = await readFile(join(dataDirectory, fileName), "utf-8");

  return JSON.parse(file) as T;
}

export function getUsers(): Promise<User[]> {
  return readJsonFile<User[]>("users.json");
}

export function getEvents(): Promise<Event[]> {
  return readJsonFile<Event[]>("events.json");
}

export function getTickets(): Promise<Ticket[]> {
  return readJsonFile<Ticket[]>("tickets.json");
}
