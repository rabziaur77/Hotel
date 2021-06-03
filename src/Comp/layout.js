import React,{ Component } from "react";

export class Layout extends Component{
    static displayname = Layout.name;
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}