$(document).ready(function() {
	  $('.tabs li').click(function(){
	    if ($(this).hasClass('selected')===false) {
	      $('.tabs li').removeClass('selected');
	      $(this).addClass('selected');
	    }
	    var selectionId = $(this).attr('id');
	    $('.content').fadeOut('fast', function(){
	      $('div .page').css('display','none');
	      $('.page#'+selectionId).css('display','block');
	      $('.content').fadeIn('fast');
	    });
	  });
	});