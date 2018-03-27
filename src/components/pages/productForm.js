import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postProduct,deleteProduct,getProduct, resetButton} from '../../actions/productActions';
import axios from 'axios';

class ProductForm extends React.Component{
    constructor() {
    super();
    this.state = {
      images:[{}],
      img:''
    }
  }
  componentDidMount(){
    this.props.getProduct();
    //GET IMAGES FROM API
    axios.get('/api/images')
      .then(function(response){
        this.setState({images:response.data});
      }.bind(this))
      .catch(function(err){
        this.setState({images:'error loading image files from the server', img:''})
      }.bind(this))
  }
    handleSave()
    {
        const product = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.image).value,
            price: findDOMNode(this.refs.price).value
        }];
        this.props.postProduct(product)
    }
    onDelete(){
        let productId = findDOMNode(this.refs.delete).value;
        this.props.deleteProduct(productId);
    }
    handleSelect(img){
        this.setState({
        img: '/images/'+ img
        })
    }
     resetForm(){
        //RESET THE Button
        this.props.resetButton();

        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({img:''});
    }
    render(){
        const productList = this.props.books.map(function(productArr){
            return(
                <option key={productArr._id}>{productArr._id}</option>
            );
        });
        const imgList = this.state.images.map(function(imgArr, i){
            return(
                <MenuItem key={i} eventKey={imgArr.name}
                onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
            )
        }, this)
        return(
            <Well>
                 <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <Panel.Body>
                            <InputGroup>
                                <FormControl type="text" ref="image" value={this.state.img} />
                                <DropdownButton
                                componentClass={InputGroup.Button}
                                id="input-dropdown-addon"
                                title="Select an image"
                                bsStyle="primary">
                                {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive/>
                        </Panel.Body>
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                    <Panel>
                        <Panel.Body> 
                        <FormGroup controlId="title">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl type="text" ref="title" placeholder="Enter Title" />
                        </FormGroup>
                        <FormGroup controlId="description">
                            <ControlLabel>Description</ControlLabel>
                            <FormControl type="text" ref="description" placeholder="Product Description" />
                        </FormGroup>
                        <FormGroup controlId="price">
                            <ControlLabel>Price</ControlLabel>
                            <FormControl type="text" ref="price" placeholder="Enter Price" />
                        </FormGroup>
                        <Button 
                        onClick={(!this.props.msg)?(this.handleSave.bind(this)):(this.resetForm.bind(this))}
                        bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
                        {(!this.props.msg)?("Save Product"):(this.props.msg)}
                        </Button>
                        </Panel.Body> 
                    </Panel>
                    <Panel>
                        <Panel.Body>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>select Book To Delete</ControlLabel>
                                <FormControl ref="delete" componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                    {productList}
                                </FormControl>
                            </FormGroup>
                            <Button bsStyle="danger" onClick={this.onDelete.bind(this)}>Delete Product</Button>
                        </Panel.Body> 
                    </Panel>
                    </Col>
                </Row>
            </Well>
        )
    }
}
function mapStateToProps(state)
{
    return{
        books: state.books.books,
        msg: state.books.msg,
        style:state.books.style
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({postProduct,deleteProduct,getProduct, resetButton}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);