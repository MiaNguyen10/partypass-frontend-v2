import { Box, List, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import MenuItemsForInstitution from './MenuItemsForInstitution';
import MenuItemsForSystemAdmin from './MenuItemsForSystemAdmin';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';
import RestrictedPermission from '../../../../middlewares/PermissionProvider/RestrictedPermission';
import { roles } from '../../../../config/Constant';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const dispatch = useDispatch();

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        <RestrictedPermission allowedRoles={[roles[1].value]}>
          {MenuItemsForSystemAdmin.map((item) => {
            // {/********SubHeader**********/}
            if (item.subheader) {
              return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

              // {/********If Sub Menu**********/}
              /* eslint no-else-return: "off" */
            } else if (item.children) {
              return (
                <NavCollapse
                  menu={item}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  pathWithoutLastPart={pathWithoutLastPart}
                  level={1}
                  key={item.id}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );

              // {/********If Sub No Menu**********/}
            } else {
              return (
                <NavItem
                  item={item}
                  key={item.id}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );
            }
          })}
        </RestrictedPermission>
        <RestrictedPermission allowedRoles={[roles[2].value]}>
        {MenuItemsForInstitution.map((item) => {
            // {/********SubHeader**********/}
            if (item.subheader) {
              return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

              // {/********If Sub Menu**********/}
              /* eslint no-else-return: "off" */
            } else if (item.children) {
              return (
                <NavCollapse
                  menu={item}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  pathWithoutLastPart={pathWithoutLastPart}
                  level={1}
                  key={item.id}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );

              // {/********If Sub No Menu**********/}
            } else {
              return (
                <NavItem
                  item={item}
                  key={item.id}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );
            }
          })}
        </RestrictedPermission>
      </List>
    </Box>
  );
};
export default SidebarItems;
