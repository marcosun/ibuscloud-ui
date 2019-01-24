import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'antd/lib/skeleton';
import 'antd/lib/skeleton/style';
import ReactEcharts from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';

/* Built-in options. */
const builtInOptions = {
  grid: {
    containLabel: true,
    left: 20,
    right: 20,
  },
  series: {
    itemStyle: {
      /* Hover style. */
      emphasis: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
    label: {
      color: 'black',
      /* Show label. */
      show: true,
    },
    type: 'heatmap',
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
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 4,
    padding: [8, 12],
    show: true,
  },
  visualMap: {
    /* Show draggable legend. */
    calculable: true,
    /**
     * Visual map legend colour.
     */
    controller: {
      inRange: {
        color: '#1890FF',
        symbolSize: [30, 100],
      },
    },
    /* Heatmap color stops. */
    inRange: {
      color: ['white', '#1890FF'],
    },
    left: 'center',
    /* Horizontally position legend. */
    orient: 'horizontal',
    type: 'continuous',
  },
  xAxis: {
    /* Show all labels and rorate label position. */
    axisLabel: {
      interval: 0,
      rotate: -30,
    },
    /* Hide axis line. */
    axisLine: {
      show: false,
    },
    /* Hide axis tick. */
    axisTick: {
      show: false,
    },
    /* Position axis to the top of the chart. */
    position: 'top',
    /* Beautiful looking. */
    splitArea: {
      show: true,
    },
    type: 'category',
  },
  yAxis: {
    /* Show all labels and rorate label position. */
    axisLabel: {
      interval: 0,
      rotate: 30,
    },
    /* Hide axis line. */
    axisLine: {
      show: false,
    },
    /* Hide axis tick. */
    axisTick: {
      show: false,
    },
    /* Beautiful looking. */
    splitArea: {
      show: true,
    },
    type: 'category',
  },
};

/* Matrix chart on top of Echarts.HeatMap. */
class MatrixChart extends React.PureComponent {
  /* Merge props.series with built-in options. */
  createSeriesOptions = () => {
    const { series } = this.props;

    return series.map((eachSeries) => {
      return {
        ...builtInOptions.series,
        /* Series props overrides built-in series options. */
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

  /* Compute maximum value regarding to colour stops. */
  createVisualMapOptions = () => {
    const { visualMap } = this.props;

    return visualMap.map((eachVisualMap) => {
      return {
        ...builtInOptions.visualMap,
        /* visualMap props overrides built-in visualMap options. */
        ...eachVisualMap,
      };
    });
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
      height,
      loading,
      option,
      series,
      title,
      tooltip,
      visualMap,
      xAxis,
      yAxis,
      ...others
    } = this.props;

    const options = {
      ...builtInOptions,
      series: this.createSeriesOptions(),
      title: this.createTitleOptions(),
      tooltip: this.createTooltipOptions(),
      visualMap: this.createVisualMapOptions(),
      xAxis: this.createXAxisOptions(),
      yAxis: this.createYAxisOptions(),
    };

    return (
      <Skeleton active loading={loading} paragraph={{ rows: 10 }} title={false}>
        <ReactEcharts
          echarts={echarts}
          /* Data point will not be deleted from echarts if notMerge is disabled. */
          notMerge
          option={options}
          style={{ height }}
          {...others}
        />
      </Skeleton>
    );
  }
}

MatrixChart.propTypes = {
  /**
   * Chart height.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
   * Echart visualMap.
   */
  visualMap: PropTypes.array,
  /**
   * Echart xAxis.
   */
  xAxis: PropTypes.object,
  /**
   * Echart yAxis.
   */
  yAxis: PropTypes.object,
};

MatrixChart.defaultProps = {
  height: 950,
};

export default MatrixChart;
