import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import isISODate from 'is-iso-date'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Upload from './Upload'
import OutlineTextField from './OutlineTextField'

const validInputList = {
  key: {
    label: 'Slug',
    type: 'text',
    required: true,
  },
  title: {
    label: 'Título',
    type: 'text'
  },
  body: {
    label: 'Apresentação',
    type: 'html'
  },
  image: {
    label: 'Imagem de capa',
    type: 'file'
  },
  startCall: {
    label: 'Início da chamada',
    type: 'date',
    required: true,
  },
  endCall: {
    label: 'Prazo da chamada',
    type: 'date',
    required: true,
  },
  volume: {
    label: 'Volume',
    type: 'int'
  },
  number: {
    label: 'Número',
    type: 'int'
  },
  year: {
    label: 'Ano',
    type: 'int'
  },
  evaluationPeriod: {
    label: 'Périodo de Avalição',
    type: 'int'
  },
  publicationPrediction: {
    label: 'Previsão de Publicação',
    type: 'date'
  },
  contact: {
    label: 'Contato',
    type: 'text'
  },
}

function isValidDate(dateString) {
  var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/
  if(!regex_date.test(dateString)) {
    return false
  }
  var parts   = dateString.split("-")
  var day     = parseInt(parts[2], 10)
  var month   = parseInt(parts[1], 10)
  var year    = parseInt(parts[0], 10)
  if(year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false
  }
  var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
  if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29
  }
  return day > 0 && day <= monthLength[month - 1]
}


const validate = values => {
  const errors = {}
  // if (!values.slug) {
  //   errors.slug = 'Required'
  // }
  // if (!values.startCall) {
  //   errors.startCall = 'Required'
  // }
  // if (!values.endCall) {
  //   errors.endCall = 'Required'
  // }
  return errors
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  column: {
    flexBasis: '33.33%',
  },
});

class IssueForm extends Component {
  state = {
    uploaded: null,
  }

  clearUpload = () => this.setState({ uploaded: null })

  handleUpload = (uploaded, change, blur) => {
    blur('image')
    change('image', uploaded)
    this.setState({ uploaded })
  }

  onEditorStateChange = (editor, change, blur) => {
    blur('body')
    change('body', editor)
  }

  render() {
    const { uploaded } = this.state
    const { classes, onSubmit, issue, publishCall, publish } = this.props
    let formatedIssue = {}
    if (issue) {
      /* Organize by issue */
      Object.keys(issue).map(i => {
        if (isISODate(issue[i])) {
          /* Fix date */
          formatedIssue[i] = issue[i].split('T')[0]
        } else {
          formatedIssue[i] = issue[i]
        }
      }) 
    }
    return (
      <Form
        initialValues={issue ? formatedIssue : {}}
        onSubmit={async e => {
          let cleanList = {}
          Object.keys(validInputList).map(valid => {
            Object.keys(e).map(i => {
              if (i === valid && e[i] !== null) {
                if (isValidDate(e[i])) {
                  /* parse date */
                  cleanList[i] = new Date(e[i]).toISOString()
                } else if (0 === e[i] % (!isNaN(parseFloat(e[i])) && 0 <= ~~e[i])) {
                  /* parse ints */
                  cleanList[i] = parseInt(e[i])
                } else {
                  cleanList[i] = e[i]
                }
              }
            })
          })
          await onSubmit(cleanList)
          this.clearUpload()
        }}
        validate={validate}
        render={({ handleSubmit, pristine, invalid, form: { change, blur } }) => (
          <form onSubmit={handleSubmit}>
            <Paper className={classes.root} elevation={1}>
              <span>{issue && issue.key}</span>
              <div className={classes.column}>
                <Typography component="h4" variant="h4">Capa</Typography>
              </div>
              <div className={classes.column}>
                {uploaded && <img src={uploaded} />}
                {(!uploaded && issue && issue.image) && <img src={issue.image} />}
                {(!uploaded && !issue) && <h4>Sem imagem de capa</h4>}
              </div>
              <div className={classNames(classes.column, classes.helper)}>
                <Typography variant="caption">
                  Imagem de capa da edição
                  <br />
                  <Field name="image">
                    {(fieldprops) => <Upload
                      {...fieldprops}
                      accept="image/*"
                      handleUpload={url => this.handleUpload(url, change, blur)}
                    /> }
                  </Field>
                </Typography>
              </div>
              {Object.keys(validInputList)
                .filter(k => {
                  if(validInputList[k].type !== 'file') {
                    return validInputList[k]
                  }
                })
                .map(input => (
                  <div className={classes.column} key={input}>
                    {validInputList[input].type === 'html' && <h3>{validInputList[input].label}</h3>}
                    <Field
                      name={input}
                      component={OutlineTextField}
                      type={validInputList[input].type}
                      label={validInputList[input].label}
                      required={validInputList[input].required || false}
                      onEditorStateChange={validInputList[input].type === 'html' ? e => this.onEditorStateChange(e, change, blur) : null}
                    />
                  </div>
                ))
              }
              <Divider />
              <Button size="small">Cancel</Button>
              <Button size="small" color="primary" type="submit" disabled={pristine || invalid}>
                Salvar
              </Button>
              <Button size="small" color="primary" onClick={() => publishCall({ variables: { issueId: issue.id }})} disabled={!issue || issue.publishedCall}>
                Publicar Chamada
              </Button>
              <Button size="small" color="default" onClick={() => publish({ variables: { issueId: issue.id }})} disabled={!issue || !issue.publishedCall || issue.published}>
                Publicar Edição
              </Button>
          </Paper>
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

IssueForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(IssueForm)


