import React from 'react'
import {connect} from 'react-redux'
import CategoryItem from '../category-item'
import CategoryForm from '../category-form'
import * as category from '../../action/category.js'

class Dashboard extends React.Component {
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
      <div className='dashboard'>
        <CategoryForm onComplete={categoryCreate} />
        <div className='category-container'>
          {categories.map((category, i) =>
            <CategoryItem key={i} category={category} />
          )}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  categories: state.categories,
})

let mapDispatchToProps = (dispatch) => ({
  categoryCreate: (data) => dispatch(category.create(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
