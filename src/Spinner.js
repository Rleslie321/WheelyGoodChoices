// Robert Leslie
// 2021
// wheel decider

// https://codesandbox.io/s/github/hadriengerard/spinning-wheel-game-react?file=/src/components/wheel/index.js updated from this source

import React, { Component } from 'react';
import './App.css';

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        };
    }

    // unused see spin and reset
    // selectItem = () => {
    //     if (this.state.selectedItem === null) {
    //         const selectedItem = Math.floor(Math.random() * this.props.items.length);
    //         if (this.props.onSelectItem) {
    //             this.props.onSelectItem(selectedItem);
    //         }
    //         this.setState({ selectedItem });
    //         setTimeout(this.update, 4000);
    //     } else {
    //         this.setState({ selectedItem: null });
    //         setTimeout(this.update, 500);
    //         setTimeout(this.selectItem, 500);
    //     }
    // }


    // "spins" the wheel only if there are choices to choose from
    // it does this by selecting a random number from our array and then updating our state
    //this forces a rerender of our component and updates css variables
    // also calls update after four seconds to show the result
    spin = () => {
        if(this.props.items.length === 0){
            return
        }
        if (this.state.selectedItem === null) {
            const selectedItem = Math.floor(Math.random() * this.props.items.length);
            this.setState({ selectedItem });
            setTimeout(this.update, 4000);
        }
    }

    // resets the button to spin, and the spinner back to the starting position
    // as well as updating the current value displayed
    reset = () => {
        this.setState({ selectedItem: null });
        setTimeout(this.update, 500);
    }

    // updates the current value displayed
    update = () => {
        const display = document.querySelector("#display");
        let currItem = this.props.items[this.state.selectedItem];
        let updater = "";
        if(currItem !== undefined){
            updater = currItem.cat;
        }
        display.innerHTML = updater;
    }

    render() {
        const { selectedItem } = this.state;
        const items = this.props.items;

        const wheelVars = {
            '--nb-item': items.length,
            '--selected-item': selectedItem,
        };
        const spinning = selectedItem !== null ? 'spinning' : '';

        return (
            <div className="spinner">
                <div className="wheel-container">
                    <div className={`wheel ${spinning}`} style={wheelVars}>
                        {items.map((item, index) => (
                            item.display && <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                                {item.cat}
                            </div>
                        ))}
                    </div>
                </div>
                {spinning ? (
                    <button type="button" id="reset" onClick={this.reset}>
                        reset
                    </button>
                ) : (
                    <button type="button" id="spin" onClick={this.spin}>
                        spin
                    </button>
                )}
                <p>Current Selection: <span id="display"></span></p>
            </div>
            
        );
    }
}


export default Spinner;
