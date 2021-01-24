// Robert Leslie
// 2021
// wheel decider

import React, {Component} from 'react';

class Categories extends Component{

    constructor(){
        super();
        this.state = {
            category: ""
        }
    }

    // calls parent with new category if category isn't empty
    // updates state when submitting and updates our scroller if it is hidden
    handleSubmit = (e) => {
        e.preventDefault();
        const scroller = document.querySelector(".scrollable");
        if(this.state.category !== ""){
            this.props.handleSubmit(this.state.category);
            if(scroller.classList.contains('hide')){
                scroller.classList.remove('hide');
            }
        }
        this.setState({
            category: ""
        });
    }

    // handles when someone enters a value into our input
    handleChange = (e) => {
        const {value, name} = e.target;
        this.setState({
            [name]: value
        });
    }

    // handles when screen is resized, it checks if the window is under 1200
    // it will hide our scroll area if there are no items or show it if we are above 1200px
    handleResize = () => {
        const scroller = document.querySelector(".scrollable");
        if(document.body.clientWidth < 1200 && !this.props.items.length > 0){
            scroller.classList.add('hide');
        }else if (document.body.clientWidth > 1200){
            scroller.classList.remove('hide');
        }
    }

    // calls parent with current index to hide item
    hide = (e) => {
        this.props.hide(parseInt(e.target.name));
    }

    // calls parent with current index to delete item
    delete = (e) => {
        this.props.delete(parseInt(e.target.name));
    }

    // adds window event to close scroller if needed
    componentDidMount(){
        window.addEventListener('resize', this.handleResize);
    }

    // removes window event to close scroller if needed
    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize);
    }

    render(){
        return(
            <div className="catDiv">
                <form className="catForm" onSubmit={this.handleSubmit}>
                    <label className="catLabel">
                        <input 
                            type="text"
                            name="category"
                            placeholder="Add Category"
                            value={this.state.category}
                            onChange={this.handleChange}
                        />
                    </label>
                    <button id="submit">Submit</button>
                </form>
                <div className="categories">
                    <h3>Categories:</h3>
                    <div className="categories">
                        <h4 className="catHide">Hide:</h4>
                        <h4>Delete:</h4>
                    </div>
                    
                </div>
                {<div className={`scrollable ${document.body.clientWidth < 1200 && this.props.items.length === 0 ? 'hide' : ''}`}>
                    { this.props.items.map((item, index) => (
                        <div className="categories" key={index}>
                            <p style={{wordWrap: "break-word", width: "12rem"}}>{item.cat}</p>
                            <div className="categories">
                                <input 
                                    type="checkbox"
                                    className="catHideBox"
                                    onChange={this.hide}
                                    name={index}
                                    checked={!item.display}
                                />
                                <span className="catBar"></span>
                                <input 
                                    type="checkbox"
                                    className="catDeleteBox"
                                    onChange={this.delete}
                                    name={index}
                                    checked={false}
                                />

                            </div>
                            
                        </div>
                    ))}
                </div>}
                
            </div>
            
        )
    }
}

export default Categories;
