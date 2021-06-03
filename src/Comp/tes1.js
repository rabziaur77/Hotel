import React, { Component } from "react";
import { MasterGlobal } from "../App";
import CardQuote from "./CardQuote";
import '../Contents/css/QuoteStyle.css';
import SidePan from "./SidePan";
import LowestPopup from "./LowestPopup";
import Discount from "./Discount";
import AdditionalCover from "./AdditionalCover";
import GotQuotes from "./GotQuotes";
import ShareButton from "./ShareButton";
import MotorQuoteFooter from "./MotorQuoteFooter";
import LoaderBox from '../Health/LoaderBox'
export class MotorQuote extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      Req: null,
      Response: [],
      IsPopupShow: false,
      //Popup
      BasicOD: null,
      BasicTP: null,
      IDV: null,
      NCB: null,
      GST: null,
      TotalPrimium: null,
      IMG: null,
      IsApplyFilterShow: false,
      IsAddons: false,
      IsAdditionalCover: false,
      IsMydiscount: false,
      IsLowestIDV: false,
      //Addons
      chkPaidDriver: false,
      papaiddriverAmt: 0,
      chkDepreciation: false,
      ZeroDepreciationAmt: 0,
      chkReturnToInvoice: false,
      ReturnToInvoiceAmt: 0,

      chkNCBProtection: false,
      NCBProtectionAmt:0,
      chkInconvenienceAllowance: false,
      InconvenienceAllowanceAmt: 0,
      chkPassengerCover: false,
      PassengerCoverAmt: 0,
      chkEngineProtector: false,
      EngineProtectorAmt: 0,
      chkRoadSideAssistance: false,
      RoadSideAssistanceAmt: 0,
      chkPassangerAssistance: false,
      PassangerAssistanceAmt:0,
      chkConsumables: false,
      ConsumablesAmt: 0,
      chkKeyReplacement: false,
      KeyReplacementAmt:0,
      chkTyreSecure: false,
      TyreSecureAmt: 0,
      PassengerCoverSelectedIDV: 0,
      AddinalOption: null,
      IsLoader: true,
      LoaderList: [],
      chkAutoMobileMembership: false,
      AutoMobileMembershipName: null,
      AutoMobileMembershipNumber: null,
      AutoMobileMembershipDate: null,
      VoluntaryAmount: 0,
      IsAntiTheft: false,
      IsCNG_LPG: "N",
      IDVLpgCng: 0,
      IDVElectrical: 0,
      IDVNonElectrical: 0,
      MinIDV: 0,
      MaxIDV: 0,
      idvfilter: "BestDeal",
      FilterIDV: null,
      IsMessage: false,
      MessageBody: null,
      AllCompIDVs: [],
      ThirdPartyCover:false,
      APIUrl: null,
      notForm:false,
      lowestPopup:false,
      discountPopup:false,
      CoverShow:false,
      isToggleOn: false,
      addonsToggle:false,
  gotQuotePOPUP:false,
  fields:{},
  loadCount:0,
  object:null,
    };
   
   // this.state.APIUrl = MasterGlobal.PortalAPI;
   console.log(this.props)
   
    this.privacyPolicy = this.privacyPolicy.bind(this);
    this.addonsClick=this.addonsClick.bind(this);
    this.openPopup=this.openPopup.bind(this);
    this.showLowest=this.showLowest.bind(this)
    this.additionalDiscount=this.additionalDiscount.bind(this)
    this.handle=this.handle.bind(this)
    this.ShowAddOnsOrOther=this.ShowAddOnsOrOther.bind(this)
    this.additionalPopup=this.additionalPopup.bind(this)
    this.addonsopen=this.addonsopen.bind(this)
    this.state.Req = this.props.location.state.Req;
    this.setState({ Req: this.state.Req });
    for (let i = 0; i < 5; i++) {
      this.state.LoaderList.push(i);

    }
    this.setState({
      Req: this.state.Req,
      LoaderList: this.state.LoaderList,
      APIUrl: this.state.APIUrl,
    });
   this.policyTypeChecker=this.policyTypeChecker.bind(this)
   // this.state.APIUrl="https://riskoveryinsurance.com";
   
    if(this.state.APIUrl!==null){
      window.localStorage.setItem("request",this.state.Req.QuoteReq.ClientURL)
     
    }
    else {
      let localStorageValue=window.localStorage.getItem("request");
      this.state.APIUrl=localStorageValue;
      this.setState({APIUrl:localStorageValue})
     
    }
   
   
    alert(this.state.APIUrl)
    this.GetQuote(this.state.Req.QuoteReq)
  }
  GetQuote(Req) {
 
     this.state.IsLoader = true;
     this.setState({ IsLoader: this.state.IsLoader });
    
   
     fetch(this.state.APIUrl + "/api/api/InsurerMotor/GetALLQuotationV2", {
      method: "POST",
      body: JSON.stringify(Req),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        let lstQuotes = data.filter((row) => row.TotalPremium > 0);
        this.setState({ Response: lstQuotes });
        console.log(lstQuotes);
        this.setState({ IsLoader: false });
      });
      let ThirdPartyCover=this.state.Req.QuoteReq.ThirdPartyCover;
      this.setState({ThirdPartyCover})
      
  }
  showPopup = (e) => {
    if (this.state.IsPopupShow) {
      this.setState({ IsPopupShow: false });
    } else {
      this.setState({ IsPopupShow: true });
    }
  };
  popupData(obj) {
    //console.log(obj)
    if (!this.state.IsPopupShow) {
      this.setState({
        IsPopupShow: true,
        BasicOD: obj.BasicOD,
        BasicTP: obj.BasicTP,
        IDV: obj.IDV,
        NCB: obj.CurrentNCB,
        GST: obj.serviceTax,
        TotalPrimium: obj.TotalPremium,
        IMG: obj.CompanyLogo,
      });
      // let buyData=this.state.Response.filter((row)=>{
      // return row.CompanyLogo=this.state.IMG}
      // )
      // console.log(buyData)
    }
    let object=this.state.Response.filter((r)=>{
      return r.CompanyLogo==obj.CompanyLogo
    })
    this.setState({object})
   
  }
  Buynow(buyObj) {
    this.state.Req.SelectedInsurer = buyObj;
    let SaveNdGo = {
      UserID: 0,
      TypeOfMotor: buyObj.TypeOfMotor,
      EnquiryNo: buyObj.EnquiryNo,
      TypeOfPolicy: buyObj.TypeOfPolicy,
      BasicOD: buyObj.BasicOD,
      BasicTP: buyObj.BasicTP,
      BasePremium: 0,
      GrossPremium: 0,
      NetPremium: buyObj.NetPremium,
      TotalPremium: buyObj.TotalPremium,
      ServiceTax: buyObj.serviceTax,
      QuoteNo: buyObj.QuoteNo,
      CompanyID: buyObj.CompanyID,
      PolicyStatus: buyObj.PolicyStatus,
      RequestQuoteXml: buyObj.QuotationRequest,
      Period: buyObj.Period,
      AlreadyExpired: buyObj.AlreadyExpired,
      IDV: buyObj.IDV,
      CurrentNCB: buyObj.CurrentNCB,
      PreviousNCB: buyObj.PreviousNCB,
      ManufacturerID: buyObj.ManufactureID,
      VehicleID: buyObj.VehicleID,
      VariantID: buyObj.VariantID,
      FuelID: buyObj.FuelID,
      SeatingCapacity: buyObj.SeatingCapacity,
      CC: buyObj.CC,
      RTO_ID: buyObj.RTO_ID,
    };
    fetch(this.state.APIUrl + "/api/api/NewEnquiry/GotoProposal", {
      method: "POST",
      body: JSON.stringify(SaveNdGo),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((data) => {
        //console.log(data)
        this.state.Req.buyObj = buyObj;
        this.setState({ Req: this.state.Req });
        this.props.history.push("/Proposal", { Model: this.state.Req });
      });
  }
  ShowAddOnsOrOther(option) {
    this.setState({ AddinalOption: option });
    switch (option) {
      case "ApplyFilter":
        this.setState({
          IsApplyFilterShow: !this.state.IsApplyFilterShow,
        });
        break;
      case "Addons":
        this.setState({
          IsAddons: !this.state.IsAddons ? true : false,
        });
        break;
      case "AdditionalCover":
        this.setState({
          IsAdditionalCover: !this.state.IsAdditionalCover ? true : false,
        });
        break;
      case "AdditionalCover":
        this.setState({
          IsAdditionalCover: !this.state.IsAdditionalCover ? true : false,
        });
        break;
      case "Mydiscount":
        this.setState({
          IsMydiscount: !this.state.IsMydiscount ? true : false,
        });
        break;
      case "LowestIDV":
        let tempIDVs = [];
        this.state.AllCompIDVs = [];
        for (var i = 0; i < this.state.Response.length; i++) {
          if (this.state.Response[i].MinIDV > 0) {
            var AllCompIDV = {
              IDV: this.state.Response[i].IDV,
              CompanyID: this.state.Response[i].CompanyID,
              MaxIDV: this.state.Response[i].MaxIDV,
              MinIDV: this.state.Response[i].MinIDV,
            };
            this.state.AllCompIDVs.push(AllCompIDV);
          }
          tempIDVs.push(this.state.Response[i].IDV);
        }
        tempIDVs = tempIDVs.sort();

        this.setState({
          IsLowestIDV: !this.state.IsLowestIDV ? true : false,
          MinIDV: tempIDVs[0],
          MaxIDV: tempIDVs[tempIDVs.length - 1],
          AllCompIDVs: this.state.AllCompIDVs,
        });
        break;
    }
  }
  handle = (e) => {
    let fields=this.state.fields;
    fields[e.target.name]=e.target.value;
    this.setState({fields})
  
    if(this.state.fields["IsAntiTheft"]!==undefined ){
      fields["IsAntiTheft"]==="yes"?
    this.setState({IsAntiTheft:true}):
    this.setState({IsAntiTheft:false})
  }
  if(this.state.fields["chkAutoMobileMembership"]!==undefined ){
    fields["chkAutoMobileMembership"]==="yes"?
  this.setState({chkAutoMobileMembership:true}):
  this.setState({chkAutoMobileMembership:false})
}
this.setState({
  [e.target.name]: e.target.type == "checkbox" ? e.target.checked : e.target.value
})
if(e.target.type=="checkbox"){
 if(e.target.checked){ switch(e.target.name)
{
  case "chkDepreciation": this.state.chkDepreciation=true ; break;
  case "chkReturnToInvoice":this.state.chkReturnToInvoice=true;break;
  case "chkNCBProtection" :this.state.chkNCBProtection=true;break;
  case "chkInconvenienceAllowance":this.state.chkInconvenienceAllowance=true;break;
  case "chkPassengerCover" :this.state.chkPassengerCover=true;break;
  case "PassengerCoverSelectedIDV" : this.state.PassengerCoverSelectedIDV=e.target.value;break;
  case "chkEngineProtector":this.state.chkEngineProtector=true;break;
  case "chkRoadSideAssistance":this.state.chkRoadSideAssistance=true;break;
  case "chkPassangerAssistance":this.state.chkPassangerAssistance=true;break;
  case "chkConsumables" : this.state.chkConsumables=true;break;
  case "chkKeyReplacement" : this.state.chkKeyReplacement=true;break;
  case "chkTyreSecure" :this.state.chkTyreSecure=true;break;
}}}
 
   
  };
  Calculate = (e) => {
    let Req = this.state.Req.QuoteReq;
    //Addonse
    Req.chkPaidDriver = this.state.chkPaidDriver;
    Req.papaiddriverAmt=this.state.papaiddriverAmt;
    Req.chkDepreciation = this.state.chkDepreciation;
    Req.ZeroDepreciationAmt=this.state.ZeroDepreciationAmt;
    Req.chkReturnToInvoice = this.state.chkReturnToInvoice;
    Req.ReturnToInvoiceAmt=this.state.ReturnToInvoiceAmt;
    Req.chkNCBProtection = this.state.chkNCBProtection;
    Req.NCBProtectionAmt=this.state.NCBProtectionAmt;
    Req.chkInconvenienceAllowance = this.state.chkInconvenienceAllowance;
    Req.InconvenienceAllowanceAmt=this.state.InconvenienceAllowanceAmt;
    Req.chkPassengerCover = this.state.chkPassengerCover;
    Req.PassengerCoverAmt=this.state.PassengerCoverAmt;
    Req.chkEngineProtector = this.state.chkEngineProtector;
    Req.EngineProtectorAmt=this.state.EngineProtectorAmt;
    Req.chkRoadSideAssistance = this.state.chkRoadSideAssistance;
    Req.RoadSideAssistanceAmt=this.state.RoadSideAssistanceAmt;
    Req.chkPassangerAssistance = this.state.chkPassangerAssistance;
    Req.PassangerAssistanceAmt=this.state.PassangerAssistanceAmt;
    Req.chkConsumables = this.state.chkConsumables;
    Req.ConsumablesAmt=this.state.ConsumablesAmt;
    Req.chkKeyReplacement = this.state.chkKeyReplacement;
    Req.KeyReplacementAmt=this.state.KeyReplacementAmt;
    Req.chkTyreSecure = this.state.chkTyreSecure;
    Req.TyreSecureAmt=this.state.TyreSecureAmt;
    Req.PassengerCoverSelectedIDV = this.state.chkPassengerCover
      ? this.state.PassengerCoverSelectedIDV
      : 0;

    //EndAddons
    //Additional Discount
    Req.VoluntaryAmount = this.state.VoluntaryAmount;
    Req.IsAntiTheft = this.state.IsAntiTheft;
    Req.AutoMobileMembership = this.state.chkAutoMobileMembership
      ? "True"
      : "False";
    Req.AutoMobileMembershipName = this.state.chkAutoMobileMembership
      ? this.state.AutoMobileMembershipName
      : "";
    Req.AutoMobileMembershipNumber = this.state.chkAutoMobileMembership
      ? this.state.AutoMobileMembershipNumber
      : "";
    Req.AutoMobileMembershipDate = this.state.chkAutoMobileMembership
      ? this.state.AutoMobileMembershipDate
      : "";
    //Additional Discount
    //Additional Cover
    Req.IsCNG_LPG = this.state.IsCNG_LPG;
    Req.IDVLpgCng = this.state.IsCNG_LPG == "Y" ? this.state.IDVLpgCng : 0;
    Req.IDVElectrical = this.state.IDVElectrical;
    Req.IDVNonElectrical = this.state.IDVNonElectrical;
    //End Additional Cover
    if (this.state.idvfilter == "OwnIDV") {
      if (this.state.FilterIDV == null) {
        this.setState({
          IsMessage: true,
          MessageBody: "Own IDV is required.",
        });
        return;
      }
    }
    Req.IDV = this.state.idvfilter == "OwnIDV" ? this.state.FilterIDV : 0;
    Req.AllCompIDVs =
      this.state.idvfilter == "OwnIDV" ? this.state.AllCompIDVs : [];
    //Lowest Possible IDV
    //end
    switch(e.target.name){
      case "LowestIDV" : this.state.IsLowestIDV=!this.state.IsLowestIDV
      alert("LowestIDV")
     break;
     case "additionalDiscount" : this.state.IsMydiscount=!this.state.IsMydiscount
     alert("additionalDiscount")
     break;
     case "additionalCover" : this.state.IsAdditionalCover=!this.state.IsAdditionalCover
     alert("additionalCover")
     break;
     case "IsThirdParty" : this.state.isToggleOn=!this.state.isToggleOn
     alert("IsThirdParty")
     break;
     case "addonsCover" : this.state.addonsToggle=!this.state.addonsToggle
     alert("addonsCover")
     break;
    }
    this.state.Req.QuoteReq = Req;
    this.setState({ Req: this.state.Req });
    this.GetQuote(Req);
    this.ShowAddOnsOrOther(this.state.AddinalOption);
    console.log(this.state.Response)
   
  };
  CloseMessage = (e) => {
    this.setState({ IsMessage: !this.state.IsMessage });
  };
  openSidepan=(e)=>{
    this.setState({notForm:true});
  }
  closeSidepan=(e)=>{
    this.setState({notForm:!this.state.notForm});
  }
  showLowest=()=>{
    this.setState({IsLowestIDV:!this.state.IsLowestIDV});
    console.log(this.state.IsLowestIDV)
  }  
  additionalDiscount(){
    this.setState({ IsMydiscount:!this.state.IsMydiscount});
  }
  additionalPopup(){
    
    this.setState({IsAdditionalCover:true});
  }
  privacyPolicy(){
    this.setState( {isToggleOn: !this.state.isToggleOn
		});

  }
  addonsClick(){
    this.setState({addonsToggle:true})
  }
  addonsopen(){
    this.setState({addonsToggle:false})
    
  }
  openPopup(){
    this.setState({gotQuotePOPUP:!this.state.gotQuotePOPUP})
    console.log(this.state.Req);
  }
  policyTypeChecker(e){
  console.log(e.target.name)
  
  //e.target.name=="IsThirdParty"?this.state.isToggleOn=!this.state.isToggleOn:null; 
    switch(e.target.value){
      case "Comprehensive" :
       
      this.state.Req.QuoteReq.TypeOfPolicy=1;
      this.state.Req.QuoteReq.ThirdPartyCover=false;
      this.state.Req.QuoteReq.odOnly=false;
      this.setState({policy:1})
      
       
       
        break;
        case "ThirdParty" :
       
      this.state.Req.QuoteReq.TypeOfPolicy=2;
      this.state.Req.QuoteReq.ThirdPartyCover=true;
      this.setState({policy:2})
      
       
       
        break;
        case "odOnly" :
       
      this.state.Req.QuoteReq.TypeOfPolicy=3;
      this.state.Req.QuoteReq.odOnly=true
     
      this.setState({policy:3})
        break;
        case "tppdRestricted":
          e.target.checked?this.state.Req.QuoteReq.chkTPPDcover=true:this.state.Req.QuoteReq.chkTPPDcover=false
          
        }
      
        this.GetQuote(this.state.Req.QuoteReq)
      
    }
  
  render() {
    return (
      <div className="QuotePage">
        <div className="packagesMainCar">
        <ShareButton/>
          <div className="productTabsMainCar">
            <a
              className="applyFilter"
              onClick={(e) => this.ShowAddOnsOrOther("ApplyFilter")}
            >
              <i className="fa fa-filter"></i>
            </a>
            {this.state.IsApplyFilterShow ? (
              <div className="quotesBoxesHead" id="applyFilterShow">
                <div className="divOF50">
                  <p>
                    Lowest Possible IDV:{" "}
                    <span onClick={(e) => this.ShowAddOnsOrOther("LowestIDV")}>
                      Edit
                    </span>
                  </p>
                  <p>
                    Additional Discount:
                    <span onClick={(e) => this.ShowAddOnsOrOther("Mydiscount")}>
                      Edit
                    </span>
                  </p>
                </div>
                <div className="divOF50">
                  <p>
                    Additional Cover:{" "}
                    <span
                      onClick={(e) => this.ShowAddOnsOrOther("AdditionalCover")}
                    >
                      Edit
                    </span>
                  </p>
                  <p>
                    Addons Cover:{" "}
                    <span onClick={(e) => this.ShowAddOnsOrOther("Addons")}>
                      Edit
                    </span>
                  </p>
                </div>
              </div>
            ) : null}
            <section>
        <div className="container" style={{marginTop:"50px"}}>
            <div className="quotesDetails test-heading2" style={{pointerEvents: "auto"}}>
                <div>
                    <ul className="mo_flt_main" id="mo_flt_ul">
                        <li id="opn_one"><span className="btn-demo" data-target="#filter_1" data-toggle="tab" aria-expanded="true"><i className="fa fa-edit" aria-hidden="true"></i> Edit Details</span></li>
                        <li id="opn_two"><span className="btn-demo" data-target="#filter_2" data-toggle="tab" aria-expanded="true"><i className="fa fa-filter" aria-hidden="true"></i> Apply Filters</span></li>
                    </ul>
                </div>


                <div className="row quotesDetailsRow" id="filter_1">
                    <span className="remove">x</span>
                    <div className="col-md-8 NoPadding">
                        <div className="quotesDetailsIn">
                            <div className="QuDeInHead">
                                <h3 id="manufacturevehiclevariant">{this.state.Req.CompModel.Vehicle}</h3>
                                 <p id="rtoCodewithLocation">{this.state.Req.CompModel.variant}, {this.state.Req.CompModel.RTOName}</p>
                                <span data-toggle="modal" data-target="#myModalEdit" onClick={this.openSidepan} className="float-right EditVehicleDet">
                                
                                
                                Not your Car?
                                
                                </span>
                            </div>
                            {this.state.notForm?
                              <SidePan modelValue={this.state.Req.MotorEnquiry.VehicleID}
                              model={this.state.Req.CompModel.Vehicle} 
                              fuelID={this.state.Req.MotorEnquiry.FuelID} fuel={this.state.Req.QuoteReq.FuelName}
                              varientId={this.state.Req.MotorEnquiry.VariantID}
                              varient={this.state.Req.CompModel.variant}
                              rtovalue={this.state.Req.MotorEnquiry.RTOID} RTO={this.state.Req.CompModel.RTOName}
                              yearValue={this.state.Req.MotorEnquiry.RegistartionYear} year={this.state.Req.MotorEnquiry.RegistartionYear}
                              mobile={this.state.Req.MobileNo} CarList={this.state.Req.QuoteReq.CarList}
                              FuelList={this.state.Req.QuoteReq.FuelList} VariantList={this.state.Req.QuoteReq.VariantList}
                              RTOList={this.state.Req.QuoteReq.RTOList} YearList={this.state.Req.QuoteReq.YearList}
                              IsReNew={this.state.Req.QuoteReq.IsReNew}
                              onChange={this.handle}
                              close={this.closeSidepan}/>:null}
                              
                            
                            <div>
                                <p className="quoteP">
                                    Registered Date: <span className="qoutePopup qoutePopupEdit ng-binding" onClick={this.openPopup}>{this.state.Req.QuoteReq.RegistrationYear} <i className="fas fa-caret-down" aria-hidden="true"></i></span>
                                </p>
                            </div>
                            {this.state.gotQuotePOPUP?
                <GotQuotes onClick={this.openPopup}
                exactRegistrationDate={this.state.Req.QuoteReq.RegistrationYear}
                EndDate={this.state.Req.QuoteReq.PreviousPolicyExpiredDate}
                prevPolicyType={this.state.Req.QuoteReq.PrevPolicyType}
                NCB={this.state.Req.QuoteReq.BindPreviousNCB}
                PaCoverYear={this.state.Req.QuoteReq.Period} />:null}
                        </div>
                    </div>
                    <div className="col-md-4 NoPadding">
                        <div className="quotesDetailsIn quotesDetailsInLast">
                            <div className="ncbBox EnuquryNumber text-right">
                                <p>Lead ID: <span className="ng-binding" onClick={this.openPopup}>{this.state.Req.QuoteReq.EnquiryNo}</span></p>
                            </div>

                                <div className="DateBox DateBoxMain text-right">
                                    <p className="quoteP">Policy expiry at: <span onClick={this.openPopup} className="qoutePopup qoutePopupEdit ng-binding" id="PreviousPolicyExpiredDate">{this.state.Req.QuoteReq.PreviousPolicyExpiredDate} <i className="fas fa-caret-down" aria-hidden="true"></i></span></p>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="row quotesDetails002Row" id="filter_2">
                    <span className="remove">x</span>

                        <div className="col-md-3 NoPadding">
                        {this.state.Req.QuoteReq.IsReNew?
                            <div className="quotesDetailsIn">
                                <div className="QuDeInHead">
                                    <p className="quoteP float-left">Claim Previous Year: <span onClick={this.openPopup} className="qoutePopup qoutePopupEdit" id="IsPastYearClaim" >{this.state.Req.QuoteReq.PastYearClaimID}</span> <i className="fas fa-caret-down" aria-hidden="true"></i></p>
                                </div>
                                <div><p className="quoteP">Previous NCB: <span onClick={this.openPopup} className="qoutePopup qoutePopupEdit" id="ncbPrevious" >{this.state.Req.QuoteReq.BindPreviousNCB} %</span> <i className="fas fa-caret-down" aria-hidden="true"></i></p></div>
                            </div>:null}
                        </div>
                        <div className="col-md-3 NoPadding">
                            <div className="quotesDetailsIn">
                                <div className="summaryCardBox" id="IsComp">
                                 
                                <p id="btnIDVPop" className="quoteP" onClick={this.showLowest}>Lowest Possible IDV: <span className="qoutePopup" ><i className="fas fa-chevron-down" aria-hidden="true"></i></span></p>
                                {this.state.IsLowestIDV ? (
                                  <div className="modal ">
                                    <div className="modal-dialog newModalqt">
                                      <div className="modal-content">
                                      <div class="modal-header text-center ui-draggable-handle">
                                      <button
                                      type="button"
                                      className="close btn-success"
                                      onClick={(e) => this.ShowAddOnsOrOther("LowestIDV")}
                                    >
                                      ×
                                    </button>
                                              <h3>We have got the Quotes!</h3>
                                              <h2>Confirm all the below details to ensure accurate premium</h2>
                                          </div>
                                        <div className="modal-body">
                                          <div className="newModalqtPopUp">
                                            <div className="row" id="rwNCB">
                                              <div className="col-md-12">
                                                <div className="col-md-12">
                                                  <div className="chosIDV">
                                                    <input
                                                      type="radio"
                                                      name="idvfilter"
                                                      value="BestDeal"
                                                      checked={
                                                        this.state.idvfilter == "BestDeal"
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={this.handle}
                                                    />
                                                    <label className="LableFont">For best deal</label>
                                                  </div>
                                                </div>
                                                <div className="col-md-4">
                                                  <div className="chosIDV">
                                                    <input
                                                      type="radio"
                                                      name="idvfilter"
                                                      value="OwnIDV"
                                                      checked={
                                                        this.state.idvfilter == "OwnIDV"
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={this.handle}
                                                    />
                                                    <label className="LableFont">
                                                      Set Your Own IDV
                                                    </label>
                                                  </div>
                                                </div>
                                                {this.state.idvfilter == "OwnIDV" ? (
                                                  <div className="col-md-8 idvFontSz" id="divCostom">
                                                    <input
                                                      type="number"
                                                      className="packageForm"
                                                      placeholder="Enter your IDV"
                                                      min="00000"
                                                      name="FilterIDV"
                                                      value={this.state.FilterIDV}
                                                      onChange={this.handle}
                                                    />
                                                    <p>
                                                      Please enter an IDV between
                                                      <label id="lblMinIDV">
                                                        {this.state.MinIDV}
                                                      </label>{" "}
                                                      -
                                                      <label id="lblMaxIDV">
                                                        {this.state.MaxIDV}
                                                      </label>
                                                    </p>
                                                  </div>
                                                ) : null}
                                              </div>
                      
                                              <div className="col-md-12">
                                                <br />
                                                <div className="col-md-6">
                                                  <input
                                                    type="button"
                                                    value="Update Result"
                                                    name="LowestIDV"
                                                    className="btn QouteMNBtn"
                                                    onClick={this.Calculate}
                                                  />
                                                </div>
                                                <br />
                                                <div className="col-md-12">
                                                  <p className="chosIDVCnt idvFontSz">
                                                    <span>What is IDV ?</span>
                                                    <br />
                                                    IDV is Maximum Value you receive in case of full
                                                    damage or theft of your car
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                                
                                <div className="QuestionPopupPage">
                                        <span>What's This?</span>
                                        <div className="QuestionPopupInnerPage">
                                            <div className="body">
                                                The maximum value you will receive in case of total damage or
                                                theft.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="summaryCardBox">
                                    <p id="btnDiscount" className="quoteP" >Additional Discount <span className="qoutePopup"><i className="fas fa-chevron-down" aria-hidden="true" onClick={this.additionalDiscount}></i></span></p>
                                </div>
                                {this.state.IsMydiscount ? (
                                  <div id="myDiscount" className="Manualmodal">
                                    <div className="modal-dialog newModalqt">
                                      <div className="modal-content">
                                        <div className="modal-header text-center">
                                          <button
                                            type="button"
                                            className="close btn-success"
                                            onClick={(e) => this.ShowAddOnsOrOther("Mydiscount")}
                                          >
                                            ×
                                          </button>
                                          <h3>Get Additional Discounts.</h3>
                                          <h2>
                                            Some insurance companies offer discounts based on these
                                            criteria..
                                          </h2>
                                        </div>
                                        <div className="modal-body">
                                          <div className="newModalqtPopUp">
                                            <div className="row">
                                              <div className="col-md-9">
                                                <label className="LableFont">
                                                  Choose a voluntary deductible IDV
                                                </label>
                                              </div>
                                              <div className="col-md-3">
                                                <select
                                                  className="packageForm"
                                                  name="VoluntaryAmount"
                                                  value={this.state.VoluntaryAmount}
                                                  onChange={this.handle}
                                                >
                                                  <option selected="selected" value="0">
                                                    -- Select --
                                                  </option>
                                                  <option value="2500">2,500</option>
                                                  <option value="5000">5,000</option>
                                                  <option value="7500">7,500</option>
                                                  <option value="15000">1,5000</option>
                                                </select>
                                              </div>
                                            </div>
                      
                                            <div className="row">
                                              <div className="col-md-9">
                                                <label className="LableFont">
                                                  Is your vehicle fitted with ARAI approved anti-theft
                                                  device?
                                                </label>
                                              </div>
                                              <div className="col-md-3">
                                             <select name="IsAntiTheft" className="form-control" onChange={this.handle}>
                                             <option value="yes">Yes</option>
                                             <option value="no" selected>No</option>
                                             </select> 
                                            
                                              </div>
                                            </div>
                      
                                            <div className="row">
                                              <div className="col-md-9">
                                                <label className="LableFont">
                                                  Are you a member of Automobile Association of India?
                                                </label>
                                              </div>
                                              <div className="col-md-3">
                                              <select name="chkAutoMobileMembership" className="form-control" onChange={this.handle}>
                                              <option value="yes">Yes</option>
                                              <option value="no" selected>No</option>
                                              </select> 
                                               
                                              </div>
                                            </div>
                                            {this.state.chkAutoMobileMembership ? (
                                              <div>
                                                <div className="row ">
                                                  <div className="col-md-6">
                                                    <label className="LableFont">
                                                      Name of Association
                                                    </label>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <input
                                                      className="packageForm"
                                                      placeholder="Name of Association"
                                                      type="text"
                                                      name="AutoMobileMembershipName"
                                                      value={this.state.AutoMobileMembershipName}
                                                      onChange={this.handle}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="row ">
                                                  <div className="col-md-6">
                                                    <label className="LableFont">
                                                      Please Enter AAI NO:
                                                    </label>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <input
                                                      maxLength="10"
                                                      className="packageForm"
                                                      min="0"
                                                      placeholder="AAI NO"
                                                      type="number"
                                                      name="AutoMobileMembershipNumber"
                                                      value={this.state.AutoMobileMembershipNumber}
                                                      onChange={this.handle}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="row ">
                                                  <div className="col-md-6">
                                                    <label className="LableFont">AAI DATE:</label>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <span className="Zebra_DatePicker_Icon_Wrapper">
                                                      <input
                                                        className="FormSelect datepicker"
                                                        type="date"
                                                        name="AutoMobileMembershipDate"
                                                        value={this.state.AutoMobileMembershipDate}
                                                        onChange={this.handle}
                                                      />
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : null}
                                            <div className="modal-footer">
                                              <button
                                                type="submit"
                                                name="additionalDiscount"
                                                className="btn QouteMNBtn"
                                                onClick={this.Calculate}
                                              >
                                                Apply Discount
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                               
                               
                            </div>
                        </div>
                      <div className="col-md-3 NoPadding">
                            <div className="quotesDetailsIn">
                                <div className="summaryCardBox">
                                    <p id="btnAdditional" className="quoteP " onClick={this.additionalPopup}>Additional Cover <span className="qoutePopup"><i className="fas fa-chevron-down" aria-hidden="true"></i></span></p>
                                </div>
                                {this.state.IsAdditionalCover ? (
                                  <div id="AdditionCover" className="Manualmodal">
                                    <div className="modal-dialog newModalqt">
                                      <div className="modal-content">
                                        <div className="modal-header text-center">
                                          <button
                                            type="button"
                                            className="close btn-success"
                                            onClick={(e) => this.ShowAddOnsOrOther("AdditionalCover")}
                                          >
                                            ×
                                          </button>
                                          <h3>Get Additional Covers</h3>
                                          <h2>
                                            Some insurance companies offer additional cover based on
                                            these criteria..
                                          </h2>
                                        </div>
                                        <div className="modal-body">
                                          <div className="newModalqtPopUp">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <label className="LableFont">CNG/LPG Kit</label>
                                              </div>
                                              <div className="col-md-4">
                                                <input
                                                  checked={this.state.IsCNG_LPG == "N" ? true : false}
                                                  name="IsCNG_LPG"
                                                  type="radio"
                                                  value="N"
                                                  onClick={this.handle}
                                                />{" "}
                                                <span>No</span>
                                                <input
                                                  name="IsCNG_LPG"
                                                  type="radio"
                                                  value="Y"
                                                  checked={this.state.IsCNG_LPG == "Y" ? true : false}
                                                  onClick={this.handle}
                                                />{" "}
                                                <span>Yes</span>
                                                {this.state.IsCNG_LPG == "Y" ? (
                                                  <div id="IDVLpgCngDIV">
                                                    <input
                                                      className="packageForm"
                                                      type="number"
                                                      name="IDVLpgCng"
                                                      value={this.state.IDVLpgCng}
                                                      onChange={this.handle}
                                                    />
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-8">
                                                <label className="LableFont">
                                                  Electrical Accessories
                                                </label>
                                              </div>
                                              <div className="col-md-4">
                                                <input
                                                  className="packageForm"
                                                  type="number"
                                                  name="IDVElectrical"
                                                  value={this.state.IDVElectrical}
                                                  onChange={this.handle}
                                                />
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-8">
                                                <label className="LableFont">
                                                  Non Electrical Accessories
                                                </label>
                                              </div>
                                              <div className="col-md-4">
                                                <input
                                                  className="packageForm"
                                                  type="number"
                                                  name="IDVElectrical"
                                                  value={this.state.IDVNonElectrical}
                                                  onChange={this.handle}
                                                />
                                              </div>
                                            </div>
                                            <div className="modal-footer">
                                              <button
                                                type="button"
                                                className="btn QouteMNBtn"
                                                onClick={this.Calculate}
                                                name="additionalCover"
                                              >
                                                Apply Covers
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                                
                                <div className="summaryCardBox">
                               
                                
                                    <div className="FormSelect w-100 TPfirst2" onClick={this.privacyPolicy}>
                                  
                                                  

                                        <em >
                                            Policy Type
                                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                                        </em>
                                    </div>
                                    { this.state.isToggleOn?
                                    <div id="TPfirst2" className="TPfirstCom" >
                                        <div className="CheckBoxColor">
                                            <label>
                                                <input type="radio" name="IsThirdParty" onClick={this.policyTypeChecker} defaultChecked className="Compare ng-pristine ng-untouched ng-valid ng-not-empty"  value="Comprehensive"  />
                                                Comprehensive
                                            </label>
                                        </div>
                                        <div className="CheckBoxColor">
                                            <label>
                                                <input type="radio" defaultChecked={this.state.Req.QuoteReq.TypeOfPolicy===2?true:false}  name="IsThirdParty" className="Compare ng-pristine ng-untouched ng-valid ng-not-empty" 
                                                 value="ThirdParty" onClick={this.policyTypeChecker}  />
                                                Third Party Cover Only
                                            </label>
                                        </div>
                                        <div className="CheckBoxColor">
                                            <label>
                                                <input type="radio" onClick={this.policyTypeChecker} defaultChecked={this.state.Req.QuoteReq.TypeOfPolicy===3?true:false}  name="IsThirdParty" className="Compare ng-pristine ng-untouched ng-valid ng-not-empty"  value="odOnly" />
                                                OD Cover Only
                                            </label>
                                        </div>
                                    </div>
                                   :null }
                                </div>
                            </div>
                        </div>
                    <div className="col-md-3 NoPadding">
                        <div className="quotesDetailsIn">
                            <div className="ToggleSwitch">
                                <span className="quoteP">TPPD Restricted to 6000</span>
                                <label className="switch">
                                    <input type="checkbox" id="ChkTPPDRest" value="tppdRestricted" onChange={this.policyTypeChecker} />
                                    <span className="sliderToggle round"></span>
                                </label>
                            </div>
                            <div className="FormSelect w-100 addonBox01" >
                                <em id="addONSdrop1" onClick={this.addonsClick}>Addons Cover <i className="fa fa-angle-down" aria-hidden="true"></i></em>
                              { this.state.addonsToggle?
                                <div className="list-group-item addONSdrop2  text-left">
                                    <button type="button" className="close btn-success"  id="closeBtn" onClick={this.addonsopen}>×</button>

                                    <div className="row">

                                        

                                        <div id="first2">
                                            <div className="CheckBoxColor">
                                                <div className="QuestionPopupPage QuestionPopupAddons">
                                                    <label>
                                                        <input data-val="true"  id="chkPaidDriver" name="chkPaidDriver" type="checkbox"
                                                        checked={this.state.chkPaidDriver}
                                                        onChange={this.handle} value="true"/>
                                                       
                                                        Paid Driver
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="CheckBoxColor">
                                                <div className="QuestionPopupPage QuestionPopupAddons">
                                                    <label>
                                                        <input id="chkDepreciation" name="chkDepreciation" type="checkbox"
                                                        checked={this.state.chkDepreciation}
                                                        onChange={this.handle} value="true" />
                                                         Zero Depreciation
                                                    </label>
                                                    <div className="QuestionPopupInnerPage">
                                                        <div className="body">
                                                            <strong>Zero Depreciation</strong> or <strong>Nil Depreciation</strong> or <strong>Bumper to Bumper</strong> cover means if your car gets damaged following a collision, you will receive the entire cost of the car parts from the insurer excluding consumables such as Lubricants, Retainers, Brackets, Gaskets, Accessories and Wear &amp; Tear parts
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="CheckBoxColor">
                                                <div className="QuestionPopupPage QuestionPopupAddons">
                                                    <label>
                                                        <input data-val="true"  id="chkReturnToInvoice" name="chkReturnToInvoice" type="checkbox"
                                                        checked={this.state.chkReturnToInvoice}
                                                        onChange={this.handle} value="true" />
                                                        <input name="chkReturnToInvoice" type="hidden" value="false" autocomplete="off" />
                                                        Invoice Cover
                                                    </label>
                                                    <div className="QuestionPopupInnerPage">
                                                        <div className="body">
                                                            In case of theft or total damage to your car, you are only eligible for reimbursement up to the Insured declared value of your car, which will be very less than the Invoice value. In case of such an event, selecting Invoice cover makes you eligible for full Invoice amount reimbursement.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="CheckBoxColor">
                                                <div className="QuestionPopupPage QuestionPopupAddons">
                                                    <label>
                                                        <input data-val="true" id="chkNCBProtection" name="chkNCBProtection" type="checkbox"
                                                        checked={this.state.chkNCBProtection}
                                                        onChange={this.handle} value="true" /><input name="chkNCBProtection" type="hidden" value="false" autocomplete="off" />
                                                        NCB Protection
                                                    </label>
                                                    <div className="QuestionPopupInnerPage">
                                                        <div className="body">
                                                            No Claim Bonus or NCB is the discount you get on your premium for every consecutive claim free year. This can go up to 50% (or even higher) for 5 or more claim free years. This can also get down to zero with even a single claim, so if you have a good NCB then opt for NCB protection to preserve your NCB even after you make a claim.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="CheckBoxColor">
                                                <label>
                                                    <input data-val="true"  id="chkInconvenienceAllowance" name="chkInconvenienceAllowance" type="checkbox"
                                                    checked={this.state.chkInconvenienceAllowance}
                                                    onChange={this.handle} value="true" /><input name="chkInconvenienceAllowance" type="hidden" value="false" autocomplete="off" />
                                                    Inconvenience Allowance
                                                </label>

                                            </div>
                                            <div className="CheckBoxColor">
                                                <label id="lbl-PC">
                                                    <input data-val="true" id="chkPassengerCover" name="chkPassengerCover" type="checkbox"
                                                    checked={this.state.chkPassengerCover}
                                                    onChange={this.handle} value="true"/><input name="chkPassengerCover" type="hidden" value="false" autocomplete="off" />
                                                    Passenger Cover
                                                </label>
                                            </div>
                                            
                                            <div className="CheckBoxColor PC_D" style={{display:"none"}}>
                                            {
                                              this.state.chkPassengerCover ?
                                                  <div className="CheckBoxColor PC_D">
                                                      <select name="PassengerCoverSelectedIDV" className="packageForm"
                                                          value={this.state.PassengerCoverSelectedIDV}
                                                          onChange={this.handle}
                                                      >
                                                          <option value="0">0</option>
                                                          <option value="10000">10000</option>
                                                          <option value="50000">50000</option>
                                                          <option value="100000">100000</option>
                                                          <option value="200000">200000</option>
                                                      </select>
                                                  </div>
                                                  : null
                                          }
                                            </div>
                                            <div className="CheckBoxColor">
                                                <div className="QuestionPopupPage QuestionPopupAddons">
                                                    <label>
                                                        <input data-val="true" id="chkEngineProtector" name="chkEngineProtector" type="checkbox"
                                                        checked={this.state.chkEngineProtector}
                                                        onChange={this.handle} value="true" /><input name="chkEngineProtector" type="hidden" value="false" autocomplete="off" />
                                                        Engine Protector
                                                    </label>
                                                    <div className="QuestionPopupInnerPage">
                                                        <div className="body">
                                                            When the Engine of the car is submerged in a water logged area, using or cranking the engine can result in engine ceasing. This is not covered under regular Insurance. Engine protector covers such non-accidental exclusions related to your engine. It is a must buy for luxury cars where engine is very costly &amp; is placed at low ground clearance.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="CheckBoxColor">
                                                <div className="QuestionPopupPage QuestionPopupAddons">
                                                    <label>
                                                        <input data-val="true"  id="chkRoadSideAssistance" name="chkRoadSideAssistance" type="checkbox"
                                                        checked={this.state.chkRoadSideAssistance}
                                                        onChange={this.handle} value="true" /><input name="chkRoadSideAssistance" type="hidden" value="false" autocomplete="off" />
                                                        Roadside Assistance
                                                    </label>
                                                    <div className="QuestionPopupInnerPage">
                                                        <div className="body">
                                                            Road side assistance provides support for basic on-road breakdown situations like tyre change, battery jump start, emergency fuel, medical assistance etc which are not covered under Insurance. As the price is very nominal, it is a good to have add-on.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="CheckBoxColor">
                                                <label>
                                                    <input data-val="true"  id="chkPassangerAssistance" name="chkPassangerAssistance" type="checkbox"
                                                    checked={this.state.chkPassangerAssistance}
                                                    onChange={this.handle} value="true" /><input name="chkPassangerAssistance" type="hidden" value="false" autocomplete="off" />
                                                    Passenger Assistance
                                                </label>

                                            </div>
                                            <div className="CheckBoxColor">
                                                <div className="QuestionPopupPage QuestionPopupAddons">
                                                    <label>
                                                        <input data-val="true" id="chkConsumables" name="chkConsumables" type="checkbox"
                                                        checked={this.state.chkConsumables}
                                                        onChange={this.handle} value="true" /><input name="chkConsumables" type="hidden" value="false" autocomplete="off" />
                                                        Consumables Cover
                                                    </label>
                                                    <div className="QuestionPopupInnerPage">
                                                        <div className="body">
                                                            Covers expenses incurred towards "Consumables" (nut and bolt, screw, washers, grease, lubricants clip, ac gas, bearings, distilled water, engine oil, oil filter, fuel filter, break oil and the like) arising out of damage to the vehicle.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="CheckBoxColor">
                                                <div className="QuestionPopupPage QuestionPopupAddons">
                                                    <label>
                                                        <input data-val="true"  id="chkKeyReplacement" name="chkKeyReplacement" type="checkbox"
                                                        checked={this.state.chkKeyReplacement}
                                                        onChange={this.handle} value="true" /><input name="chkKeyReplacement" type="hidden" value="false" autocomplete="off" />
                                                        Key Replacement
                                                    </label>
                                                    <div className="QuestionPopupInnerPage">
                                                        <div className="body">
                                                            In case your keys are lost or stolen, you have to request a new one from the manufacturer. In most cases, you may even need to replace the locks, which is another added expenditure. Key and Lock Replacement Cover covers the expenses incurred for procuring a new key. It is a must buy for high end and luxury cars as the new set of keys can be very expensive.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="CheckBoxColor">
                                                <label>
                                                    <input data-val="true"  id="chkTyreSecure" name="chkTyreSecure" type="checkbox"
                                                    checked={this.state.chkTyreSecure}
                                                    onChange={this.handle} value="true" /><input name="chkTyreSecure" type="hidden" value="false" autocomplete="off" />
                                                    Tyre Secure
                                                </label>

                                            </div>
                                            
                                            <a  onClick={this.Calculate} className="btn-demo btn-block text-center" name="addonsCover" ng-click="Search();">Re-Calculate</a>
                                        </div>
                                    </div>
                                </div>
                             :null }
                            </div>

                          
                            

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

            {this.state.IsLoader
              ? <div className="container"> <div className="row">{LoaderBox.map((row) => (
                <CardQuote IsLoader={this.state.IsLoader} src={row.src} idv={row.IDV}/>
                ))}</div></div>
              :<div className="container"> 
              <p style={{marginBottom:"0"}} ng-show="IsGSTExcludedTextShow" className="">Prices Exclusive of GST</p>
                <div className="row m-2">
                {this.state.Response.map((row,i) => (
                <React.Fragment>
                
                <CardQuote src={row.CompanyLogo} paOwnerDriver={row.PAOwnerCoverDriver} IsLoader={this.state.IsLoader} idv={row.IDV} quote={row.TotalPremium} btnClick={(e) => this.Buynow(row)} detailsClk={(e) => this.popupData(row)} currentNCB={row.CurrentNCB} 
                papaiddriverAmt={row.papaiddriverAmt} ZeroDepreciationAmt={row.ZeroDepreciationAmt}
                ReturnToInvoiceAmt={row.ReturnToInvoiceAmt} NCBProtectionAmt={row.NCBProtectionAmt}
                InconvenienceAllowanceAmt={row.InconvenienceAllowanceAmt}
                PassengerCoverAmt={row.PassengerCoverAmt} EngineProtectorAmt={row.EngineProtectorAmt}
                RoadSideAssistanceAmt={row.RoadSideAssistanceAmt} PassangerAssistanceAmt={row.PassangerAssistanceAmt}
                ConsumablesAmt={row.ConsumablesAmt} KeyReplacementAmt={row.KeyReplacementAmt}
                TyreSecureAmt={row.TyreSecureAmt}
                chkPaidDriver={row.chkPaidDriver} chkDepreciation={row.chkDepreciation}
                chkReturnToInvoice={row.chkReturnToInvoice} chkNCBProtection={row.chkNCBProtection}
                chkInconvenienceAllowance={row.chkInconvenienceAllowance}
                chkPassengerCover={row.chkPassengerCover} chkEngineProtector={row.chkEngineProtector}
                chkRoadSideAssistance={row.chkRoadSideAssistance} chkPassangerAssistance={row.chkPassangerAssistance}
                chkConsumables={row.chkConsumables} chkKeyReplacement={row.chkKeyReplacement}
                chkTyreSecure={row.chkTyreSecure}
                />
              </React.Fragment>
                ))} 
               
                </div></div>}
                
          </div>
          {this.state.IsPopupShow ? (
            <div className="Manualmodal" id="PlaneDetails" role="dialog">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-body premiumBrekpBody">
                    <h3>Premium Breakup</h3>
                    <button type="button" class="close" data-dismiss="modal"  onClick={this.showPopup}>×</button>
                   
                    <div className="row">
                      <div className="col-md-4">
                        <div className="premiumBrekp01">
                          <img src={this.state.IMG} />
                          <div className="premiumBrekp01IN">
                            <p>
                              IDV :
                              <span>
                                <b>₹ </b>
                                <b id="netPremium">{this.state.IDV}</b>
                              </span>
                            </p>
                            <p>
                              Current NCB : <span>{this.state.NCB}%</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                        <p><a  className="btn btn-demo" onClick={(e) => this.Buynow(this.state.object)}>Buy Me</a></p>
                        <p> <a
                        
                        className="policyWordingBtn mt-3"
                      >
                        <i className="fas fa-file-pdf"></i> Policy Wording
                      </a></p></div>
                        
                      </div>
                      <div className="col-md-8">
                        <div className="premiumBrekp02">
                          <h5>Basic Covers</h5>
                          <p>
                            <span>Basic OD Premium :</span>
                            <span>₹ {this.state.BasicOD}</span>
                          </p>
                          <p>
                            <span>Basic TP Premium :</span>
                            <span>₹ {this.state.BasicTP}</span>
                          </p>
                          <p>
                            <span>
                              Driver Covers already included in OD Premium
                            </span>
                          </p>
                          <div className="texArea">
                            <h5>Tax</h5>
                            <p>
                              <span>GST :</span>
                              <span>₹ {this.state.GST}</span>
                            </p>
                          </div>
                          <h4>
                            <span>Total Premium :</span>
                            <span>₹ {this.state.TotalPrimium}</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {this.state.IsMessage ? (
            <div class="Manualmodal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header text-center">
                    <span>Message</span>
                    <button
                      type="button"
                      class="close btn-success"
                      onClick={this.CloseMessage}
                    >
                      ×
                    </button>
                  </div>
                  <div class="modal-body">
                    <span>{this.state.MessageBody}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
         
        </div>
        
      </div>
    );
  }
}
