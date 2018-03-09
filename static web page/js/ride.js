/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

(function rideScopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });
    function requestProduct(pickupLocation) {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/ride',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                PickupLocation: {
                    Latitude: pickupLocation.latitude,
                    Longitude: pickupLocation.longitude
                }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('Un error ocurrio con tu pedido:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        var product;
        var pronoun;
        console.log('Response received from API: ', result);
<<<<<<< HEAD
        product = result.Product;
        pronoun = product.Taste;
        displayUpdate( 'Tus '+product.Name + ' de ' + pronoun + ' (precio: $' + product.Price + ') estas en  camino.');
        animateArrival(function animateCallback() {
            displayUpdate('Tus '+product.Name + ' han llegado. ¡Disfrutalo!');
=======
        unicorn = result.Product;
        pronoun = unicorn.Taste;
        displayUpdate( 'Tus '+unicorn.Name + ' de ' + pronoun + ' (precio: $' + unicorn.Price + ') estas en  camino.');
        animateArrival(function animateCallback() {
            displayUpdate('Tus '+unicorn.Name + ' han llegado. Disfrutalo!');
>>>>>>> 03819d6cdf1e7b98231568e6e96a95eda8ca4bcd
            WildRydes.map.unsetLocation();
            $('#request').prop('disabled', 'disabled');
            $('#request').text('Selecciona Lugar');
        });
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#request').click(handleRequestClick);
        $(WildRydes.map).on('pickupChange', handlePickupChanged);

        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
<<<<<<< HEAD
                displayUpdate('Ve <a href="#authTokenModal" data-toggle="modal">aquí</a> tu token de lealtad Oxxo.');
=======
                displayUpdate('Estas Autenticado. Ve <a href="#authTokenModal" data-toggle="modal">aquí</a> tu token.');
>>>>>>> 03819d6cdf1e7b98231568e6e96a95eda8ca4bcd
                $('.authToken').text(token);
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });

    function handlePickupChanged() {
        var requestButton = $('#request');
        requestButton.text('Solicitud producto');
        requestButton.prop('disabled', false);
    }

    function handleRequestClick(event) {
        var pickupLocation = WildRydes.map.selectedPoint;
        event.preventDefault();
        requestProduct(pickupLocation);
    }

    function animateArrival(callback) {
        var dest = WildRydes.map.selectedPoint;
        var origin = {};

        if (dest.latitude > WildRydes.map.center.latitude) {
            origin.latitude = WildRydes.map.extent.minLat;
        } else {
            origin.latitude = WildRydes.map.extent.maxLat;
        }

        if (dest.longitude > WildRydes.map.center.longitude) {
            origin.longitude = WildRydes.map.extent.minLng;
        } else {
            origin.longitude = WildRydes.map.extent.maxLng;
        }

        WildRydes.map.animate(origin, dest, callback);
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
