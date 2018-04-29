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

/**
 * Exports TablePaginationActions component
 * @param {number} props.page - The zero-based index of the current page.
 * @param {number} props.count -  The total number of rows.
 * @param {number} props.rowsPerPage - The number of rows per page.
 * @param {function} props.onChangePage - Callback fired when the page is changed.
 */
@withStyles(styles)
class TablePaginationActions extends React.Component {
  static propTypes = {
    classes: object,
    page: number.isRequired,
    count: number.isRequired,
    rowsPerPage: number.isRequired,
    onChangePage: func.isRequired,
  };

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.props = props;

    // Todo: expose maxDigitalButtonNum prop
    this.maxDigitalButtonNum = 6;
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
   * @return {Component}
   */
  render() {
    const {
      classes,
      count,
      rowsPerPage,
      page: currentPage,
    } = this.props;

    const totalPageNum = Math.ceil(count / rowsPerPage);

    // Todo: add transition animation when switching buttons
    const digitalButtonList = (() => {
      // If the number of pages are less than maxDigitalButtonNum,
      // we will create a 1D array with consecutive numbers.
      // If the number of pages are more than maxDigitalButtonNum,
      // we will create a 2D array with consecutive numbers.
      // We will be render button according numbers and
      // insert ellipsis in the middle of the 2D array.
      const digitalList = (() => {
        if (this.maxDigitalButtonNum < totalPageNum) {
          if (currentPage < 2) {
            return [
              [0, 1, 2, 3, 4],
              [totalPageNum - 1],
            ];
          }

          if (currentPage >= 2 && currentPage <= totalPageNum - 5) {
            return [
              [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2],
              [totalPageNum - 1],
            ];
          }

          return [
            [0],
            [totalPageNum - 5, totalPageNum - 4, totalPageNum - 3, totalPageNum - 2, totalPageNum - 1],
          ];
        }

        return [[...new Array(totalPageNum)].map((item, index) => {
          return index;
        })];
      })();

      const getDigitalButtonElement = (type, digital) => {
        switch (type) {
          case 'ellipsis':
            return <div className={classes.ellipsis} key={type}>…</div>;
          case 'button':
            return (() => {
              return (
                <Button
                  key={digital}
                  variant="raised"
                  color={currentPage === digital ? 'primary' : 'default'}
                  classes={{
                    root: classes.buttonRoot,
                  }}
                  onClick={this.onDigitalButtonClick.bind(this, digital)}
                >
                  {digital + 1}
                </Button>
              );
            })();
          default:
            return null;
        }
      };

      if (digitalList[1] === void 0) {
        return digitalList[0].map((digital) => {
          return getDigitalButtonElement('button', digital);
        });
      } else {
        const preButtonList = digitalList[0].map((digital) => {
          return getDigitalButtonElement('button', digital);
        });

        const nextButtonList = digitalList[1].map((digital) => {
          return getDigitalButtonElement('button', digital);
        });

        return [].concat(
          preButtonList,
          getDigitalButtonElement('ellipsis'),
          nextButtonList
        );
      }
    })();

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

export default TablePaginationActions;
