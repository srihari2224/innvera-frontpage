const fs = require('fs');
const https = require('https');
const path = require('path');

const assets = [
    { url: "https://www.icebergdoc.org/_vercel/image?url=%2Fassets%2Fimages%2Fabout1.jpg&w=1536&q=100", filename: "about1.jpg" },
    { url: "https://www.icebergdoc.org/_vercel/image?url=%2Fassets%2Fimages%2Fabout2.jpg&w=1536&q=100", filename: "about2.jpg" },
    { url: "https://www.icebergdoc.org/_vercel/image?url=%2Fassets%2Fimages%2Fabout3.jpg&w=1536&q=100", filename: "about3.jpg" },
    { url: "https://www.icebergdoc.org/_vercel/image?url=%2Fassets%2Fimages%2Fprojects.jpg&w=1536&q=100", filename: "projects.jpg" },
    { url: "https://www.icebergdoc.org/_vercel/image?url=%2Fassets%2Fimages%2Ftexture.png&w=1536&q=100", filename: "texture.png" },
    { url: "https://www.icebergdoc.org/_vercel/image?url=%2Fassets%2Fimages%2Ftexture-footer.png&w=1536&q=100", filename: "texture-footer.png" },
];

const targetDir = path.join(process.cwd(), 'public', 'assets', 'images');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

assets.forEach(asset => {
    const filePath = path.join(targetDir, asset.filename);
    const file = fs.createWriteStream(filePath);

    https.get(asset.url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(() => {
                console.log(`Downloaded ${asset.filename}`);
            });
        });
    }).on('error', function (err) {
        fs.unlink(filePath);
        console.error(`Error downloading ${asset.filename}: ${err.message}`);
    });
});
