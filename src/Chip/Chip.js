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
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
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
      margin: '0 4px 0 -12px',
      padding: 6,
      '&:hover': {
      },
    },
  };
};

/**
 * @param {Element} [props.deleteIcon=svg delete icon] - Svg delete icon
 */
@withStyles(styles, {name: 'IBusUiChip'})
class Chip extends React.Component {
  static propTypes = {
    classes: object,
    deleteIcon: element,
  };

  static defaultProps = {
    deleteIcon: <use xlinkHref="#icon-icon_close"></use>,
  };

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      deleteIcon,
      ...others
    } = this.props;

    return (
      <MuiChip
        classes={{...classes}}
        {...others}
        deleteIcon={<SvgIcon>{deleteIcon}</SvgIcon>}
      />
    );
  }
}

export default Chip;
