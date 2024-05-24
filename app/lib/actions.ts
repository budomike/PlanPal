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
const hostId = 'e9733461-08ba-4f68-9e95-811084934f3f';
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

 
export async function updateEvent(id: string, formData: FormData) {
  const rawFormData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    invitees: formData.getAll('invitees[]') as string[],
  };

  const { title, description, date, time, invitees } = rawFormData;

  await sql`
    UPDATE events
    SET title = ${title}, description = ${description}, date= ${date}, time = ${time}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}