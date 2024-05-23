import Form from '@/app/ui/events/edit-form';
import Breadcrumbs from '@/app/ui/events/breadcrumbs';
import { fetchUsers, fetchEventById, fetchInviteesByEventId } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [event, users, invitees] = await Promise.all([
        fetchEventById(id),
        fetchUsers(),
        fetchInviteesByEventId(id),
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
      <Form event={event} users={users} invitees={invitees} />
    </main>
  );
}