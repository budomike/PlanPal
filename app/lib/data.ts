import { sql } from '@vercel/postgres';
import {
  UserField,
  UsersTableType,
  User,
  Event,
  EventForm,
  EventsTable
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


const ITEMS_PER_PAGE = 8;
export async function fetchFilteredEvents(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const events = await sql<EventsTable>`
      SELECT
        events.id,
        events.title,
        events.description,
        events.date,
        users.id,
        users.name,
        users.email,
        users.image_url,
        (
          SELECT json_agg(json_build_object('user_id', ua.id, 'image_url', ua.image_url))
          FROM users AS ua
          JOIN event_attendees AS ea ON ua.id = ea.user_id
          WHERE ea.event_id = events.id
        ) AS attendees
      FROM events
      JOIN users ON events.host_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        events.title ILIKE ${`%${query}%`}
      ORDER BY events.date ASC
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

// export async function fetchUpcomingEvents() {
//   noStore();
//   try {
//     const data = await sql<UpcomingEventsRaw>`
//       SELECT invoices.amount, users.name, customers.image_url, customers.email, invoices.id
//       FROM events
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;

//     const upcomingEvents = data.rows.map((events) => ({
//       ...events,
//     }));
//     return upcomingEvents;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the upcoming events.');
//   }
// }

export async function fetchUsers() {
  noStore();
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
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

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


