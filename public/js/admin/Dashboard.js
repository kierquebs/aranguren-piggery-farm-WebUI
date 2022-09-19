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
                    `<td>` + stocks[i].remaks + `</td>`+
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

  $("#btn-modal-footer-copy-img").click(function(){
    var url = $(this).val();
    console.log(url)
    $('.toast').toast({delay: 2000});
    $('.toast').toast('show');
    copyImage(url)
    
  })

});


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


