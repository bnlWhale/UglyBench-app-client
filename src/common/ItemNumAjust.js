import React from 'react';
import { Button, Icon, Tooltip} from 'antd'
import PropTypes from "prop-types";
import {addIntoShoppingcart} from "../util/APIUtils";
import {notification} from "antd/lib/index";
import {MSG_APP_TITLE} from '../constants';


class ItemNumAjust extends React.Component {


    constructor(props) {
        super(props)
        if(this.props.refRow.hasOwnProperty("num")){
            this.state = {num:this.props.refRow.num}
        }else{
            this.state = {num:0}
        }

        this.handleClickPlus = this.handleClickPlus.bind(this);
        this.handleClickMinus = this.handleClickMinus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log('ItemNumAjust', props)

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 1,
        });
    }

    handleClickPlus(e) {
        e.preventDefault()
        this.setState( (prevState) => ({
            num:prevState.num+1
        }))
        this.sendRequest(1);
        this.props.updateNum(this.props.refRow.price)
    }

    handleClickMinus(e) {
        e.preventDefault()
        this.setState( (prevState) => {
            if(prevState.num>0){
                this.sendRequest(-1);
                this.props.updateNum(-1*this.props.refRow.price)
                return { num:prevState.num-1}

            }
        })

    }

    sendRequest(quantity){

        const ShoppingcartRequest = {
              id:this.props.refRow.id,
              quantity:quantity,
              name:this.props.refRow.name
        }

        addIntoShoppingcart(ShoppingcartRequest)
            .then(response => {
                console.log(response)
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

    componentDidMount() {

        console.log('ItemNumAjust componentDidMount')
    }
    componentWillUnmount(){
        //console.log('ItemNumAjust componentWillUnmount')
    }

    handleChange(e){

        e.preventDefault()
        if (e.target.value.match(/^\d*$/)) {
            this.setState({ num: e.target.value });
        }
    }

    render() {
        //console.log("ItemNumAjust",this.props.refRow.name)
        let strName = this.props.refRow.name
        return (
            <div>
                <Tooltip title={strName}>
                    <Icon type="shopping-cart" theme="twoTone" style={{ color: '#08c' }}></Icon> &nbsp;
                </Tooltip>
                <Button size="small"  icon="up" onClick={this.handleClickPlus}></Button>
                <input type="text" style={{width: 30, textAlign:'center', color:'blue'}} placeholder="0"
                        value={this.state.num} onChange={this.handleChange}/>
                <Button size="small" icon="down" onClick={this.handleClickMinus}></Button>
            </div>
        )

    }

};

ItemNumAjust.propTypes = {
    refRow:PropTypes.object.isRequired,
    updateNum:PropTypes.func.isRequired
}

export default ItemNumAjust