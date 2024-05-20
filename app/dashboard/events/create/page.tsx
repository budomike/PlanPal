import Form from '@/app/ui/events/create-form';
import Breadcrumbs from '@/app/ui/events/breadcrumbs';
import { fetchUsers } from '@/app/lib/data';
 
export default async function Page() {
  const users = await fetchUsers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Events', href: '/dashboard/events' },
          {
            label: 'Create an Event',
            href: '/dashboard/events/create',
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}