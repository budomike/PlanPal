import Image from 'next/image';
import { UpdateEvent, DeleteEvent } from '@/app/ui/events/buttons';
import InvoiceStatus from '@/app/ui/events/status';
import { formatDateToLocal, formatTimeTo12Hour } from '@/app/lib/utils';
import { fetchFilteredEvents } from '@/app/lib/data';
import clsx from 'clsx';

export default async function EventsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
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
                        width={28}
                        height={28}
                        alt={`${event.host_id}'s profile picture`}
                      />
                      <p>{event.host_id}</p>
                    </div>
                    <p className="text-sm text-gray-500">{event.title}</p>
                  </div>
                </div>
                <div className="flex w-full flex-col justify-between pt-4 space-y-2">
                  <div>
                    <p className="text-xl font-medium"></p>
                    <p>{formatDateToLocal(event.date)}</p>
                    <p>{formatTimeTo12Hour(event.time)}</p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2 p-2 md:p-4">
                    <UpdateEvent id={event.event_id} />
                    {/*<DeleteInvoice id={invoice.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 lg:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Host
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium hidden 2xl:table-cell">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Time
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Who&apos;s Attending
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {events?.map((event) => (
                <tr
                  key={event.event_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={event.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${event.name}'s profile picture`}
                      />
                      <p>{event.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {event.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 hidden 2xl:table-cell">
                    {event.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(event.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatTimeTo12Hour(event.time)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex space-x-2">
                      {event.attendees?.map((attendees) => (
                        <Image
                          key={attendees.user_id}
                          src={attendees.image_url}
                          alt="Attendees"
                          className="h-8 w-8 rounded-full"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <UpdateEvent id={event.event_id} />
                      {/*<DeleteInvoice id={invoice.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
