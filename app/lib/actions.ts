'use server';
import { sql } from '@vercel/postgres';
const { v4: uuidv4 } = require('uuid');
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
export async function createEvent(formData: FormData) {
    const rawFormData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        date: formData.get('date') as string,
        time: formData.get('time') as string,
        invitees: formData.getAll('invitees[]') as string[],
      };

const eventId = uuidv4();
const hostId = '6e864549-6e78-4eda-a7b9-4d35eacec9b7';
const { title, description, date, time, invitees } = rawFormData;

try{
await sql`
INSERT INTO events (id, title, description, date, time, host_id)
VALUES (${eventId}, ${title}, ${description}, ${date}, ${time}, ${hostId})
`;
} catch (error) {
  return {message: 'Database Error: Failed to Create Event.',
};
}

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
  formData.forEach((value, key) => {
  });
  try{
  await sql`
    UPDATE events
    SET title = ${title}, description = ${description}, date= ${date}, time = ${time}
    WHERE id = ${id}
  `;
} catch (error){
  return {message: 'Failed to Update Event',};
}
  
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('attendance-')) {
      const userId = key.split('-').slice(1).join('-');
      const status = value as string;
      try {
      await sql`
        UPDATE event_attendees
        SET status = ${status}
        WHERE event_id = ${id} AND user_id = ${userId}
      `;
      } catch (error) {
        return {message: 'Failed to Update Statuses of Invitees.',
      };
      }
    }
  }


  for (const invitee of invitees) {
    const status = formData.get(`attendance-${invitee}`) as string || 'invited';
    try {
    await sql`
      INSERT INTO event_attendees (event_id, user_id, status)
      VALUES (${id}, ${invitee}, ${status})
    `;
    } catch (error){
      return {message: 'Failed to Update Invitees List.',};
    }
  }

  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}

export async function deleteEvent(id: string) {
  await sql`DELETE FROM event_attendees WHERE event_id = ${id}`;
  await sql`DELETE FROM events WHERE id = ${id}`;
  revalidatePath('/dashboard/events');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}