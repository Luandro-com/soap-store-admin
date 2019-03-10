import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import FileIcon from '@material-ui/icons/AttachFile'
import Off from '@material-ui/icons/HighlightOff'
import EnhancedTableHeader from '../components/EnhancedTableHeader'
import EnhancedTableToolbar from '../components/EnhancedTableToolbar'

import toReal from '../lib/toReal'

// let counter = 0
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1
//   return { id: counter, name, calories, fat, carbs, protein }
// }

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    maxWidth: 948,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
})

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'totalPrice',
    selected: [],
    page: 0,
    rowsPerPage: 5,
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.articles.map(n => n.id) }))
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  handleClearSelection = () => this.setState({ selected: [] })

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes, articles, title, issueId } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, articles.length - page * rowsPerPage)
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          clearSelection={this.handleClearSelection}
          issueId={issueId}
          articleIds={selected}
          title={title}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={articles.length}
            />
              <TableBody key={title}>
                {stableSort(articles, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id) || n.selectedBy.filter(a => a.id === issueId).length > 0
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        {console.log(n)}
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell>{n.author.firstName} {n.author.lastName}</TableCell>
                        <TableCell>{n.title}</TableCell>
                        {n.file ? <TableCell><a href={n.file.url}><FileIcon /></a></TableCell> : <Off />}
                        {n.file ? <TableCell><a href={`/pdf?url=${n.file.url}`}>ler</a></TableCell> : <Off />}
                        <TableCell component="th" scope="row" padding="none">
                          <span className="contact">{n.author.email}</span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={Math.ceil(articles.length/rowsPerPage)}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <style jsx>{`
          .contact {
            font-size: 0.8em;
          }
        `}</style>
      </Paper>
    )
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EnhancedTable)
