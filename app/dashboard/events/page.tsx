import Pagination from '@/app/ui/events/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/events/table';
import { CreateEvent } from '@/app/ui/events/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchEventsPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
};
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1; 
  const totalPages = await fetchEventsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-96 items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Upcoming Events</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search events..." />
        <CreateEvent />
      </div>
        <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}