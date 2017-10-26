import React from 'react'
import {connect} from 'react-redux'
import CategoryItem from '../category-item'
import CategoryForm from '../category-form'
import * as category from '../../action/category.js'

class Landing extends React.Component {
  componentWillMount(){
    this.props.categoryCreate({name: 'groceries', amount: 100})
    this.props.categoryCreate({name: 'clothes', amount: 100})
    this.props.categoryCreate({name: 'manga', amount: 1000})
  }

  render(){
    let {
      categories,
      categoryCreate,
    } = this.props

    return (
      <div className='landing'>
        <CategoryForm onComplete={categoryCreate} />
        <div className='category-container'>
          {categories.map((category, i) =>
            <CategoryItem key={i} category={category} />
          )}
        </div>
      </div>
      // <div className='landing'>
      //   <h1> landing Component </h1>
      //   <p> This is a budget-tracking app.</p>
      //   <p> One can use the app to track expenses within different categories. </p>
      // </div>
    )
  }
}

let mapStateToProps = (state) => ({
  categories: state.categories,
})

let mapDispatchToProps = (dispatch) => ({
  categoryCreate: (data) => dispatch(category.create(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
