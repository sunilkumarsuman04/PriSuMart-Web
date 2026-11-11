export interface OtherApp {
  id: string;
  name: string;
  description: string;
  iconLetter: string;
  url: string;
  accent: 'brand' | 'sun';
}

// Add more apps here later — each renders as a reusable card with
// icon, name, description, and a visit button.
export const OTHER_APPS: OtherApp[] = [
  {
    id: 'placeholder-1',
    name: 'More from PriSuMart',
    description: 'Explore other products from our team as they become available.',
    iconLetter: 'P',
    url: '#',
    accent: 'brand',
  },
];
