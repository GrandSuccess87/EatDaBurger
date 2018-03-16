$(document).ready(function () {

    // ---------------------- INSERT FUNCTION ----------------------------- //
    // ---------------------- USED FORM ACTION, POST METHOD INSTEAD ----------------------------- //
    // ---------------------- JUST WANT TO SHOW I KNOW HOW TO DO THIS WAY TOO ----------------------------- //


    // $("#addburger").on("click", function(event) {
    //     event.preventDefault();

    //     // Make a newBurger object
    //     var newBurger = {
    //       burger_name: $("#burgerInput").val().trim(),
    //     };

    //     console.log(newBurger);

    // $.ajax("/api/burgers", {
    //     type: "POST",
    //     data: newBurger
    //   }).then(
    //     function(data) {
    //       console.log("added new burger");
    //       // Reload the page to get the updated list
    //       location.reload();

    //       var insert = "<div>" + data.burger_name + "</div>"
    //       $("#newBurger").append(insert)
    //     }
    //   );
    // });


    // ---------------------- UPDATE FUNCTION ----------------------------- //

    $(document).on("click", ".devourburger", function (event) {
        event.preventDefault()

        var updateID = $(this).data('id');
        var updatePath = "/api/burgers/" + updateID;
        var updatedBurger = {
            id: updateID,
            devoured: true
        };

        $.ajax(updatePath, {
            type: "PUT",
            data: updatedBurger
        }).then(function () {
            console.log("Burger at: " + updateID + "updated!");
            location.reload()

        })
    });

    // ---------------------- DELETE FUNCTION ----------------------------- //
    // ---------------------- USING PARTIAL BLOCK IN PARTIALS FOLDER----------------------------- //
    // ---------------------- JUST WANT TO SHOW I KNOW HOW TO DO THIS WAY TOO ----------------------------- //

    // $(document).on("click", ".delete", function(event){
    //     event.PreventDefault()
    //     var deleteID = $(this).data('id');
    //     var deletePath = '/api/burgers/' + deleteID;

    //     var deletedBurger = {
    //         id: deleteID
    //     };

    //     $.ajax(deletePath, {
    //         type: "DELETE",
    //         data: deletedBurger
    //     }).then(function(data){
    //         console.log('deleted burger at: ' + deleteID);
    //         location.reload()
    //     })
    // .catch(function(err){
    //     $("#messages").text(err);

    // })


    // })

});