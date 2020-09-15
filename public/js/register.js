$( "#registerForm" ).submit(function( event ) {
    $.post( "/users/register",$( "#registerForm" ).serialize() , function( data ) {
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