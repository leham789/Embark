$(document).ready(function(){$(document).on("click","a.comment-toggle",function(t){t.preventDefault(),$(this).parents(".comment-single:first").find(".comments-list:first").toggle()}),$(document).on("click","a.comment-reply",function(t){t.preventDefault(),$(this).parents(".comment-single:first").find(".comment-form").toggle()}),$(document).on("click","a.comment-edit",function(t){t.preventDefault(),$(this).parents(".comment-text").find(".comment-content").hide(),$(this).parents(".comment-text").find(".edit-comment-form").show()})});