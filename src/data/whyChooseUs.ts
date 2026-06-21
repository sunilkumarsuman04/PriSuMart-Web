import {
  HiOutlineTag,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineBuildingStorefront,
  HiOutlineHeart,
} from 'react-icons/hi2';
import type { IconType } from 'react-icons';

export interface WhyItem {
  id: string;
  title: string;
  description: string;
  icon: IconType;
}

export const WHY_PRISUMART: WhyItem[] = [
  {
    id: 'prices',
    title: 'Best Prices',
    description: 'Transparent pricing with regular deals — no hidden markups on everyday essentials.',
    icon: HiOutlineTag,
  },
  {
    id: 'quality',
    title: 'Fresh Quality',
    description: 'Every batch is checked for freshness before it ever reaches your basket.',
    icon: HiOutlineSparkles,
  },
  {
    id: 'speed',
    title: 'Fast Delivery',
    description: 'Local dark stores mean your order is close by, not across the city.',
    icon: HiOutlineClock,
  },
  {
    id: 'trust',
    title: 'Trusted Platform',
    description: 'Secure payments and verified delivery partners, every single order.',
    icon: HiOutlineShieldCheck,
  },
  {
    id: 'local',
    title: 'Local Store Support',
    description: 'We partner with neighbourhood stores, helping local businesses grow with us.',
    icon: HiOutlineBuildingStorefront,
  },
  {
    id: 'satisfaction',
    title: 'Customer Satisfaction',
    description: 'Easy returns and responsive support — we fix it fast when something is off.',
    icon: HiOutlineHeart,
  },
];
