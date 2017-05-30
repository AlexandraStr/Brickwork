/**
 * Created by alexandra on 19.05.17.
 */
(function( $ ){

    $.fn.brickWork = function (options) {
        //при многократном вызове настройки сохраняются
        options = $.extend({
            itemSelector:'.grid-item',
            widthImgMin:250,
            widthGutter:15,
            border:'none',
            shadow:'none',
            background:'#F5F5F5',
            transition:'opacity 0.5s linear',
        }, options);

        function maxArray(anyArray){
            return Math.max.apply( Math, anyArray );

        }
        // берем все необходимые нам картинки
        var wrapper = this;
        var wrapperWidth = wrapper.width();
        var items = wrapper.find(options.itemSelector);
        var columnCount = Math.floor(wrapperWidth/ options.widthImgMin);
        var widthItem = Math.floor((wrapperWidth - options.widthGutter*(columnCount-1))/columnCount);

        var heightArray=[];
        for (i=0;i<columnCount;i++){
            heightArray[i] = options.widthGutter;
        }
        var gutter = options.widthGutter;
        var minHeight = options.widthGutter;
        var minPoz = 0;
        var j=0;
        var coordinateX =0;
        var coordinateY=0;
        wrapper.css({
            position:'relative'
        });


        $.each(items, function (index,value) {
            var $this = $(value);
            var itemClass="cl"+index;

            $images = $this.children("img");
            if (!$images.hasClass("new-image")) {
                var heightItem = Math.floor(widthItem * ($images.prop("naturalHeight") / $images.prop("naturalWidth")));
                $this.addClass("cl" + index);

                for (jk = 0; jk < columnCount; jk++) {
                    if (heightArray[jk] < heightArray[minPoz]) {
                        minHeight = heightArray[jk];
                        minPoz = jk;
                    }
                }
                coordinateY = minHeight;
                coordinateX = (widthItem+gutter)*minPoz;

                $("."+itemClass).css({
                    position:'absolute',
                    top:coordinateY,
                    left:coordinateX,
                    width:widthItem,
                    height:heightItem,
                    border:options.border,
                    boxShadow:options.shadow,
                });
                heightArray[minPoz]=minHeight+heightItem+gutter;
                minHeight= heightArray[minPoz];

            }
        })
        var gridHeight = maxArray(heightArray);
        wrapper.css({
            height:gridHeight,
            opacity:1,
            transition:options.transition,
            background:options.background,
        });
        return this;
    }
})( jQuery );
;$(function () {
    // function rundom
    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    $.support.cors = true;//For IE 8+
    //Options for brickWork
    var optionsBrickWork = {
        widthImgMin:270,
        widthGutter:15,
      //  border:'2px ridge  #000080',
     //   shadow:'2px 2px 4px 0 #483D8B',
        background:'#E6E6FA',
        transition:'opacity 0.2s ease',
    }

    // Topics to search for images
    var titleIdea = [
        "Sport+and+Activity",
        "Beauty+and+Health",
        "Extreme+Sports",
        "Games",
        "Culture+and+Education",
        "Relaxation",
        "Travelling",
        "Dansing",
        "Swiming",
        "Running",
        "Programming",
        "Study",
    ];

// load images by ajax
    function loadImages(titleArea, e) {
        if (e && typeof e !== "undefined") {
            e.preventDefault();
        }
        $('.grid').replaceWith('<div class="grid"></div>');


        var APIkey = "4534315-1446b5ff2fa21aef31d1c4233";
        var url = "https://pixabay.com/api/?key=" + APIkey + "&image_type=photo&per_page=3&q=";

        var pendingDataSize = titleArea.length;

        var invalidateMediaGallery = function (wrapper) {
            if (!pendingDataSize && !wrapper.find('img.new-image').length) {
                if (!wrapper.hasClass('initialized')) {
                    wrapper.addClass('initialized')
                   var masorn = wrapper.brickWork(optionsBrickWork);
                }
            }
            console.log(masorn);
        };

        var onImageLoadFunction = function (image, wrapper) {
            image.removeClass('new-image');
            invalidateMediaGallery(wrapper);
        };




        titleArea.forEach(function (seachInput, i, titleArea) {
            var titlePict = titleArea[i].replace(/\+/gi, " ");
            var urlik = url + seachInput;
            var wrapper = $('.grid');


            $.ajax({
                url: urlik,
                datatype: "jsonp",
                success: function (data) {
                    var dataset = data.hits;
                    if (dataset.length !== 0) {
                        var jPic = randomInteger(1, dataset.length) - 1;
                        var urlDate = dataset[jPic].webformatURL;


                        $('<div class="grid-item"><img class="new-image" src=' + urlDate + '/><a>' + titlePict + '</a></div>')
                            .appendTo(wrapper);

                        wrapper.find('img.new-image')
                            .on(
                                'load',
                                function () {
                                    onImageLoadFunction($(this), wrapper);
                                }
                            )
                            .on(
                                'error',
                                function () {
                                    onImageLoadFunction($(this), wrapper);
                                }
                            );
                    }

                }, //success
                complete: function () {
                    pendingDataSize --;
                    invalidateMediaGallery($('.grid'));

                }
            }); // ajax


        }); // forEach


    }; //  function loadImages


    loadImages(titleIdea);

    $(window).resize(function(){
        $(".grid").brickWork(optionsBrickWork);
    });



});


