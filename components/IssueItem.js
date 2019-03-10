import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Mutation } from 'react-apollo'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import toReal from '../lib/toReal'
import ISSUE_DELETE from '../queries/issueDelete.gql'
import ALL_ISSUES_LOCAL from '../queries/allIssuesLocal.gql'

const styles = {
  card: {
    width: '100%',
    height: 500,
    margin: 7
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
}

function IssueItem(props) {
  const { classes, id, issueKey, title, image, body, publishedCall, published, submitedArticles, selectedArticles, selectedEditorials } = props
  return (
    <Mutation mutation={ISSUE_DELETE}>
      {(deleteIssue, { error: errorDelete, client: clientDelete }) => (
        <Card className={classes.card}>
          {image && <CardMedia
            component="img"
            alt={name}
            className={classes.media}
            height="140"
            image={image}
            title={name}
          />}
          <CardContent>
            {publishedCall && <span>chamada publicada</span>}
            {published && <span> | publicado</span>}
            <Typography gutterBottom variant="h5" component="h1">
              {title}
            </Typography>
            <Typography gutterBottom variant="h6" component="h5">
              Submissões
            </Typography>
            {submitedArticles.map(article => {
              return (
                <Typography gutterBottom component="h5" key={article.id}>
                  {article.title}
                </Typography>
              )
            })}
            <Typography gutterBottom variant="h6" component="h5">
              Seleções
            </Typography>
            {selectedArticles.map(article => {
              return (
                <Typography gutterBottom component="h5" key={article.id}>
                  {article.title}
                </Typography>
              )
            })}
            <Typography gutterBottom variant="h6" component="h5">
              Editoriais
            </Typography>
            {selectedEditorials.map(article => {
              return (
                <Typography gutterBottom component="h5" key={article.id}>
                  {article.title}
                </Typography>
              )
            })}
          </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => Router.push(`/issue_edit?key=${issueKey}`)}>
            Editar
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={async () => {
              const res = await deleteIssue({ variables: { issueId: id }})
              if (res && res.data.deleteIssue.id) {
                const { allIssues } = clientDelete.cache.readQuery({ query: ALL_ISSUES_LOCAL})
                const newList = allIssues.filter(e => e.id !== res.data.deleteIssue.id)
                console.log('NEW', newList)
                clientDelete.writeData({ data: {
                  allIssues: newList
                }})
              }
            }}>
            Deletar
          </Button>
        </CardActions>
      </Card>
      )}
    </Mutation>
  )
}

IssueItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(IssueItem)

