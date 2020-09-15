$( "#loginForm" ).submit(function( event ) {
    $.post( "/users/login",$( "#loginForm" ).serialize() , function( data ) {
        if(data.success)
        {
            console.log("hello");
        }
        else{
            console.log(data.message);
        }
      }, "json");

    event.preventDefault();
  });