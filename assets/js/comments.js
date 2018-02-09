$(document).ready(function() {

    // Toggle to show/hide replies
    $(document).on('click', 'a.comment-toggle', function(e) {
        e.preventDefault();

        $(this).parents('.comment-single:first').find('.comments-list:first').toggle();
    });

    // Toggle to show/hide reply form
    $(document).on('click', 'a.comment-reply', function(e) {
        e.preventDefault();

        $(this).parents('.comment-single:first').find('.comment-form').toggle();
    });

    // Handle editing
    $(document).on('click', 'a.comment-edit', function(e) {
        e.preventDefault();

        // Simply hides text and shows form
        $(this).parents('.comment-text').find('.comment-content').hide();
        $(this).parents('.comment-text').find('.edit-comment-form').show();
    });

});
