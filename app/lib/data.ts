import { sql } from '@vercel/postgres';
import {
  UserField,
  UsersTableType,
  User,
  Event,
  EventForm,
  EventsTable,
  UpcomingEvent,
  EventAttendees
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchEvent() {

  noStore();

  try {

    const data = await sql<Event>`SELECT * FROM event`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Event data.');
  }
}


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredEvents(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const events = await sql<EventsTable>`
      SELECT
        events.id AS event_id,
        events.title,
        events.description,
        events.date,
        events.time,
        users.id AS user_id,
        users.name,
        users.email,
        users.image_url,
        (
          SELECT json_agg(json_build_object('user_id', ua.id, 'image_url', ua.image_url))
          FROM users AS ua
          JOIN event_attendees AS ea ON ua.id = ea.user_id
          WHERE ea.event_id = events.id AND ea.status = 'attending'
        ) AS attendees
      FROM events
      JOIN users ON events.host_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        events.title ILIKE ${`%${query}%`} OR
        events.description ILIKE ${`%${query}%`}
      ORDER BY events.date ASC, events.time ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return events.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Events.');
  }
}

export async function fetchEventsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM events
    JOIN users ON events.host_id = users.id
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`} OR
      events.title::text ILIKE ${`%${query}%`} OR
      events.date::text ILIKE ${`%${query}%`} OR
      events.description ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of Events.');
  }
}

export async function fetchUpcomingEvents() {
  noStore();
  try {
    const data = await sql<UpcomingEvent>`
      SELECT 
      events.id, 
      events.title, 
      events.date,
      events.time,
      users.name,
      users.image_url
      FROM events
      JOIN users ON events.host_id = users.id
      ORDER BY events.date ASC, events.time ASC
      LIMIT 5`;

    const upcomingEvents = data.rows.map((events) => ({
      ...events,
    }));
    return upcomingEvents;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the upcoming events.');
  }
}

export async function fetchUsers() {
  noStore();
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name,
        image_url
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchFilteredUsers(query: string) {
  noStore();
  try {
    const data = await sql<UsersTableType>`
		SELECT
      users.id,
		  users.name,
		  users.email,
		  users.image_url,
		  COUNT(events.id) AS total_events,
		FROM users
		LEFT JOIN events ON users.id = events.users_id
		WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`}
		GROUP BY users.id, users.name, users.email, users.image_url
		ORDER BY users.name ASC
	  `;

    const users = data.rows.map((user) => ({
      ...user,
    }));

    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch users table.');
  }
}

export async function fetchInvitees(eventId: string) {
  noStore();
  try {
    const result = await sql<EventAttendees>`
    SELECT user_id
    FROM event_attendees
    WHERE event_id = ${eventId}
  `;
  return result.rows.map(row => row.user_id);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchEventById(id: string) {
  noStore();
  try {
    const eventData = await sql<EventForm>`
      SELECT
        id,
        host_id,
        title,
        description,
        date,
        time
      FROM events
      WHERE id = ${id};
    `;

    const event = eventData.rows[0];
    const attendeesData = await sql<Array<{ user_id: string; name: string; image_url: string; status: string; }>>`
    SELECT ea.user_id, ea.status, u.name, u.image_url
    FROM event_attendees AS ea
    JOIN users AS u ON ea.user_id = u.id
    WHERE ea.event_id = ${id};
  `;
  
    event.attendee = attendeesData.rows.flat();
    return event;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch event by ID.');
  }
}


