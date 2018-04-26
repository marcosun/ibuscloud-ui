import React from 'react';
import {
  object,
  number,
  func,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  ellipsis: {
    display: 'inline-block',
    width: '36px',
    height: '36px',
    lineHeight: '36px',
    textAlign: 'center',
    marginLeft: '8px',
    color: '#A4AFB7',
    fontSize: '14px',
  },
  buttonRoot: {
    width: '36px',
    height: '36px',
    minWidth: 'auto',
    marginLeft: '8px',
    padding: '0px',
    borderRadius: '4px',
  },
});

@withStyles(styles)
/**
 * Exports TablePaginationActions component
 */
export default class TablePaginationActions extends React.Component {
  static propTypes = {
    classes: object.isRequired,
    count: number.isRequired,
    rowsPerPage: number.isRequired,
    page: number.isRequired,
    maxDigitalButtonNum: number.isRequired,
    onChangePage: func.isRequired,
  };

  static defaultProps = {
    maxDigitalButtonNum: 3,
  };

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Click digital button callback
   * @param {number} index
   * @param {Object} event
   */
  onDigitalButtonClick(index, event) {
    this.props.onChangePage(event, index);
  }

  /**
   * Click previous button callback
   * @param {number} currentPage
   * @param {Object} event
   */
  onPreButtonClick(currentPage, event) {
    this.props.onChangePage(event, currentPage - 1);
  }

  /**
   * Click next button callback
   * @param {number} currentPage
   * @param {Object} event
   */
  onNextButtonClick(currentPage, event) {
    this.props.onChangePage(event, currentPage + 1);
  }


  /**
   * Render TablePaginationActions component
   * @return {Component}
   */
  render() {
    const {
      classes,
      count,
      maxDigitalButtonNum,
      rowsPerPage,
      page: currentPage,
    } = this.props;

    const totalPageNum = Math.ceil(count / rowsPerPage);

    const digitalButtonList = (
      [...new Array(totalPageNum)].map((item, index) => {
        if (
          maxDigitalButtonNum < totalPageNum
          && index === maxDigitalButtonNum - 1
        ) {
          return <div className={classes.ellipsis} key={index}>…</div>;
        }

        if (
          maxDigitalButtonNum < totalPageNum
          && index > maxDigitalButtonNum - 1
          && index < totalPageNum - 1
        ) {
          return null;
        }

        return (
          <Button
            key={index}
            variant="raised"
            color={currentPage === index ? 'primary' : 'default'}
            classes={{
              root: classes.buttonRoot,
            }}
            onClick={this.onDigitalButtonClick.bind(this, index)}
          >
            {index + 1}
          </Button>
        );
      })
    );

    return (
      <div className={classes.root}>
        <Button
          variant="raised"
          disabled={currentPage === 0}
          classes={{
            root: classes.buttonRoot,
          }}
          onClick={this.onPreButtonClick.bind(this, currentPage)}
        >
          <KeyboardArrowLeft />
        </Button>
        {digitalButtonList}
        <Button
          variant="raised"
          disabled={currentPage === totalPageNum - 1}
          classes={{
            root: classes.buttonRoot,
          }}
          onClick={this.onNextButtonClick.bind(this, currentPage)}
        >
          <KeyboardArrowRight />
        </Button>
      </div>
    );
  }
}
