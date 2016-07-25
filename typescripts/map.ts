module EzMap {

    $(function () {

        google.maps.event.addDomListener(window, 'load', locationView);

        google.maps.event.addDomListener(window, 'load', circleMap);


        google.maps.event.addDomListener(window, 'load', infoWindow);

        function locationView() {
            map.locationView(51.508742, -0.120850, 'googleMap');
        }
        function circleMap() {
            map.circleMap(51.508742, -0.120850, 'googleMap');
        }
        function infoWindow() {
            map.infoWindowMap(51.508742, -0.120850, 'googleMap',"this is simple text");
        }
    });

    var map = {
        viewMap(lat: number, lng: number, element: string): void {
            setTimeout(() => {
                var mapProp = {
                    center: new google.maps.LatLng(lat, lng),
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false,
                    zoomControl: true,
                    scrollwheel: false,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    overviewMapControl: false
                };
                var marker = new google.maps.Marker({
                    position: mapProp.center,
                    animation: google.maps.Animation.DROP
                });
                var map = new google.maps.Map(<HTMLInputElement>$('#' + element)[0], mapProp);
                marker.setMap(map);
            }, 1000);
        },
        locationView(lat: number, lng: number, element: string): void {
            var mapProp = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(element), mapProp);
        },
        circleMap(lat: number, lng: number, element: string, redious: number = 20000, strokeColor: string = "#0000FF", strokeOpacity: number = 0.8,
            strokeWeight: number = 2, fillColor: string = "#0000FF", fillOpacity: number=0.4): void {
            var location = new google.maps.LatLng(52.395715, 4.888916);
            var mapProp = {
                center: location,
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(element), mapProp);
            var myCity = new google.maps.Circle({
                center: location,
                radius: 20000,
                strokeColor: "#0000FF",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#0000FF",
                fillOpacity: 0.4
            });

            myCity.setMap(map);
        },
        infoWindowMap(lat: number, lng: number, element: string, info: string) {
            var myCenter = new google.maps.LatLng(lat, lng);
            var mapProp = {
                center: myCenter,
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById(element), mapProp);

            var marker = new google.maps.Marker({
                position: myCenter,
            });

            marker.setMap(map);

            var infowindow = new google.maps.InfoWindow({
                content: info
            });

            infowindow.open(map, marker);
        }
    }
 

    google.maps.event.addDomListener(window, 'load', function(){

        var places = new google.maps.places.Autocomplete(<HTMLInputElement>$('#txtLocation')[0]);
        google.maps.event.addListener(places, 'place_changed', () => {

            var place: any = places.getPlace();
            for (let i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];

            }
            var lat: any = place.geometry.location.lat();
            var lng: any = place.geometry.location.lng();
            console.log(lat);
            console.log(lng);
            console.log($('#txtLocation').val());
        });
    });

    var possitioningMap = {

        mapPossition(address: string, mapElement: string) {

            var geocoder;
            var map;
            var marker;

            geocoder = new google.maps.Geocoder();

            geocoder.geocode({ address: address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map = new google.maps.Map(document.getElementById(mapElement), {
                        zoom: 8,
                        streetViewControl: false,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                            mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP]
                        },
                        center: results[0].geometry.location,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                    map.setCenter(results[0].geometry.location);
                    marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        draggable: true,
                        title: 'My Title'
                    });
                    possitioningMap.updateMarkerPosition(results[0].geometry.location);
                    possitioningMap.geocodePosition(results[0].geometry.location);

                    // Add dragging event listeners.
                    google.maps.event.addListener(marker, 'dragstart', function () {
                        possitioningMap.updateMarkerAddress('Dragging...');
                    });

                    google.maps.event.addListener(marker, 'drag', function () {
                        possitioningMap.updateMarkerPosition(marker.getPosition());
                    });

                    google.maps.event.addListener(marker, 'dragend', function () {
                        possitioningMap.geocodePosition(marker.getPosition());
                        map.panTo(marker.getPosition());
                    });

                    google.maps.event.addListener(map, 'click', function (e) {
                        possitioningMap.updateMarkerPosition(e.latLng);
                        possitioningMap.geocodePosition(marker.getPosition());
                        marker.setPosition(e.latLng);
                        map.panTo(marker.getPosition());
                    });

                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        },
        updateMarkerPosition(latLng) {
            console.log(latLng);
        },

        updateMarkerAddress(str) {
            console.log(str);
        },
        geocodePosition(data) {
            console.log(data);
        },

    }


}