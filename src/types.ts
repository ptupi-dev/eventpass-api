export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export type PublicUser = Omit<User, "password">;

export type Event = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  date: string;
  location: string;
};

export type Ticket = {
  id: string;
  userId: string;
  eventId: string;
  qrCode: string;
  code: string;
  seat: string;
};

export type AuthenticatedUser = {
  id: string;
  email?: string;
};
