$(function(){jQuery("img.svg").each(function(){var t=jQuery(this),e=t.attr("id"),r=t.attr("class"),a=t.attr("src");jQuery.get(a,function(a){var i=jQuery(a).find("svg");void 0!==e&&(i=i.attr("id",e)),void 0!==r&&(i=i.attr("class",r+" replaced-svg")),i=i.removeAttr("xmlns:a"),!i.attr("viewBox")&&i.attr("height")&&i.attr("width")&&i.attr("viewBox","0 0 "+i.attr("height")+" "+i.attr("width")),t.replaceWith(i)},"xml")})}),function(){$("#deleteUserPhotoAction").on("click",function(){document.getElementById("deleteUserPhotoInput").value="zap"})}(),document.addEventListener("gesturestart",function(t){t.preventDefault()}),window.sr=new ScrollReveal,sr.reveal(".locations",{reset:!0,duration:1100,delay:200,origin:"bottom",distance:"20px"},0);