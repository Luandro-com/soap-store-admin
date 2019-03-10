import { Mutation } from 'react-apollo'
import UPLOAD_FILE from '../../queries/uploadFile.gql'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
})

const Upload = ({
  required,
  multiple,
  accept,
  classes,
  handleUpload,
  meta,
}) => (
  <div>
    <Mutation
      mutation={UPLOAD_FILE}
    >
      {upload => (
        <input
          accept={accept || "*"}
          multiple={multiple}
          required={required}
          type="file"
          className={classes.input}
          id="contained-button-file"
          onChange={({
            target: {
              validity,
              files: [file]
            }
          }) => {
            validity.valid
            upload({ variables: { file } })
              .then(res => {
                if (res && res.data.uploadFile) {
                  const url = res.data.uploadFile.url
                  handleUpload(url)
                }
              })
          }}
        />
      )}
    </Mutation>
    <label htmlFor="contained-button-file">
      <Button variant="contained" component="span" className={classes.button}>
        Upload
      </Button>
      <span>{meta.touched ? meta.error : undefined}</span>
      <span>{meta.error && meta.touched}</span>
    </label>
  </div>
)


Upload.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Upload)

