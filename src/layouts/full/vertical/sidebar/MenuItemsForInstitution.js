import { uniqueId } from "lodash";
import { IconHome } from '@tabler/icons-react';
import { IconTicket } from '@tabler/icons-react';
import { IconBuildingCommunity } from '@tabler/icons-react';
import { IconShoppingBagCheck } from '@tabler/icons-react';
import pages from "../../../../config/pages";

const MenuItemsForInstitution = [
  {
    id: uniqueId(),
    title: 'Home',
    icon: IconHome,
    href: pages.homePagePath,
  },
  {
    id: uniqueId(),
    title: 'Tickets',
    icon: IconTicket,
    href: pages.ticketsPath,
  },
  {
    id: uniqueId(),
    title: 'Institutions',
    icon: IconBuildingCommunity,
    href: pages.institutionsPath,
  },
  {
    id: uniqueId(),
    title: 'Purchase',
    icon: IconShoppingBagCheck,
    href: pages.purchasePath,
  }
];

export default MenuItemsForInstitution;
