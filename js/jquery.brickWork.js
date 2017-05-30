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
        })


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
