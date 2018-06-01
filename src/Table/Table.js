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
import {withStyles} from '@material-ui/core/styles';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';

import TableHead from './TableHead';
import TablePaginationActions from './TablePaginationActions';
import {
  createInternalSetState,
  mergePropsToState,
} from '../Util/toBeControlledComponent';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  muiTableRoot: {
    tableLayout: 'fixed',
  },
  tableCellRoot: {
    ...theme.typography.body2,
    background: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    borderBottom: '1px solid #F1F1F3',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  checkBoxCell: {
    background: theme.palette.background.paper,
    borderBottom: '1px solid #F5F6FA',
  },
  tablePagination: {
    paddingTop: '40px',
  },
});

/**
 * This module manages its own state internally. CurrentPage is set to 0 at the
 * initialisation process and table maintains its status since after.
 * RowsPerPage is set to the first value in the props.rowsPerPageOptions
 * at the initialisation process and Table maintains its status since after.
 * However, if more control is needed,  you can pass state as a prop and that state
 * becomes controlled. The state includes: currentPage, order and selectedRowIds.
 * As soon as this.props[statePropKey] !== undefined, internally, table will determine
 * its state based on your prop's value rather than its own internal state.
 * @param {Object[]} props.columns - See {@link TableHead}
 * @param {number} [props.columns[].colSpan] - colSpan property of td element
 * @param {string|number} props.columns[].id - Unique id
 * @param {boolean} [props.columns[].isNumeric=false] - If true,
 * content will align to the right.
 * @param {boolean} props.columns[].isOrderable - Enable
 * or disable ordering on this column.
 * @param {string} props.columns[].label - Display column name
 * @param {string} [props.columns[].tooltip] - Tooltip
 * @param {number} [props.currentPage] - The current page, required for a controlled component.
 * @param {number} [props.defaultCurrentPage=0] - The initial current page, useful when not
 * controlling the component. This is not used when the currentPage is used.
 * @param {Object} [props.defaultOrder] - Pass an object that should be ordered by default.
 * This is not used when the order is used.
 * @param {number} [props.defaultRowsPerPage] - The number of rows per page by default.
 * @param {Array} [props.defaultSelectedRowIds=[]] - Pass an array of rowIds that should be
 * selected by default. This is not used when the selectedRowIds is used.
 * @param {boolean} [props.isPaginable=false] - Enable
 * or disable pagination.
 * @param {boolean} [props.isSelectable=false] - Enable
 * or disable to be Selection.
 * @param {Object} [props.order] - Describes how table column should be ordered.
 * Table component accepts order at the initialisation process,
 * and Table maintains its status (columnId and orderBy) since after.
 * See {@link TableHead}
 * @param {string} props.order.columnId - Column id.
 * The label will have the active styling.
 * @param {string|boolean} props.order.orderBy - Enum: 'asc', 'desc', false.
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
 * function(row, selectedRowIds, event, isChecked) => void
 * row: Clicked row data.
 * selectedRowIds: An array of selected row ids.
 * @param {Object[]} [props.rows] - Represents rows of the current page in
 * the table body. Property names defined in props.columns will be looked for
 * and values will be displayed on the corresponding column.
 * @param {string|number} props.rows[].id - Unique id
 * @param {number[]} [props.rowsPerPageOptions=[5, 10, 15]] - The number of rows
 * per page.
 * @param {(number|string)} [props.selectedRowIds] - Pass an array of rowIds that should be selected
 * @param {number} [props.total] - Total number of rows.
 */
@withStyles(styles, {
  name: 'IBusUiTable',
})
class Table extends React.PureComponent {
  static propTypes = {
    classes: object,
    columns: arrayOf(shape({
      colSpan: number,
      id: oneOfType([string, number]).isRequired,
      isNumeric: bool,
      isOrderable: bool,
      label: string.isRequired,
      tooltip: string,
    })).isRequired,
    currentPage: number,
    defaultCurrentPage: number,
    defaultOrder: shape({
      columnId: string.isRequired,
      orderBy: oneOf(['asc', 'desc', false]).isRequired,
    }),
    defaultRowsPerPage: number,
    defaultSelectedRowIds: arrayOf(oneOfType([number, string])),
    isPaginable: bool,
    isSelectable: bool,
    order: shape({
      columnId: string.isRequired,
      orderBy: oneOf(['asc', 'desc', false]).isRequired,
    }),
    onChangePage: func,
    onChangeRowsPerPage: func,
    onOrderChange: func,
    onRowSelect: func,
    rows: arrayOf(shape({
      id: oneOfType([string, number]).isRequired,
    })),
    rowsPerPageOptions: arrayOf(number),
    selectedRowIds: arrayOf(oneOfType([number, string])),
    total: number,
  };

