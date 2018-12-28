// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const rates = [
  {
    id: 1,
    currency: 'EUR',
    rate: 100
  },
  {
    id: 2,
    currency: 'GBP',
    rate: 120
  },
  {
    id: 3,
    currency: 'PLN',
    rate: 10
  }
];

const lamps = [
  {
    id: 0,
    room: 'Living',
    name: 'TV',
    size: 10
  },
  {
    id: 1,
    room: 'Living',
    name: 'Bookcase',
    size: 10
  },
  {
    id: 2,
    room: 'Living',
    name: 'Reading',
    size: 3
  },
  {
    id: 3,
    room: 'Kitchen',
    name: 'Main',
    size: 20
  },
  {
    id: 4,
    room: 'Kitchen',
    name: 'Cupboard',
    size: 2
  },
];

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    rates: () => rates,
    rate: (_, {id}) => rates.filter(r => r.id === id)[0],
    lamps: (_, {room}) => lamps.filter(l => l.room === room),
    lamp: (_, {id}) => lamps.filter(l => l.id === id)[0]
  },
};

module.exports = resolvers;