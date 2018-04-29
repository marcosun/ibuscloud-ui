import React from 'react';
import {
  func,
  bool,
  array,
  object,
  number,
  string,
  oneOf,
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
 * Exports Table component
 * @param {string} props.order - Column id. The label will have the active styling.
 * @param {Array} props.data - Every cloumns.prop value
 * @param {Object[]} props.columns
 * @param {string} props.columns[].id - Unique id
 * @param {string} props.columns[].label - Display column name
 * @param {boolean} props.columns[].numeric - If true, content will align to the right.
 * False or undefined align to left
 * @param {string} props.columns[].title - Tooltip
 * @param {string} props.sortDirection - Asc or desc
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
    order: string,
    data: array.isRequired,
    columns: arrayOf(shape({
      id: string.isRequired,
      label: string.isRequired,
      numeric: bool,
      title: string,
    })).isRequired,
    sortDirection: oneOf(['asc', 'desc']),
    rowsPerPageOptions: array,
    currentPage: number.isRequired,
    onCheckedChange: func,
    onAllCheckedChange: func,
  };

  static defaultProps = {
    currentPage: 0,
    rowsPerPageOptions: [5, 7, 10],
  };

  /**
   * Init state
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    const {
      data,
      order,
      currentPage,
      sortDirection,
      rowsPerPageOptions,
    } = this.props;

    this.state = {
      order,
      currentPage,
      sortDirection,
      rowsPerPage: rowsPerPageOptions[0],
      selectedRowsIndex: [],
      data: (() => {
        if (sortDirection === void 0) {
          return [...data];
        }

        return sortDirection === 'desc'
          ? [...data].sort((pre, next) => (next[order] < pre[order] ? -1 : 1))
          : [...data].sort((pre, next) => (pre[order] < next[order] ? -1 : 1));
      })(),
    };
  }

  /**
   * Alarm: The lifecycle methods will continue to work until the version 17 of react
   * Reset currentPage and data state if updated
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

    if (!isShallowEqual(this.props.data, nextProps.data)) {
      this.setState({
        ...this.state,
        data: [...nextProps.data],
        currentPage: 0,
        selectedRowsIndex: [],
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
   * @param  {Object} event
   */
  onSelectAllClick(event) {
    const {
      data,
    } = this.state;

    this.setState({
      ...this.state,
      selectedRowsIndex: (() => {
        if (event.target.checked === false) {
          return [];
        } else {
          return [...new Array(data.length)].map((item, index) => {
            return index;
          });
        }
      })(),
    });

    this.props.onAllCheckedChange && this.props.onAllCheckedChange(event);
  }

  /**
   * Call onSortLabelClick callback
   * @param {Object} ExposedParam
   * @param {number} ExposedParam.columnId
   * @param {string} ExposedParam.sortDirection
   */
  onSortLabelClick({columnId, sortDirection}) {
    this.setState({
      ...this.state,
      order: columnId,
      sortDirection: this.state.sortDirection === 'asc' ? 'desc' : 'asc',
      data: (() => {
        const {
          data,
        } = this.state;

        const order = sortDirection === 'asc' ? 'desc' : 'asc';

        return order === 'desc'
          ? [...data].sort((pre, next) => (next[columnId] < pre[columnId] ? -1 : 1))
          : [...data].sort((pre, next) => (pre[columnId] < next[columnId] ? -1 : 1));
      })(),
    });
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      columns,
      rowsPerPageOptions,
    } = this.props;

    const {
      data,
      order,
      rowsPerPage,
      currentPage,
      sortDirection,
      selectedRowsIndex,
    } = this.state;

    const bodyElement = (() => {
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - currentPage * rowsPerPage);

      return (
          <TableBody>
          {
            data.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((item, index) => {
              const dataIndex = currentPage * rowsPerPage + index;
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      color='primary'
                      checked={selectedRowsIndex.includes(dataIndex)}
                      onChange={this.onCheckedChange.bind(this, dataIndex)}
                    />
                  </TableCell>
                  {
                    columns.map((column) => {
                      return (
                        <TableCell
                          key={`${index}${column.id}`}
                          numeric={column.numeric !== void 0 ? column.numeric : false}
                        >
                          {item[column.id]}
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
            data={data}
            order={order}
            columns={columns}
            sortDirection={sortDirection}
            numSelected={selectedRowsIndex.length}
            onSelectAllClick={this.onSelectAllClick.bind(this)}
            onSortLabelClick={this.onSortLabelClick.bind(this)}
          />
          {bodyElement}
        </MuiTable>
        <div className={classes.tablePagination}>
          <TablePagination
            component="div"
            page={currentPage}
            count={data.length}
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
