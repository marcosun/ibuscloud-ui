import React from 'react';
import {object} from 'prop-types';
import Table from 'ibuscloud-ui/Table';

/**
 * Table page
 */
export default class table extends React.Component {
  static propTypes = {};

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    
    this.columns = [
      {
        id: 'name',
        label: 'Dessert (100g serving)',
        tooltip: '第一列',
      },
      {
        id: 'calories',
        label: 'Calories',
        isNumeric: true,
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

    this.data = [
      {
        id: 1,
        name: '1',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        id: 2,
        name: 'cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        id: 3,
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        id: 4,
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
      },
      {
        id: 5,
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
      },
      {
        id: 6,
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 24,
        protein: 6.0,
      },
      {
        id: 7,
        name: 'Frozen yoghurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
      },
    ];

    this.state = {
      isAllChecked: false,
      currentRow: {},
      checkedRows: [],
    };
  }

  /**
   * @param  {Object} currentRow
   * @param  {Array} checkedRows
   */
  onCheckedChange(currentRow, checkedRows) {
    this.setState({
      ...this.state,
      currentRow,
      checkedRows,
    });
  }

  /**
   * @param  {Object} event
   */
  onAllCheckedChange(event) {
    this.setState({
      ...this.state,
      isAllChecked: event.target.checked,
    });
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      isAllChecked,
      currentRow,
      checkedRows,
    } = this.state;

    return (
      <div style={{fontSize: '16px'}}>
        <h1>Selecting</h1>
        <div>isAllChecked: {`${isAllChecked}`}</div>
        <div>currentRow: {JSON.stringify(currentRow)}</div>
        <div>checkedRows: {JSON.stringify(checkedRows)}</div>
        <Table
          columns={this.columns}
          rows={this.data}
          onCheckedChange={this.onCheckedChange.bind(this)}
          onAllCheckedChange={this.onAllCheckedChange.bind(this)}
        />
        <h1>Sorting & Selecting</h1>
        <Table
          columns={this.columns}
          rows={this.data}
          order={{
            columnId: 'name',
            orderBy: 'desc',
          }}
        />
      </div>
    );
  }
}
