import React from 'react'
import {getCurrentInvoentoryList} from "../util/APIUtils";
import {notification} from "antd/lib/index";
import {MSG_APP_TITLE} from "../constants";
import {withRouter} from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {formatDate,formatDateTime} from "../util/Helpers"


class CurrentInventoryPage extends React.Component{


    constructor(props) {
        super(props)
        this.state = {data: []}
    }

    componentDidMount() {

        if (this.props.isAuthenticated) {
            console.log("CurrentInventoryPage componentDidMount")
            getCurrentInvoentoryList().
            then(response => {
                console.log(response)
                this.setState({data: response})

            }).catch(error => {
                if(error.status == 403){
                    notification.error({
                        message: MSG_APP_TITLE,
                        description: 'Sorry! This action need to be authorized '
                    });
                }
            });
        }
    }


    render() {

        return (

            <div>
                <h1>Inventory List:</h1>
                <ReactTable
                    data={this.state.data}
                    noDataText="This inventory is empty !"
                    columns={
                        [
                            {
                                Header: 'Product ID',
                                accessor: 'productId',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: 'Product name',
                                accessor: 'name',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        {row.value}
                                    </div>
                                )
                            },
                            {
                                Header: 'Item amount',
                                accessor: 'amount',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: 'Update by',
                                accessor: 'updatedBy',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: 'latest update at',
                                accessor: 'updatedAt',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        {formatDateTime(row.value)}
                                    </div>
                                )
                            }

                        ]
                    }
                    defaultPageSize={10}
                    className="-striped -highlight"


                />
                <br/>

            </div>


        )
    }



}


export default withRouter(CurrentInventoryPage)