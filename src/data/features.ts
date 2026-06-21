import {
  HiOutlineBolt,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineCursorArrowRipple,
  HiOutlineMapPin,
  HiOutlineChatBubbleLeftRight,
} from 'react-icons/hi2';
import type { IconType } from 'react-icons';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: IconType;
}

export const FEATURES: Feature[] = [
  {
    id: 'fast-delivery',
    title: 'Fast Delivery',
    description: 'Most orders reach your doorstep in just 30–40 minutes, from nearby dark stores in your neighbourhood.',
    icon: HiOutlineBolt,
  },
  {
    id: 'fresh-products',
    title: 'Fresh Products',
    description: 'Daily-sourced fruits, vegetables and dairy, quality-checked before they leave the store.',
    icon: HiOutlineSparkles,
  },
  {
    id: 'secure-payments',
    title: 'Secure Payments',
    description: 'Pay by UPI, card, wallet or cash on delivery — every transaction is encrypted end to end.',
    icon: HiOutlineShieldCheck,
  },
  {
    id: 'easy-ordering',
    title: 'Easy Ordering',
    description: 'A clean, three-tap checkout built for speed — search, add to cart, and you are done.',
    icon: HiOutlineCursorArrowRipple,
  },
  {
    id: 'live-tracking',
    title: 'Live Tracking',
    description: 'Track your delivery partner on a live map from the moment they leave the store.',
    icon: HiOutlineMapPin,
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Real help, any time of day, for order issues, refunds or anything in between.',
    icon: HiOutlineChatBubbleLeftRight,
  },
];
