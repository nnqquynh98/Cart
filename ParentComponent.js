import React from 'react'
import './style.css'
// import {Product} from './Product'
import { Button } from 'antd'
import { MinusOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons'


class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      amount: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    // e.preventDefault()
    console.log('a')
    this.props.onSubmit({
      ...this.state
    })
  }

  render() {
    return (
      <form>
        <table>
          <tbody>
            <tr>
              <td> Product name </td>
              <td>
                <input type='text' name='name' value={this.state.name} onChange={e => this.handleChange(e)}></input>
              </td>
            </tr>
            <tr>
              <td> Price </td>
              <td>
                <input type='number' name='price' value={this.state.price} onChange={e => this.handleChange(e)}></input>
              </td>
            </tr>
            <tr>
              <td> Amount </td>
              <td>
                <input type='number' name='amount' value={this.state.amount} onChange={e => this.handleChange(e)}></input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td className='submit'>
                <Button className='add-to-cart' type='submit' onClick={() => this.handleSubmit()}>Add to cart</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

class Cart extends React.Component {


  render() {
    console.log('props', this.props.data)
    return (
      <React.StrictMode>
        <form action='#' method='post'>
          <table>
            <thead>
              <tr className='menu'>
                <th>Order number</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Total</th>
                <th> Delete </th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((each, index) => (
                <tr key={each.id}>
                  <td>{index + 1}</td>
                  <td>{each.name}</td>
                  <td>
                    <Button icon={<MinusOutlined />} onClick={() =>this.props.onDownAmount(each.id)}></Button>
                    {each.amount}
                    <Button icon={<PlusOutlined />} onClick={() => this.props.onUpAmount(each.id)}></Button>
                  </td>
                  <td>{each.price} $ </td>
                  <td>{each.price * each.amount} $</td>
                  <td><Button icon={<CloseOutlined />} onClick={() => this.props.onDelete(each.id)}></Button></td>
                </tr>
              )
              )}
              <tr>
                <td>Total: {
                  this.props.data.reduce((total, each) => total + each.price * each.amount, 0)
                }$</td></tr>
            </tbody>
          </table>
        </form>
      </React.StrictMode>
    )
  }
}

export default class ParentComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  handleUpAmount(itemId) {
    this.setState({
      data: this.state.data.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            amount: parseInt(item.amount) + 1
          }
        }
        return item
      })
    })
  }

  handleDownAmount(itemId) {
    this.setState({
      data: this.state.data.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            amount: parseInt(item.amount) - 1
          }
        }
        return item
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Product onSubmit={inputData => this.setState({ data: [...this.state.data, { ...inputData, id: this.state.data.length + 1 }] })} />
        <Cart data={this.state.data}
          onDelete={id => this.setState({ data: this.state.data.filter(each => each.id !== id) })}
          onUpAmount={id => this.handleUpAmount(id)}
          onDownAmount={id => this.handleDownAmount(id)}
        />
      </React.Fragment>
    )
  }
}