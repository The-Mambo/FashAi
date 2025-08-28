import { StyleTemplate } from '../types';

export const styleTemplates: StyleTemplate[] = [
  // Luxury Lifestyle
  {
    id: 'dubai-penthouse',
    name: 'Dubai Penthouse',
    category: 'luxury',
    description: 'Opulent high-rise living with city skyline views',
    thumbnail: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    prompt: 'luxurious Dubai penthouse interior, floor-to-ceiling windows, city skyline, golden hour lighting, modern furniture',
    tags: ['luxury', 'urban', 'modern'],
    premium: true
  },
  {
    id: 'yacht-lifestyle',
    name: 'Luxury Yacht',
    category: 'luxury',
    description: 'Mediterranean yacht deck with ocean views',
    thumbnail: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
    prompt: 'luxury yacht deck, Mediterranean sea, golden sunset, elegant nautical setting',
    tags: ['luxury', 'ocean', 'sunset'],
    premium: true
  },
  {
    id: 'private-jet',
    name: 'Private Jet',
    category: 'luxury',
    description: 'Executive jet interior with premium finishes',
    thumbnail: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg',
    prompt: 'private jet interior, luxury leather seats, executive cabin, sophisticated lighting',
    tags: ['luxury', 'travel', 'executive'],
    premium: true
  },

  // Old Money
  {
    id: 'tennis-club',
    name: 'Tennis Club',
    category: 'lifestyle',
    description: 'Elite country club tennis courts',
    thumbnail: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg',
    prompt: 'prestigious tennis club, manicured courts, ivy league atmosphere, classic architecture',
    tags: ['sports', 'classic', 'elite']
  },
  {
    id: 'polo-grounds',
    name: 'Polo Grounds',
    category: 'lifestyle',
    description: 'Aristocratic polo field setting',
    thumbnail: 'https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg',
    prompt: 'polo grounds, green fields, equestrian elegance, traditional British countryside',
    tags: ['equestrian', 'classic', 'outdoor']
  },

  // Professional
  {
    id: 'linkedin-studio',
    name: 'LinkedIn Studio',
    category: 'professional',
    description: 'Clean studio backdrop for professional headshots',
    thumbnail: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    prompt: 'professional studio lighting, neutral backdrop, corporate headshot style, clean and sharp',
    tags: ['professional', 'corporate', 'clean']
  },
  {
    id: 'startup-office',
    name: 'Startup Office',
    category: 'professional',
    description: 'Modern tech office environment',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    prompt: 'modern startup office, glass walls, minimalist design, innovative workspace',
    tags: ['tech', 'modern', 'innovative']
  },
  {
    id: 'executive-boardroom',
    name: 'Executive Boardroom',
    category: 'professional',
    description: 'High-end corporate meeting room',
    thumbnail: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg',
    prompt: 'executive boardroom, mahogany table, city view, authoritative corporate setting',
    tags: ['executive', 'corporate', 'authoritative']
  },

  // Creative & Fun
  {
    id: 'film-noir',
    name: '1950s Film Noir',
    category: 'creative',
    description: 'Classic black and white Hollywood drama',
    thumbnail: 'https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg',
    prompt: 'film noir style, dramatic black and white lighting, vintage 1950s atmosphere, classic Hollywood',
    tags: ['vintage', 'dramatic', 'classic']
  },
  {
    id: 'santorini-sunset',
    name: 'Santorini Summer',
    category: 'creative',
    description: 'Greek island paradise with stunning views',
    thumbnail: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
    prompt: 'Santorini Greece, white architecture, blue domes, Mediterranean sunset, island paradise',
    tags: ['travel', 'sunset', 'Mediterranean']
  },
  {
    id: 'neon-tokyo',
    name: 'Neon Tokyo',
    category: 'creative',
    description: 'Cyberpunk city vibes with neon lights',
    thumbnail: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    prompt: 'Tokyo night scene, neon lights, cyberpunk aesthetic, futuristic urban environment',
    tags: ['cyberpunk', 'neon', 'futuristic']
  },

  // Instagram Worthy
  {
    id: 'influencer-cafe',
    name: 'Aesthetic Café',
    category: 'lifestyle',
    description: 'Instagram-perfect coffee shop vibes',
    thumbnail: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
    prompt: 'aesthetic coffee shop, natural lighting, plants, minimalist interior, Instagram worthy',
    tags: ['café', 'aesthetic', 'Instagram']
  },
  {
    id: 'rooftop-city',
    name: 'Rooftop Vibes',
    category: 'lifestyle',
    description: 'Urban rooftop with city skyline',
    thumbnail: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
    prompt: 'rooftop terrace, city skyline, golden hour, urban lifestyle, modern architecture',
    tags: ['urban', 'rooftop', 'skyline']
  }
];

export const getTemplatesByCategory = (category: StyleTemplate['category']) => 
  styleTemplates.filter(template => template.category === category);

export const getTemplateById = (id: string) => 
  styleTemplates.find(template => template.id === id);