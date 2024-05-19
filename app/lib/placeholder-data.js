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
    description: 'Dinner at Kyoto House!',
    date: '2026-04-03',
  },
  {
    id: uuidv4(),
    host_id: users[1].id,
    title: 'Wedding',
    description: 'Wedding',
    date: '2027-11-03',
  },
  {
    id: uuidv4(),
    host_id: users[3].id,
    title: 'Party',
    description: '',
    date: '2025-04-25'
  },
  {
    id: uuidv4(),
    host_id: users[4].id,
    title: 'Lunch',
    description: '',
    date: '2025-07-05'
  },
  {
    id: uuidv4(),
    host_id: users[5].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
  },
  {
    id: uuidv4(),
    host_id: users[6].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
  },
  {
    id: uuidv4(),
    host_id: users[7].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
  },
  {
    id: uuidv4(),
    host_id: users[8].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
  },
  {
    id: uuidv4(),
    host_id: users[9].id,
    title: 'Party',
    description: '',
    date: '2026-02-02'
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
