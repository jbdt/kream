if (window.matchMedia("(orientation: portrait)").matches) {
    $(".js-height-full").height($(window).height());
}
if ((window.matchMedia("(orientation: landscape)").matches) && (window.matchMedia('screen and (max-width: 990px)').matches)) {
    $(".js-height-full").height($(window).width());
}
if ((window.matchMedia("(orientation: landscape)").matches) && !(window.matchMedia('screen and (max-width: 990px)').matches)) {
    $(".js-height-full").height($(window).height());
}

$(".js-height-parent").each(function() {
    $(this).height($(this).parent().first().height());
});


// Fun Facts
function count($this) {
    var current = parseInt($this.html(), 10);
    current = current + 1; /* Where 50 is increment */

    $this.html(++current);
    if (current > $this.data('count')) {
        $this.html($this.data('count'));
    } else {
        setTimeout(function() {
            count($this)
        }, 50);
    }
}

$(".stat-timer").each(function() {
    $(this).data('count', parseInt($(this).html(), 10));
    $(this).html('0');
    count($(this));
});



$('.header').affix({
    offset: {
        top: 100,
        bottom: function() {
            return (this.bottom = $('.footer').outerHeight(true))
        }
    }
})

var loaded = false;
$(window).load(function() {
    loaded = true;
    if($('#dummy_gif').length > 0) {
        $('#dummy_image').hide();
        $('#dummy_gif').show();
    }
    $("#preloader").on(500).fadeOut();
    $(".preloader").on(600).fadeOut("slow");
});
setTimeout(function(){
    if($('#dummy_gif').length > 0 && !loaded) {
        $('#dummy_gif').hide();
    }
    $("#preloader").on(500).fadeOut();
    $(".preloader").on(600).fadeOut("slow");
}, 5000);

$('#modal-owner').on('shown.bs.modal', function () {
    $('#modal-input').focus();
})