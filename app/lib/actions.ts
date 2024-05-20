'use server';
import { sql } from '@vercel/postgres';
const { v4: uuidv4 } = require('uuid');
 
export async function createEvent(formData: FormData) {
    const rawFormData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        date: formData.get('date') as string,
        time: formData.get('time') as string,
        invitees: formData.getAll('invitees[]') as string[],
      };

const eventId = uuidv4();
const hostId = 'a28ae69e-8d7d-464f-9f9d-24ec402214bd';
const { title, description, date, time, invitees } = rawFormData;

console.log(rawFormData);
await sql`
INSERT INTO events (id, title, description, date, time, host_id)
VALUES (${eventId}, ${title}, ${description}, ${date}, ${time}, ${hostId})
`;

for (const inviteeId of invitees) {
    await sql`
        INSERT INTO event_attendees (event_id, user_id, status)
        VALUES (${eventId}, ${inviteeId}, 'invited')
    `;
}
}