import React from 'react';
import { User } from './data/user';

import { Profile } from './components/Profile';
import TodoList from './components/TodoList';
import './App.css';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core'


const theme = createMuiTheme({
  palette: {
    primary: { main: '#460ad9' },
    secondary: { main: '#65c46b' },
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: User, // null
      current_list_id: 0,
      is_adding_new_todo: false,
      list: []
    }
    this.getListHandler = this.getListHandler.bind(this);
    this.setCheckboxHandler = this.setCheckboxHandler.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onInputKeyPress = this.onInputKeyPress.bind(this);
    this.handleAddNewItem = this.handleAddNewItem.bind(this);
  }

  getUser() {
    this.setState((prevState, props) => ({
      ...prevState,
      user: User
    }));
  }

  getCopyOfList() {
    return JSON.parse(JSON.stringify(this.state.list));
  }

  updateList(list) {
    this.setState((prevState) => ({
      ...prevState,
      list: list,
      is_adding_new_todo: false
    }));
  }

  getListHandler(list_id) {
    // get list (if multiple lists)
    const list = this.state.user.lists.filter(list => list.id === list_id);
    if (list)
      this.setState((prevState) => ({
        ...prevState,
        current_list_id: list_id,
        list: list[0]
      }));
  }

  deleteItem(idx) {
    let newList = this.getCopyOfList();
    newList.data = newList.data.filter((item, index) => index !== idx);
    this.updateList(newList);
  }

  setCheckboxHandler(idx) {
    // deep clone
    let newList = this.getCopyOfList();

    // get item to udpate
    let item = newList.data[idx];
    item.is_completed = !item.is_completed;
    newList.data.splice(idx, 1, item);
    this.updateList(newList);
  }

  addNewItem(new_todo_str) {
    let newList = this.getCopyOfList();

    newList.data.push({
      is_completed: false,
      label: new_todo_str
    });

    this.updateList(newList);
  }

  onInputKeyPress(e) {
    if (e.key === "Enter") {
      this.addNewItem(e.target.value);
    }
  }

  handleAddNewItem() {
    this.setState((prevState) => ({
      ...prevState,
      is_adding_new_todo: true
    }));

  }

  componentDidMount() {
    this.getUser();
    this.getListHandler('1')
  }

  render() {

    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Container maxWidth={"md"}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Profile user={this.state.user} getListHandler={this.getListHandler} />
              </Grid>
              <Grid item xs={7}>
                {
                  this.state.list ?
                    <TodoList
                      list={this.state.list}
                      deleteItem={this.deleteItem}
                      setCheckboxHandler={this.setCheckboxHandler}
                      onInputKeyPress={this.onInputKeyPress}
                      handleAddNewItem={this.handleAddNewItem}
                      is_adding_new_todo={this.state.is_adding_new_todo} />
                    : null
                }
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
