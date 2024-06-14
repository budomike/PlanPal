
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UpdateEvent, DeleteEvent } from '@/app/ui/events/buttons';
import { formatDateToLocal, formatTimeTo12Hour } from '@/app/lib/utils';

function TableRow({ event, showActions }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <tr onClick={handleToggle} className="cursor-pointer w-full border-t border-gray-300 py-3 text-sm">
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-3">
            <Image
              src={event.image_url}
              className="mr-2 rounded-full"
              width={32}
              height={32}
              alt={`${event.name}'s profile picture`}
            />
            <p>{event.name}</p>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-3">{event.title}</td>
        <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(event.date)}</td>
        <td className="whitespace-nowrap px-3 py-3">{formatTimeTo12Hour(event.time)}</td>
        <td className="whitespace-nowrap px-3 py-3">
          <div className="flex space-x-2">
            {event.attendees?.slice(0, 3).map((attendee) => (
              <Image
                key={attendee.user_id}
                src={attendee.image_url}
                alt="Attendees"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            ))}
            {event.attendees && event.attendees.length > 3 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm">
                +{event.attendees.length - 3}
              </div>
            )}
          </div>
        </td>
        {showActions && (
          <td className="whitespace-nowrap py-3 pl-6 pr-3">
            <div className="flex justify-end gap-2">
              <UpdateEvent id={event.event_id} />
              <DeleteEvent id={event.event_id} />
            </div>
          </td>
        )}
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={showActions ? 6 : 5} className="px-3 py-3">
            <p>{event.description}</p>
          </td>
        </tr>
      )}
    </>
  );
}

export default TableRow;
