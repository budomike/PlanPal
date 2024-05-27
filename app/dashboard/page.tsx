
import UpcomingEvent from '@/app/ui/dashboard/upcoming-events';
import PastEvent from '../ui/dashboard/past-events';
import { lusitana } from '@/app/ui/fonts';
import { fetchUpcomingEvents, fetchPastEvents } from '../lib/data';
 
export default async function Page() {
  const upcomingEvents = await fetchUpcomingEvents();
  const pastEvents = await fetchPastEvents();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-10">
        <UpcomingEvent upcomingEvent={upcomingEvents} />
        <div className="border-l border-gray-300 h-full"></div>
        <PastEvent pastEvent={pastEvents} />
      </div>
    </main>
  );
}