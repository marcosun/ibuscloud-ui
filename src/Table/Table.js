import React from 'react';
import {
  func,
  bool,
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

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  tableCellRoot: {
    ...theme.typography.body2,
    background: theme.palette.background.paper,
    padding: '0px',
    borderBottom: '1px solid #F1F1F3',
  },
  tablePagination: {
    paddingTop: '40px',
  },
});

/**
 * currentPage is set to 0 at the initialisation process and
 * Table maintains its status since after.
 * rowsPerPage is set to the first value in the props.rowsPerPageOptions
 * at the initialisation process and Table maintains its status since after.
 * @param {Object[]} props.columns - See {@link TableHead}
 * @param {string|number} props.columns[].id - Unique id
 * @param {boolean} [props.columns[].isNumeric=false] - If true,
 * content will align to the right.
 * @param {boolean} props.columns[].isOrderable - Enable or disable ordering on this column.
 * @param {string} props.columns[].label - Display column name
 * @param {string} [props.columns[].tooltip] - Tooltip
 * @param {Object[]} [props.rows] - Represents rows of the current page in
 * the table body. Property names defined in props.columns will be looked for
 * and values will be displayed on the corresponding column.
 * @param {string|number} props.rows[].id - Unique id
 * @param {Object} [props.order] - Describes how table column should be ordered.
 * Table component accepts order at the initialisation process,
 * and Table maintains its status (columnId and orderBy) since after.
 * See {@link TableHead}
 * @param {string} props.order.columnId - Column id.
 * The label will have the active styling.
 * @param {string|boolean} props.order.orderBy - Enum: 'asc', 'desc', false.
 * @param {number[]} [props.rowsPerPageOptions=[5, 7, 10]] - The number of rows
 * per page.
 * @param {function} props.onChangePage - Callback fired when the page changes.
 * Signature:
 * function(event: object, page: number) => void
 * event: The event source of the callback
 * page: The page selected
 * @param {function} props.onChangeRowsPerPage - Callback fired when the number
 * of rows per page is changed.
 * Signature:
 * function(event: object) => void
 * event: The event source of the callback
 * @param {function} props.onOrderChange - Callback fired when order changes.
 * Signature:
 * function({columnId, orderBy}) => void
 * columnId: Sort column id.
 * orderBy: Order by 'asc' or 'desc' or false.
 * @param {function} props.onRowSelect - Callback fired when row checkbox
 * is clicked.
 * Signature:
 * function(rowId, selectedRowIds, event, isChecked) => void
 * rowId: Clicked row id.
 * selectedRowIds: An array of selected row ids.
 */
@withStyles(styles, {
  name: 'IBusUiTable',
})
class Table extends React.PureComponent {
  static propTypes = {
    classes: object,
    total: number.isRequired,
    columns: arrayOf(shape({
      id: oneOfType([string, number]).isRequired,
      isNumeric: bool,
      isOrderable: bool,
      label: string.isRequired,
      tooltip: string,
    })).isRequired,
    rows: arrayOf(shape({
      id: oneOfType([string, number]).isRequired,
    })),
    order: shape({
      columnId: string.isRequired,
      orderBy: oneOf(['asc', 'desc', false]).isRequired,
    }),
    rowsPerPageOptions: arrayOf(number),
    onChangePage: func,
    onChangeRowsPerPage: func,
    onOrderChange: func,
    onRowSelect: func,
  };

  static defaultProps = {
    rows: [],
    rowsPerPageOptions: [5, 7, 10],
  };

  /**
   * Table component accepts order at the initialisation process,
   * and Table maintains its status since after.
   * currentPage is set to 0 at the initialisation process,
   * and Table maintains its status since after.
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    const {
      order,
      rowsPerPageOptions,
    } = this.props;

    this.state = {
      currentPage: 0, // Set initial page number as page 0
      order,
      rowsPerPage: rowsPerPageOptions[0],
      selectedRowIds: [],
    };
  }

  /**
   * Call onChangePage callback
   * @param  {Array} params - Two parameters defined in MuiTablePagination
   */
  handlePageChange(...params) {
    const currentPage = params[1];

    const {onChangePage} = this.props;

    this.setState({
      ...this.state,
      currentPage,
    });

    typeof onChangePage === 'function' && onChangePage(...params);
  }

  /**
   * Call onChangeRowsPerPage callback
   * @param  {Object} event - Parameter defined in MuiTablePagination
   */
  handleRowsPerPageChange(event) {
    const {onChangeRowsPerPage} = this.props;

    this.setState({
      ...this.state,
      rowsPerPage: event.target.value,
      currentPage: 0, // This might be unappropriate, feel free to modify
      // how currentPage behave in the future if your logic satisfy general
      // requriments.
    });

    typeof onChangeRowsPerPage === 'function' && onChangeRowsPerPage(event);
  }

  /**
   * Add selected row index into nextSelectedRowIds if isChecked === true.
   * Delete selected row index from nextSelectedRowIds if isChecked === false.
   * Call props.onRowSelect with selected row id, all selected row ids, event
   * and isChecked.
   * @param {Object} row - Table row
   * @param {string|number} row.id - Table row id
   * @param {Array} params - Two parameters defined in MuiCheckBox
   */
  handleRowSelect(row, ...params) {
    const isChecked = params[1];

    const {onRowSelect} = this.props;

    const {
      selectedRowIds,
    } = this.state;

    let nextSelectedRowIds;

    if (isChecked === true) {
      // Add selected row index into nextSelectedRowIds
      nextSelectedRowIds = [...selectedRowIds, row.id];
    } else {
      // Delete selected row index from nextSelectedRowIds
      const deleteIndex = selectedRowIds.findIndex((rowId) => {
        return rowId === row.id;
      });
      nextSelectedRowIds = [
        ...selectedRowIds.slice(0, deleteIndex),
        ...selectedRowIds.slice(deleteIndex + selectedRowIds.length),
      ];
    }

    this.setState({
      ...this.state,
      selectedRowIds: nextSelectedRowIds,
    });

    typeof onRowSelect === 'function' &&
    onRowSelect(row.id, nextSelectedRowIds, ...params);
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
      total,
      columns,
      rows,
      rowsPerPageOptions,
    } = this.props;

    const {
      currentPage,
      order,
      rowsPerPage,
      selectedRowIds,
    } = this.state;

    const bodyElement = (() => {
      const emptyRows = rowsPerPage - rows.length;

      return (
          <TableBody>
          {
            rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell
                    classes={{
                      root: classes.tableCellRoot,
                    }}
                  >
                    <Checkbox
                      color='primary'
                      checked={selectedRowIds.includes(row.id)}
                      onChange={this.handleRowSelect.bind(this, row)}
                    />
                  </TableCell>
                  {
                    columns.map((column) => {
                      return (
                        <TableCell
                          key={`${row.id}${column.id}`}
                          numeric={column.isNumeric === true}
                          classes={{
                            root: classes.tableCellRoot,
                          }}
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
            columns={columns}
            order={order}
            onOrderChange={this.handleOrderChange.bind(this)}
          />
          {bodyElement}
        </MuiTable>
        <div className={classes.tablePagination}>
          <TablePagination
            Actions={TablePaginationActions}
            component="div"
            count={total}
            page={currentPage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            onChangePage={this.handlePageChange.bind(this)}
            onChangeRowsPerPage={this.handleRowsPerPageChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Table;
