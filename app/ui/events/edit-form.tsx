'use client';

import { UserField, EventForm, EventAttendees } from '@/app/lib/definitions';
import {
  InformationCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateEvent } from '@/app/lib/actions';
import Image from 'next/image';

export default function EditEventForm({
  event,
  users,
}: {
  event: EventForm;
  users: UserField[];
}) {

  const updateEventWithId = updateEvent.bind(null, event.id);

  return (
    <form action={updateEventWithId}>
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
              required
              maxLength={40}
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
                maxLength={150}
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
                defaultValue={new Date(event.date).toISOString().split('T')[0]}
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
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
                defaultValue={event.time}
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

<div className="mb-4">
  <label htmlFor="invitees" className="mb-2 block text-sm font-medium">
  </label>
  <div className="grid grid-cols-3 gap-4">
    {/* Column for attending */}
    <div>
      <h3 className="text-lg font-medium mb-2">Attending</h3>
      {event.attendee?.filter(attendee => attendee.status === 'attending').map((attendee) => (
        <label key={attendee.user_id} className="flex items-center space-x-2">
          <Image
            src={attendee.image_url}
            alt={`${attendee.name}'s profile picture`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="ml-2 text-sm">{attendee.name}</span>
          <select defaultValue={attendee.status} id={`attendance-${attendee.user_id}`} name={`attendance-${attendee.user_id}`}>
            <option value="attending">Attending</option>
            <option value="maybe">Maybe</option>
            <option value="not attending">Not Attending</option>
            <option value="invited">Invited</option>
          </select>
        </label>
      ))}
    </div>

    {/* Column for maybe */}
    <div>
      <h3 className="text-lg font-medium mb-2">Maybe</h3>
      {event.attendee?.filter(attendee => attendee.status === 'maybe').map((attendee) => (
        <label key={attendee.user_id} className="flex items-center space-x-2">
          <Image
            src={attendee.image_url}
            alt={`${attendee.name}'s profile picture`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="ml-2 text-sm">{attendee.name}</span>
          <select defaultValue={attendee.status} id={`attendance-${attendee.user_id}`} name={`attendance-${attendee.user_id}`}>
            <option value="attending">Attending</option>
            <option value="maybe">Maybe</option>
            <option value="not attending">Not Attending</option>
            <option value="invited">Invited</option>
          </select>
        </label>
      ))}
    </div>

    {/* Column for not attending */}
    <div>
      <h3 className="text-lg font-medium mb-2">Not Attending</h3>
      {event.attendee?.filter(attendee => attendee.status === 'not attending').map((attendee) => (
        <label key={attendee.user_id} className="flex items-center space-x-2">
          <Image
            src={attendee.image_url}
            alt={`${attendee.name}'s profile picture`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="ml-2 text-sm">{attendee.name}</span>
          <select defaultValue={attendee.status} id={`attendance-${attendee.user_id}`} name={`attendance-${attendee.user_id}`}>
            <option value="attending">Attending</option>
            <option value="maybe">Maybe</option>
            <option value="not attending">Not Attending</option>
            <option value="invited">Invited</option>
          </select>
        </label>
      ))}
    </div>
    <div>
      <h3 className="text-lg font-medium mb-2">Invited</h3>
      {event.attendee?.filter(attendee => attendee.status === 'invited').map((attendee) => (
        <label key={attendee.user_id} className="flex items-center space-x-2">
          <Image
            src={attendee.image_url}
            alt={`${attendee.name}'s profile picture`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="ml-2 text-sm">{attendee.name}</span>
          <select defaultValue={attendee.status} id={`attendance-${attendee.user_id}`} name={`attendance-${attendee.user_id}` }>
          <option value="attending">Attending</option>
            <option value="maybe">Maybe</option>
            <option value="not attending">Not Attending</option>
            <option value="invited">Invited</option>
          </select>
        </label>
      ))}
    </div>
  </div>
</div>

<div>
  <h3 className="text-lg font-medium mb-2">Invite More Friends</h3>
  <div className="grid grid-cols-3 gap-4">
    {users.filter(user => !event.attendee.some(attendee => attendee.user_id === user.id)).map(user => (
      <label key={user.id} className="flex items-center space-x-2">
        <input
            type="checkbox"
            name="invitees[]"
            value={user.id}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 focus:ring-gray-500"
          />
        <Image
          src={user.image_url}
          alt={`${user.name}'s profile picture`}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="ml-2 text-sm">{user.name}</span>
      </label>
    ))}
  </div>
</div>

</div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Event</Button>
      </div>
    </form>
  );
}
