import { HiOutlineMagnifyingGlass, HiOutlineShoppingCart, HiOutlineClipboardDocumentCheck, HiOutlineTruck } from 'react-icons/hi2';
import type { IconType } from 'react-icons';

export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: IconType;
}

export const STEPS: Step[] = [
  {
    id: 'browse',
    number: '01',
    title: 'Browse Products',
    description: 'Explore fresh produce, dairy, snacks and daily essentials organised into simple categories.',
    icon: HiOutlineMagnifyingGlass,
  },
  {
    id: 'cart',
    number: '02',
    title: 'Add To Cart',
    description: 'Pick what you need, adjust quantities, and watch your basket total update instantly.',
    icon: HiOutlineShoppingCart,
  },
  {
    id: 'order',
    number: '03',
    title: 'Place Order',
    description: 'Confirm your address, choose a payment method, and place your order in seconds.',
    icon: HiOutlineClipboardDocumentCheck,
  },
  {
    id: 'delivery',
    number: '04',
    title: 'Get Fast Delivery',
    description: 'Track your order live as it makes its way to your doorstep in 30–40 minutes.',
    icon: HiOutlineTruck,
  },
];
