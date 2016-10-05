import React from 'react';
import { Link, withRouter } from 'react-router';

const NavTab = React.createClass({
    render() {
      const { router, params, location, routes, onClickHandler, ...rest } = this.props;
      var isActive = router.isActive(this.props.to);
      var className = isActive ? 'active' : '';
      var link = (
          <Link {...rest} />
      );
      return <li className={className} onClick={onClickHandler}>{link}</li>;
    }

});

export default withRouter(NavTab);
