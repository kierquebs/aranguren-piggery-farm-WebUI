var API = 'https://app-fe0cdbe7-3c23-4751-866f-cec4a14eeeb2.cleverapps.io/API'

$(document).ready(function(){

  $.ajax({
	  url: API+ '/stock/ListAll',
    type: 'get',
    async:false,
    success : function(req) {
      var stocks = JSON.parse(JSON.stringify(req));
      var html = "";
      for (let i = 0; i < stocks.length; i++) {
        html += `<tr>`+
                    `<td>` + formatDate2(stocks[i].added_date) + `</td>` +
                    `<td>` + stocks[i].added_by + `</td>` +
                    `<td>` + formatDate2(stocks[i].last_updated_date) + `</td>` +
                    `<td>` + stocks[i].updated_by + `</td>` +
                    `<td>` + stocks[i].initial_weight + `</td>` +
                    `<td>` + stocks[i].current_weight + `</td>` +
                    `<td>` + stocks[i].type + `</td>` +
                    `<td>` + stocks[i].type_description + `</td>` +
                    `<td> ₱` + stocks[i].current_price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + `</td>` +
                    `<td>` + formatDate2(stocks[i].current_price_last_updated_date) + `</td>` +
                    `<td>` + stocks[i].remarks + `</td>`+
                    `<td style="text-align:center">
                      <button type="button" id=`+stocks[i].id+`|`+stocks[i].added_date+` class="btn btn-secondary btn-gen-qr" data-toggle="tooltip" data-placement="top" title="Generate QR">
                        <span class="material-symbols-outlined">
                          qr_code_2
                        </span>
                      </button>
                    </td>`;
      }
      document.getElementById("table_data").innerHTML = html;
    },
    error : function(){

    }
  });


  $(".btn-gen-qr").click(function(){
    var id = $(this).attr("id");
    const idArr = id.split("|");
    var url = generateQR(idArr[0],idArr[1])
    
    if (url == null){

    }else{
      $('#btn-modal-footer-copy-img').attr('value', url);
      $('#img-QR').attr('src', url);
      $("#qrCode").modal('show');
    }
    
  })



  $("#btn-add-stock").click(function(){

    loadClassification()
    $("#addNewStockModal").modal('show');
    
  })

  $("#btn-modal-footer-copy-img").click(function(){
    var url = $(this).val();
    console.log(url)
    $('.toast').toast({delay: 2000});
    $('.toast').toast('show');
    copyImage(url)
    
  })


  $("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
  });
  
  
  function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  
  function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;
  
  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {
  
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");
  
    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);
  
    // add commas to left side of number
    left_side = formatNumber(left_side);
  
    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);
  
    // join number by .
    input_val = "$" + left_side + "." + right_side;
  
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "₱" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);
  
  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
  }

});

function checkThis(str){
  var num = new Number(str);
  if(/^[0-9]{0,3}(\.[0-9]{0,2})?$/.test(str) && num > 0){
      alert('input is valid');
  } else {
     alert('input is invalid');
  }
}

function isNumberKey(txt, evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode == 46) {
    //Check if the text already contains the . character
    if (txt.value.indexOf('.') === -1) {
      return true;
    } else {
      return false;
    }
  } else {
    if (charCode > 31 &&
      (charCode < 48 || charCode > 57))
      return false;
  }
  return true;
}




var generateQR = function (stockID,dateAdded){
  var url = null;
  $.ajax({
      url: API+'/qr/Generate',
      type: 'post',
      dataType: 'json',
      async:false,
      data :{ id: stockID,
              added_date: dateAdded
      },
      success : function(req) {
          var ret = JSON.parse(JSON.stringify(req))
          url = ret.data.url
          copyImage(url)
          
      },
      error : function(){
      }
      
  });

  return url
}

function imageToBlob(imageURL) {
  const img = new Image;
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  img.crossOrigin = "";
  img.src = imageURL;
  return new Promise(resolve => {
    img.onload = function () {
      c.width = this.naturalWidth;
      c.height = this.naturalHeight;
      ctx.drawImage(this, 0, 0);
      c.toBlob((blob) => {
        // here the image is a blob
        resolve(blob)
      }, "image/png", 0.75);
    };
  })
}

async function copyImage(imageURL){

  const blob = await imageToBlob(imageURL)
  const item = new ClipboardItem({ "image/png": blob });
  navigator.clipboard.write([item]);

  
}



function loadClassification(){
  $.ajax({
      url: API+'/classification/ListAll',
      type: 'get',
      async:false,
      success : function(req) {
          var ret = JSON.parse(JSON.stringify(req))
          console.log(ret)
          
      },
      error : function(){
      }
      
  });
}




// Format: [yyyy-mm-dd]
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


// Format: [mm/dd/yyyy]
function formatDate2(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join('/');
}


