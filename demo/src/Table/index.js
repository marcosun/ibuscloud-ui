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
        title: '第一列',
      },
      {
        id: 'calories',
        label: 'Calories',
        numeric: true,
      },
      {
        id: 'fat',
        label: 'Fat (g)',
        numeric: false,
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
        name: '1',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        name: 'cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
      },
            {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 24,
        protein: 6.0,
      },
      {
        name: 'Frozen yoghurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
      },
    ];
  }

  /**
   * Render table component
   * @return {Component}
   */
  render() {
    return (
      <div>
        <h1>Selecting</h1>
        <Table
          columns={this.columns}
          data={this.data}
        />
        <h1>Sorting & Selecting</h1>
        <Table
          order={'name'}
          sortDirection={'asc'}
          columns={this.columns}
          data={this.data}
        />
      </div>
    );
  }
}
