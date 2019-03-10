import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { checkToken } from '../lib/auth'
import Drawer from '../components/Drawer'
import USER from '../queries/user.gql'
import Loading from '../components/Loading'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
})

class App extends Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  render() {
    const { classes } = this.props
    return (
      <Query query={USER}>
        {({ loading: loadingUser, error: errorUser, data: dataUser }) => {
          if(loadingUser) return <Loading />
          if(dataUser && dataUser.user) {
            if (dataUser.user.role !== 'ADMIN' && dataUser.user.role !== 'EDITOR') {
              return <h1>Não autorizado</h1>
            }
            return (
              <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerToggle}
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                      Perdiódicos Admin
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Drawer
                  user={dataUser.user}
                  handleDrawerToggle={this.handleDrawerToggle}
                  mobileOpen={this.state.mobileOpen}
                  {...this.props}
                />
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  {this.props.children}
                </main>
              </div>
            )
          }
          Router.push('/login')
          return <h1>Redirecionando</h1>
        }}
      </Query>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(App)