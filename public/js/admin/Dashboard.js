var API = 'https://app-5609cb46-7bb7-4ea3-9258-b20b3bf65b1a.cleverapps.io/API'

$(document).ready(function(){


  ShowGeneralComputation();

  function ShowGeneralComputation(){
    $.ajax({
      url: API+ '/stock/GeneralExpectedWeight',
      type: 'post',
      async:false,
      success : function(req) {
        var weight = JSON.parse(JSON.stringify(req));
        
        for (let i = 0; i < weight.Projected_Weight.length; i++) {
          $("#w_"+i).text(weight.Projected_Weight[i].weight);
          console.log(weight.Projected_Weight[i].weight)
        }
          
      },
      error : function(){
  
      }
    });
  }



})