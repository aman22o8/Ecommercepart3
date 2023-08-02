import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    this.getallproduct()
  }

  getallproduct = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.products.map(eachproduct => ({
        brand: eachproduct.brand,
        price: eachproduct.price,
        id: eachproduct.id,
        imageUrl: eachproduct.image_url,
        rating: eachproduct.rating,
        title: eachproduct.title,
      }))
      this.setState({productsList: updatedData})
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
