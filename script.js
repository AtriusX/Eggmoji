const SEED_LENGTH   = 40;
const CANVAS_SIZE   = 512;
const CANVAS_CENTER = CANVAS_SIZE / 2;
const TEMPLATE_META = meta.templates;
const IMG_DATA      = [];
// Populate data
TEMPLATE_META.forEach(img => {
    IMG_DATA.push(createImage(img.src));
});
// Non-random components
const IMG_BASE   = createImage(meta.base);
const IMG_MASK   = createImage(meta.mask);
const IMG_SHADOW = createImage(meta.shadow);

function process() {
    let [ canvas, ctx ] = getCanvas('egg');
    // Reset canvas state
    canvas.clear();
    // Generate seed
    let name = document.getElementById('name').value;
    let seed = name.seed(SEED_LENGTH);
    Math.seedrandom(seed);
    ctx.drawImg(IMG_BASE.color(), 0, 1);
    IMG_DATA.forEach(img => { 
        if (Math.random() > 0.8)
            ctx.drawImg(img.color(), Math.random() * 180, Math.random());
    });
    ctx.drawImg(IMG_SHADOW, 0, 0.18);
    ctx.drawImg(IMG_MASK.color('#F5F5F5'), 0, 1);
}

function download() {
    let [ canvas ] = getCanvas('egg');
    // let name  = document.getElementById('name');
    var download = document.getElementById("download");
    var image = canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}
