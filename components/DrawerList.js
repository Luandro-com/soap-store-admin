import Link from 'next/link'
import { withRouter } from 'next/router'
import { ApolloConsumer } from 'react-apollo'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/DashboardOutlined'
import OrdersIcon from '@material-ui/icons/MoveToInboxOutlined'
import ProductsIcon from '@material-ui/icons/LocalOfferOutlined'
import ClientsIcon from '@material-ui/icons/FaceOutlined'
import AdminIcon from '@material-ui/icons/PeopleOutlineOutlined'
import AnalyticsIcon from '@material-ui/icons/PollOutlined'
import ShopIcon from '@material-ui/icons/ShopOutlined'
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

import { logout } from '../lib/auth'

const DrawerList = ({ classes, email, name, router: { pathname } }) => (
  <ApolloConsumer>
    {client => (
      <div className="list">
        <div className={`${classes.toolbar} nav-toolbar`}>
          {name && name}
          {(!name && email) && email}
        </div>
        <Divider />
        <List>
          <Link prefetch href='/'>
            <ListItem button disabled={pathname === '/'}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={"Painel"} />
            </ListItem>
          </Link>
          <Link prefetch href='/orders'>
            <ListItem button disabled={pathname === '/orders'}>
              <ListItemIcon><OrdersIcon /></ListItemIcon>
              <ListItemText primary={"Ordens"} />
            </ListItem>
          </Link>
          <Link prefetch href='/products'>
            <ListItem button disabled={pathname === '/products'}>
              <ListItemIcon><ProductsIcon /></ListItemIcon>
              <ListItemText primary={"Produtos"} />
            </ListItem>
          </Link>
          <Link prefetch href='/clients'>
            <ListItem button disabled={pathname === '/clients'}>
              <ListItemIcon><ClientsIcon /></ListItemIcon>
              <ListItemText primary={"Clientes"} />
            </ListItem>
          </Link>
          <Link prefetch href='/admins'>
            <ListItem button disabled={pathname === '/admins'}>
              <ListItemIcon><AdminIcon /></ListItemIcon>
              <ListItemText primary={"Administradores"} />
            </ListItem>
          </Link>
          {/* <Link prefetch href='/analytics'>
            <ListItem button disabled={pathname === '/analytics'}>
              <ListItemIcon><AnalyticsIcon /></ListItemIcon>
              <ListItemText primary={"Analítica"} />
            </ListItem>
          </Link> */}
          <Divider />
          <Link prefetch href='/shop'>
            <ListItem button disabled={pathname === '/shop'}>
              <ListItemIcon><ShopIcon /></ListItemIcon>
              <ListItemText primary={"Loja"} />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary={"Sair"} onClick={() => logout(client)} />
          </ListItem>
        </List><style jsx>{`
            .nav-toolbar {
              text-align: center;
            }
            .nav-toolbar {
              padding-top: 15px;
            }
        `}</style>
      </div>
    )}
  </ApolloConsumer>
)

export default withRouter(DrawerList)