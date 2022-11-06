import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Products = ({ category, filters, sort }) => {
  // console.log(filters)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        )
        setProducts(res.data)
      } catch (error) {

      }
    }
    getProducts()
  }, [category])

  useEffect(() => {
    category && setFilteredProducts(
      products.filter(item => Object.entries(filters).every(([key, value]) =>{
        let lower = item[key].map((i) => i.toLowerCase())
        // console.log(lower)
        return lower.includes(value.toLowerCase())
      }))
    )
  }, [products, category, filters])

  useEffect(() => {
    if (sort==="newest") {
      setFilteredProducts(previous =>
        [...previous].sort((a, b) => a.createdAt - b.createdAt)  
      )
    } else if (sort==="asc") {
      setFilteredProducts(previous =>
        [...previous].sort((a, b) => a.price - b.price)  
      )
    } else if (sort==="desc") {
      setFilteredProducts(previous =>
        [...previous].sort((a, b) => b.price - a.price)  
      )
    }
  }, [sort])

  return (
    <Container>
      {category
        ? filteredProducts.map(item => <Product item={item} key={item.id} />)
        : products.slice(0,8).map(item => <Product item={item} key={item.id} />
      )}
    </Container>
  )
}

export default Products