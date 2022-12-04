var API = 'https://app-5609cb46-7bb7-4ea3-9258-b20b3bf65b1a.cleverapps.io/API'

$(document).ready(function(){

  $("#btn_login").click(function(){
    var username = $('#username').val();
    var password = $('#password').val();
    console.log(username +" . " + password)
  })
});

function Login(user, pass){
  $.ajax({
    url: API+'/user/Login',
    type: 'post',
    async:false,
    data :{ username: user,
            password: pass
    },
    success : function(req) {
     
      $("#addNewStockModal").modal('hide');
      $('#initial_day_old').val("");
      $('#initial_weight').val(""); 
      

      console.log(JSON.parse(JSON.stringify(req)))
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'New stock has been added!',
        showConfirmButton: false,
        timer: 1500
      })
      
      var delayInMilliseconds = 1500; //1.5 second
      
      setTimeout(function() {
        ListAllStock();
      }, delayInMilliseconds);
    },
    error : function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again.'
      })
      
      return
    }
   
    
});
}