import React from 'react';
import {connect} from 'react-redux';
import {Well, Col, Row, Button, Image} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {addToCart,updateCart} from '../../actions/cartAction';

class ProductItem extends React.Component{
    handleCart()
    {
        const product = [...this.props.cart, {
            _id:this.props._id,
            title: this.props.title,
            description:this.props.description,
            images:this.props.images,
            price:this.props.price,
            quantity:1
        }]
        //check if the cart is empty
        if(this.props.cart.length > 0)
        {
            //cart is not empty
            let _id = this.props._id;
            let cartIndex =this.props.cart.findIndex(function(cart){
                return cart._id === _id
            })
            if(cartIndex == -1)
            {
                this.props.addToCart(product);
            } 
            else
            {
                this.props.updateCart(_id, 1, this.props.cart);
            }
        } 
        else{
            //cart is empty
            this.props.addToCart(product);
        }
    }
    render(){
        return(
            <Well bsSize="large">
                <Row>
                    <Col xs={12} sm={12}>
                        <Image src={this.props.images} responsive style={{height:"137px"}}/>
                    </Col>
                    <Col xs={6} sm={12}>
                        <h6>{this.props.title}</h6>
                        <p>{this.props.description}</p>
                        <h6>INR {this.props.price}</h6>
                        <Button onClick={this.handleCart.bind(this)} bsStyle="info">Buy Now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({addToCart:addToCart,updateCart:updateCart}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);