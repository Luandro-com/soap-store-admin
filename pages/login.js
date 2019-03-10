import React, { Component } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Query, Mutation } from "react-apollo"
import USER from '../queries/user.gql'
import LOGIN from '../queries/login.gql'
import { setToken, checkToken } from '../lib/auth'

const styles = {
  card: {
    margin: '10% auto',
    textAlign: 'center',
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}

class Login extends Component {
  state = {
    email: 'admin@example.com',
    password: 'nooneknows'
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { classes } = this.props
    const { email, password } = this.state
    return (
      <Query query={USER}>
        {({ loading: loadingUserId, error: errorUserId, data: dataUser, client }) => {
          if (loadingUserId) return <h1>Loading user ID</h1>
          if (dataUser && dataUser.user) {
            console.log('DATA', dataUser)
            if (dataUser.user.role === 'CUSTOMER') {
              return <h1>Não autorizado</h1>
            }
            client.writeData({ data: { user: dataUser.user } })
            Router.push('/')
            return (<h1>Bem vindo {dataUser.user.email}</h1>)
          }
          return (
            <Mutation mutation={LOGIN}>
            {(login, { error: errorLogin, client: clientLogin }) => (
              <Card className={classes.card}>
                {errorLogin && console.log(errorLogin)}
                <CardContent>
                  <form className={classes.container} autoComplete="off" onSubmit={async (e) => {
                    e.preventDefault()
                    const res = await login({ variables: { email, password }})
                    if (res && res.data.login.token) {
                      setToken(res.data.login.token)
                      clientLogin.writeData({ data: {
                        user: {
                          __typename: 'user',
                        ...res.data.login.user,
                        }
                      }})
                      Router.push('/')
                    }
                  }}>
                    <TextField
                      id="standard-email"
                      label="Email"
                      type="email"
                      className={classes.textField}
                      value={email}
                      onChange={this.handleChange('email')}
                      margin="normal"
                    />
                    <TextField
                      id="standard-password-input"
                      label="Password"
                      type="password"
                      className={classes.textField}
                      value={password}
                      onChange={this.handleChange('password')}
                      margin="normal"
                    />
                    <hr />
                    <Button size="small" color="primary" type="submit">
                      Entrar
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </Mutation>
          )
        }}
      </Query>
    )
  }

}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)

