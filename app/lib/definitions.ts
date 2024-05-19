export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image_url: string;
};

export type UsersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type FormattedUsersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type UserField = {
  id: string;
  name: string;
};

export type Event = {
  image_url: string,
  id: string;
  host_id: string;
  title: string;
  description: string;
  date: string;
};

export type EventAttendees = {
  id: string;
  user_id: string;
  status: 'attending' | 'maybe' | 'not attending';
};

export type EventForm = {
  id: string,
  host_id: string,
  title: string,
  description: string, 
  date: string,
}

export type UpcomingEvent = {
  image_url: string,
  id: string;
  host_id: string;
  title: string;
  date: string;
}
