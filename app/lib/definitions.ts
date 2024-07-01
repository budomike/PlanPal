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

export type PastEventsTable = {
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

export type PastEvent = {
  image_url: string;
  id: string;
  host_id: string;
  title: string;
  date: string;
  name: string;
  time: string;
}

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
}

export type WeatherData = {
  dt: number;
  main: Main;
  weather: Weather[];
  wind: Wind;
  visibility: number;
  pop: number;
  dt_txt: string;
}

export type WeatherResponse = {
  list: WeatherData[];
}