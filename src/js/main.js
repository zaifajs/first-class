// Declaring DOM elements
var $product = $(".product");
var $gallery = $(".gallery");
var $testimonial = $(".testimonial__wrapper");

var $popup = $("#popup");

//  popup functions
// An array to easily update the videos urls
var videos = [
    "https://player.vimeo.com/video/310337110",
    "https://player.vimeo.com/video/183741782",
    "https://player.vimeo.com/video/307967728",
    "https://player.vimeo.com/video/124053378",
    "https://player.vimeo.com/video/143025486"
];


$(".btn--popup").click(function (event) {

    $("body").addClass("modal-open");
    // We know the button is an <li> child of a <ul> element.
    // We want to know which child is this in order to correlate it to the videos array
    var index = getChildIndex(event.target);

    // Use the child index to pick a different video
    document.getElementById("popup__player").setAttribute("src", videos[index]);


    // When targeting a DOM element by ID, you can simply use the id name like the bellow. GSAP will find the element for you automatically
    TweenMax.to($popup, 0.5, {
        autoAlpha: 1
    });
    // Delay the showing of the video so that it does not flicker when changing sources
    TweenMax.to("iframe", 0.3, {
        autoAlpha: 1,
        delay: 0.5
    });
    e.preventDefault();
});

$(".popup__close").click(function (event) {
    $("body").removeClass("modal-open");
    $popup.find('.videoWrapper').children('iframe').attr('src', '');
    TweenMax.to($popup, 0.5, {
        autoAlpha: 0
    });
    // Hide the video so that it does not flicker when changing sources
    TweenMax.to("iframe", 0.5, {
        autoAlpha: 0
    });

})


function getChildIndex(child) {
    // Get the parent
    // var parent = child.parentNode;
    // Get all children of it
    var children = child.parentNode.children;
    // Starting at 0...
    var i = 0,
        ttl = children.length;
    // ...add +1 to the index until the given child matches the target index.
    while (i < ttl) {
        if (child == children[i]) {
            break;
        }
        i++;
    }
    return i;
}

// ==== Slick Carousel Inits ==== //
$(document).ready(function () {
    $('.product__carousel').slick({
        speed: 500,
        slidesToScroll: 1,
        variableWidth: true,
        initialSlide: 0,
        slidesToShow: 3,
        prevArrow: $('.product .prev'),
        nextArrow: $('.product .next'),
        cssEase: 'linear',
        infinite: false,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],

    });

    $('.gallery__carousel').slick({
        dots: false,
        infinite: false,
        speed: 500,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: $('.gallery .prev'),
        nextArrow: $('.gallery .next'),
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $('.testimonial__slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        infinite: false,
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: $('.testimonial__wrapper .prev'),
        nextArrow: $('.testimonial__wrapper .next'),
    });


});

// set tweenmax items
TweenMax.set($('.product__box'), {
    x: 100,
    opacity: 0,
});
TweenMax.set($('.product__compare-panel'), {
    scale: 0.5,
    opacity: 0,
});

TweenMax.set($('.product__compare-panel .btn'), {
    y: -10,
    autoAlpha: 0
});
TweenMax.set($('.gallery__single'), {
    autoAlpha: 0,
});
TweenMax.set($('.gallery__single .btn'), {
    x: 10,
    autoAlpha: 0
});
TweenMax.set($('.testimonial__img, .testimonial__quote'), {
    y: 100,
    autoAlpha: 0
});

//  trigger compare button functions
$('.product__box').each(function (index, element) {
    var $div = $(this);
    // compare buttons animations
    var tl = new TimelineMax();
    $div.find($('.product__compare-panel .btn')).each(function (index, element) {
        var child = new TimelineLite();
        child.to(element, 0.2, {
            y: 0,
            autoAlpha: 1,
            ease: Power3.ease,
        })
        tl.add(child);
    })

    $div.find($('.product__bottom-panel .btn')).bind("click", function () {
        // trigger buttons animations
        tl.restart();
        // hide product bottom panel
        TweenMax.to($div.find($('.product__bottom-panel')), 0.2, {
            y: 100,
            opacity: 0,
            ease: Power3.ease,
        });
        // show product compare panel
        TweenMax.to($div.find($('.product__compare-panel')), 0.2, {
            scale: 1,
            opacity: 1,
            ease: Power3.ease,
        });

    });

    // colse compare panel
    $div.find($('.icon-close')).bind("click", function () {

        TweenMax.to($div.find($('.product__compare-panel')), 0.3, {
            scale: 0.5,
            opacity: 0,
            ease: Power3.ease,
        });
        // reveale bottom panel
        TweenMax.to($div.find($('.product__bottom-panel')), 0.2, {
            y: 0,
            opacity: 1,
            ease: Power3.ease,
        });
    });
})


$(window).scroll(function () {

    // animate product items on viewport
    if (verge.inViewport($product, -150) && !$product.hasClass("js-inviewport")) {
        $product.addClass('js-inviewport');

        var tl = new TimelineLite();
        $('.product__box').each(function (index, element) {
            var child = new TimelineLite();
            child.to(element, 0.3, {
                x: 0,
                opacity: 1,
                ease: Power3.ease,
            }, 0)
            tl.add(child);
        })
    };

    // animate gallery items on viewport
    if (verge.inViewport($gallery, -150) && !$gallery.hasClass("js-inviewport")) {
        $gallery.addClass('js-inviewport');

        var tl = new TimelineLite();
        $('.gallery__single').each(function (index, element) {
            var child = new TimelineLite();
            child.to(element, 0.2, {
                opacity: 1,
                autoAlpha: 1,
            })
            tl.add(child);
        })

        TweenMax.to($('.gallery__single .btn'), 0.3, {
            x: 0,
            delay: 0.4,
            autoAlpha: 1,
            ease: Power3.ease,
        })

    };
    // animate testimonial items on viewport
    if (verge.inViewport($testimonial, -150) && !$testimonial.hasClass("js-inviewport")) {
        $testimonial.addClass('js-inviewport');

        TweenMax.to($('.testimonial__img, .testimonial__quote'), 1, {
            y: 0,
            autoAlpha: 1,
        })

    };

});