import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'antd/lib/skeleton';
import 'antd/lib/skeleton/style';
import ReactEcharts from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';

const builtInOptions = {
  /* The label color of XAxis and yAxis */
  axisLabel: {
    color: 'rgba(0,0,0,0.65)',
  },
  color: [
    '#1890ff',
    '#2fc25b',
    '#facc14',
    '#223273',
    '#8543e0',
    '#13c2c2',
    '#3436c7',
    '#f04864',
    '#748AE5',
    '#E6965C',
  ],
  dataZoom: {
    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    handleStyle: {
      color: '#FFFFFF',
      borderColor: '#D9D9D9',
      borderWidth: 1,
      shadowBlur: 2,
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffsetX: 0,
      shadowOffsetY: 1,
    },
    left: 60,
    right: 60,
    textStyle: {
      color: 'rgba(0,0,0,0.65)',
    },
    type: 'slider',
  },
  grid: {
    containLabel: true,
    left: 20,
    right: 20,
  },
  legend: {
    left: 'right',
    itemGap: 16,
    itemHeight: 12,
    itemWidth: 12,
    show: true,
    textStyle: {
      color: 'rgba(0,0,0,0.65)',
      fontSize: 14,
    },
  },
  series: {
    /* The bar gap of a single series. */
    barCategoryGap: '50%',
    barMaxWidth: 57,
    type: 'bar',
  },
  title: {
    left: 'left',
    textStyle: {
      color: 'rgba(0,0,0,0.85)',
      fontSize: 14,
      fontWeight: 500,
    },
    top: 'top',
  },
  tooltip: {
    axisPointer: {
      /* Indicator type，line/shadow/none/cross. */
      type: 'shadow',
    },
    trigger: 'axis',
    show: true,
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: '#E9E9E9',
      },
    },
    axisTick: {
      /* Align axis tick with label. */
      alignWithLabel: true,
    },
    nameGap: 12,
    splitLine: {
      show: false,
    },
    type: 'category',
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: '#E9E9E9',
        type: 'dotted',
      },
    },
    type: 'value',
  },
};

class BarChart extends React.PureComponent {
  /* Merge props.dataZoom with built-in options. */
  createDataZoomOptions = () => {
    const { dataZoom } = this.props;

    return dataZoom === void 0 ?
      [builtInOptions.dataZoom] :
      dataZoom.map((eachDataZoom) => {
        return {
          ...builtInOptions.dataZoom,
          ...eachDataZoom,
        };
      });
  }

  /* Merge props.grid with built-in options. */
  createGridOptions = () => {
    const { grid } = this.props;

    return {
      ...builtInOptions.grid,
      ...grid,
    };
  }

  /* Merge props.legend with built-in options. */
  createLegendOptions = () => {
    const { legend } = this.props;

    return {
      ...builtInOptions.legend,
      ...legend,
    };
  }

  /* Merge props.series with built-in options. */
  createSeriesOptions = () => {
    const { series } = this.props;

    return series.map((eachSeries) => {
      return {
        ...builtInOptions.series,
        ...eachSeries,
      };
    });
  }

  /* Merge props.title with built-in options. */
  createTitleOptions = () => {
    const { title } = this.props;

    return {
      ...builtInOptions.title,
      ...title,
    };
  }

  /* Merge props.tooltip with built-in options. */
  createTooltipOptions = () => {
    const { tooltip } = this.props;

    return {
      ...builtInOptions.tooltip,
      ...tooltip,
    };
  }

  /* Merge props.xAxis with built-in options. */
  createXAxisOptions = () => {
    const { xAxis } = this.props;

    return {
      ...builtInOptions.xAxis,
      ...xAxis,
    };
  }

  /* Merge props.yAxis with built-in options. */
  createYAxisOptions = () => {
    const { yAxis } = this.props;

    return {
      ...builtInOptions.yAxis,
      ...yAxis,
    };
  }

  render() {
    const {
      dataZoom,
      grid,
      height,
      legend,
      loading,
      option,
      series,
      title,
      tooltip,
      xAxis,
      yAxis,
      ...others
    } = this.props;

    const options = {
      ...builtInOptions,
      dataZoom: this.createDataZoomOptions(),
      grid: this.createGridOptions(),
      legend: this.createLegendOptions(),
      series: this.createSeriesOptions(),
      title: this.createTitleOptions(),
      tooltip: this.createTooltipOptions(),
      xAxis: this.createXAxisOptions(),
      yAxis: this.createYAxisOptions(),
    };

    return (
      <Skeleton
        active
        loading={loading}
        paragraph={{ rows: 10 }}
        title={false}
      >
        <ReactEcharts
          echarts={echarts}
          notMerge
          option={options}
          style={{ height }}
          {...others}
        />
      </Skeleton>
    );
  }
}

BarChart.propTypes = {
  /**
   * Echart dataZoom.
   */
  dataZoom: PropTypes.array,
  /**
   * Echart grid.
   */
  grid: PropTypes.object,
  /**
   * Chart height.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Echart legend.
   */
  legend: PropTypes.object,
  /**
   * If true, the loading icon will be displayed.
   */
  loading: PropTypes.bool.isRequired,
  /**
   * Option prop is ignored. Echart option must be derived from within this module.
   */
  option: PropTypes.any,
  /**
   * Echart series.
   */
  series: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.array.isRequired,
  })).isRequired,
  /**
   * Echart title.
   */
  title: PropTypes.object,
  /**
   * Echart tooltip.
   */
  tooltip: PropTypes.object,
  /**
   * Echart xAxis.
   */
  xAxis: PropTypes.object,
  /**
   * Echart yAxis.
   */
  yAxis: PropTypes.object,
};

BarChart.defaultProps = {
  height: 450,
};

export default BarChart;
