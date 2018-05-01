import React from 'react';
import {
  func,
  bool,
  array,
  object,
  number,
  string,
  oneOf,
  oneOfType,
  shape,
  arrayOf,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {
  default as MuiTable,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import TableHead from './TableHead';
import TablePaginationActions from './TablePaginationActions';
import isShallowEqual from '../Util/isShallowEqual';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  tablePagination: {
    paddingTop: '40px',
  },
});

/**
 * Table handles internal status of order(columnId and orderBy) and expose
 * order event by calling onOrderChange with order object.
 * @param {Array} props.data - Every cloumns.prop value
 * @param {Object[]} props.columns. See {@link TableHead}
 * @param {string} props.columns[].id - Unique id
 * @param {string} props.columns[].label - Display column name
 * @param {boolean} [props.columns[].isNumeric=false] - If true,
 * content will align to the right.
 * @param {string} [props.columns[].tooltip] - Tooltip
 * @param {Object[]} [props.rows] - Represents rows of the current page in
 * the table body. Property names defined in props.columns will be looked for
 * and values will be displayed on the corresponding column.
 * @param {string|number} props.rows[].id - Unique id
 * @param {Object} [props.order] - Describes how table column should be ordered.
 * See {@link TableHead}
 * @param {string} props.order.columnId - Column id.
 * The label will have the active styling.
 * @param {string|boolean} props.order.orderBy - Enum: 'asc', 'desc', false.
 * @param {Array} props.rowsPerPageOptions - The number of rows per page.
 * @param {number} props.currentPage - The zero-based index of the current page.
 * @param {function} props.onCheckedChange
 * @param {function} props.onAllCheckedChange
 */
@withStyles(styles, {
  name: 'IBusUiTable',
})
class Table extends React.Component {
  static propTypes = {
    classes: object,
    columns: arrayOf(shape({
      id: string.isRequired,
      label: string.isRequired,
      isNumeric: bool,
      tooltip: string,
    })).isRequired,
    rows: arrayOf(shape({
      id: oneOfType([string, number]).isRequired,
    })),
    order: shape({
      columnId: string.isRequired,
      orderBy: oneOf(['asc', 'desc', false]).isRequired,
    }),
    rowsPerPageOptions: array,
    currentPage: number.isRequired,
    onCheckedChange: func,
    onAllCheckedChange: func,
    onOrderChange: func,
  };

  static defaultProps = {
    currentPage: 0,
    rows: [],
    rowsPerPageOptions: [5, 7, 10],
  };

  /**
   * Init state
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    const {
      currentPage,
      order,
      rowsPerPageOptions,
    } = this.props;

    this.state = {
      currentPage,
      order,
      rowsPerPage: rowsPerPageOptions[0],
      selectedRowsIndex: [],
    };
  }

  /**
   * Alarm: The lifecycle methods will continue to work until the version 17 of react
   * Reset currentPage if updated
   * @param {Object} nextProps
   * @return {boolean}
   */
  componentWillReceiveProps(nextProps) {
    if (!isShallowEqual(this.props.currentPage, nextProps.currentPage)) {
      this.setState({
        ...this.state,
        currentPage: nextProps.currentPage,
      });
    }

    return true;
  }

  /**
   * Call onChangePage callback
   * @param  {Object} event
   * @param  {number} currentPage
   */
  onChangePage(event, currentPage) {
    this.setState({
      ...this.state,
      currentPage,
    });
  }

  /**
   * Call onChangeRowsPerPage callback
   * @param  {Object} event
   */
  onChangeRowsPerPage(event) {
    this.setState({
      ...this.state,
      rowsPerPage: event.target.value,
      currentPage: 0,
    });
  }

  /**
   * Call onCheckedChange callback
   * @param  {number} dataIndex
   * @param  {Object} event
   */
  onCheckedChange(dataIndex, event) {
    const {
      data,
      selectedRowsIndex,
    } = this.state;

    const selectedRowsIndexData = (() => {
      if (event.target.checked === false) {
        return selectedRowsIndex.filter((rowIndex) => {
          return rowIndex !== dataIndex;
        });
      } else {
        return selectedRowsIndex.concat([dataIndex]);
      }
    })();

    const currentRow = data.filter((item, index) => {
      return index === dataIndex;
    });

    const checkedRows = data.filter((item, index) => {
      return selectedRowsIndexData.includes(index);
    });

    this.setState({
      ...this.state,
      selectedRowsIndex: selectedRowsIndexData,
    });

    this.props.onCheckedChange && this.props.onCheckedChange(currentRow, checkedRows);
  }

  /**
   * Call onSelectAllClick callback
   * @param {Array} params - Whatever passed by MuiCheckBox onChange event
   */
  handleSelectAllClick(...params) {
    const {onAllCheckedChange} = this.props;

    typeof onAllCheckedChange === 'function' && onAllCheckedChange(params);
  }

  /**
   * Table handles internal status of order(columnId and orderBy) and expose
   * order event by calling onOrderChange with order object.
   * Change orderBy in the following order: asc, desc, false
   * @param {Object} order
   * @param {string} order.columnId
   * @param {string|boolean} order.orderBy - Enum: 'asc', 'desc', false
   */
  handleOrderChange({columnId, orderBy}) {
    const {onOrderChange} = this.props;

    const order = {
      columnId,
      orderBy: (() => {
        switch (orderBy) {
          case false:
            return 'asc';
          case 'asc':
            return 'desc';
          case 'desc':
            return false;
        }
      })(),
    };

    this.setState({
      ...this.state,
      order,
    });

    typeof onOrderChange === 'function' && onOrderChange(order);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      columns,
      rows,
      rowsPerPageOptions,
    } = this.props;

    const {
      currentPage,
      order,
      rowsPerPage,
      selectedRowsIndex,
    } = this.state;

    const bodyElement = (() => {
      const emptyRows = rowsPerPage - rows.length;

      return (
          <TableBody>
          {
            rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      color='primary'
                      // checked={selectedRowsIndex.includes(dataIndex)}
                      // onChange={this.onCheckedChange.bind(this, dataIndex)}
                    />
                  </TableCell>
                  {
                    columns.map((column) => {
                      return (
                        <TableCell
                          key={`${row.id}${column.id}`}
                          numeric={column.isNumeric === true}
                        >
                          {row[column.id]}
                        </TableCell>
                      );
                    })
                  }
                </TableRow>
              );
            })
          }
          {
            emptyRows > 0
            && (
              <TableRow style={{height: 57 * emptyRows}}>
                <TableCell colSpan={columns.length + 1} />
              </TableRow>
            )
          }
        </TableBody>
      );
    })();

    return (
      <div className={classes.root}>
        <MuiTable>
          <TableHead
            data={rows}
            order={order}
            columns={columns}
            numSelected={selectedRowsIndex.length}
            onSelectAllClick={this.handleSelectAllClick.bind(this)}
            onOrderChange={this.handleOrderChange.bind(this)}
          />
          {bodyElement}
        </MuiTable>
        <div className={classes.tablePagination}>
          <TablePagination
            component="div"
            page={currentPage}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            onChangePage={this.onChangePage.bind(this)}
            onChangeRowsPerPage={this.onChangeRowsPerPage.bind(this)}
            Actions={TablePaginationActions}
          />
        </div>
      </div>
    );
  }
}

export default Table;
