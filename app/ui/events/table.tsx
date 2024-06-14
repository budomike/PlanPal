import Image from 'next/image';
import { UpdateEvent, DeleteEvent } from '@/app/ui/events/buttons';
import { formatDateToLocal, formatTimeTo12Hour } from '@/app/lib/utils';
import { fetchFilteredEvents } from '@/app/lib/data';
import clsx from 'clsx';
import React from 'react';
import TableRow from '@/app/ui/events/tablerow'; 

export default async function EventsTable({
  query,
  currentPage,
  showActions = true,
}: {
  query: string;
  currentPage: number;
  showActions?: boolean;
}) {
  const events = await fetchFilteredEvents(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="block lg:hidden">
            {events?.map((event) => (
              <div
                key={event.event_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={event.image_url}
                        className="mr-2 rounded-full"
                        width={32}
                        height={32}
                        alt={`${event.host_id}'s profile picture`}
                      />
                      <div className="flex flex-col">
                        <p className="text-sm">{event.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="pt-4 text-sm text-gray-500">{event.title}</p>
                <div className="flex w-full flex-col justify-between space-y-2 pt-4">
                  <div>
                    <p className="text-xl font-medium"></p>
                    <p>{formatDateToLocal(event.date)}</p>
                    <p>{formatTimeTo12Hour(event.time)}</p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2 p-2 md:p-4">
                    <UpdateEvent id={event.event_id} />
                    <DeleteEvent id={event.event_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 lg:table table-fixed">
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 pb-5 font-medium sm:pl-6">
                  Host
                </th>
                <th scope="col" className="px-3 pb-5 font-medium">
                  Title
                </th>
                <th scope="col" className="px-3 pb-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 pb-5 font-medium">
                  Time
                </th>
                <th scope="col" className="px-3 pb-5 font-medium">
                  Who&apos;s Attending
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {events?.map((event) => (
                <TableRow key={event.event_id} event={event} showActions={true}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
