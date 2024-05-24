export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image_url: string;
  status: 'attending' | 'maybe' | 'not attending' | 'invited';
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
  status: 'attending' | 'maybe' | 'not attending' | 'invited';
};

export type UserField = {
  id: string;
  name: string;
  image_url: string;
};

export type EventsTable = {
  event_id: string;
  host_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image_url: string;
  name: string;
  email: string;
  user_id: string;
  attendees: Array<{ user_id: string; image_url: string }>;
}

export type Event = {
  image_url: string;
  id: string;
  host_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
};

export type EventAttendees = {
  event_id: string;
  user_id: string;
  name: string;
  image_url: string;
  status: 'attending' | 'maybe' | 'not attending' | 'invited';
};

export type EventForm = {
  id: string;
  host_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  attendee: Array<{user_id: string; image_url: string; name: string; status: string;}>;
  notInvited: Array<{user_id: string; image_url: string; name: string; status: string;}>
}

export type UpcomingEvent = {
  image_url: string;
  id: string;
  host_id: string;
  title: string;
  date: string;
  name: string;
  time: string;
}
