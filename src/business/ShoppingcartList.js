import React from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import ItemNumAjust from '../common/ItemNumAjust';
import Link from "react-router-dom/es/Link";
import {getShoppingcartOwnList} from '../util/APIUtils';
import {withRouter} from 'react-router-dom';
import {Input, Button, notification} from 'antd';
import {checkoutOnShoppingcart} from "../util/APIUtils";
import {MSG_APP_TITLE} from "../constants";


const {TextArea} = Input;

/*




 */

class ShoppingcartList extends React.Component {


    constructor(props) {
        super(props)
        this.state = {data: [], total: 0}
        this.showTotalCost = this.showTotalCost.bind(this)
        this.checkoutItems = this.checkoutItems.bind(this)
    }


    componentDidMount() {

        if (this.props.isAuthenticated) {
            console.log("ShoppingcartList componentDidMount")
            getShoppingcartOwnList()
                .then(response => {
                    console.log(response)
                    this.setState({data: response.items})
                    this.updateTotalCost()
                }).catch(error => {

            });
        }

    }

    updateTotalCost() {
        let items = this.state.data;
        let totalCost = 0;
        items.forEach(function (entry) {
            //console.log('aa',entry,totalCost);
            totalCost += entry.price * entry.itemQuantity
        })


        if (totalCost > 0) {
            this.setState({total: totalCost})
        }
    }

    showTotalCost(num) {
        let total = this.state.total;
        total += num;
        if (total >= 0) {
            this.setState({total: total})
        }

    }

    checkoutItems(e) {
        e.preventDefault()
        let total = this.state.total;
        if(total<=0){
            return
        }
        checkoutOnShoppingcart()
            .then(response => {
                console.log(response)
                this.setState({data: [], total: 0})
                notification.success({
                    message: MSG_APP_TITLE,
                    description: response.message,
                });
            }).catch(error => {
            notification.error({
                message: MSG_APP_TITLE,
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    render() {
        let costTotal = '$:' + this.state.total
        return (
            <div style={{display: 'block'}}>
                <h1> Your shopping cart:</h1>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px', marginBottom: '10px'}}>
                    <Button style={{marginRight: '10px'}} type="primary" onClick={this.checkoutItems}> check
                        out</Button>
                    <TextArea style={{width: '200px'}}
                              placeholder="total cost $:"
                              autosize={{minRows: 1, maxRows: 1}}
                              name="allCost"
                              width="200px"
                              value={costTotal}
                    >
                     </TextArea>
                </div>


                <ReactTable
                    data={this.state.data}
                    noDataText="This shopping cart is empty !"
                    columns={
                        [
                            {
                                Header: 'Name',
                                accessor: 'name',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        <Link to={'/issues'}> {row.value} </Link>
                                    </div>
                                ),
                            },
                            {
                                Header: 'Shopping Cart',
                                accessor: 'lastModified',
                                Cell: row => (
                                    <div style={{textAlign: 'center'}}>
                                        <ItemNumAjust refRow={
                                            {
                                                id: row.original.itemId,
                                                name: row.original.name,
                                                num: row.original.itemQuantity,
                                                price: row.original.price
                                            }

                                        } updateNum={this.showTotalCost}/>
                                    </div>
                                )
                            },
                            {
                                Header: 'Item Price',
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

export default withRouter(ShoppingcartList)