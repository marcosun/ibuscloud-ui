/**
 * @return {function}
 */
export const createInternalSetState = () => {
  return function(state = this.state, props = this.props) {
    const nextState = {
      ...this.state,
      ...mergePropsToState(state, props),
    };

    this.setState(nextState);

    return nextState;
  };
};

/**
 * Check prop whether it is a controlled prop
 * @param  {Object}  props - Props value
 * @param  {string}  key - Need checked key
 * @return {boolean} - Whether it is a controlled prop
 */
export const isControlledProp = (props, key) => {
  return props[key] !== void 0;
};

/**
 * Get the state based on internal state or props.
 * If the prop is a controlled prop, the prop will be merged to state
 * @param  {Object} state
 * @param  {Object} props
 * @return {Object} - New State
 */
export const mergePropsToState = (state, props) => {
  return Object.keys(state).reduce((accumulator, key) => {
    accumulator[key] = isControlledProp(props, [key])
      ? props[key]
      : (() => {
        if (typeof state[key] === 'function') {
          return state[key]();
        }
        return state[key];
      })();
    return accumulator;
  }, {});
};