  static defaultProps = {
    defaultCurrentPage: 0,
    defaultSelectedRowIds: [],
    isPaginable: false,
    isSelectable: false,
    rows: [],
    rowsPerPageOptions: [5, 10, 25],
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
      defaultCurrentPage,
      defaultOrder,
      defaultRowsPerPage,
      defaultSelectedRowIds,
      rowsPerPageOptions,
    } = this.props;

    const state = mergePropsToState({
      currentPage: defaultCurrentPage,
      order: defaultOrder,
      selectedRowIds: defaultSelectedRowIds,
    }, this.props);

    this.state = {
      ...state,
      rowsPerPage: defaultRowsPerPage === void 0 ? rowsPerPageOptions[0] : defaultRowsPerPage,
    };

    this.internalSetState = createInternalSetState();
  }

  /**
   * @param  {Object} nextProps
   * @param  {Object} prevState
   * @return {Object}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    return mergePropsToState(prevState, nextProps);
  }

  /**
   * Call onChangePage callback
   * @param  {Array} params - Two parameters defined in MuiTablePagination
   */
  handlePageChange(...params) {
    const currentPage = params[1];

    const {onChangePage} = this.props;

    this.internalSetState({
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

    this.internalSetState({
      rowsPerPage: event.target.value,
      currentPage: 0, // Default to return to first page if rowsPerPage is changed
    });

    typeof onChangeRowsPerPage === 'function' && onChangeRowsPerPage(event);
  }

  /**
   * Uncontrolled:
   * Add selected row index into nextSelectedRowIds if isChecked === true.
   * Delete selected row index from nextSelectedRowIds if isChecked === false.
   * Call props.onRowSelect with selected row id, all selected row ids, event
   * and isChecked.
   * Controlled:
   * Update state based on props.
   * @param {Object} row - Table row
   * @param {string|number} row.id - Table row id
   * @param {Array} params - Two parameters defined in MuiCheckBox
   */
  handleRowSelect(row, ...params) {
    const {onRowSelect} = this.props;

    const newState = this.internalSetState({
      selectedRowIds: () => {
        const isChecked = params[1];

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
            ...selectedRowIds.slice(deleteIndex + 1, selectedRowIds.length),
          ];
        }

        return nextSelectedRowIds;
      },
    });

    typeof onRowSelect === 'function' &&
    onRowSelect(row, newState.selectedRowIds, ...params);
  }

  /**
   * Uncontrolled:
   * Table handles internal status of order(columnId and orderBy) and expose
   * order event by calling onOrderChange with order object.
   * Change orderBy in the following order: asc, desc, false.
   * Controlled:
   * Update state based on props.
   * @param {Object} order
   * @param {string} order.columnId
   * @param {string|boolean} order.orderBy - Enum: 'asc', 'desc', false
   */
  handleOrderChange({columnId, orderBy}) {
    const {onOrderChange} = this.props;

    const newState = this.internalSetState({
      order: () => {
        return {
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
      },
    });

    typeof onOrderChange === 'function' && onOrderChange(newState.order);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      columns,
      isPaginable,
      isSelectable,
      rows,
      rowsPerPageOptions,
      total,
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
              const checkBoxElement = isSelectable === true &&
              <TableCell
                classes={{
                  root: classes.checkBoxCell,
                }}
                padding='checkbox'
              >
                <Checkbox
                  color='primary'
                  checked={selectedRowIds.includes(row.id)}
                  onChange={this.handleRowSelect.bind(this, row)}
                />
              </TableCell>;

              return (
                <TableRow key={row.id}>
                  {checkBoxElement}
                  {
                    columns.map((column) => {
                      return (
                        <TableCell
                          classes={{
                            root: classes.tableCellRoot,
                          }}
                          colSpan={column.colSpan}
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
            emptyRows > 0 &&
            <TableRow style={{height: 57 * emptyRows}}>
              <TableCell
                colSpan={
                  isSelectable === true ?
                  columns.reduce((total, column) => (
                    // If colSpan is not defined, give it colSpan value 1.
                    total + (column.colSpan || 1)
                  ), 0) + 1 :
                  columns.reduce((total, column) => (
                    total + (column.colSpan || 1)
                  ), 0)
                }
              />
            </TableRow>
          }
        </TableBody>
      );
    })();

    const paginationElement = isPaginable === true &&
      <div className={classes.tablePagination}>
        <TablePagination
          ActionsComponent={TablePaginationActions}
          component='div'
          count={total}
          labelDisplayedRows={() => {}}
          labelRowsPerPage={'每页展示条数'}
          page={currentPage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangePage={this.handlePageChange.bind(this)}
          onChangeRowsPerPage={this.handleRowsPerPageChange.bind(this)}
        />
      </div>;

    return (
      <div className={classes.root}>
        <MuiTable
          classes={{
            root: classes.muiTableRoot,
          }}
        >
          <TableHead
            columns={columns}
            isSelectable={isSelectable}
            order={order}
            onOrderChange={this.handleOrderChange.bind(this)}
          />
          {bodyElement}
        </MuiTable>
        {paginationElement}
      </div>
    );
  }
}

export default Table;
