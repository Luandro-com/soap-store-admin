import Link from 'next/link'
import { withRouter } from 'next/router'
import { ApolloConsumer } from 'react-apollo'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/DashboardOutlined'
import OrdersIcon from '@material-ui/icons/MoveToInboxOutlined'
import IssueIcon from '@material-ui/icons/FeaturedPlayListOutlined'
import ClientsIcon from '@material-ui/icons/FaceOutlined'
import AdminIcon from '@material-ui/icons/PeopleOutlineOutlined'
import AnalyticsIcon from '@material-ui/icons/PollOutlined'
import JournalIcon from '@material-ui/icons/BookOutlined'
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
          <Link prefetch href='/submissions'>
            <ListItem button disabled={pathname === '/submissions'}>
              <ListItemIcon><OrdersIcon /></ListItemIcon>
              <ListItemText primary={"Submissões"} />
            </ListItem>
          </Link>
          <Link prefetch href='/issues'>
            <ListItem button disabled={pathname === '/issues'}>
              <ListItemIcon><IssueIcon /></ListItemIcon>
              <ListItemText primary={"Edições"} />
            </ListItem>
          </Link>
          <Link prefetch href='/users'>
            <ListItem button disabled={pathname === '/users'}>
              <ListItemIcon><ClientsIcon /></ListItemIcon>
              <ListItemText primary={"Usuários"} />
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
          <Link prefetch href='/journal'>
            <ListItem button disabled={pathname === '/journal'}>
              <ListItemIcon><JournalIcon /></ListItemIcon>
              <ListItemText primary={"Periódico"} />
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