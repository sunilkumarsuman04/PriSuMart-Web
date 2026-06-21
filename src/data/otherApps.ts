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
    name: 'Coming Soon',
    description: 'Another product from our team is on the way. Check back soon for details.',
    iconLetter: '?',
    url: '#',
    accent: 'brand',
  },
];
