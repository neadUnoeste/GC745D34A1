//Opening animation
$(window).on('load', function () {
    $('.lx-opening').removeClass('active');
});

$(document).ready(function () {
    //Menu anchors animation
    $('.link-menu').click(function (event) {
        var position = $(this).data('position');
        var target = '.' + $(this).data('target');

        if (target.length) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(target).offset().top + position
            }, 1000);
            if ($(window).width() < 1024) {
                if(!$(this).hasClass("btn-top")){
                    toggleMenu();
                }
            }
        }
    });

    if($(window).scrollTop()>0){
        $('.menu-desktop,.menu-mobile').addClass('active');
    }

    //Menu (Desktop and MB) animation
    $(window).scroll(function () {
        if ($(window).scrollTop() > 1) {
            $('.menu-desktop').addClass('active');
            $('.menu-mobile').addClass('active');
        } else {
            $('.menu-desktop').removeClass('active');
            $('.menu-mobile').removeClass('active');
        }
    });

    //Event listener Menu MB (btn toggle)
    $('.btn-open-menu, .btn-close-menu').click(function () {
        toggleMenu();
    });

    //Event listener Accessibility (btn toggle)
    $('.btn-accessibility').click(function () {
        toggleAccessibility();
    });

    //Show / Hide BTN to top
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('.btn-top').css('display', 'flex');
        } else {
            $('.btn-top').hide(200);
        }
    });

    // Modal btn open
    $('.btn-open-modal').click(function () {
        var buttonOption = $(this).data('content-option');
        $('.modal-container').removeClass('out');
        $('.modal-container').addClass('open');
        $('.modal-content [data-content="' + buttonOption + '"]').addClass('show');
        $('body').addClass('modal-active');
        setTimeout(function () {
            // After 1 second
            $('.modal-svg').css('z-index', '-1');
        }, 1000);
    });

    // Modal btn close
    $('.btn-close-modal').click(function () {
        //Just remove the loading animation of the buttons
        $('.btn-send-sec-activities').removeClass('lx-is-loading');
        $('.send').removeClass('lx-is-loading');
        $('.modal-container').removeClass('open');
        $('.modal-container').addClass('out');
        $('.send').removeClass('lx-is-loading');
        $('body').removeClass('modal-active');
        $('.content').removeClass('show');
        $('iframe').each(function(){
            $(this).attr('src',$(this).attr('src'));
        });
        setTimeout(function () {
            // After 1 second
            $('.modal-svg').css('z-index', '1');
        }, 1000);
    });

    //HandTalk activation
    $('#btnSetHandtalk').click(function(){
        unoesteHandTalk.toggleHandTalk(true);
    });

    //Show the activities questions (simple toggle) 
    $('.btn-sec-activities').click(function () {
        if (!$('.test-content').hasClass('active')) {
            $('.btn-sec-activities').html('Cancelar');
            $('.test-content').addClass('active');
        } else {
            $('.btn-sec-activities').html('Iniciar');
            $('.test-content').removeClass('active');
            $('.small-sec-activities').css('display', 'none');
        }
    });

    // Check the answers of the activities (uses the same logic as the above function)
    $('.btn-send-sec-activities').click(function () {
        $(this).addClass('lx-is-loading');
        $(this).addClass('disabled');

        var hits = 0;
        var mistakes = 0;
        var selected = [];

        $(".question-sec-activities").prop("disabled", true);

        $.each($(".question-sec-activities option:selected"), function () {
            selected.push($(this).val());
            if ($(this).val() == 'true') {
                hits++;
            } else {
                mistakes--;
            }
        });

        $('.hits').html(hits);
        $('.mistakes').html(mistakes);
        $('.modal-container').removeClass("out");
        $('.modal-container').addClass("open");
        $('.content-fixation').addClass('show');
        $('body').addClass('modal-active');
        setTimeout(function () {
            $(".modal-svg").css('z-index', '-1');
        }, 1000);

        $('.small-sec-activities').css('display', 'block');
    });

    // Print functions
    $(".btn-to-pdf").click(function () {
        $("#outprint-just-text").show();
        $(".print-text").show();

        var content = $("main").contents()
            .find("h1, h2, h3, h4, h5, p, a, span, label, option, small, ul li, img.print, svg.print, .print-text")
            .not("a p, a div, a h1, a h2, a h3, h3 a, a h4, a h5, p a, label span, label p, h3 span, h2 span, p span, #panorama *, .no-print")
            .clone();
        $("#outprint-just-text").html(content);
        $("#outprint-just-text img, svg").wrap(function () {
            return "<div class='image'></div>";
        });
        $("#outprint-just-text option").prepend("&nbsp;-&nbsp;");
        $("#outprint-just-text").printArea({ mode: 'iframe', popClose: true });

        $(".print-text").hide();
        $("#outprint-just-text").hide();
    });

    //Animations (AOS init)
    AOS.init();

    //Interactions
});

//Functions
function toggleMenu() {
    if ($('.nav-mobile').hasClass('active')) {
        $('.nav-mobile').removeClass('active');
    } else {
        $('.nav-mobile').addClass('active');
    }
}

function toggleAccessibility() {
    if ($('.accessibility').hasClass('active')) {
        $('.accessibility').removeClass('active');
    } else {
        $('.accessibility').addClass('active');
    }
}