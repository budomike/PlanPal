'use server';
import { sql } from '@vercel/postgres';
const { v4: uuidv4 } = require('uuid');
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
export async function createEvent(formData: FormData) {
    const rawFormData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        date: formData.get('date') as string,
        time: formData.get('time') as string,
        invitees: formData.getAll('invitees[]') as string[],
      };

const eventId = uuidv4();
const hostId = 'a71391e4-b168-41c8-89fd-b9affec2f1d1';
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
revalidatePath('/dashboard/events');
redirect('/dashboard/events');
}