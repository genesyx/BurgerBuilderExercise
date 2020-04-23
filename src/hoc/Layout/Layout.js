import React, { Component } from 'react';
import Aux from '../AuxFolder/AuxComponent';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SiderDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// Layout de l'appli
class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    siderDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    siderDrawerToggleHandler = () => {
        this.setState((previousState) => {
            return { showSideDrawer: !previousState.showSideDrawer };
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.siderDrawerToggleHandler} />
                <SiderDrawer
                    open={this.state.showSideDrawer}
                    closed={this.siderDrawerClosedHandler}
                />
                <main className={classes.MarginContent}>
                    {this.props.children}
                </main>
            </Aux >
        );
    };
}

export default Layout;