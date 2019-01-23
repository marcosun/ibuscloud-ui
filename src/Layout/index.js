import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import AntLayout from 'antd/lib/layout';
import 'antd/lib/icon/style';
import 'antd/lib/layout/style';
import classes from './index.less';

const { Header, Content, Footer, Sider } = AntLayout;

/**
 * Ensures that only content and footer could scroll.
 * Elements such as side bar and header always behave as fix positioned.
 */
class Layout extends React.PureComponent {
  state = {
    collapsed: false,
  };

  /* Clicking toggle sider icon expands or collapse Sider. */
  handleToggleSiderIconClick = () => {
    this.setState((state) => ({
      collapsed: !state.collapsed,
    }));
  }

  render() {
    const {
      contentComponent,
      footerComponent,
      headerComponent,
      siderComponent,
    } = this.props;

    const {
      collapsed,
    } = this.state;

    return (
      <AntLayout className={classes.root}>
        <Sider
          className={classes.sider}
          collapsed={collapsed}
          collapsible
          trigger={null}
        >
          {siderComponent}
        </Sider>
        <AntLayout className={classes.siderRight}>
          <Header className={classes.header}>
            <Icon
              className={classes.toggleSiderIcon}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.handleToggleSiderIconClick}
            />
            {headerComponent}
          </Header>
          <div className={classes.headerBottom}>
            <Content className={classes.content}>
              {contentComponent}
            </Content>
            <Footer className={classes.footer}>
              {footerComponent}
            </Footer>
          </div>
        </AntLayout>
      </AntLayout>
    );
  }
}

Layout.propTypes = {
  /* Page Content. */
  contentComponent: PropTypes.node,
  /* Page Footer. */
  footerComponent: PropTypes.node,
  /* Page Header. */
  headerComponent: PropTypes.node,
  /* Page Sider. Navigate menu. */
  siderComponent: PropTypes.node,
};

export default Layout;
