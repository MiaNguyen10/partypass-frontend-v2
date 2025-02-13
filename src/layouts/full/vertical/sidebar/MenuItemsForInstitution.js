import { IconBuildingCommunity, IconHome, IconLockPin, IconShoppingBagCheck, IconTicket } from '@tabler/icons-react';
import { uniqueId } from 'lodash';
import pages from '../../../../config/pages';

const MenuItemsForInstitution = [
  {
    id: uniqueId(),
    title: 'Home',
    icon: IconHome,
    href: pages.homePagePath,
  },
  {
    id: uniqueId(),
    title: 'Institution',
    icon: IconBuildingCommunity,
    href: '/institution_detail',
  },
  {
    id: uniqueId(),
    title: 'Tickets',
    icon: IconTicket,
    href: pages.ticketsPathForInstitution,
  },
  {
    id: uniqueId(),
    title: 'Lockers',
    icon: IconLockPin,
    href: pages.lockersPath,
  },
  {
    id: uniqueId(),
    title: 'Purchase',
    icon: IconShoppingBagCheck,
    href: pages.purchasePathForInstitution,
  },
];

export default MenuItemsForInstitution;
