import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { UpcomingEvent } from '@/app/lib/definitions';
export default async function UpcomingEvent({
  upcomingEvent,
}: {
  upcomingEvent: UpcomingEvent[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Upcoming Events
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
          {upcomingEvent.map((event, i) => {
            return (
              <div
                key={event.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={event.image_url}
                    alt={`${event.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {event.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {event.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
              {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day:'numeric', year:'numeric' })}
                </p>
                <p>{event.time}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
