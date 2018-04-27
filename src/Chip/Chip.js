import React from 'react';
import {
  object,
  element,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {default as MuiChip} from 'material-ui/Chip';
import SvgIcon from 'material-ui/SvgIcon';

const styles = (theme) => {
  const color = theme.palette.text.primary;

  return { // The following css styles overites same name properties in MuiChip
    root: {
      height: 21,
      fontSize: theme.typography.body2.fontSize,
      color: color,
      backgroundColor: 'transparent',
      border: `1px solid ${color}`,
    },
    clickable: {
      '&:hover, &:focus': {
        backgroundColor: 'transparent',
      },
      '&:active': {
        backgroundColor: 'transparent',
      },
    },
    deletable: {
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
    deleteIcon: {
      '&:hover': {

      },
    },
  };
};

/**
 * Disable customising deleteIcon.
 * @param {Object} props
 */
@withStyles(styles, {name: 'IBusUiChip'})
class Chip extends React.Component {
  static propTypes = {
    classes: object,
    deleteIcon: element,
  };

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      deleteIcon: deleteIconProp, // Will customise deleteIcon
      ...others
    } = this.props;

    const deleteIcon = (
      <SvgIcon viewBox='-1000 -1000 3000 3000'>
        <path d="M109.714286 0l914.213864 914.213865-109.642436 109.714285L0 109.714286z" fill="#BCBCCB"></path><path d="M1024 109.714286L109.786135 1023.92815 0 914.285714 914.285714 0z" fill="#BCBCCB"></path>
      </SvgIcon>
    );

    return (
      <MuiChip
        classes={{...classes}}
        {...others}
        deleteIcon={typeof others.onDelete === 'function' && deleteIcon}
      />
    );
  }
}

export default Chip;
