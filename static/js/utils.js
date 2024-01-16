function loadImg() {
    var input = $('#fileInput')[0];

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                var maxWidth = 300;
                var maxHeight = 300;

                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                // Get the data URLs for both JPEG and PNG formats
                var jpegDataUrl = canvas.toDataURL('image/jpeg', 0.8); // Quality parameter is optional
                var pngDataUrl = canvas.toDataURL('image/png');

                // Here you can use both data URLs as needed
                $('#imagePreview').attr('src', jpegDataUrl);

                // If you need to use the PNG version, you can do so like this:
                $('#imagePreview').attr('src', pngDataUrl);
            };
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Upload image using ajax
$('#upload').click(function () {
    // Create form data
    var formData = new FormData();
    // Add file to form data
    formData.append('file', $('#fileInput')[0].files[0]);
    $.ajax({
        url: '/recycool', // Flask API Endpoint
        type: 'POST', // Request type
        data: formData, // Request data
        contentType: false,
        processData: false,
        success: function (data) {
            // On request success, handle the response
            console.log(data);

            // Check if the status is success
            if (data.status === 'success') {
                // Image upload successful, display appropriate message or perform actions
                console.log('Image upload successful');
            } else {
                // Handle errors or other responses
                console.error('Image upload failed:', data.message);
            }
        },
        error: function (xhr, status, error) {
            // On request failure, handle the error
            console.error('Error uploading image:', error);
        }
    });
});



// Event listener for the Get Result button
$('#getResult').click(function () {
    $.ajax({
        url: '/recycool', // Flask API Endpoint
        type: 'GET', // Request type
        success: function (data) {
            // On request success, handle the response
            console.log(data);

            // Check if the status is success
            if (data.status === 'Success') {
                // Process the data or update UI based on the GET response
                console.log('GET request successful');
            } else {
                // Handle errors or other responses
                console.error('GET request failed:', data.message);
            }
        },
        error: function (xhr, status, error) {
            // On request failure, handle the error
            console.error('Error in GET request:', error);
        }
    });
});
