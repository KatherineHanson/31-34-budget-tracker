import React from 'react'
import {connect} from 'react-redux'
import ExpenseForm from '../expense-form'
import * as expense from '../../action/expense.js'
import * as util from '../../lib/util.js'

class Expense extends React.Component {
  constructor(props){
    super(props)
    this.state = {editing: false}
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(expense){
    this.props.expenseUpdate(expense)
    this.setState({editing: false})
  }

  render(){
    let {
      expense,
      expenseDestroy,
      expenseUpdate,
    } = this.props

    let {editing} = this.state
    return (
      <div className='expense-item'>
        <button className='delete' onClick={() => expenseDestroy(expense)}> delete </button>

        <main onDoubleClick={() => this.setState({editing: true})}>
          {util.renderIf(!editing, <p > {expense.name} </p>)}
          {util.renderIf(!editing, <p > ${expense.price} </p>)}
          {util.renderIf(editing,
            <ExpenseForm expense={expense} onComplete={this.handleUpdate} />)}
        </main>
      </div>
      // <div className='expense-item'>
      //   <p> {expense.name} </p>
      //   <p> ${expense.price} </p>
      //   <button onClick={() => expenseDestroy(expense)}> delete </button>
      //   <ExpenseForm expense={expense} onComplete={expenseUpdate} />
      // </div>
    )
  }
}

let mapStateToProps = (state) => ({})
let mapDispatchToProps = (dispatch) => ({
  expenseDestroy: (data) => dispatch(expense.destroy(data)),
  expenseUpdate: (data) => dispatch(expense.update(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Expense)
