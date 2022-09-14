API = "http://app-fe0cdbe7-3c23-4751-866f-cec4a14eeeb2.cleverapps.io/API"

$(function(){
    $.ajax({
        type: 'GET',
        dataType:"jsonp",
        url: API + '/stock/ListAll',
        success: function (data, status, xhr) {
        console.log('data: ', data);
        }
    });
});
