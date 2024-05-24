const { v4: uuidv4 } = require('uuid');

const users = [
  {
    id: uuidv4(),
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    image_url: '/users/emil-kowalski.png',
  },
  {
    id: uuidv4(),
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    password: '123456',
    image_url: '/users/delba-de-oliveira.png',
  },
  {
    id: uuidv4(),
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    password: '123456',
    image_url: '/users/lee-robinson.png',
  },
  {
    id: uuidv4(),
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    password: '123456',
    image_url: '/users/hector-simpson.png',
  },
  {
    id: uuidv4(),
    name: 'Steven Tey',
    email: 'steven@tey.com',
    password: '123456',
    image_url: '/users/steven-tey.png',
  },
  {
    id: uuidv4(),
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    password: '123456',
    image_url: '/users/steph-dietz.png',
  },
  {
    id: uuidv4(),
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    password: '123456',
    image_url: '/users/michael-novotny.png',
  },
  {
    id: uuidv4(),
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    password: '123456',
    image_url: '/users/evil-rabbit.png',
  },
  {
    id: uuidv4(),
    name: 'Amy Burns',
    email: 'amy@burns.com',
    password: '123456',
    image_url: '/users/amy-burns.png',
  },
  {
    id: uuidv4(),
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    password: '123456',
    image_url: '/users/balazs-orban.png',
  },
];

const events = [
  {
    id: uuidv4(),
    host_id: users[0].id,
    title: 'Dinner',
    description: 'Join us for an elegant dinner at Kyoto House. Enjoy fine dining with friends and family.',
    date: '2026-04-03',
    time: '17:00:00', 
  },
  {
    id: uuidv4(),
    host_id: users[1].id,
    title: 'Wedding Ceremony',
    description: 'Celebrate the union of our beloved couple. Reception to follow immediately after the ceremony.',
    date: '2027-11-03',
    time: '16:00:00', 
  },
  {
    id: uuidv4(),
    host_id: users[2].id,
    title: 'Birthday Bash',
    description: 'Come celebrate with music, food, and fun at the annual birthday bash.',
    date: '2025-04-25',
    time: '19:00:00', 
  },
  {
    id: uuidv4(),
    host_id: users[3].id,
    title: 'Company Lunch',
    description: 'Enjoy a casual lunch with colleagues. A great opportunity to network and relax.',
    date: '2025-07-05',
    time: '12:30:00', 
  },
  {
    id: uuidv4(),
    host_id: users[4].id,
    title: 'New Year Party',
    description: 'Ring in the new year with a spectacular party. Dance and celebrate with friends.',
    date: '2026-02-02',
    time: '15:30:00', 
  },
  {
    id: uuidv4(),
    host_id: users[5].id,
    title: 'Community Gathering',
    description: 'Join the community for an evening of fun activities and socializing.',
    date: '2026-02-02',
    time: '15:30:00', 
  },
  {
    id: uuidv4(),
    host_id: users[6].id,
    title: 'Concert Night',
    description: 'Experience an unforgettable night of live music performances.',
    date: '2026-02-02',
    time: '20:00:00', 
  },
  {
    id: uuidv4(),
    host_id: users[7].id,
    title: 'Networking Event',
    description: 'Expand your professional network at this interactive event. Bring your business cards.',
    date: '2026-02-02',
    time: '11:00:00', 
  },
  {
    id: uuidv4(),
    host_id: users[8].id,
    title: 'Charity Gala',
    description: 'Support a good cause at our annual charity gala. Formal attire required.',
    date: '2026-02-02',
    time: '17:00:00', 
  },
  {
    id: uuidv4(),
    host_id: users[9].id,
    title: 'Art Exhibition',
    description: 'Discover amazing artworks at our latest exhibition. Free entry for all.',
    date: '2026-04-03',
    time: '18:00:00', 
  },
];


const eventAttendees = [
  {
    id: uuidv4(),
    event_id: events[0].id,
    user_id: users[1].id, // Delba attending Event 1
    status: 'attending',
  },
  {
    id: uuidv4(),
    event_id: events[0].id,
    user_id: users[2].id, 
    status: 'attending',
  },
  {
    id: uuidv4(),
    event_id: events[0].id,
    user_id: users[3].id, 
    status: 'not attending',
  },
  {
    id: uuidv4(),
    event_id: events[0].id,
    user_id: users[4].id,  
    status: 'maybe',
  },
  {
    id: uuidv4(),
    event_id: events[0].id,
    user_id: users[5].id, 
    status: 'maybe',
  },
  {
    id: uuidv4(),
    event_id: events[0].id,
    user_id: users[6].id, 
    status: 'maybe',
  },
  {
    id: uuidv4(),
    event_id: events[0].id,
    user_id: users[7].id, 
    status: 'maybe',
  },
  {
    id: uuidv4(),
    event_id: events[0].id,
    user_id: users[8].id, 
    status: 'maybe',
  },
];

module.exports = {
  users,
  events,
  eventAttendees,
};
