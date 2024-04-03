export type Event = {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
  date: string;
  hostId: number;
  hostname: string;
  createdAt: string;
};

export type CreateEvent = {
  name: string;
  description: string;
  link: string;
  image: string;
  date: string;
};
