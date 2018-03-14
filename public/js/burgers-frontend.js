// $("#addburger").on("click", function(event) {
//     event.preventDefault();
  
//     // Make a newChirp object
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