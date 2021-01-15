// Robert Leslie
// 2021
// wheel decider

import React, {Component} from 'react';
import Spinner from './Spinner';
import Categories from './Categories';

class App extends Component {
  constructor(){
    super();
    this.state = {
      things: [],//['Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas']
      displayed: []
    }
  }

  // called from component, given new category
  // appends cat to array then sets new state with updated value
  // it also sets a filtered array based on which is currently checked to be displayed
  handleSubmit = (cat) => {
      this.setState(prevState => {
        let ary = prevState.things;
        ary.push({cat, display:true})
        let filtered = ary.filter(item => {
          return item.display
        })
        return{
          things: ary,
          displayed: filtered
        }
      });
  }

  // called from component, given an index into things array
  // changes display value of current item then sets new state with updated value
  // it also sets a filtered array based on which is currently checked to be displayed
  hide = (index) => {
    this.setState(prevState => {
      let ary = prevState.things;
      ary[index].display = !ary[index].display;
      let filtered = ary.filter(item => {
        return item.display
      })
      return{
        things: ary,
        displayed: filtered
      }
    });
  }

  // called from component, given current index into things array
  // deletes item from things array then sets new state with updated value
  // it also sets a filtered array based on which is currently checked to be displayed
  delete = (index) => {
    this.setState(prevState => {
      let ary = prevState.things;
      ary.splice(index, 1);
      let filtered = ary.filter(item => {
        return item.display
      })
      return{
        things: ary,
        displayed: filtered
      }
    });
  }

  render(){
    return (
      <div>
        <h1 className="heading" style={{textAlign: "center"}}>Enter thingy in wheel:</h1>
        <main className="App">
          <Spinner items={this.state.displayed} />
          <Categories items={this.state.things} handleSubmit={this.handleSubmit} hide={this.hide} delete={this.delete}/>
        </main>
      </div>
      
    );
  }
  
}

export default App;
