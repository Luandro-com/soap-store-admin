import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import OutlineTextField from './OutlineTextField'

const validate = values => {
  const errors = {}
  // if (!values.userName) {
  //   errors.userName = 'Required'
  // }
  return errors
}

const cleanObject = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (Array.isArray(obj[prop]) && obj[prop]) 
    if (obj[prop]) { newObj[prop] = obj[prop]; }
  });
  return newObj;
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '100%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

class JournalAboutForm extends Component {
  onEditorStateChange = (editor, change, blur) => {
    blur('description')
    change('description', editor)
  }
  render() {
    const { classes, onSubmit, content } = this.props
    return (
      <Form
        initialValues={content}
        onSubmit={async e => {
          let cleanList = {}
          Object.keys(e).map(i => {
            if (Array.isArray(e[i]) && e[i].length > 0) {
              cleanList[i] = e[i]
            } else if (!Array.isArray(e[i]) && i !== '__typename' && i !== 'createdAt' && i !== 'updatedAt' && e[i] !== null) {
              cleanList[i] = e[i]
            }
          })
          await onSubmit(cleanList)
        }}
        validate={validate}
        render={({ handleSubmit, pristine, invalid, form: { change, blur } }) => (
          <form onSubmit={handleSubmit}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>Sobre</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>sobre o periódico</Typography>
                </div>
              </ExpansionPanelSummary>
              <Divider />
              <ExpansionPanelDetails className={classes.details}>
                <div className={classes.column}>
                  <Field
                    name="description"
                    component={OutlineTextField}
                    type="html"
                    label="Descrição"
                    onEditorStateChange={e => this.onEditorStateChange(e, change, blur)}
                  />
                </div>
                {/* <div className={classNames(classes.column, classes.helper)}>
                  <Field
                    name="title"
                    component={OutlineTextField}
                    type="text"
                    label="Título"
                  />
                </div>
                <div className={classNames(classes.column, classes.helper)}>
                  <Field
                    name="contact"
                    component={OutlineTextField}
                    type="text"
                    label="Contato"
                  />
                </div> */}
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary" type="submit" disabled={pristine || invalid}>
                  Salvar
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
            <style jsx>{`
              img {
                max-width: 300px;
                max-height: 300px;
              }
            `}</style>
          </form>
        )} />      
    )
  }
}

JournalAboutForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(JournalAboutForm)


