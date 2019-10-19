const SEED_LENGTH   = 40;
const CANVAS_SIZE   = 512;
const CANVAS_CENTER = CANVAS_SIZE / 2;
const TEMPLATE_META = meta.templates;
const IMG_DATA      = [];
// Populate data
TEMPLATE_META.forEach(img => {
    IMG_DATA.push(createImage(img.src));
});

const IMG_BASE   = createImage(meta.base);
const IMG_MASK   = createImage(meta.mask);
const IMG_SHADOW = createImage(meta.shadow);

function process() {
    let [ canvas, ctx ] = getCanvas('egg');
    // Reset canvas state
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Get name
    let name  = document.getElementById('name').value;
    // Generate seed
    let seed = genSeed(name, SEED_LENGTH);
    // Tests
    drawImg(ctx, IMG_BASE, 0, 1);
    IMG_DATA.forEach(img => { 
        if (Math.random() > 0.5) {
            drawImg(ctx, color(img), Math.random() * 180, Math.random());
        }
    });
    drawImg(ctx, IMG_SHADOW, 0, 0.15);
    drawImg(ctx, IMG_MASK, 0, 1);
}

/**
 * Generates a numeric seed from a string input.
 * 
 * @param {String} input The seed source.  
 */
function genSeed(input, len) {
    // Map each character to it's corresponding charcode
    let seed = input.split('')
       .map(c => parseInt(c.charCodeAt(0), 10))
       .join('');
    // Normalize seed length to set value
    while (seed.length < len) {
        seed += seed.split('').reverse().join('');
    }
    // Remove characters until the seed matches the expected length
    let dist = Math.floor(len / (seed.length - len));
    for (let i = dist; seed.length > len; i += dist) {
        seed = seed.substring(0, i) + seed.substring(i + 1);
    }
    return seed;
}

function download() {
    let [ canvas, context ] = getCanvas('egg');
    let name    = document.getElementById('name');
    
    let input = name.value;
}

function drawImg(ctx, img, angle, opacity) {
    ctx.save();
    ctx.translate(CANVAS_CENTER, CANVAS_CENTER);
    ctx.rotate(angle * Math.PI / 180);
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, -CANVAS_CENTER, -CANVAS_CENTER);
    ctx.restore();
}

function createImage(url) {
    let img = new Image();
    img.src = url;
    return img;
}

function color(img) {
    let [ canvas, ctx ] = getCanvas();
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.globalCompositeOperation = "source-over";
    return canvas;
}

function getCanvas(id) {
    let canvas; 
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        canvas.height = CANVAS_SIZE;
        canvas.width = CANVAS_SIZE;
    }
    return [canvas, canvas.getContext('2d')];
} 