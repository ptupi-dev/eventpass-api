import { getTickets } from "../repositories/json.repository.js";

export async function getTicketForUser(ticketId: string, userId: string) {
  const tickets = await getTickets();

  return tickets.find(
    (ticket) => ticket.id === ticketId && ticket.userId === userId,
  );
}
