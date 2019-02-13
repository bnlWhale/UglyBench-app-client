import React, {Component} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './commomcss/AppHeader.css';
import pollIcon from '../poll.svg';
import {Layout, Menu, Dropdown, Icon, Tooltip} from 'antd';

const Header = Layout.Header;

class AppHeader extends Component {


    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        console.log("AppHeader",props)
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    render() {
        let menuItems;
        if (this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Tooltip title="home">
                        <Link to="/">
                            <Icon type="home" className="nav-icon"/>
                        </Link>
                    </Tooltip>
                </Menu.Item>,
                <Menu.Item key="/productList">
                    <Tooltip title="product table">
                        <Link to="/productList">
                            <Icon type="bar-chart" className="nav-icon"/>
                        </Link>
                    </Tooltip>
                </Menu.Item>,
                <Menu.Item key="/EditorProductPage">
                    <Tooltip title="Editor of Product">
                        <Link to="/EditorProductPage">
                            <Icon type="edit" className="nav-icon"/>
                        </Link>
                    </Tooltip>
                </Menu.Item>,
                <Menu.Item key="/shoppingcartList">
                    <Tooltip title="shopping cart">
                        <Link to="/shoppingcartList">
                            <Icon type="shopping-cart" className="nav-icon"/>
                        </Link>
                    </Tooltip>
                </Menu.Item>,
                <Menu.Item key="/inventoryList">
                    <Tooltip title="inventory list">
                        <Link to="/inventoryList">
                            <Icon type="hdd" className="poll-icon"/>
                        </Link>
                    </Tooltip>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ];
        } else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Login</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup">Signup</Link>
                </Menu.Item>
            ];
        }

        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">Ugly work bench App</Link>
                    </div>
                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {menuItems}
                    </Menu>
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.userName}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser.userName}`}> <Icon type="profile" className="nav-icon"/>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                <Icon type="coffee" className="nav-icon"/>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <Tooltip title="profile and logout">
                <a className="ant-dropdown-link">
                    <Icon type="user" className="nav-icon" style={{marginRight: 0}}/> <Icon type="down"/>
                </a>
            </Tooltip>
        </Dropdown>
    );
}


export default withRouter(AppHeader);