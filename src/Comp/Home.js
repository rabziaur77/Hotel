import React,{ Component  } from "react";
import HomeHTML from './HomeHTML';


export class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            ThisName:"",
            IsThisName:false
        }
    }
    Click=(e)=>{
     this.props.history.push("/Info")    
    }
    ConfirmName(isName){
        console.log(isName);
        this.setState({IsThisName:!this.state.IsThisName})
    }
    componentDidMount(){
        this.setState({ThisName:"Shoaib"})
    }
    handle=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        return(
            <React.Fragment>
                <HomeHTML Click={this.Click} ThisName={this.state.ThisName} IsName={this.state.IsThisName}
                 ConfirmName={(e)=>this.ConfirmName(this.state.ThisName)} handle={this.handle} />
                <div>
                    shoaib
                </div>
            </React.Fragment>
        )
    }
}