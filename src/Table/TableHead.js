import React from 'react';
import {
  bool,
  string,
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
import Tooltip from 'material-ui/Tooltip';

const styles = (theme) => ({});

/**
 * Attention: Select/Unselect all rows by clicking a checkbox on TableHead
 * has since been deprecated. Think about this scenario:
 * 1. Click on some table rows will attach an array, say include: [4,5,6],
 * which contains ids that are included in this batch action.
 * 2. Now reset table to its origianl status. Click 'Select All' checkbox is
 * straight forward to understand. Since we only have a subset of the entire
 * table (table rows are fetched to the website with paginated apis),
 * a key-value pair, say isAllSelected: true, representing all selected rows
 * will be attach to some action requests whether it is batch delete or update.
 * 2. Now, our user click a bunch of checkboxes of some table rows since
 * after. In the next batch action request, we have no choice but attach the
 * isAllSelected: true along with another array, say exclude: [1,2,3],
 * which contains ids that are excluded from this batch action.
 * This introduces at least three variables and sophisticated logics. If
 * someone satisfy the logic above or somehow found another way to simplify
 * the logics, feel free to have it a go.
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
 * @param {function} props.onOrderChange - Callback fired when order changes.
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
    onOrderChange: func,
  };

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
          <TableCell></TableCell>
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
