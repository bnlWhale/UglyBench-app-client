import React, {Component} from 'react';
import './App.css';
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';

import {getCurrentUser, existTOKEN, removeTOKEN} from '../util/APIUtils';
import {MSG_APP_TITLE, MSG_LOGOUT} from '../constants';

import PollList from '../poll/PollList';
import NewPoll from '../poll/NewPoll';
import Login from '../user/Login';
import Signup from '../user/Signup';
import Profile from '../user/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import {Layout, notification} from 'antd';
import ShoppingcartList from "../business/ShoppingcartList";
import ProductList from "../business/ProductList";
import OrdersHistoryList from "../business/OrderHistoryList";
import EditorProductPage from "../business/EditorProductPage";
import CurrentInventoryPage from '../business/CurrentInventoryPage'

const {Content} = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 1,
        });
    }

    loadCurrentUser() {


        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                console.log("App", response)
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {

        if (!existTOKEN()) {
            let redirectTo = "/login"
            this.props.history.push(redirectTo);
        } else {
            this.loadCurrentUser();
        }


    }

    handleLogout(redirectTo = "/login", notificationType = "success", description = MSG_LOGOUT) {

        removeTOKEN()
        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: MSG_APP_TITLE,
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: MSG_APP_TITLE,
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <Layout className="app-container">
                <AppHeader isAuthenticated={this.state.isAuthenticated}
                           currentUser={this.state.currentUser}
                           onLogout={this.handleLogout}/>

                <Content className="app-content">
                    <div className="container">
                        <Switch>

                            <Route exact path="/"
                                   render={(props) => <OrdersHistoryList isAuthenticated={this.state.isAuthenticated}
                                                                         currentUser={this.state.currentUser}
                                                                         handleLogout={this.handleLogout} {...props} />}>

                            </Route>
                            <Route path="/polllist"
                                   render={(props) => <PollList isAuthenticated={this.state.isAuthenticated}
                                                                currentUser={this.state.currentUser}
                                                                handleLogout={this.handleLogout} {...props} />}>
                            </Route>
                            <Route path="/login"
                                   render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                            <Route path="/signup" component={Signup}></Route>
                            <Route path="/users/:username"
                                   render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                               currentUser={this.state.currentUser} {...props}  />}>
                            </Route>
                            <Route path="/productList"
                                   render={(props) => <ProductList isAuthenticated={this.state.isAuthenticated}
                                                                   currentUser={this.state.currentUser}
                                                                   handleLogout={this.handleLogout} {...props} />}>

                            </Route>
                            <Route path="/shoppingcartList"
                                   render={(props) => <ShoppingcartList isAuthenticated={this.state.isAuthenticated}
                                                                        currentUser={this.state.currentUser}
                                                                        handleLogout={this.handleLogout} {...props} />}>

                            </Route>
                            <Route path="/inventoryList"
                                   render={(props) => <CurrentInventoryPage isAuthenticated={this.state.isAuthenticated}
                                                                        currentUser={this.state.currentUser}
                                                                        handleLogout={this.handleLogout} {...props} />}>

                            </Route>
                            <Route path="/EditorProductPage"
                                   render={(props) => <EditorProductPage isAuthenticated={this.state.isAuthenticated}
                                                                        currentUser={this.state.currentUser}
                                                                        handleLogout={this.handleLogout} {...props} />}>

                            </Route>

                            <PrivateRoute authenticated={this.state.isAuthenticated} path="/poll/new"
                                          component={NewPoll} handleLogout={this.handleLogout}></PrivateRoute>
                            <Route component={NotFound}></Route>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
