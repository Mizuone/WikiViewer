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
                        $(".responsecontainer").fadeOut(0 ,function(){
                            $(".responsecontainer").html("<h1>You Searched ''" + data[0] + "'' ");
                            $(".responsecontainer h1").addClass("headingresult");
                            $(".responsecontainer").append('<ul class="resultformat">' + "</ul>");
                            for (var i = 0; i < data[1].length; i++) {
                                $(".responsecontainer ul").append('<a href="'+ wikiSite + data[1][i] + '">' + 
                   "<li>" +
                        '<div class="row">' + 
                            '<div class="col-lg-4">' +
                                "<h2>" + data[1][i] + "</h2>" +
                            "</div>"
                        +   '<div class="col-lg-8">' + 
                                "<p>" + data[2][i] + "</p>" + 
                            "</div>" + 
                        "</div>" 
                   + "</li></a><br>"); 
                            }
                        }); 
                        $(".responsecontainer").fadeIn();
                        var styleListItem = document.querySelectorAll(".resultformat li");
                        for (let i = 0; i < styleListItem.length; i++) {
                            
                        }
                        /*$(".resultformat li").on("mouseover", function() {
                            $(this).fadeIn(function() {
                               $(".resultformat li").css({
                                  "border-left": "solid 5px red" 
                               }); 
                            });
                        });*/
                        //$(".res")
                        //http://ejohn.org/apps/learn/ javascript tutorials random note for later
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
