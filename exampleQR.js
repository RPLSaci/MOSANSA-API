import qr from "qrcode"

const data = JSON.stringify({nama:"Farrel",id:123}) // the data to encode as a QR code
const options = { // optional QR code configuration options
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
        dark: '#000000',
        light: '#ffffff'
    }
};

// create a QR code and pipe it to a base64 string
qr.toDataURL(data, options, (err, url) => {
    if (err) throw err;
    console.log(url); // base64-encoded image string
});

// create a QR code and pipe it to an image file
qr.toFile('qr-code.jpeg', data, options, (err) => {
    if (err) throw err;
    console.log('QR code saved as qr-code.jpeg');
});
