import { UserField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  PencilIcon,
  InformationCircleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createEvent } from '@/app/lib/actions';
import Image from 'next/image';

export default function Form({ users }: { users: UserField[] }) {
  return (
    <form action={createEvent}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Host */}
      <div className="mb-4">
          <label htmlFor="host" className="mb-2 block text-sm font-medium">
            Host
          </label>
          <div className="relative">
          <select
              id="host"
              name="host"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a Host
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Event Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Event Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter a title"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
              maxLength={40}
            />
            <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Description */}
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
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Invites*/}
        <fieldset>
        <div className="mb-4">
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
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  );
}
