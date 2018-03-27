import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart,addToCart, getCart} from '../../actions/cartAction';
import {Well,Panel,Row,Col,Button,ButtonGroup,Label,Modal} from 'react-bootstrap';

class Cart extends React.Component{
    componentDidMount()
    {
        this.props.getCart();
    }
    onDelete(_id)
    {
         const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex(      
        function(cart){        
            return cart._id === _id;      
        } );
        let new_after_delete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)] ;
        this.props.deleteCartItem(new_after_delete);
    }
    constructor(props)
    {
        super(props);
        this.state ={
            showModal:false
        }
    }
    handleClose()
    {
        this.setState(
            {
                showModal:false
            }
        );
    }
     handleOpen()
    {
        this.setState(
            {
                showModal:true
            }
        );
    }
    onIncreament(_id)
    {
        this.props.updateCart(_id, 1, this.props.cart);
    }
    onDecreament(_id,quantity)
    {
        if(quantity > 1)
        {
           this.props.updateCart(_id, -1, this.props.cart); 
        } 
    }
    render(){
        if(this.props.cart[0])
        {
            return this.renderCart()
        } else {
            return this.emptyCart()
        }
    }
    emptyCart(){
        return(
            <div></div>
        )
    }
    renderCart(){
        const cartItmeList = this.props.cart.map(function(cartArr){
            return(
                <Panel key ={cartArr._id}>
                    <Panel.Body>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>INR {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>Qnt <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button onClick={this.onDecreament.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                                <Button onClick={this.onIncreament.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                                <span>    </span>
                                <Button bsStyle="danger" onClick={this.onDelete.bind(this, cartArr._id)} bsSize="small">Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    </Panel.Body> 
                </Panel>
            )
        }, this)
        return(
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Cart</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {cartItmeList}
                    <Row>
                        <Col xs={12}>
                            <h6>Total Ammount:{this.props.totalAmount}</h6>
                            <Button bsStyle="success" onClick={this.handleOpen.bind(this)}>Proceed To Checkout</Button>
                        </Col>
                    </Row>
                    <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thank You !!!!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Your Order has beed saved</h4>
                            <p>You will receive a Confirmation Email</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Col xs={6}>
                                <h6>Total INR : {this.props.totalAmount}</h6>
                            </Col>
                            <Button onClick={this.handleClose.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Panel.Body> 
            </Panel>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({deleteCartItem:deleteCartItem,addToCart:addToCart,updateCart:updateCart,getCart:getCart}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);