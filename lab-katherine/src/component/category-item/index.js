import './_category-item.scss'
import React from 'react'
import CategoryForm from '../category-form'
import {connect} from 'react-redux'
import * as category from '../../action/category.js'
import ExpenseForm from '../expense-form'
import ExpenseItem from '../expense-item'
import * as expense from '../../action/expense.js'
import faker from 'faker'
import * as util from '../../lib/util.js'
import DropZone from '../drop-zone'

class CategoryItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {editing: false}
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(category){
    this.props.categoryUpdate(category)
    this.setState({editing: false})
  }

  componentWillMount(){
    this.props.expenseCreate({name: faker.lorem.words(2) , price: faker.random.number() , categoryID: this.props.category.id})
    this.props.expenseCreate({name: faker.lorem.words(2) , price: faker.random.number() , categoryID: this.props.category.id})
    this.props.expenseCreate({name: faker.lorem.words(2) , price: faker.random.number() , categoryID: this.props.category.id})
    this.props.expenseCreate({name: faker.lorem.words(2) , price: faker.random.number() , categoryID: this.props.category.id})
  }

  render(){
    let {
      category,
      categoryDestroy,
      categoryUpdate,
      expenseCreate,
      expenseUpdateCategory,
      expenses,
    } = this.props

    let {editing} = this.state
    let categoryExpenses = expenses[category.id]

    return (
      <div className='category-item'>
        <DropZone onComplete={(expense) => expenseUpdateCategory(expense, category.id)}>
          {util.renderIf(!editing,
            <div>
              <h2 onDoubleClick={() => this.setState({editing: true})}> {category.name} </h2>
              <p onDoubleClick={() => this.setState({editing: true})}> ${category.budget} </p>
              <button className='delete' onClick={() => categoryDestroy(category)}> delete </button>
            </div>
          )}

          {util.renderIf(editing,
            <CategoryForm category={category} onComplete={this.handleUpdate} />)}

          <ExpenseForm category={category} onComplete={expenseCreate}/>

          <main className='expense-container'>
            {categoryExpenses.map((expense, i) =>
              <ExpenseItem expense={expense} key={i} />
            )}
          </main>
        </DropZone>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  expenses: state.expenses,
})

let mapDispatchToProps = (dispatch) => ({
  categoryUpdate: (data) => dispatch(category.update(data)),
  categoryDestroy: (data) => dispatch(category.destroy(data)),
  expenseCreate: (data) => dispatch(expense.create(data)),
  expenseUpdateCategory: (data, categoryID) => dispatch(expense.updateCategoryID(data, categoryID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)
