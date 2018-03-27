import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProduct} from '../../actions/productActions';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import ProductItem from './productItem';
import ProductForm from './productForm';
import Cart from './cart';

class ProductList extends React.Component{
    componentDidMount()
    {
        this.props.getProduct();
    }
    render(){
       const products = this.props.books.map(function(bookArr){
        return(
        <Col xs={12} sm={6} md={4} key={bookArr._id}>
            <ProductItem 
            _id={bookArr._id}
            title={bookArr.title}
            description={bookArr.description}
            images={bookArr.images}
            price={bookArr.price}
            />
        </Col>
        )
       });
        return(
            <Grid>
                <Row>
                    <Cart />
                </Row>
                
                <Row style={{marginTop:'15px'}}>
                {products}
                </Row>
            </Grid>
        );
    }
}
function mapStateToProps(state)
{
    return{
        books: state.books.books
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({getProduct:getProduct}, dispatch)
}
// component is subscribing to the store
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);