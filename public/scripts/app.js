if ('serviceWorker' in navigator){

    navigator.serviceWorker
        .register('/service-worker.js')
        .then(function (registration) {
            console.log("Service Worker Registered successfully!");
            // if ('sync' in registration) {
            //
            //     var form = document.getElementById("offline-form")
            //     var usernameField = form.querySelector('#username');
            //     var passwordField = form.querySelector('#password');
            //
            //     form.addEventListener('submit', function(event) {
            //         event.preventDefault();
            //         var message = {
            //             username: usernameField.value,
            //             password: passwordField.value
            //         };
            //
            //         store.outbox('readwrite').then(function(outbox) {
            //            return outbox.put(message);
            //         }).then(function() {
            //             usernameField.value = '';
            //             if (passwordField.getAttribute('type') !== 'hidden') {
            //                 passwordField.value = '';
            //             }
            //             return registration.sync.register('outbox');
            //         }).catch(function(err) {
            //             // something went wrong with the database or the sync registration, log and submit the form
            //             console.error(err);
            //             form.submit();
            //         });
            //
            //     });
            //
            // }
        })
        .catch(function (err) {
            console.log("Service Worker could not register properly.", err);
        })
}

