import React from 'react';
import {
  object,
  bool,
  array,
  number,
  string,
  shape,
  oneOf,
  arrayOf,
  func,
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
 * @param {string|boolean} props.order.orderBy - One of asc, desc and false.
 * @param {Array} props.data
 * @param {number} props.numSelected - Selected rows
 * @param {function} props.onSelectAllClick
 * @param {function} props.onSortLabelClick
 */
@withStyles(styles, {
  name: 'IBusUiTableHead',
})
class TableHead extends React.Component {
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
    onSelectAllClick: func,
    onSortLabelClick: func,
  };

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Expose onSelectAllClick api.
   * Call the funcion once the checked value of the switch changed
   * @param {Object} event
   */
  onChange(event) {
    this.props.onSelectAllClick && this.props.onSelectAllClick(event);
  }

  /**
   * Expose onSortLabelClick api
   * @param {Object} Param
   * @param {numner} Param.columnId - The id of clicked columns
   * @param {string} Param.sortDirection
   */
  onSortLabelClick({columnId, sortDirection}) {
    if (sortDirection === void 0) {
      return;
    }

    this.props.onSortLabelClick && this.props.onSortLabelClick({
      columnId,
      sortDirection,
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
          onClick={this.onSortLabelClick.bind(this, {
            columnId: column.id,
            orderBy: order === Object(order) && order.orderBy,
          })}
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
              onChange={this.onChange.bind(this)}
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
