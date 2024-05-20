const { db } = require('@vercel/postgres');
const { v4: uuidv4 } = require('uuid');
const {
  events,
  users,
  eventAttendees 
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, image_url)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedEvents(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "events" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS events (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        host_id UUID NOT NULL REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log(`Created "events" table`);

    // Insert data into the "events" table
    const insertedEvents = await Promise.all(
      events.map(
        (event) => client.sql`
        INSERT INTO events (id, host_id, title, description, date)
        VALUES (${event.id}, ${event.host_id}, ${event.title}, ${event.description}, ${event.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedEvents.length} events`);

    return {
      createTable,
      events: insertedEvents,
    };
  } catch (error) {
    console.error('Error seeding events:', error);
    throw error;
  }
}

async function seedEventAttendees(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS event_attendees (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        event_id UUID NOT NULL REFERENCES events(id),
        user_id UUID NOT NULL REFERENCES users(id),
        status VARCHAR(50) NOT NULL -- e.g., 'attending', 'not attending', 'maybe'
      );
    `;

    console.log(`Created "event_attendees" table`);

        if (createTable.rowCount === 0) {
          console.log('Table already exists or was successfully created');
        }
      
    const insertedEventAttendees = await Promise.all(
      eventAttendees.map(
        (attendee) => client.sql`
        INSERT INTO event_attendees (id, event_id, user_id, status)
        VALUES (${attendee.id}, ${attendee.event_id}, ${attendee.user_id}, ${attendee.status})
      `,
      ),
    );

    console.log(`Seeded ${insertedEventAttendees.length} event attendees`);

    return {
      createTable,
      eventAttendees: insertedEventAttendees,
    };
  } catch (error) {
    console.error('Error seeding event attendees:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedEvents(client);
  await seedEventAttendees(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
