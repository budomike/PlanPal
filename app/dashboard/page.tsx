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
      <div className="mt-6 flex flex-col md:flex-row">
        <div className="flex-grow md:w-1/2">
          <UpcomingEvent upcomingEvent={upcomingEvents} />
        </div>
        <div className="flex items-center justify-center md:mx-4 md:w-1">
          <div className="h-full w-px bg-gray-300"></div>
        </div>
        <div className="flex-grow md:w-1/2">
          <PastEvent pastEvent={pastEvents} />
        </div>
      </div>
    </main>
  );
}
