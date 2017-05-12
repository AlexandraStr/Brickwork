$(function () {
    // function rundom
    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }
  function maxArray(anyArray){
        return Math.max.apply( Math, anyArray );

    }

   function funcCordOptim (optimArray,optimLeght) {

        var wrapper = $(".grid");
        var wrapperWidth = wrapper.width();
        var widthGutter = $(".grid-gutter").width();
        var columnCount = Math.floor(wrapperWidth / 250);
        var widthItem = Math.floor(wrapperWidth - widthGutter*(columnCount-1))/columnCount;
        var heightArray=[];
         for (i=0;i<columnCount;i++){
            heightArray[i] = 0;
         }

          var minHeight = 0;
          var minPoz = 0;
          var j=0;
          wrapper.css({
              position:'relative'
          });
         for (var poiter in optimArray){
                  var itemClass="cl"+poiter;
                  optimArray[poiter][2]=Math.floor(widthItem*optimArray[poiter][1]);
                  optimArray[poiter][3] = minPoz+1;
                  optimArray[poiter][4] = heightArray[minPoz];
                  optimArray[poiter][5] = Math.floor(minPoz*(widthItem+widthGutter));
                  heightArray[minPoz]=heightArray[minPoz]+optimArray[poiter][2]+widthGutter;
             for(jk=0;jk<columnCount;jk++) {
                 if (heightArray[jk] < heightArray[minPoz]) {
                     minHeight = heightArray[jk];
                     minPoz = jk;
                 }
             }
                  $("."+itemClass).css({
                      position:'absolute',
                      top:optimArray[poiter][4],
                      left:optimArray[poiter][5],
                      width:widthItem,
                      height:optimArray[poiter][2]
                  });

         }
         var gridHeight = maxArray(heightArray);

       wrapper.css({
          height:gridHeight,
          opacity:1,
       });

    }

    $.support.cors = true;//For IE 8+

    // Topics to search for images
    var titleIdea = [
        "Sport+and+Activity",
        "Beauty+and+Health",
        "Extreme+Sports",
        "Games",
        "Culture+and+Education",
        "Relaxation",
        "Travelling"
    ];
    var coordArray = {};

// load images by ajax
    function loadImages(titleArea, seachNom,changeText,e) {
        if (e && typeof e !== "undefined") {
            e.preventDefault();
        }
         $(".grid-item").remove();

            $(".grid").css({
                    opacity:0,
                })

        var pendingDataSize = titleArea.length;
        var succesKey = 0;

        var APIkey = "4534315-1446b5ff2fa21aef31d1c4233";
        var url = "https://pixabay.com/api/?key=" + APIkey + "&image_type=photo&per_page=15&q=";

        $.each(titleArea,function (key,seachInput) {
            var titlePict = titleArea[key].replace(/\+/gi, " ");
            var urlik = url + seachInput;
            var wrapper = $(".grid");

            $.ajax({
                url: urlik,
                datatype: "jsonp",
                success: function (data) {
                    var dataset = data.hits;
                    if (dataset.length !== 0) {
                        var jPic = randomInteger(1, dataset.length) - 1;
                        var urlDate = dataset[jPic].webformatURL;
                        var pictWidth = dataset[jPic].webformatWidth;
                        var pictHeight = dataset[jPic].webformatHeight;
                        var picNumber = pictHeight/pictWidth;
                        var picColumn = 1;
                        coordArray[succesKey]=[succesKey,picNumber,pictHeight,picColumn,0,0];
                        var itemClass="cl"+succesKey;
                        succesKey = succesKey+1;

                        $("<div class='grid-item'><img class='new-image' src=" + urlDate + "/><a>" + titlePict + "</a></div>")
                            .appendTo('.grid')
                            .addClass(itemClass);

                        wrapper.find('img.new-image')
                            .on(
                                'load',
                                function () {
                                  $(this).removeClass('new-image');

                                }
                            )
                            .on(
                                'error',
                                function () {
                                    $(this).removeClass('new-image');
                                }
                            );
                    } else {
                            titleArea[seachNom]=changeText;
                    }

                    }, //success

            complete: function () {
                        pendingDataSize--;
                        if (!pendingDataSize && wrapper.find('img.new-image').length) {
                            funcCordOptim(coordArray,succesKey);

                      //      for (nkl=0;nkl<titleArea.length;nkl++){
                       //         delete coordArray[nkl];
                        //    }

                        }

                    }


          }); // ajax

        }); // forEach


    }; //  function loadImages


        loadImages(titleIdea);

       $(window).resize(function(){
           funcCordOptim(coordArray)
       });

        $("#searchPictureForm").submit(function (wrapper) {
           var j = randomInteger(1, titleIdea.length) - 1;
            var seachElement = $("#seachInput").val();
            changeElement = titleIdea[j];
            titleIdea[j] = seachElement;
            loadImages(titleIdea,j,changeElement);
        });

});
