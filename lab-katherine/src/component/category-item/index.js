import React from 'react'
import CategoryForm from '../category-form'
import {connect} from 'react-redux'
import * as category from '../../action/category.js'
import ExpenseForm from '../expense-form'
import ExpenseItem from '../expense-item'
import * as expense from '../../action/expense.js'
import faker from 'faker'
import * as util from '../../lib/util.js'

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
      expenses,
    } = this.props

    let {editing} = this.state
    let categoryExpenses = expenses[category.id]

    return (
      <div className='category-item'>
        {util.renderIf(!editing,
          <div>
            <h2 onDoubleClick={() => this.setState({editing: true})}> {category.name} </h2>
            <p onDoubleClick={() => this.setState({editing: true})}> {category.amount} </p>
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
      </div>
      // <div className='category-item'>
      //   <h1> Category Name and Budget </h1>
      //   <p><strong>{category.name}</strong></p>
      //   <p>${category.amount}</p>
      //   <button onClick={() => categoryDestroy(category)}> X </button>
      //
      //     <h2> Update Category </h2>
      //     <CategoryForm category={category} onComplete={categoryUpdate}/>
      //
      //     <h2> Log Expense </h2>
      //     <ExpenseForm category={category} onComplete={expenseCreate}/>
      //     {categoryExpenses.map((expense, i) =>
      //       <ExpenseItem expense={expense} key={i} />
      //     )}
      // </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)
