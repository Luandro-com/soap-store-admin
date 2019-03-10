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
import Upload from './Upload'
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
    flexBasis: '33.33%',
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

class JournalGeneralForm extends Component {
  state = {
    uploaded: null,
  }

  clearUpload = () => this.setState({ uploaded: null })

  handleUpload = (uploaded, change, blur) => {
    blur('logo')
    change('logo', uploaded)
    this.setState({ uploaded })
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
          this.clearUpload()
        }}
        validate={validate}
        render={({ handleSubmit, pristine, invalid, form: { change, blur } }) => (
          <form onSubmit={handleSubmit}>
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>Geral</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>configurações gerais</Typography>
                </div>
              </ExpansionPanelSummary>
              <Divider />
              <ExpansionPanelDetails className={classes.details}>
                <div className={classes.column}>
                  <Typography component="h3" variant="h3">Logo</Typography>
                </div>
                <div className={classes.column}>
                  {((content && content.logo) || this.state.uploaded) && <img src={this.state.uploaded || content.logo} />}
                  {(!this.state.uploaded && !(content && content.logo)) && <h4>Sem logo...</h4>}
                </div>
                <div className={classNames(classes.column, classes.helper)}>
                  <Typography variant="caption">
                    Suba uma imagem para atualizar o logo
                    <br />
                    <Field name="logo">
                      {(fieldprops) => <Upload
                        {...fieldprops}
                        accept="image/*"
                        handleUpload={url => this.handleUpload(url, change, blur)}
                      /> }
                    </Field>
                  </Typography>
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelDetails className={classes.details}>
                <div className={classes.column}>
                  <Field
                    name="code"
                    component={OutlineTextField}
                    type="text"
                    label="Código"
                  />
                </div>
                <div className={classNames(classes.column, classes.helper)}>
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
                </div>
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

JournalGeneralForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(JournalGeneralForm)


