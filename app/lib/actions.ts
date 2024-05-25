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
  console.log("Updating event:", id, { title, description, date, time, invitees });
  formData.forEach((value, key) => {
    console.log(`formData: ${key} = ${value}`);
  });
  await sql`
    UPDATE events
    SET title = ${title}, description = ${description}, date= ${date}, time = ${time}
    WHERE id = ${id}
  `;
  
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('attendance-')) {
      const userId = key.split('-').slice(1).join('-');
      const status = value as string;
      console.log(`Updating status for invitee ${userId}: ${status}`);
      await sql`
        UPDATE event_attendees
        SET status = ${status}
        WHERE event_id = ${id} AND user_id = ${userId}
      `;
    }
  }


  for (const invitee of invitees) {
    const status = formData.get(`attendance-${invitee}`) as string || 'invited';
    console.log(`Updating status for invitee ${invitee}: ${status}`);
    await sql`
      INSERT INTO event_attendees (event_id, user_id, status)
      VALUES (${id}, ${invitee}, ${status})
      ON DUPLICATE KEY UPDATE status = ${status}
    `;
  }

  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}

