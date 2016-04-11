var obj = {
  firstName: 'Tomer',
  lastName: 'David',
  age: 23
}

$.ajax({
  method: "POST",
  url: 'http://localhost:8080',
  data: obj,
  dataType: "json",
  success: function(data) {
    $('body').append('<p>' + data.msg + '</p>');
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  }
});

$.ajax({
  method: "GET",
  url: 'http://localhost:8080',
  dataType: "json",
  success: function(data) {
    $('body').append('<p>' + JSON.stringify(data) + '</p>');
  },
  error: function(jqXHR, textStatus, errorThrown) {
    //console.log(jqXHR);
  }
});