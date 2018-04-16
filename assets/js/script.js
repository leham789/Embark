//Script

//SVG Image to Outline
$(function(){
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {

            var $svg = jQuery(data).find('svg');

            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }

            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            $svg = $svg.removeAttr('xmlns:a');
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
            }
            $img.replaceWith($svg);
        }, 'xml');
    });
});


//Delete Profile Picture
(function() {
    // Bind an action to the deleteUserPhotoAction click event
    $("#deleteUserPhotoAction").on('click', function() {
        // Add the value 'zap' to the deleteUserPhoto input
        document.getElementById("deleteUserPhotoInput").value = 'zap';
    });
})();

//Disable Scroll Out
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

//Scroll Reveal
window.sr = new ScrollReveal();
sr.reveal('.locations', {
  reset: true,
  duration: 1100,
  delay: 200,
  origin: 'bottom',
  distance: '20px',
}, 0);
