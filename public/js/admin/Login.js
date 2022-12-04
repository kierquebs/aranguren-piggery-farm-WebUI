var API = 'https://app-5609cb46-7bb7-4ea3-9258-b20b3bf65b1a.cleverapps.io/API'
var UI = 'http://app-60a5d999-64e1-4df9-b489-3791717d943a.cleverapps.io/'

$(document).ready(function(){

  $("#btn_login").click(function(){
    var username = $('#username').val();
    var password = $('#password').val();
    console.log(username +" . " + password)
    Login(username,password)
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
      var dta = JSON.parse(JSON.stringify(req))
      switch(dta.responseCode){
        case 200:
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logged In!',
            showConfirmButton: false,
            timer: 1500
          })
          
          
          $(location).prop('href', UI+'admin/dashboard/'+dta.data.Token)
        break;
        case 400:
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error login!',
            showConfirmButton: false, 
            timer: 1500
          })
        break;
        case 500:
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error login!',
            text:dta.message,
            showConfirmButton: false, 
            timer: 1500
          })
        break;
      }
      
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