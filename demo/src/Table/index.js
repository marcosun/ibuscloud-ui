import React from 'react';
import Table from 'ibuscloud-ui/Table';

/**
 * Table page
 */
export default class table extends React.Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.total = 32;

    this.order = {
      columnId: 'name',
      orderBy: 'asc',
    };

    this.allRows = this.getAllRows(this.total);

    this.columns = [
      {
        id: 'name',
        isOrderable: true,
        label: 'Dessert (100g serving)',
        tooltip: 'name',
      },
      {
        id: 'calories',
        isNumeric: false,
        label: 'Calories',
        tooltip: 'calories',
      },
      {
        id: 'fat',
        label: 'Fat (g)',
        isNumeric: false,
      },
      {
        id: 'carbs',
        label: 'Carbs (g)',
      },
      {
        id: 'protein',
        label: 'Protein (g)',
      },
    ];

    this.state = {
      rowId: {},
      selectedRowIds: [],
      rowsPerPage: 5,
      currentPage: 0,
      rows: this.getRows(0, 5, {...this.order}),
    };
  }

  /**
   * Simulate table data
   * @param  {number} total
   * @return {Array}
   */
  getAllRows(total) {
    return new Array(total).fill(1).map((item, index) => {
      return {
        id: index,
        name: index + 1,
        calories: (Math.random() * 100).toFixed(0),
        fat: (Math.random() * 100).toFixed(1),
        carbs: (Math.random() * 100).toFixed(1),
        protein: (Math.random() * 100).toFixed(0),
      };
    });
  }

  /**
   * The current page of rows data
   * @param  {number} currentPage
   * @param  {number} rowsPerPage
   * @param  {Object} options
   * @param  {string} options.orderBy
   * @param  {string} options.columnId
   * @return {Array}
   */
  getRows(currentPage, rowsPerPage, {orderBy, columnId}) {
    const currentPageRows = this.total - currentPage * rowsPerPage >= rowsPerPage
      ? rowsPerPage
      : this.total - currentPage * rowsPerPage;

    if (orderBy === 'asc') {
      return [...this.allRows].sort((pre, next) => (next[columnId] > pre[columnId] ? -1 : 1))
        .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + currentPageRows);
    }

    if (orderBy === 'desc') {
      return [...this.allRows].sort((pre, next) => (next[columnId] < pre[columnId] ? -1 : 1))
        .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + currentPageRows);
    }

    return [...this.allRows].slice(currentPage * rowsPerPage, currentPage * rowsPerPage + currentPageRows);
  }

  /**
   * Call onChangePage callback
   * @param  {Object} event
   * @param  {number} page
   */
  handleChangePage(event, page) {
    this.setState({
      ...this.state,
      rows: this.getRows(page, this.state.rowsPerPage, {...this.order}),
      currentPage: page,
    });
  }

  /**
   * Call onChangeRowsPerPage callback
   * @param  {Object} event
   */
  handleChangeRowsPerPage(event) {
    this.setState({
      ...this.state,
      rowsPerPage: event.target.value,
      rows: this.getRows(0, event.target.value, {...this.order}),
      currentPage: 0,
    });
  }

  /**
   * Call onRowSelect callback
   * @param  {number}  rowId - Clicked row id.
   * @param  {Array}  selectedRowIds - An array of selected row ids.
   * @param  {Object}  event
   * @param  {Boolean} isChecked
   */
  handleRowSelect(rowId, selectedRowIds, event, isChecked) {
    this.setState({
      ...this.state,
      rowId,
      selectedRowIds,
    });
  }

  /**
   * Call onOrderChange callback
   * @param  {Object} options
   * @param  {string} options.columnId - Sort column id.
   * @param  {string} options.orderBy - Order by 'asc' or 'desc' or false.
   */
  handleOrderChange({columnId, orderBy}) {
    this.order = {
      columnId,
      orderBy,
    };

    this.setState({
      ...this.state,
      rows: this.getRows(this.state.currentPage, this.state.rowsPerPage, {...this.order}),
    });
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      rows,
      rowId,
      selectedRowIds,
    } = this.state;

    return (
      <div style={{fontSize: '16px'}}>
        <div>rowId: {JSON.stringify(rowId)}</div>
        <div>selectedRowIds: {JSON.stringify(selectedRowIds)}</div>
        <div>Note: The sort order is according to string Unicode code points.</div>
        <Table
          total={this.total}
          columns={this.columns}
          isSelectable={true}
          rows={rows}
          order={this.order}
          onChangePage={this.handleChangePage.bind(this)}
          onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
          onRowSelect={this.handleRowSelect.bind(this)}
          onOrderChange={this.handleOrderChange.bind(this)}
        />
      </div>
    );
  }
}
