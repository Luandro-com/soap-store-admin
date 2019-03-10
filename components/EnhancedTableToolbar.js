import { Mutation } from 'react-apollo'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SelectIcon from '@material-ui/icons/AddCircleOutline'
import UnselectIcon from '@material-ui/icons/RemoveCircleOutline'
import FilterListIcon from '@material-ui/icons/FilterList'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import SELECT_ARTICLES from '../queries/selectArticles.gql'
import UNSELECT_ARTICLES from '../queries/unselectArticles.gql'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
})

let EnhancedTableToolbar = props => {
  const { numSelected, classes, articleIds, issueId, title, clearSelection } = props
  return (
    <Mutation mutation={SELECT_ARTICLES}>
      {(selectArticles, { error: errorSelectArticles, client: clientSelectArticles }) => (
      <Mutation mutation={UNSELECT_ARTICLES}>
        {(unselectArticles, { error: errorUnselectArticles, client: clientUnselectArticles }) => (
          <Toolbar
            className={classNames(classes.root, {
              [classes.highlight]: numSelected > 0,
            })}
          >
            <div className={classes.title}>
              {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                  {numSelected} selecionadas
                </Typography>
              ) : (
                <Typography variant="h6" id="tableTitle">
                  {title}
                </Typography>
              )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              {numSelected > 0 ? (
                <div className="tooltips">
                  <Tooltip title="Adicionar a edição">
                    <IconButton aria-label="Adicionar a edição" onClick={async () => {
                      const res = await selectArticles({ variables: {
                        issueId,
                        articleIds,
                      }})
                      clearSelection()
                      console.log('res', res)
                    }}>
                      <SelectIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remover da edição">
                    <IconButton aria-label="Adicionar a edição" onClick={async () => {
                      const res = await unselectArticles({ variables: {
                        issueId,
                        articleIds,
                      }})
                      clearSelection()
                      console.log('res', res)
                    }}>
                      <UnselectIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                <Tooltip title="Filter list">
                  <IconButton aria-label="Filter list">
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <style jsx>{`
              .tooltips {
                display: flex;
                flex-flow: row no-wrap;
              }
            `}</style>
          </Toolbar>
          )}
        </Mutation>
        )}
    </Mutation>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
}

export default withStyles(toolbarStyles)(EnhancedTableToolbar)
