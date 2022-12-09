var API = 'https://app-5609cb46-7bb7-4ea3-9258-b20b3bf65b1a.cleverapps.io/API'

$(document).ready(function(){

  
  ListAllPurchases();

  $(".btn-action").click(function(){
    var id = $(this).attr("id");
    var idArr = id.split("|");
    
    ListOfPigsPerRefID(idArr[0])
   
   
    
  })

  function ListAllPurchases(){
    $.ajax({
      url: API+ '/transaction/Find',
      type: 'get',
      async:false,
      success : function(req) {
        var purchases = JSON.parse(JSON.stringify(req));
        console.log(purchases)
        var html = "";
        for (let i = 0; i < purchases.data.length; i++) {
          
          html += `<tr>`+
                      `<td style="text-align:center">` + purchases.data[i].ref_id + `</td>` +
                      `<td style="text-align:center">` + formatDate2( purchases.data[i].trn_date) + `</td>` +
                      `<td style="text-align:center">` +  purchases.data[i].first_name + " " +   purchases.data[i].middle_name + " " +  purchases.data[i].last_name + `</td>` +
                      `<td style="text-align:center">` +  purchases.data[i].price_per_kilo.toFixed(2) + `</td>` +
                      `<td style="text-align:center">` +  purchases.data[i].mobile_no + `</td>` + 
                      `<td style="text-align:center">
                        <button type="button" id=`+ purchases.data[i].ref_id +`|`+ purchases.data[i].trn_date+` class="btn btn-secondary btn-action" data-toggle="tooltip" data-placement="top" title="View more details">
                          <span class="material-symbols-outlined">
                            list
                          </span>
                        </button>
                      </td>`;
        }
        document.getElementById("table_data").innerHTML = html;
      },
      error : function(){
  
      }
    });
  }

  function ListOfPigsPerRefID(refID){
    $.ajax({
      url: API+ '/transaction/Find/'+refID,
      type: 'get',
      async:false,
      success : function(req) {
        var purchases = JSON.parse(JSON.stringify(req));
        var html = "";
        for (let i = 0; i < purchases.data[0].pigs.length; i++) {
          console.log(purchases.data[0].pigs[i].id,purchases.data[0].pigs[i].added_date,purchases.data[0].pigs[i].initial_weight)
          html += `<tr>`+
                      `<td style="text-align:center">` + purchases.data[0].pigs[i].id + `</td>` +
                      `<td style="text-align:center">` + formatDate2(purchases.data[0].pigs[i].added_date) + `</td>` +
                      `<td style="text-align:center">` + purchases.data[0].pigs[i].initial_weight.toFixed(2) + `</td>` +
                      `<td style="text-align:center">` + purchases.data[0].pigs[i].final_weight.toFixed(2) + `</td>`;
        }
        document.getElementById("modal_table_data_pigs").innerHTML = html;
        $("#pigs_list").modal('show');
      },
      error : function(){
  
      }
    });
  }
  



  $("#btn-add-stock").click(function(){

    loadClassification()
    $("#addNewStockModal").modal('show');
    
  })

  $("#btn-modal-footer-copy-img").click(function(){
    var url = $(this).val();
    var id = $(this).attr("name");
    console.log(url)
    $('.toast').toast({delay: 2000});
    $('.toast').toast('show');
    copyImage(url,id)
    
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
          copyImage(url,stockID)
          
      },
      error : function(){
      }
      
  });

  return url
}

function imageToBlob(imageURL,label) {
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
      ctx.font = '30px serif';
      ctx.fillText('#'+ label, c.width / 2.5, c.height);
      c.toBlob((blob) => {
        // here the image is a blob
        resolve(blob)
      }, "image/png", 0.75);
      
    };
  })
}

async function copyImage(imageURL,label){

  var blob = await imageToBlob(imageURL,label)
  var item = new ClipboardItem({ "image/png": blob });                   
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
