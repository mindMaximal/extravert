document.addEventListener("DOMContentLoaded", ready());

function ready() {

    //Scroll to anchor
    var linkNav = document.querySelectorAll('[href^="#"]'),
        speed = 0.2; 
    
        for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            var w = window.pageYOffset,
                hash = this.href.replace(/[^#]*(.*)/, '$1');
            t = document.querySelector(hash).getBoundingClientRect().top,
                start = null;
            requestAnimationFrame(step);

            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress/speed, w + t) : Math.min(w + progress/speed, w + t));
                window.scrollTo(0,r);
                if (r != w + t) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        }, false);
    }

    //Menu cleaveth
    window.addEventListener('scroll', function(e) {
        var footer = document.querySelector('.footer');
        var menu = document.querySelector('.menu');
        var offset = document.querySelector('body').offsetHeight - footer.offsetHeight - document.documentElement.clientHeight - 35;
        
        if (pageYOffset >= offset) {
            menu.classList.add('menu--cleaveth');   
            
        } else if (pageYOffset < offset && menu.classList.contains('menu--cleaveth')) {
            menu.classList.remove('menu--cleaveth');  
        }
    });

    //Sliders 
    var stocksSlider = new Glide('.stocks__slider', {
        type: 'carousel',
        focusAt: 'center',
        animationDuration: 1000,
        perView: 1
    });

    stocksSlider.mount();

    var newsSlider = new Glide('.news__slider', {
        type: 'slider',
        focusAt: 0,
        animationDuration: 1000,
        perView: 3,
        touchRatio: 1,
        perTouch: 1,
        breakpoints: {
            992: {
              perView: 2
            },
            600: {
              perView: 1
            }
          }
    });

    newsSlider.mount();

    //Mobile menu

    document.querySelector('.menu__button').addEventListener('click', function() {
        var menu = document.querySelector('.menu');
        var menuActiveClass = 'menu--active';
        var buttonActiveClass = 'menu__button--active';

        if (menu.classList.contains(menuActiveClass)) {
            menu.classList.remove(menuActiveClass);
            this.classList.remove(buttonActiveClass);
        } else {
            menu.classList.add(menuActiveClass);
            this.classList.add(buttonActiveClass);
        }
    });

}


