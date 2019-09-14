import React, {Component} from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
const columns = [{
    dataField: 'id',
    text: 'Id'
  }, {
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'username',
    text: 'User Name'
  }, 
  {
    dataField: 'email',
    text: 'Email',
    validator: (newValue, row, column) => {
      if (!newValue) {
        return {
          valid: false,
          message: 'Email cannot be null'
        };
      }
      if (!newValue.includes("@")) {
        return {
          valid: false,
          message: 'Email Should have @ sign'
        };
      }
      return true;
    }
  }];



export default class App extends Component{
  render() {
    return (
        <div>
        <BootstrapTable
        keyField="id"
        data={ this.state.users }
        columns={ columns }
        cellEdit={ cellEditFactory({
          mode: 'click',
          blurToSave: true
        }) }
      />


        </div>)
}

state = {
    users: []
};

componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
            this.setState({ users: data })
        })
        .catch(console.log)
}
}
