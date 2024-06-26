import Form from '@/app/ui/events/edit-form';
import Breadcrumbs from '@/app/ui/events/breadcrumbs';
import { fetchUsers, fetchEventById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit an Event',
};
 
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [event, users] = await Promise.all([
        fetchEventById(id),
        fetchUsers(),
      ]);

      if (!event) {
        notFound();
      }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Events', href: '/dashboard/events' },
          {
            label: 'Edit Event',
            href: `/dashboard/events/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form event={event} users={users}/>
    </main>
  );
}