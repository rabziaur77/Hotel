import React from "react";

const HomeHTML = (props) => {
  return (
    <div className="col-md-3 mt-3">
       Ziaur Rab {props.IsName? props.ThisName:"Waiting for name"}
       <input type="button" value="Click Me" onClick={props.Click} />
       <input type="button" value="Confirm Name" onClick={(e)=> props.ConfirmName(props.ThisName)} />
       <p>
       <input type="text" value={props.ThisName} name="ThisName" onChange={props.handle} />
       </p>
    </div>
  );
};
export default HomeHTML;
