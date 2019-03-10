import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import DrawerList from './DrawerList'

export default ({ user, mobileOpen, handleDrawerToggle, classes, container, theme }) => (
  <nav className={classes.drawer}>
    <Hidden smUp implementation="css">
      <Drawer
        container={container}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerList classes={classes} {...user} />
      </Drawer>
    </Hidden>
    <Hidden xsDown implementation="css">
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        <DrawerList classes={classes} {...user} />
      </Drawer>
    </Hidden>
  </nav>
)
