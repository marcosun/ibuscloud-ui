import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'antd/lib/skeleton';
import 'antd/lib/skeleton/style';
import ReactEcharts from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';

/* Built-in options. */
const builtInOptions = {
  series: {
    edgeSymbol: ['none', 'arrow'],
    label: {
      /* Show label. */
      show: true,
    },
    /* Enable zoom and drag. */
    roam: true,
    symbolSize: 25,
    type: 'graph',
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
    show: true,
    formatter: (params) => {
      const {
        /**
         * Hover on edge or node.
         */
        dataType,
        /**
         * Marker icon.
         */
        marker,
        /**
         * Marker name.
         */
        name,
        value,
      } = params;

      /**
       * Hover node shows node name only.
       */
      if (dataType === 'node') {
        return `${marker}${name}`;
      }

      /**
       * Hover edge shows node starting point name, destination name, and value.
       */
      return `${marker}${name}: ${value}`;
    },
  },
};

/* Graph chart on top of Echarts. */
class GraphChart extends React.PureComponent {
  /**
   * Forward and backward links have different colours.
   * Link line width reflects link value.
   */
  createLinksOptions = (seriesData, links) => {
    /* Series is an array of objects, pluck names. */
    const names = seriesData.map((dataPoint) => dataPoint.name);

    /**
     * The greatest link value is treated as a benchmark.
     * All links has its width equal to a percentage value of this benchmark.
     */
    const benchmark = Math.max.apply(null, links.map((link) => link.value));

    return links.map((link) => {
      /* Link dirction: forward or backward. */
      let direction;
      const { source, target } = link;

      if (names.indexOf(source) < names.indexOf(target)) {
        direction = 'forward';
      } else {
        direction = 'backward';
      }

      const width = Math.round(link.value / benchmark * 15);

      return {
        ...link,
        lineStyle: {
          color: direction === 'forward' ? '#4A90E2' : '#53C41C',
          curveness: 0.5,
          /* Set minimum line width. */
          width: width < 1 ? 1 : width,
        },
        symbolSize: width + 15,
      };
    });
  }

  /* Merge series props with built-in series options. */
  createSeriesOptions = () => {
    const { series } = this.props;

    return series.map((eachSeries) => {
      return {
        /* Series props overrides built-in series options. */
        ...builtInOptions.series,
        ...eachSeries,
        /* Merge series.data props with built-in options. */
        data: eachSeries.data.map((dataPoint, index) => {
          return {
            /* Horizontally and equally draw each and every single data point. */
            x: index,
            y: 0,
            ...dataPoint,
          };
        }),
        /* Merge series.links props with built-in links options. */
        links: this.createLinksOptions(eachSeries.data, eachSeries.links),
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

  render() {
    const {
      height,
      loading,
      series,
      title,
      ...others
    } = this.props;

    const option = {
      ...builtInOptions,
      series: this.createSeriesOptions(),
      title: this.createTitleOptions(),
    };

    return (
      <Skeleton active loading={loading} paragraph={{ rows: 10 }} title={false}>
        <ReactEcharts
          echarts={echarts}
          /* Data point will not be deleted from echarts if notMerge is disabled. */
          notMerge
          option={option}
          style={{ height }}
          {...others}
        />
      </Skeleton>
    );
  }
}

GraphChart.propTypes = {
  /* Chart height. */
  height: PropTypes.number,
  /**
   * If true, the loading icon will be displayed.
   */
  loading: PropTypes.bool.isRequired,
  /**
   * Echart series.
   */
  series: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.array.isRequired,
    links: PropTypes.array.isRequired,
  })).isRequired,
  /**
   * Echart title.
   */
  title: PropTypes.object,
};

GraphChart.defaultProps = {
  height: 740,
};

export default GraphChart;
