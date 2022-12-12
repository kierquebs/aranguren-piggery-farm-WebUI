var API = 'https://app-5609cb46-7bb7-4ea3-9258-b20b3bf65b1a.cleverapps.io/API'
var appointments

document.addEventListener('DOMContentLoaded', function() {
    listAppointments();
  
});

function listAppointments(){
    getAllAppointments();
    console.log("asas " + JSON.parse(JSON.stringify(appointments)))
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        eventClick: function(info) {
            var eventObj = info.event;
            console.log("id:" + eventObj.extendedProps.ids)
            var message_body = '<b>Mobile Number: </b>' + eventObj.extendedProps.mobile +
                               '<br/><b>Email Address: </b>' + eventObj.extendedProps.email_address + 
                               '<br/><br/><button type="button" id="'+ eventObj.extendedProps.ids +'" role="button" onClick="cancelAppointment(this.id)" tabindex="0" class="btn btn-danger cancel-appointment">Cancel Appointment</button>' 
            Swal.fire({
                position: 'center',
                title: eventObj.title,
                html:message_body,
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
        events: JSON.parse(JSON.stringify(appointments))
    });
    calendar.render();
}

var getAllAppointments = function (){

    $.ajax({
        url: API + '/appointment/list',
        type: 'get',
        async:false,
        success : function(req) {
            var appt = JSON.parse(JSON.stringify(req))
            
            console.log(appt)
            appointments = []

            for(i=0;i< appt.length; i++){
                var newEntry = {
                    "ids":appt[i].id.toString(),
                    "title" : appt[i].first_name + " " + appt[i].last_name,
                    "mobile" : appt[i].mobile_number, 
                    "email_address" : appt[i].email_address, 
                    "start" : formatDate1(appt[i].appointment_date)
                };
                appointments.push(newEntry);
            }
        },
        error : function(){
        }
    });
}



$(document).ready(function(){
    getAllAppointments()
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

function cancelAppointment(id){
    $.ajax({
        url: API + '/appointment/Delete/'+id,
        type: 'post',
        async:false,
        success : function(req) {
            var req = JSON.parse(JSON.stringify(req))
            switch(req.responseCode){
                case 200:
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cancelled',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  listAppointments();
                break;
                case 500:
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    text:req.message,
                    showConfirmButton: false, 
                    timer: 1500
                  })
                break;
              }
        },
        error : function(){
        }
    });
}



// Format: [yyyy-mm-dd]
function formatDate1(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}







