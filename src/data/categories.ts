import {
  GiCarrot,
  GiAppleSeeds,
} from 'react-icons/gi';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { LuMilk, LuCookie, LuSparkles } from 'react-icons/lu';
import { PiWineDuotone, PiPillDuotone } from 'react-icons/pi';
import type { IconType } from 'react-icons';

export interface Category {
  id: string;
  name: string;
  icon: IconType;
  bgClass: string;
}

export const CATEGORIES: Category[] = [
  { id: 'vegetables', name: 'Vegetables', icon: GiCarrot, bgClass: 'bg-brand-100 text-brand-700' },
  { id: 'fruits', name: 'Fruits', icon: GiAppleSeeds, bgClass: 'bg-sun-100 text-sun-700' },
  { id: 'dairy', name: 'Dairy', icon: LuMilk, bgClass: 'bg-cream-100 text-ink-800' },
  { id: 'snacks', name: 'Snacks', icon: LuCookie, bgClass: 'bg-sun-100 text-sun-700' },
  { id: 'beverages', name: 'Beverages', icon: PiWineDuotone, bgClass: 'bg-brand-100 text-brand-700' },
  { id: 'household', name: 'Household', icon: HiOutlineHomeModern, bgClass: 'bg-cream-100 text-ink-800' },
  { id: 'medicine', name: 'Medicine', icon: PiPillDuotone, bgClass: 'bg-brand-100 text-brand-700' },
  { id: 'beauty', name: 'Beauty', icon: LuSparkles, bgClass: 'bg-sun-100 text-sun-700' },
];
