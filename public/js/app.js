$(document).ready(function(){


// $("#addburger").on("click", function(event) {
//     event.preventDefault();
  
//     // Make a newBurger object
//     var newBurger = {
//       burger_name: $("#burgerInput").val().trim(),
//     //   body: $("#chirp-box").val().trim(),
//     //   created_at: moment().format("YYYY-MM-DD HH:mm:ss")
//     };
  
//     console.log(newBurger);

// $.ajax("/api/burgers", {
//     type: "POST",
//     newBurger
//   }).then(
//     function(data) {
//       console.log("added new burger");
//       // Reload the page to get the updated list
//       location.reload();

//       var html = "<div>" + data.burger_name + "</div>"
//       $("#newBurger").append(html)
//     }
//   );
// });


// ---------------------- UPDATE FUNCTION ----------------------------- //

$(document).on("click", "devourburger", function(event){
    event.PreventDefault()
    
    var updateID = $(this).attr('data-id');
    var updatePath = '/api/burgers' + updateID;

        $.ajax(updatePath, {
            type: "PUT",
            data: updatedBurger
        }).then(function(data){
            console.log("Burger at: " + updateID + "updated!");
            location.reload()

        }) .catch((err) => {
            console.log(err)
            $("#messages").text(err);
        })
});

$("deleteburger").on("click", function(event){
    event.PreventDefault()
    var deleteID = $(this).attr('data-id');
    var deletePath = '/api/burgers/zero' + deleteID;
    $.ajax(deletePath, {
        type: "DELETE",
        data: deletedBurger
    }).then(function(data){
        console.log('deleted burger at: ' + deleteID);
        location.reload()
    }).catch(function(err){
        $("#messages").text(err);
        
    })


})

});