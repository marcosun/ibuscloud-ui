import React from 'react';
import {
  bool,
  number,
  string,
  array,
  object,
  func,
  shape,
  oneOf,
  arrayOf,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {
  TableHead as MuiTableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

const styles = (theme) => ({});

/**
 * Exports TableHead component
 * @param {Object[]} props.columns
 * @param {string} props.columns[].id - Unique id
 * @param {string} props.columns[].label - Display column name
 * @param {boolean} [props.columns[].isNumeric=false] - If true,
 * content will align to the right
 * @param {string} [props.columns[].tooltip] - Tooltip
 * @param {Object} [props.order] - Describes how table column should be ordered.
 * @param {string} props.order.columnId - Column id.
 * The label will have the active styling.
 * @param {string|boolean} props.order.orderBy - Enum: 'asc', 'desc', false.
 * @param {Array} props.data
 * @param {number} props.numSelected - Selected rows
 * @param {function} props.onOrderChange - Callback fired when order changes.
 * @param {function} props.onSelectAllClick - Callback fired when
 * select all checkbox is clicked.
 */
@withStyles(styles, {
  name: 'IBusUiTableHead',
})
class TableHead extends React.PureComponent {
  static propTypes = {
    classes: object,
    columns: arrayOf(shape({
      id: string.isRequired,
      label: string.isRequired,
      isNumeric: bool,
      tooltip: string,
    })).isRequired,
    order: shape({
      columnId: string.isRequired,
      orderBy: oneOf(['asc', 'desc', false]).isRequired,
    }),
    data: array.isRequired,
    numSelected: number,
    onOrderChange: func,
    onSelectAllClick: func,
  };

  /**
   * Callback fired when select all checkbox is clicked.
   * @param {Array} params - Whatever passed by MuiCheckBox onChange event
   */
  handleSelectAllChange(...params) {
    const {onSelectAllClick} = this.props;

    typeof onSelectAllClick === 'function' && onSelectAllClick(...params);
  }

  /**
   * Handle sort label click
   * @param {Object} order
   * @param {numner} order.columnId - The id of clicked columns
   * @param {string} order.orderBy - Enum: 'asc', 'desc', false
   */
  handleOrderChange({columnId, orderBy}) {
    const {onOrderChange} = this.props;

    typeof onOrderChange === 'function' && onOrderChange({
      columnId,
      orderBy,
    });
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      columns,
      data,
      numSelected,
      order,
    } = this.props;

    const cellElement = (column) => {
      if (order !== Object(order) && column.tooltip === void 0) {
        return column.label;
      }

      const sortLabelElement = (
        <TableSortLabel
          active={
            order === Object(order) &&
            order.columnId === column.id &&
            order.orderBy !== false
          }
          direction={
            order === Object(order) &&
            order.columnId === column.id &&
            order.orderBy === 'asc' ? 'asc' : 'desc'
          }
          onClick={
            this.handleOrderChange.bind(this, {
              columnId: column.id,
              orderBy: order === Object(order) &&
                order.columnId === column.id &&
                order.orderBy,
            }
          )}
        >
          {column.label}
        </TableSortLabel>
      );

      if (column.tooltip === void 0) {
        return sortLabelElement;
      }

      return (
        <Tooltip
          title={column.tooltip}
          placement={column.isNumeric === true ? 'bottom-end' : 'bottom-start'}
        >
          {sortLabelElement}
        </Tooltip>
      );
    };

    return (
      <MuiTableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              color='primary'
              checked={numSelected === data.length}
              indeterminate={numSelected > 0 && numSelected < data.length}
              onChange={this.handleSelectAllChange.bind(this)}
            />
          </TableCell>
          {
            columns.map((column) => {
              return (
                <TableCell
                  key={column.id}
                  numeric={column.isNumeric === true}
                  sortDirection={
                    order === Object(order) &&
                    order.columnId === column.id &&
                    order.orderBy
                  }
                >
                  {cellElement(column)}
                </TableCell>
              );
            })
          }
        </TableRow>
      </MuiTableHead>
    );
  }
}

export default TableHead;
