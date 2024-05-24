import Form from '@/app/ui/events/edit-form';
import Breadcrumbs from '@/app/ui/events/breadcrumbs';
import { fetchUsers, fetchEventById } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [event, users] = await Promise.all([
        fetchEventById(id),
        fetchUsers(),
      ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Events', href: '/dashboard/events' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/events/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form event={event} users={users}/>
    </main>
  );
}