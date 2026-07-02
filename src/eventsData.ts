export type Event = {
  id: number;
  sport: string;
  sportBg: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  people: number;
  rating: number;
  image: string;
  heroImage: string;
  host: string;
  price: string;
  description: string;
};

export const EVENTS: Event[] = [
  {
    id: 1,
    sport: 'Tennis',
    sportBg: '#15803d',
    name: 'Wimbledon 1st Round',
    date: 'Sun, Aug 17th 2023 at 15:00',
    time: '15:00 - 18:00',
    venue: 'Sports Bar Zanzi',
    address: 'at Teresienstr. 160, München, Germany 80667',
    people: 6,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=200',
    heroImage: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
    host: 'John Isner',
    price: '22€ per Person',
    description: 'Cupcake ipsum dolor sit amet oat cake toffee carrot cake chocolate bar. Candy canes danish candy tart gummi bears pie bonbon gummi bears tootsie roll.',
  },
  {
    id: 2,
    sport: 'Soccer',
    sportBg: '#1d4ed8',
    name: 'Champions League Final',
    date: 'Sun, Aug 17th 2023 at 15:00',
    time: '18:00 - 23:00',
    venue: 'Sports Bar Zanzi',
    address: 'at Teresienstr. 160, München, Germany 80667',
    people: 12,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200',
    heroImage: '/assets/410647d5bb8582f82f0f02467f620a4439223300.png',
    host: 'John Isner',
    price: '22€ per Person',
    description: 'Cupcake ipsum dolor sit amet oat cake toffee carrot cake chocolate bar. Candy canes danish candy tart gummi bears pie bonbon gummi bears tootsie roll.',
  },
  {
    id: 3,
    sport: 'Soccer',
    sportBg: '#1d4ed8',
    name: 'Girls Only: FIFA WC Final',
    date: 'Sun, Aug 20th 2023 at 15:00',
    time: '15:00 - 19:00',
    venue: 'The Offside',
    address: 'at Maximilianstr. 30, München, Germany 80539',
    people: 7,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200',
    heroImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    host: 'Sarah Müller',
    price: 'Free',
    description: 'Cupcake ipsum dolor sit amet oat cake toffee carrot cake chocolate bar. Candy canes danish candy tart gummi bears pie bonbon gummi bears tootsie roll.',
  },
  {
    id: 4,
    sport: 'Badminton',
    sportBg: '#7c3aed',
    name: 'Thomas Cup 2023',
    date: 'Sun, Aug 20th 2023 at 18:00',
    time: '18:00 - 21:00',
    venue: 'Ace Sports Bar',
    address: 'at Leopoldstr. 5, München, Germany 80802',
    people: 22,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200',
    heroImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    host: 'Mike Chen',
    price: '10€ per Person',
    description: 'Cupcake ipsum dolor sit amet oat cake toffee carrot cake chocolate bar. Candy canes danish candy tart gummi bears pie bonbon gummi bears tootsie roll.',
  },
  {
    id: 5,
    sport: 'Football',
    sportBg: '#007860',
    name: 'Wimbledon 1st Round',
    date: 'Sun, Aug 17th 2023 at 15:00',
    time: '20:00 - 23:00',
    venue: 'Draftsmen Bar',
    address: 'at Sendlinger Str. 10, München, Germany 80331',
    people: 10,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200',
    heroImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    host: 'Tom Brady',
    price: '5€ per Person',
    description: 'Cupcake ipsum dolor sit amet oat cake toffee carrot cake chocolate bar. Candy canes danish candy tart gummi bears pie bonbon gummi bears tootsie roll.',
  },
];
