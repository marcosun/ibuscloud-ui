/**
 * @module Table
 */
import React from 'react';
import {
  object,
  array,
  number,
  string,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {
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

@withStyles(styles, {
  name: 'IBusUiTable',
})
/**
 * Exports Table component
 */
export default class Component extends React.Component {
  static propTypes = {
    classes: object.isRequired,
    columns: array.isRequired,
    data: array.isRequired,
    order: string,
    sortDirection: string,
    currentPage: number.isRequired,
    rowsPerPageOptions: array,
  };

  static defaultProps = {
    currentPage: 0,
    sortDirection: 'asc',
    rowsPerPageOptions: [5, 7, 10],
    order: 'name',
  };

  /**
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
        return sortDirection === 'desc'
          ? data.sort((pre, next) => (next[order] < pre[order] ? -1 : 1))
          : data.sort((pre, next) => (pre[order] < next[order] ? -1 : 1));
      })(),
    };
  }

  /**
   * Alarm: The lifecycle methods will continue to work until the version 17 of react
   * Reset currentPage state if currentPage is updated
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
   * Call onChange callback
   * @param  {number} dataIndex
   * @param  {Object} event
   */
  onChangeChecked(dataIndex, event) {
    const {
      selectedRowsIndex,
    } = this.state;

    this.setState({
      ...this.state,
      selectedRowsIndex: (() => {
        if (event.target.checked === false) {
          return selectedRowsIndex.filter((rowIndex) => {
            return rowIndex !== dataIndex;
          });
        } else {
          return selectedRowsIndex.concat([dataIndex]);
        }
      })(),
    });
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
          ? data.sort((pre, next) => (next[columnId] < pre[columnId] ? -1 : 1))
          : data.sort((pre, next) => (pre[columnId] < next[columnId] ? -1 : 1));
      })(),
    });
  }

  /**
   * Render Table component
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
                      onChange={this.onChangeChecked.bind(this, dataIndex)}
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
        <Table>
          <TableHead
            order={order}
            columns={columns}
            sortDirection={sortDirection}
            data={data}
            numSelected={selectedRowsIndex.length}
            onSelectAllClick={this.onSelectAllClick.bind(this)}
            onSortLabelClick={this.onSortLabelClick.bind(this)}
          />
          {bodyElement}
        </Table>
        <div className={classes.tablePagination}>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
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
