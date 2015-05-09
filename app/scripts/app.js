(function() {
    document.addEventListener("deviceready", function () {
        var everlive = new Everlive("b0AEZdZMxE01BvRg");
        window.listview = kendo.observable({
            addImage: function() {
                var success = function(data) { 
                    everlive.Files.create({Filename:Math.random().toString(36).substring(2,15)+".jpg", ContentType:"image/jpeg", base64:data}).then(loadPhotos);
                    //$("#images").data("kendoMobileListView").prepend(["data:image/jpeg;base64," + data]);
                };
                
                function loadPhotos(){
                    everlive.Files.get().then(function(data) {
                        var files = [];
                        data.result.forEach(function(image) {
                            files.push(image.Uri);
                        });
                        $("#images").kendoMobileListView({ dataSource: files, template: "<img src='#: data#'>"});
                    });
                }
                
                loadPhotos();
                
                var error = function() {
            		navigator.notification.alert("Could not add image!");
        		};
                
                var config = { destinationType: Camera.DestinationType.DATA_URL,
                           targetHeight: 400,
                           targetWidth: 400,
                           encodingType: Camera.EncodingType.PNG
                             };
                                           
            	navigator.camera.getPicture(success, error, config);
            }                                  
        })
        
        var app = new kendo.mobile.Application(document.body, { skin: "flat" });
        
        //$("#images").kendoMobileListView({dataSource: ["images/01.jpg", "images/02.jpg"], template: "<img src='#: data #'>"});

        navigator.splashscreen.hide();
    });
}());