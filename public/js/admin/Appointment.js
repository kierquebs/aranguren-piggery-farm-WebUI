

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        eventClick: function(info) {
            var eventObj = info.event;
            Swal.fire({
                position: 'center',
                title: eventObj.title,
                text:eventObj.extendedProps.description,
                showConfirmButton: false, 
                showCloseButton: true
              })
            
        },
        eventDidMount: function(info) {
            var tooltip = new Tooltip(info.el, {
              title: info.event.extendedProps.description + '<>'+ info.event.extendedProps.contact ,
              placement: 'top',
              trigger: 'hover',
              container: 'body'
            });
        },
        initialDate: '2022-12-15',
        events: [
        {
            title: 'Mr. Chan',
            start: '2022-12-02',
            description: '09123456789',
            email:'client1@gmail.com'
        },
        {
            title: 'Mr. Reyes',
            start: '2022-12-02',
            description: '09123456789',
            email:'client1@gmail.com'
        },
        {
            title: 'event with URL',
            url: 'https://www.google.com/',
            start: '2022-12-03'
        }
        ]
    });
    calendar.render();
});



$(document).ready(function(){

    


    function ListAllAppointment(){
        $.ajax({
          url: API+ '/appointment/list',
          type: 'get',
          async:false,
          success : function(req) {
            var stocks = JSON.parse(JSON.stringify(req));
            var html = "";
            for (let i = 0; i < stocks.length; i++) {
      
              html += `<tr>`+
                          `<td style="text-align:center">` + stocks[i].id + `</td>` +
                          `<td style="text-align:center">` + formatDate2(stocks[i].added_date) + `</td>` +
                          `<td style="text-align:center">` + stocks[i].initial_weight.toFixed(2) + `</td>` +
                          `<td style="text-align:center">` + stocks[i].estimated_current_weight.toFixed(2) + `</td>` +
                          `<td style="text-align:center">` + stocks[i].age_by_days + `</td>` + //age by days
                          `<td style="text-align:center">` + stocks[i].description + `</td>` + //description
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
      }

});



