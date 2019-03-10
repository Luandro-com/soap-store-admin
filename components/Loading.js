import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

function CircularIndeterminate(props) {
  const { classes } = props
  return (
    <div className="container">
      <CircularProgress className={classes.progress} color="secondary" />
      <style jsx>{`
        .container {
          margin: 0 auto;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CircularIndeterminate)
