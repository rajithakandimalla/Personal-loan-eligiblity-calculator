
// *************************************************************************************************
// Function to calculate present value of an investment..
// Parameters are rate, total number of periods, payment made each period, future value and type (when payments are due)
function pv(rate, per, nper, pmt, fv)
{
nper = parseFloat(nper);
pmt = parseFloat(pmt);
fv = parseFloat(fv);
rate = eval((rate)/(per * 100));
if (( pmt == 0 ) || ( nper == 0 )) {
alert("Why do you want to test me with zeros?");
return(0);
}
if ( rate == 0 ) // Interest rate is 0
{
pv_value = -(fv + (pmt * nper));
}
else
{
x = Math.pow(1 + rate, -nper);
y = Math.pow(1 + rate, nper);
pv_value = - ( x * ( fv * rate - pmt + y * pmt )) / rate;
}
pv_value = conv_number(pv_value,2);
return (pv_value);
}
function conv_number(expr, decplaces)
{ // This function is from David Goodman's Javascript Bible.
var str = "" + Math.round(eval(expr) * Math.pow(10,decplaces));
while (str.length <= decplaces) {
str = "0" + str;
}
var decpoint = str.length - decplaces;
return (str.substring(0,decpoint) + "." + str.substring(decpoint,str.length));
}

   var user_age, gross_income, ex_emi, elg_emi, sal_base, rows, pv_years,loan_amt  ;
   var table='';
   var cols=5;
// ***************************************************************************************   
// setp1-fininding salary based elegiblity
const salBsdEle=(grossIncome)=>
{
  if(grossIncome >= 20000 && grossIncome <= 35000)
    {
      return 55; //55% of gross salary
    }else if(grossIncome > 35000 &&  grossIncome <=50000)
    {
      return 60; //60% of gross salary
    }else if(grossIncome >50000)
    {
      return 65; //65% of gross income
    }else
    {
      return alert("Sorry Your Salary is too Low to take  Loan");
    }
}

const elgEmi=()=>{
   gross_income= document.getElementById("gross_in").value;
    ex_emi= document.getElementById("ex_emi").value;
   sal_base=salBsdEle(gross_income);
    elg_emi=((gross_income)*(sal_base/100)-ex_emi);
    elgEmiRound=Math.round(elg_emi);

}

const elegAge=(eAge)=>{
  if( eAge>23 && eAge< 53){
    return 5;
  }else if( eAge == 54){
    return 4;
  }else if( eAge == 55){
    return 3;
  }else if( eAge == 56){
    return 2;
  }else if( eAge == 57) {
    return 1;
  }else{
    alert("Sorry! for your Age you are not elegible to take loan");
  }
}

const beLowlac=(amt)=>{
  if(amt<100000){
    return amt +" (NA) "
  }else{
    return amt;
  }
}
const loanAmout=()=>{
  user_age= document.getElementById("usr_age").value;
  var roi = document.getElementById("cur_roi").value;
  elgEmi();
    rows=elegAge(user_age);
    for( var r=1; r<=rows;r++){
      pv_years=r*12;
      loan_amt= Math.round(pv(roi,12,pv_years,-elg_emi,0.05));
      table +='<tr>';
      table +='<td>'+ roi +'%</td>';
      table +='<td> For '+ r + ' Years </td>';
      table +='<td> Rs: '+ elgEmiRound +'</td>';
      table +='<td>' + beLowlac(loan_amt) + '</td>';
      table +='</tr>';  
  }
     document.getElementById("tabletoshow").innerHTML="<table><tr><th>Rate</th><th>Tenure</th><th>Monthly Installments</th><th>Loan Amount</th></tr>"+ table +"</table>";
}