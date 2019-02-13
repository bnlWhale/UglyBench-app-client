import React, {Component} from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import ItemNumAjust from '../common/ItemNumAjust';
import Link from "react-router-dom/es/Link";
import {getProductList} from '../util/APIUtils';
import {withRouter} from 'react-router-dom';

const subColumns = [
    {
        Header: "Name",
        columns: [
            {
                Header: "Manufacturer",
                accessor: "manufacturer"
            },
            {
                Header: "Weight",
                id: "weight",
                accessor: d => d.weight
            }
        ]
    },
    {
        Header: "Info",
        columns: [
            {
                Header: "Color",
                accessor: "color"
            },
            {
                Header: "Model Num",
                accessor: "model_num"
            }
        ]
    },
    {
        Header: "Stats",
        columns: [
            {
                Header: "Weight Units",
                accessor: "weight_units"
            }
        ]
    }
];


class ProductList extends React.Component {


    constructor(props) {
        super(props)
        this.state = {data: []}
    }


    componentDidMount() {

        if (this.props.isAuthenticated) {
            console.log("ProductList componentDidMount")
            getProductList()
                .then(response => {
                    this.setState({data: response});
                }).catch(error => {

            });
        }


        /*
        axios.get('/api/getAllProduct')
            .then(res => {
                console.log('componentDidMount ',res.data);
                this.setState({data:res.data});
                let subComponentData = []
                this.setSubComponentData(res.data,subComponentData);
                this.setState({subData:subComponentData});
                //console.log(subComponentData)
            })
            .catch(function (error) {
                // handle error
                console.log("ProductTablePage show error:", error);
            });
            */
    }

    setSubComponentData(data, newData) {
        const a = data.map(
            (val, idx) => {

                //console.log("map:",idx,val['description'])
                //newData.push({'details':val['details'], 'brief':val['description']})
                newData.push(val['details'])
            }
        )
    }


    onDeleteClick() {


    }

    onUpdateNum(){

    }

    render() {

        return (

            <div>
                <h1>Poduct List</h1>
                <ReactTable
                    data={this.state.data}
                    columns={
                        [
                            {
                                Header: 'Name',
                                columns: [
                                    {
                                        Header: 'Name',
                                        accessor: 'name',
                                        Cell: row => (
                                            <div style={{textAlign: 'center'}}>
                                                <Link to={{ pathname: '/EditorProductPage', state: { info: row.original} }}>{row.value}</Link>
                                            </div>
                                        ),
                                    },
                                    {
                                        Header: 'Description',
                                        id: 'description',
                                        minHeigh:50,
                                        accessor: d => d.description
                                    }]
                            },


                            {
                                Header: 'Info',
                                columns: [{
                                    Header: 'Shopping Cart',
                                    accessor: 'sku',
                                    Cell: row => (
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: '#dadada',
                                                borderRadius: '2px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <ItemNumAjust refRow={row.original} updateNum={this.onUpdateNum}/>
                                        </div>
                                    )
                                },
                                    {
                                        Header: 'Price',
                                        accessor: 'pricing',
                                        Cell: row => (
                                            <div style={{textAlign: 'center'}}>
                                                {row.value.retail}
                                            </div>
                                        ),
                                    },
                                    {
                                        Header: 'Status SKU',
                                        accessor: 'sku',
                                        Cell: row => (
                                            <span>
                                    <span style={{
                                        color: row.value === 'relationship' ? '#ff2e00'
                                            : row.value === 'complicated' ? '#ffbf00'
                                                : '#57d500',
                                        transition: 'all .3s ease'
                                    }}>
                                      &#x25cf;
                                    </span> {
                                                row.value === 'relationship' ? 'In a relationship'
                                                    : row.value === 'complicated' ? `It's complicated`
                                                    : 'SKU ' + row.value
                                            }
                                     </span>
                                        )
                                    }
                                ]
                            }]}
                    defaultPageSize={10}
                    className="-striped -highlight"

                    SubComponent={row => {

                        let subContent= []
                        let subKey;
                        for(subKey in row.original.details) {
                            subContent.push({detail:subKey + '\xa0\xa0'+ row.original.details[subKey]})
                        }
                        console.log("sub component table data:", row.original.details,subContent)
                        let subData = [{detail:subContent}]
                        return (
                            <div style={{padding: "5px"}}>
                                <em>
                                    more details about this item
                                </em>
                                <br/>
                                <ReactTable
                                    data={subContent}
                                    columns={
                                        [
                                            {
                                                accessor: 'detail',
                                                Cell: row => (
                                                    <div style={{textAlign: 'left'}}>
                                                        {row.value}
                                                    </div>
                                                ),
                                            },

                                        ]
                                    }
                                    defaultPageSize={subContent.length}
                                    showPagination={false}
                                />
                            </div>
                        );
                    }}

                />
                <br/>

            </div>


        )
    }
}

export default ProductList