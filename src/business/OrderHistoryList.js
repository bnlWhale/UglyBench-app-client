import React from 'react'
import {withRouter} from "react-router-dom";
import {getOrdersHistoryList} from "../util/APIUtils";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {formatDate,formatDateTime} from "../util/Helpers"


class OrdersHistoryList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {data: []}
    }


    componentDidMount() {

        if (this.props.isAuthenticated) {
            console.log("OrdersHistoryList componentDidMount")
            getOrdersHistoryList()
                .then(response => {
                    //console.log(response)
                    let arr = []
                    this.processOrderdata(response, arr)
                    this.setState({data: arr})
                }).catch(error => {

            });
        }
    }

    processOrderdata(items,arrData){

        items.forEach(function (entry1) {
            let subItem = entry1['line_items']
            let index = 0;
            subItem.forEach(function(entry2){
                let aObj = {}
                aObj['name'] = entry2.name
                aObj['price'] = entry2.pricing.retail
                aObj['quantity'] = entry2.quantity
                aObj['orderDate']=''
                if(index===0){
                    aObj['orderDate'] = formatDateTime(entry1['createdAt'])
                }
                arrData.push(aObj)
                index++

            })
        })


    }


    render() {

        return (

            <div style={{marginTop:'30px'}}>
                <h1>Your orders:</h1>
                <ReactTable
                    data={this.state.data}
                    columns={
                        [
                            {
                                Header: 'Date of order',
                                accessor: 'orderDate',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: "Item's name",
                                accessor: 'name',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        {row.value}
                                    </div>
                                )
                            },
                            {
                                Header: 'Quantity',
                                accessor: 'quantity',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: 'Single Price',
                                accessor: 'price',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        {row.value}
                                    </div>
                                ),
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

export default withRouter(OrdersHistoryList)