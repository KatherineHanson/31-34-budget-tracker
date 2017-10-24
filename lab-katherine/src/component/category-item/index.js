import React from 'react'
import CategoryForm from '../category-form'
import {connect} from 'react-redux'
import * as category from '../../action/category.js'

class CategoryItem extends React.Component {
  render(){
    let {category, categoryDestroy, categoryUpdate} = this.props

    return (
      <li className='category-item'>
        <p><strong>{category.name}</strong></p>
        <p>${category.amount}</p>
        <button onClick={() => categoryDestroy(category)}> X </button>

          <h1> Update </h1>
          <CategoryForm onComplete={categoryUpdate} category={category}/>
      </li>
    )
  }
}

let mapStateToProps = (state) => ({})

let mapDispatchToProps = (dispatch) => ({
  categoryUpdate: (data) => dispatch(category.update(data)),
  categoryDestroy: (data) => dispatch(category.destroy(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)
