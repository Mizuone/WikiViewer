"use strict";
$(document).ready(function() {
   var WikiSpace = {};
    WikiSpace = function() {
        $("#formcontrol input").keypress(function (e){
           if (e.which == 13) {
               var titleContent = $(this).val(),
                   wikiEntry = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + titleContent + "&format=json&callback=?",
                   wikiSite = "https://en.wikipedia.org/wiki/";
               $.ajax({
                   url: wikiEntry,
                   type: 'GET',
                   contentType: "application/json; charset=utf=8",
                   async: false,
                   dataType: 'json',
                   success: function(data, status, jqXHR){
                        $(".responsecontainer").fadeOut(function(){
                            $(".responsecontainer").html("<h1>You Searched ''" + data[0] + "'' ");
                            $(".responsecontainer h1").addClass("headingresult");
                            $(".responsecontainer").append('<ul class="resultformat">' + "</ul>");
                            for (var i = 0; i < data[1].length; i++) {
                                $(".responsecontainer ul").append('<a href="'+ wikiSite + data[1][i] + '">' + "<li>" + "<h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] + "</p>" + "</li></a><br>");
                            }
                            
                        }); 
                        $(".responsecontainer").fadeIn();
                   /*console.log(data);
                     console.log(data[0]);
                     console.log(data[1][0]);*/
                   },
               })
               .done(function() {
                   console.log("success");
               })
               .fail(function() {
                   console.log("Failed");
               })
               .always(function() {
                 console.log("Complete");  
               });
               e.preventDefault();
               $(this).val('');
           } 
        });
    };
    WikiSpace();
});