define([], function() {
    return {
        rannumber() {
            var randnumber = '';
            for (ranNum = 1; ranNum <= 6; ranNum++) {
                randnumber += Math.floor(Math.random() * 10).toString();
            }
            return randnumber;
        },
        serializeObject(obj) {
            console.log(obj);
            var newObj = [];
            _.forEach(obj, function(value, key) {
                var tempVal = {};
                tempVal.name = key;
                tempVal.value = value;
                newObj.push(tempVal);
            });
            return newObj;
        },
        campaignMonitorCall() {
            // Get e-mail value.
            email = $('input[type=email]', form).val();

            // Build request data for tokenRequest.
            request_data = "email=" + encodeURIComponent(email) + "&data=" + form_id;

            // Prepare tokenRequest.
            tokenRequest = new XMLHttpRequest();
            tokenRequest.open('POST', 'https://createsend.com//t/getsecuresubscribelink', true);
            tokenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            tokenRequest.send(request_data);

            // Ready state.
            tokenRequest.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        // Having token and new submit url we can create new request to subscribe a user.
                        subscribeRequest = new XMLHttpRequest();
                        subscribeRequest.open('POST', this.responseText, true);
                        subscribeRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        subscribeRequest.send(form.serialize());
                        // On ready state call response function.
                        subscribeRequest.onreadystatechange = function() {
                            c.response(subscribeRequest);
                        }
                    } else {
                        c.response(tokenRequest);
                    }
                }
            }
        });
}
}
});