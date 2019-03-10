import React from 'react'
import PropTypes from 'prop-types'
import TableHead from '@material-ui/core/TableHead'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'

const rows = [
  { id: 'author', numeric: false, disablePadding: false, label: 'Autor' },
  { id: 'title', numeric: false, disablePadding: false, label: 'Título' },
  { id: 'file', numeric: false, disablePadding: false, label: 'PDF' },
  { id: 'read', numeric: false, disablePadding: false, label: 'Ler' },
  { id: 'contact', numeric: false, disablePadding: true, label: 'Contato' },
]


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

export default EnhancedTableHead