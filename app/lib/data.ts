import { sql } from '@vercel/postgres';
import {
  UserField,
  UsersTableType,
  User,
  Event,
  EventForm
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { events } from './placeholder-data';

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


const ITEMS_PER_PAGE = 9;
export async function fetchFilteredEvents(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const events = await sql<Event>`
      SELECT
        events.id,
        events.title,
        events.description,
        events.date,
        users.name,
        users.email,
        users.image_url
      FROM events
      JOIN users ON events.users_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        events.amount::text ILIKE ${`%${query}%`} OR
        events.date::text ILIKE ${`%${query}%`} OR
        events.title ILIKE ${`%${query}%`}
      ORDER BY events.date DESC
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
    JOIN users ON events.users_id = users.id
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

export async function fetchEventById(id: string) {
  noStore();
  try {
    const data = await sql<EventForm>`
      SELECT
        events.id,
        events.host_id,
        events.title,
        events.description,
        events.date,
      FROM events
      WHERE events.id = ${id};
    `;

    const event = data.rows.map((events) => ({
      ...events,
    }));

    return event[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch event.');
  }
}

// const loggedInUserId = '410544b2-4001-4271-9855-fec4b6a6442a'; // Assume this is the logged-in user's ID

// async function fetchEvents() {
//   const client = await db.connect();

//   try {
//     const eventsData = await client.sql`
//       SELECT e.*, u.name AS host_name
//       FROM events e
//       JOIN users u ON e.host_id = u.id
//       ORDER BY e.date ASC;
//     `;

//     const events = await Promise.all(eventsData.map(async event => {
//       const attendeesData = await client.sql`
//         SELECT ea.*, u.name AS attendee_name
//         FROM event_attendees ea
//         JOIN users u ON ea.user_id = u.id
//         WHERE ea.event_id = ${event.id};
//       `;
      
//       const attendees = attendeesData.map(attendee => ({
//         id: attendee.user_id,
//         name: attendee.user_id === loggedInUserId ? '(You)' : attendee.attendee_name,
//         status: attendee.status,
//       }));

//       return {
//         ...event,
//         host_name: event.host_id === loggedInUserId ? '(You)' : event.host_name,
//         attendees,
//       };
//     }));

//     console.log(events);

//     return events;
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     throw error;
//   } finally {
//     await client.end();
//   }
// }

// async function updateAttendance(eventId, userId, status) {
//   const client = await db.connect();

//   try {
//     const result = await client.sql`
//       INSERT INTO event_attendees (event_id, user_id, status)
//       VALUES (${eventId}, ${userId}, ${status})
//       ON CONFLICT (event_id, user_id) 
//       DO UPDATE SET status = ${status}
//       RETURNING *;
//     `;

//     console.log(`Updated attendance for event ${eventId}, user ${userId}:`, result);
//   } catch (error) {
//     console.error('Error updating attendance:', error);
//     throw error;
//   } finally {
//     await client.end();
//   }
// }

// Example usage
// fetchEvents();
// updateAttendance('1', loggedInUserId, 'attending');
