'use client';

import { UserField, EventForm, EventAttendees } from '@/app/lib/definitions';
import {
  InformationCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { UpdateEvent } from './buttons';

export default function EditEventForm({
  event,
  users,
  invitees,
}: {
  event: EventForm;
  users: UserField[];
  invitees: EventAttendees[];
}) {
  // // const updateInvoiceWithId = updateEvent.bind(null, invoice.id);
  // const getInviteeStatus = (userId: string) => {
  //   const invitee = invitees.find(invitee => invitee.user_id === userId);
  //   return invitee ? invitee.status : 'not invited';
  // };

  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Event Name */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Event Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={event.title}
            />

            <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Description*/}

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Event Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                defaultValue={event.description}
                placeholder="Enter a description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Pick a date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                value={event.date}
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

{/* Time */}
<div className="mb-4">
          <label htmlFor="time" className="mb-2 block text-sm font-medium">
            Event Time
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="time"
                name="time"
                type="time"
                value={event.time}
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>


{/* Invitees */}
{/* <div className="mb-4">
        <label htmlFor="invitees" className="mb-2 block text-sm font-medium">
          Invite Friends
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {users.map((user) => (
            <label key={user.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="invitees[]"
                value={user.id}
                defaultChecked={getInviteeStatus(user.id) !== 'not invited'}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 focus:ring-gray-500"
              />
              <img
                src={user.image_url}
                alt={`${user.name}'s profile picture`}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="ml-2 text-sm">{user.name}</span>
              <select
                name={`status_${user.id}`}
                defaultValue={getInviteeStatus(user.id)}
                className="ml-2 rounded border-gray-300"
              >
                <option value="invited">Invited</option>
                <option value="attending">Attending</option>
                <option value="maybe">Maybe</option>
                <option value="not attending">Not Attending</option>
              </select>
            </label>
          ))}
        </div>
      </div> */}




      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
