(function() {
    var imageCache = {};
    var onloadCallback;
    var currentImageUrls = [];

    function load(imageUrls) {
        console.log('images loading...');
        currentImageUrls = imageUrls;
        imageUrls.forEach(function(url) {
            if (imageCache[url]) {
                return imageCache[url];
            } else {
                var image = new Image();
                image.onload = function() {
                    console.log(url + ' loaded...');
                    imageCache[url] = image;

                    if (ready()) {
                        console.log('images loaded...');
                        onloadCallback();
                    }
                };
                imageCache[url] = false;
                image.src = url;
            }
        }, this);
    }

    function ready() {
        return currentImageUrls.every(function(url) {
            return imageCache[url];
        });
    }

    function get(url) {
        image = imageCache[url]
        if (!image) {
            throw new Error('There is no image in image cache with url: ' + url);
        }
        return imageCache[url];
    }

    function onload(callback) {
        onloadCallback = callback;
    }

    window.resourses = {
        get: get,
        load: load,
        onload: onload
    };
})();