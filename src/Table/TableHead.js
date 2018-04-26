/**
 * @module TableHead
 */
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
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

const styles = (theme) => ({});

@withStyles(styles, {
  name: 'IBusUiTableHead',
})
/**
 * Exports TableHead component
 */
export default class Component extends React.Component {
  static propTypes = {
    classes: object.isRequired,
    columns: arrayOf(shape({
      id: string.isRequired, // Unique id
      label: string.isRequired, // Display column name
      numeric: bool, // 默认左对齐 If true, content will align to the right. false align to left
      title: string, // tooltip
    })).isRequired,
    data: array.isRequired,
    orders: string,
    numSelected: number,
    sortDirection: oneOf(['asc', 'desc']),
    onSelectAllClick: func,
  };

  static defaultProps = {
    orders: 'calories',
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
   * Render tableHead component
   * @return {Component}
   */
  render() {
    const {
      data,
      orders,
      columns,
      numSelected,
      sortDirection,
    } = this.props;

    const cellElement = (column) => {
      if (sortDirection === void 0) {
        return column.label;
      }

      const sortLabelElement = (
        <TableSortLabel
          active={orders !== void 0 && orders === column.id}
          direction={sortDirection}
        >
          {column.label}
        </TableSortLabel>
      );

      if (column.title === void 0) {
        return sortLabelElement;
      }

      return (
        <Tooltip
          title={column.title}
          placement={column.numeric === true ? 'bottom-end' : 'bottom-start'}
        >
          {sortLabelElement}
        </Tooltip>
      );
    };

    return (
      <TableHead>
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
                  numeric={column.numeric !== void 0 ? column.numeric : false}
                  sortDirection={
                    orders !== void 0 && orders === column.id ? sortDirection : false
                  }
                >
                  {cellElement(column)}
                </TableCell>
              );
            })
          }
        </TableRow>
      </TableHead>
    );
  }
}
