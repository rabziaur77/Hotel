import React from "react";
import Loader from "../Health/Loader";
import './car.css'
const CardQuote = (props) => {
  return (
    <React.Fragment>

    <div className="col-md-3 mt-3">
    <div class="quotesBoxes">
    <div class="Qlogo">
    <img src={props.src} alt={props.alt} />
    </div>
    <div class="Qncb">
 <p ng-show="IsRenew"><span class="title-idv" >  <b>Current NCB: {props.currentNCB}%</b></span></p>
    </div>
    <div class="Qidv">
        {props.IsLoader?<p>Cover IDV: ₹ {props.idv}</p>:<p>Cover IDV: ₹ {props.idv}</p>}
    </div>
    <div class="QPremium">
       { props.IsLoader?<a className="btn QuoteBtn btn-block">
           
               <Loader bgColor={{backgroundColor:"blue"}}/>
        
        </a>:<a>
        <button class="btn QuoteBtn btn-block" onClick={props.btnClick}>
            ₹ <span class="buyme">{props.quote}</span>
        </button>
    </a>}
    </div>
    <div class="QOtherFeat">
        <a href="#" data-toggle="modal" onClick={props.detailsClk}>Plan Details</a>
        
        <a href="javascript:void(0);"> Cashless Garages</a>
    </div>
    <div class="QuoteAddons" style={{textAlign:"left"}}>
        <p>
            <div>

               {props.paOwnerDriver>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>PA Owner Driver </span>
            </div>
           </p>
            {/*========================================================================================= */}
           {props.chkPaidDriver? <p>
            <div>

               {props.papaiddriverAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>Paid Driver </span>
            </div>
            </p>:null}
            {props.chkDepreciation?
            <p>
            <div>

               {props.ZeroDepreciationAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>Zero Dept </span>
            </div>
            </p>
           :null}
           {props.chkReturnToInvoice?<p>
            <div>

               {props.ReturnToInvoiceAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span> Return To Invoice Cover</span>
            </div>
            </p>:null}
            {props.chkNCBProtection? <p>
            <div>

               {props.NCBProtectionAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>NCB ProtectionCover</span>
            </div>
            </p>:null}
            {props.chkInconvenienceAllowance? <p>
            <div>

               {props.InconvenienceAllowanceAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span> Inconvenience Allowance Cover</span>
            </div>
            </p>:null}
            {props.chkPassengerCover? <p>
            <div>

               {props.PassengerCoverAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>Passanger Cover </span>
            </div>
            </p>:null}
            {props.chkEngineProtector? <p>
            <div>

               {props.EngineProtectorAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>Engine And GearBox </span>
            </div>
            </p>:null}
            {props.chkRoadSideAssistance?<p>
            <div>

               {props.RoadSideAssistanceAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>Road Side Cover </span>
            </div>
            </p>:null}
            {props.chkPassangerAssistance?<p>
            <div>

               {props.PassangerAssistanceAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>Passanger Assistance Cover </span>
            </div>
            </p>:null}
            {props.chkConsumables? <p>
            <div>

               {props.ConsumablesAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>Consumable Cover </span>
            </div>
            </p>:null}
            {props.chkKeyReplacement? <p>
            <div>

               {props.KeyReplacementAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span>Key Replacement Cove </span>
            </div>
            </p>:null}
            {props.chkTyreSecure?<p>
            <div>

               {props.TyreSecureAmt>0?
                    <img src="https://riskoveryinsurance.com/Content/PolicyMart/images/RightCheck.png" />:
                <img src="https://www.riskoveryinsurance.com//Content/PolicyMart/images/WrongCross.png" />
               } <span> Tyre Secure Cover </span>
            </div>
        </p>:null}
    </div>
</div>

 
    </div>
            </React.Fragment>
  );
};
export default CardQuote;
