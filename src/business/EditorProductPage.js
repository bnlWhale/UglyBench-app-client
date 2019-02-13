import React from 'react';
import {Form, Input, Button, notification, Icon} from 'antd';
import {NAME_MIN_LENGTH, DESC_MAX_LENGTH, MSG_APP_TITLE} from "../constants";
import {withRouter} from "react-router-dom";
import {editorProduct} from '../util/APIUtils'

const FormItem = Form.Item;
const {TextArea} = Input;

class EditorProductPage extends React.Component {


    constructor(props) {
        super(props)
        console.log('aaa',props);
        if(props.hasOwnProperty('location') && props.location.hasOwnProperty('state') &&
            (props.location.state!=null) && props.location.state.hasOwnProperty('info')){

            const {info} = props.location.state
            this.state = {
                itemId: {
                    value: info.id
                },
                productName: {
                    value: info.name
                },
                description: {
                    value: info.description
                },
                quantity: {
                    value: ''
                },
                price: {
                    value: info.pricing.retail
                }

            }
            console.log('EditorProductPage',this.state);
        }else{
            this.state = {
                itemId: {
                    value: 'no_id'
                },
                productName: {
                    value: ''
                },
                description: {
                    value: ''
                },
                quantity: {
                    value: ''
                },
                price: {
                    value: ''
                }

            }
        }



        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const editorRequest = {
            id: this.state.itemId.value,
            productName: this.state.productName.value,
            description: this.state.description.value,
            quantity: this.state.quantity.value,
            price: this.state.quantity.value
        };
        editorProduct(editorRequest)
            .then(response => {
                console.log(response)
                notification.info({
                    message: MSG_APP_TITLE,
                    description: 'This product had been modified successfully '
                });
                this.props.history.push("/productList");
            }).catch(error => {
            if(error.status == 403){
                notification.error({
                    message: MSG_APP_TITLE,
                    description: 'Sorry! This action need to be authorized '
                });
            }

        });
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });

    }


    validateName = (name) => {

        if (name.length < NAME_MIN_LENGTH) {

            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > DESC_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${DESC_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    isFormInvalid() {
        return !(this.state.productName.validateStatus === 'success' &&
            this.state.description.validateStatus === 'success' &&
            this.state.quantity.validateStatus === 'success'
        );
    }

    validateNumber = (name) => {

        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if (!Number.isNaN(name) && reg.test(name)) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        } else {
            return {
                validateStatus: 'error',
                errorMsg: 'Please input a number'
            }
        }
    }

    render() {

        return (
            <div>
                <h1>Editor of Product</h1>
                <Form style={{marginTop: '30px'}} onSubmit={this.handleSubmit}>

                    <FormItem
                        label="Product's Name"
                        validateStatus={this.state.productName.validateStatus}
                        help={this.state.productName.errorMsg}
                    >
                        <Input
                            size="large"
                            name="productName"
                            autoComplete="off"
                            placeholder="product's name"
                            value={this.state.productName.value}
                            onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                    </FormItem>

                    <FormItem
                        label="Description"
                        validateStatus={this.state.description.validateStatus}
                        help={this.state.description.errorMsg}
                    >
                        <TextArea
                            size="large"
                            name="description"
                            autoComplete="off"
                            placeholder="Product's description:"
                            value={this.state.description.value}
                            autosize={{minRows: 4, maxRows: 6}}
                            onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                    </FormItem>
                    <FormItem
                        label="Product's quantity"
                        validateStatus={this.state.quantity.validateStatus}
                        help={this.state.quantity.errorMsg}
                    >
                        <Input
                            size="large"
                            name="quantity"
                            autoComplete="off"
                            placeholder="Product's quantity in the inventory"
                            value={this.state.quantity.value}
                            onChange={(event) => this.handleInputChange(event, this.validateNumber)}/>
                    </FormItem>
                    <FormItem
                        label="Product's price"
                        validateStatus={this.state.price.validateStatus}
                        help={this.state.price.errorMsg}
                    >
                        <Input
                            size="large"
                            name="price"
                            autoComplete="off"
                            placeholder="Product's price"
                            value={this.state.price.value}
                            onChange={(event) => this.handleInputChange(event, this.validateNumber)}/>
                    </FormItem>
                    <FormItem style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button type="primary"
                                htmlType="submit"
                                size="large"

                                disabled={this.isFormInvalid()}>Modify</Button>
                    </FormItem>
                </Form>


            </div>


        )


    }

}

export default withRouter(EditorProductPage)