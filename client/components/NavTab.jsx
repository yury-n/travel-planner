import React from 'react';
import { Link } from 'react-router';

const NavTab = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    render() {
        var isActive = this.context.router.isActive(this.props.to, this.props.params, this.props.query);
        var className = isActive ? 'active' : '';
        var link = (
            <Link {...this.props} />
        );
        return <li className={className}>{link}</li>;
    }

});

export default NavTab;
