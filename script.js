"use strict";
$(document).ready(function() {
   var WikiSpace = {};
    WikiSpace = function() {
        $("#formcontrol input").keypress(function (e){
           if (e.which == 13) {
               var formInput = $(this).val(),
                   wikiapi = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + formInput + "&format=json&callback=?",
                   wikiref = "https://en.wikipedia.org/wiki/";
               
               wikiResult(wikiapi, wikiref, formInput);
               e.preventDefault();
           } 
        });
        function wikiResult(wikiEntry, wikiSite, titleContent) {
               $.ajax({
                   url: wikiEntry,
                   type: 'GET',
                   contentType: "application/json; charset=utf=8",
                   async: true,
                   dataType: 'json',
                   success: function(data, status, jqXHR){
                        $(".responsecontainer").fadeOut(0 ,function(){
                            $(".responsecontainer").html("<h1>You Searched ''" + data[0] + "'' ");
                            $(".responsecontainer h1").addClass("headingresult");
                            $(".responsecontainer").append('<ul class="resultformat">' + "</ul>");
                            for (var i = 0; i < data[1].length; i++) {
                                $(".responsecontainer ul").append('<a href="'+ wikiSite + data[1][i] + '" target="_blank">' + 
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
                        for (var x = 0; x < styleListItem.length; x++) {
                            $(styleListItem[x]).on("mouseover", function() {
                                $(this).css({
                                  "transition": "0.1s ease-in-out",
                                  "border-left": "solid 3px red"  
                                });
                            })
                            $(styleListItem[x]).on("mouseleave", function() {
                                $(this).css({
                                  "transition": "0.1s ease-in-out",
                                  "border-left": "none"  
                                });
                            })
                        }
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
               $("#formcontrol input").val('');
        }
        $("#randombutton").on("click", function() {
                window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
        });
    };
    WikiSpace();
});
