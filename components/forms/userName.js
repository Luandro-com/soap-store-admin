import { Form, Field } from 'react-final-form'
import TextField from './TextField'
import Button from '@material-ui/core/Button'

const validate = values => {
  const errors = {}
  if (!values.userName) {
    errors.userName = 'Required'
  }
  return errors
}

export default ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
       <div>
          <Field
            name="userName"
            component={TextField}
            type="text"
            label="Nome"
          />
        </div>
        <Button type="submit" disabled={pristine || invalid}>
          Submit
        </Button>
      </form>
    )}
  />
)
