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

// Load image using axios
$('#upload').click(function () {
    var formData = new FormData();
    formData.append('file', $('#fileInput')[0].files[0]);

    axios.post('/recycool', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(function (response) {
        // On request success, handle the response
        console.log(response.data);

        if (response.data.status === 'success') {
            console.log('Image upload successful');
        } else {
            console.error('Image upload failed:', response.data.message);
        }
    })
    .catch(function (error) {
        // On request failure, handle the error
        console.error('Error uploading image:', error);
    });
});

// Event listener for the Get Result button
$('#getResult').click(function () {
    axios.get('/recycool')
    .then(function (response) {
        // On request success, handle the response
        console.log(response.data);

        if (response.data.status === 'Success') {
            console.log('GET request successful');
            // Display the result beside the image
            displayResult(response.data.data);
        } else {
            console.error('GET request failed:', response.data.message);
        }
    })
    .catch(function (error) {
        // On request failure, handle the error
        console.error('Error in GET request:', error);
    });
});

// Function to display the result
function displayResult(resultData) {
    // Clear the result container
    $('#resultContainer').empty();

    // Log the resultData to inspect its structure
    console.log(resultData);

    // Ensure that resultData is an array
    if (Array.isArray(resultData) && resultData.length > 0) {
        // Iterate over each result in the array
        resultData.forEach(function (result) {
            // Ensure that each result has classification and accuracy properties
            if (result && result.classification && result.accuracy) {
                // Extract classification and accuracy from the result object
                var classification = result.classification;
                var accuracy = result.accuracy;

                // Create a new <div> element to display the classification and accuracy
                var resultDiv = $('<div>').text('Classification: ' + classification + ', Accuracy: ' + accuracy);

                // Append the resultDiv to the resultContainer
                $('#resultContainer').append(resultDiv);
            } else {
                console.error('Invalid result structure:', result);
            }
        });
    } else {
        console.log('No results available.');
    }
}
