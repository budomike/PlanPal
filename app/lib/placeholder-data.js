// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    password: '123456',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    password: '123456',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    password: '123456',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    password: '123456',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    password: '123456',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    password: '123456',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    password: '123456',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    password: '123456',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    password: '123456',
    image_url: '/customers/balazs-orban.png',
  },
];

const events = [
  {
    id: '1',
    host_id: users[0].id,
    title: 'Dinner',
    description: 'Dinner at Kyoto House!',
    date: '2026-04-03',
  },
  {
    id: '2',
    host_id: users[1].id,
    title: 'Wedding',
    description: 'Wedding',
    date: '2027-11-03',
  },
  {
    id: '3',
    host_id: users[3].id,
    title: 'Party',
    description: '',
    date: '2025-04-25'
  },
  {
    id: '4',
    host_id: users[4].id,
    title: 'Lunch',
    description: '',
    date: '2025-07-05'
  },
  {
    id: '5',
    host_id: users[5].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
  },
  {
    id: '6',
    host_id: users[6].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
  },
  {
    id: '7',
    host_id: users[7].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
  },
  {
    id: '8',
    host_id: users[8].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
  },
  {
    id: '9',
    host_id: users[9].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
  },
];

const eventAttendees = [
  {
    id: '1',
    event_id: '1',
    user_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a', // Delba attending Event 1
    status: 'attending',
  },
  {
    id: '2',
    event_id: '1',
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a', 
    status: 'attending',
  },
  {
    id: '3',
    event_id: '1',
    user_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a', 
    status: 'not attending',
  },
  {
    id: '4',
    event_id: '1',
    user_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a', 
    status: 'maybe',
  },
  {
    id: '5',
    event_id: '1',
    user_id: '50ca3e18-62cd-11ee-8c99-0242ac120002', 
    status: 'maybe',
  },
  {
    id: '6',
    event_id: '1',
    user_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a', 
    status: 'maybe',
  },
  {
    id: '7',
    event_id: '1',
    user_id: '76d65c26-f784-44a2-ac19-586678f7c2f2', 
    status: 'maybe',
  },
  {
    id: '8',
    event_id: '1',
    user_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa', 
    status: 'maybe',
  },
];

module.exports = {
  users,
  customers,
  events,
  eventAttendees,
};
