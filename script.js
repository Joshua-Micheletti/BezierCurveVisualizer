let slider;
let select;
let drawConstructionLines;
let drawConstructionPoints;
let drawControlPoints;
let hideUI;
let colorSpace;
let p0, p1, p2, p3;
let color0, color1, color2, color3;
let move0WithMouse;
let move1WithMouse;
let moveControl0WithMouse;
let moveControl1WithMouse;
let previousWidth, previousHeight;
let drawQuadratic;

function lerp2D(p0, p1, t) {
    let x = p0.x + (p1.x - p0.x) * t;
    let y = p0.y + (p1.y - p0.y) * t;

    return(createVector(x, y));
}

function lerp3D(p0, p1, t) {
    let x = p0.x + (p1.x - p0.x) * t;
    let y = p0.y + (p1.y - p0.y) * t;
    let z = p0.z + (p1.z - p0.z) * t;

    return(createVector(x, y, z));
}

function mousePressed() {
    let threshold = 18 / 2;
    if (mouseX <= p0.x + threshold && mouseX >= p0.x - threshold && mouseY <= p0.y + threshold && mouseY >= p0.y - threshold) {
        move0WithMouse = true;
    } else if (mouseX <= p1.x + threshold && mouseX >= p1.x - threshold && mouseY <= p1.y + threshold && mouseY >= p1.y - threshold) {
        moveControl0WithMouse = true;
    } else if (mouseX <= p2.x + threshold && mouseX >= p2.x - threshold && mouseY <= p2.y + threshold && mouseY >= p2.y - threshold) {
        move1WithMouse = true;
    } else if (mouseX <= p3.x + threshold && mouseX >= p3.x - threshold && mouseY <= p3.y + threshold && mouseY >= p3.y - threshold) {
        moveControl1WithMouse = true;
    }
}

function mouseReleased() {
    move0WithMouse = false;
    move1WithMouse = false;
    moveControl0WithMouse = false;
    moveControl1WithMouse = false;
}

function setColor(color) {
    if (colorSpace.value() == "RGB") {
        stroke(color.x, color.y, color.z);

    } else if (colorSpace.value() == "LRGB") {
        var tmpColor = culori.rgb({mode: "lrgb",
                                   r: color.x,
                                   g: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);

    } else if (colorSpace.value() == "A98") {
        var tmpColor = culori.rgb({mode: "a98",
                                   r: color.x,
                                   g: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);

    } else if (colorSpace.value() == "P3") {
        var tmpColor = culori.rgb({mode: "p3",
                                   r: color.x,
                                   g: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);

    } else if (colorSpace.value() == "ProPhoto") {
        var tmpColor = culori.rgb({mode: "prophoto",
                                   r: color.x,
                                   g: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
 
    } else if (colorSpace.value() == "REC2020") {
        var tmpColor = culori.rgb({mode: "rec2020",
                                   r: color.x,
                                   g: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);

    } else if (colorSpace.value() == "HSL") {
        var tmpColor = culori.rgb({mode: "hsl",
                                   h: color.x,
                                   s: color.y,
                                   l: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "HSV") {
        var tmpColor = culori.rgb({mode: "hsv",
                                   h: color.x,
                                   s: color.y,
                                   v: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "HSI") {
        var tmpColor = culori.rgb({mode: "hsi",
                                   h: color.x,
                                   s: color.y,
                                   i: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "HWB") {
        var tmpColor = culori.rgb({mode: "hwb",
                                   h: color.x,
                                   w: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "LAB") {
        var tmpColor = culori.rgb({mode: "lab",
                                   l: color.x,
                                   a: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "LCH") {
        var tmpColor = culori.rgb({mode: "lch",
                                   l: color.x,
                                   c: color.y,
                                   h: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "LAB65") {
        var tmpColor = culori.rgb({mode: "lab65",
                                   l: color.x,
                                   a: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "LCH65") {
        var tmpColor = culori.rgb({mode: "lch65",
                                   l: color.x,
                                   c: color.y,
                                   h: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);

    } else if (colorSpace.value() == "LUV") {
        var tmpColor = culori.rgb({mode: "luv",
                                   l: color.x,
                                   u: color.y,
                                   v: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);

    } else if (colorSpace.value() == "LCHUV") {
        var tmpColor = culori.rgb({mode: "lchuv",
                                   l: color.x,
                                   c: color.y,
                                   h: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "DLAB") {
        var tmpColor = culori.rgb({mode: "dlab",
                                   l: color.x,
                                   a: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "DLCH") {
        var tmpColor = culori.rgb({mode: "dlch",
                                   l: color.x,
                                   c: color.y,
                                   h: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "OkLab") {
        var tmpColor = culori.rgb({mode: "oklab",
                                   l: color.x,
                                   a: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);

    } else if (colorSpace.value() == "OkLch") {
        var tmpColor = culori.rgb({mode: "oklch",
                                   l: color.x,
                                   c: color.y,
                                   h: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "JAB") {
        var tmpColor = culori.rgb({mode: "jab",
                                   j: color.x,
                                   a: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "JCH") {
        var tmpColor = culori.rgb({mode: "jch",
                                   j: color.x,
                                   c: color.y,
                                   h: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "YIQ") {
        var tmpColor = culori.rgb({mode: "yiq",
                                   y: color.x,
                                   i: color.y,
                                   q: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "XYZ") {
        var tmpColor = culori.rgb({mode: "xyz",
                                   x: color.x,
                                   y: color.y,
                                   z: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "XYZ65") {
        var tmpColor = culori.rgb({mode: "xyz65",
                                   x: color.x,
                                   y: color.y,
                                   z: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    } else if (colorSpace.value() == "CubeHelix") {
        var tmpColor = culori.rgb({mode: "cubehelix",
                                   h: color.x,
                                   s: color.y,
                                   l: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    
    }
}

function drawQuadraticBezierCurve(t) {
    noFill();
    strokeWeight(2);
    stroke(65);

    if (drawControlPoints.checked()) {
        line(p0.x, p0.y, p1.x, p1.y);
        line(p1.x, p1.y, p2.x, p2.y);

        strokeWeight(10);
        setColor(color1);
        point(p1.x, p1.y);
        strokeWeight(2);
        circle(p1.x, p1.y, 18);
    }
    
    strokeWeight(10);
    setColor(color0);
    // stroke(color0.x, color0.y, color0.z);
    point(p0.x, p0.y);
    strokeWeight(2);
    circle(p0.x, p0.y, 18);

    strokeWeight(10);
    setColor(color2);
    // stroke(color2.x, color2.y, color2.z);
    point(p2.x, p2.y);
    strokeWeight(2);
    circle(p2.x, p2.y, 18);

    let lerpP0 = lerp2D(p0, p1, t);
    let colorLerpP0 = lerp3D(color0, color1, t);

    let lerpP1 = lerp2D(p1, p2, t);
    let colorLerpP1 = lerp3D(color1, color2, t);

    if (drawConstructionLines.checked()) {
        strokeWeight(2);
        stroke(75);
        line(lerpP0.x, lerpP0.y, lerpP1.x, lerpP1.y);
    }
    
    let bezierP = lerp2D(lerpP0, lerpP1, t);
    let colorBezierP = lerp3D(colorLerpP0, colorLerpP1, t);

    if (drawConstructionPoints.checked()) {
        strokeWeight(15);

        setColor(colorLerpP0);
        // stroke(colorLerpP0.x, colorLerpP0.y, colorLerpP0.z);
        point(lerpP0.x, lerpP0.y);


        setColor(colorLerpP1);
        // stroke(colorLerpP1.x, colorLerpP1.y, colorLerpP1.z);
        point(lerpP1.x, lerpP1.y);

        strokeWeight(20);
        setColor(colorBezierP);
        // stroke(colorBezierP.x, colorBezierP.y, colorBezierP.z);
        point(bezierP.x, bezierP.y);
    }
    
    strokeWeight(2);

    let previousBezier;

    for (let i = 0; i < 1.01; i += 0.01) {
        let point1 = lerp2D(p0, p1, i);
        let point2 = lerp2D(p1, p2, i);
        let bezier = lerp2D(point1, point2, i);

        let hue0 = lerp3D(color0, color1, i);
        let hue1 = lerp3D(color1, color2, i);

        let hue = lerp3D(hue0, hue1, i);

        setColor(hue);
        // stroke(hue.x, hue.y, hue.z);
        
        if (i == 0) {
            line(p0.x, p0.y, bezier.x, bezier.y);
        } else {
            line(previousBezier.x, previousBezier.y, bezier.x, bezier.y);
        }

        previousBezier = bezier;
    }
}

function drawCubicBezierCurve(t) {
    noFill();

    if (drawControlPoints.checked()) {
        strokeWeight(2);
        stroke(80);
        line(p0.x, p0.y, p1.x, p1.y);
        line(p2.x, p2.y, p3.x, p3.y);

        strokeWeight(10);
        setColor(color1);
        point(p1.x, p1.y);
        strokeWeight(2);
        circle(p1.x, p1.y, 18);

        strokeWeight(10);
        setColor(color3);
        point(p3.x, p3.y);
        strokeWeight(2);
        circle(p3.x, p3.y, 18);
    }
    
    strokeWeight(10);
    setColor(color0);
    point(p0.x, p0.y);
    strokeWeight(2);
    circle(p0.x, p0.y, 18);

    strokeWeight(10);
    setColor(color2);
    point(p2.x, p2.y);
    strokeWeight(2);
    circle(p2.x, p2.y, 18);

    let lerpP0 = lerp2D(p0, p1, t);
    let colorLerpP0 = lerp3D(color0, color1, t);

    let lerpP2 = lerp2D(p3, p2, t);
    let colorLerpP2 = lerp3D(color3, color2, t);

    let lerpP3 = lerp2D(p1, p3, t);
    let colorLerpP3 = lerp3D(color1, color3, t);

    if (drawConstructionLines.checked()) {
        strokeWeight(2);
        stroke(70);

        line(lerpP0.x, lerpP0.y, lerpP3.x, lerpP3.y);
        line(lerpP2.x, lerpP2.y, lerpP3.x, lerpP3.y);
    }

    if (drawConstructionPoints.checked()) {
        strokeWeight(15);

        setColor(colorLerpP0);
        point(lerpP0.x, lerpP0.y);

        setColor(colorLerpP2);
        point(lerpP2.x, lerpP2.y);

        setColor(colorLerpP3);
        point(lerpP3.x, lerpP3.y);
    }

    let lerp2P0 = lerp2D(lerpP0, lerpP3, t);
    let colorLerp2P0 = lerp3D(colorLerpP0, colorLerpP3, t);

    let lerp2P1 = lerp2D(lerpP3, lerpP2, t);
    let colorLerp2P1 = lerp3D(colorLerpP3, colorLerpP2, t);

    if (drawConstructionLines.checked()) {
        strokeWeight(2);
        stroke(60);
        line(lerp2P0.x, lerp2P0.y, lerp2P1.x, lerp2P1.y);
    }

    if (drawConstructionPoints.checked()) {
        strokeWeight(20);

        setColor(colorLerp2P0);
        point(lerp2P0.x, lerp2P0.y);

        setColor(colorLerp2P1);
        point(lerp2P1.x, lerp2P1.y);
    }
    
    let bezierP = lerp2D(lerp2P0, lerp2P1, t);
    let colorBezier = lerp3D(colorLerp2P0, colorLerp2P1, t);

    if (drawConstructionPoints.checked()) {
        strokeWeight(25);
        setColor(colorBezier);
        point(bezierP.x, bezierP.y);
    }
    
    strokeWeight(2);

    let previousBezier;

    for (let i = 0; i < 1.02; i += 0.02) {
        let pointA1 = lerp2D(p0, p1, i);
        let pointA2 = lerp2D(p3, p2, i);
        let pointA3 = lerp2D(p1, p3, i);

        let hueA1 = lerp3D(color0, color1, i);
        let hueA2 = lerp3D(color3, color2, i);
        let hueA3 = lerp3D(color1, color3, i);

        let pointB1 = lerp2D(pointA1, pointA3, i);
        let pointB2 = lerp2D(pointA3, pointA2, i);

        let hueB1 = lerp3D(hueA1, hueA3, i);
        let hueB2 = lerp3D(hueA3, hueA2, i);

        let bezier = lerp2D(pointB1, pointB2, i);
        let hue = lerp3D(hueB1, hueB2, i);

        setColor(hue);
        
        if (i == 0) {
            line(p0.x, p0.y, bezier.x, bezier.y);
        } else {
            line(previousBezier.x, previousBezier.y, bezier.x, bezier.y);
        }
        // point(bezier.x, bezier.y);

        previousBezier = bezier;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    p0.x *= windowWidth / previousWidth;
    p0.y *= windowHeight / previousHeight;

    p1.x *= windowWidth / previousWidth;
    p1.y *= windowHeight / previousHeight;

    p2.x *= windowWidth / previousWidth;
    p2.y *= windowHeight / previousHeight;

    p3.x *= windowWidth / previousWidth;
    p3.y *= windowHeight / previousHeight;
    
    previousWidth = windowWidth;
    previousHeight = windowHeight;
}

function changeFunction() {
    if (select.value() == "Quadratic") {
        drawQuadratic = true;
    } else if (select.value() == "Cubic") {
        drawQuadratic = false;
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    previousWidth = windowWidth;
    previousHeight = windowHeight;

    p0 = createVector(windowWidth / 5, windowHeight / 4);
    p1 = createVector(windowWidth * 2 / 5, windowHeight * 3 / 5);
    p2 = createVector(windowWidth * 5 / 6, windowHeight / 5);
    p3 = createVector(windowWidth * 4 / 5, windowHeight * 3 / 4)

    colorSpace = createSelect();
    colorSpace.position(20, 200);
    colorSpace.option("RGB");
    colorSpace.option("LRGB");
    colorSpace.option("A98");
    colorSpace.option("P3");
    colorSpace.option("ProPhoto");
    colorSpace.option("REC2020");
    colorSpace.option("HSL");
    colorSpace.option("HSV");
    colorSpace.option("HSI");
    colorSpace.option("HWB");
    colorSpace.option("LAB");
    colorSpace.option("LCH");
    colorSpace.option("LAB65");
    colorSpace.option("LCH65");
    colorSpace.option("LUV");
    colorSpace.option("LCHUV");
    colorSpace.option("DLAB");
    colorSpace.option("DLCH");
    colorSpace.option("OkLab");
    colorSpace.option("OkLch");
    colorSpace.option("JAB");
    colorSpace.option("JCH");
    colorSpace.option("YIQ");
    colorSpace.option("XYZ");
    colorSpace.option("XYZ65");
    colorSpace.option("CubeHelix");
    colorSpace.selected("RGB");

    slider = createSlider(0, 1, 0, 0.001);
    slider.position(20, 50);

    select = createSelect();
    select.position(20, 80);
    select.option("Quadratic");
    select.option("Cubic");
    select.selected("Quadratic");
    select.changed(changeFunction);

    drawConstructionLines = createCheckbox(" Draw Construction Lines", true);
    drawConstructionLines.position(20, 110);
    drawConstructionPoints = createCheckbox(" Draw Construction Points", true);
    drawConstructionPoints.position(20, 140);
    drawControlPoints = createCheckbox(" Draw Control Points", true);
    drawControlPoints.position(20, 170);

    hideUI = createCheckbox(" Hide UI", false);
    hideUI.position(20, 20);

    drawQuadratic = true;

    move0WithMouse = false;
    move1WithMouse = false;
    moveControl0WithMouse = false;
    moveControl1WithMouse = false;
}

function draw() {
    background(54);

    
    if (colorSpace.value() == "RGB") {
        color0 = createVector(0, 123, 255);
        color1 = createVector(40, 167, 69);
        color2 = createVector(220, 53, 69);
        color3 = createVector(255, 193, 7);

    } else if (colorSpace.value() == "LRGB") {
        color0tmp = culori.lrgb("#007BFF");
        color0 = createVector(color0tmp.r, color0tmp.g, color0tmp.b);
        color1tmp = culori.lrgb("#28A745");
        color1 = createVector(color1tmp.r, color1tmp.g, color1tmp.b);
        color2tmp = culori.lrgb("#DC3545");
        color2 = createVector(color2tmp.r, color2tmp.g, color2tmp.b);
        color3tmp = culori.lrgb("#FFC107");
        color3 = createVector(color3tmp.r, color3tmp.g, color3tmp.b);   

    } else if (colorSpace.value() == "A98") {
        color0tmp = culori.a98("#007BFF");
        color0 = createVector(color0tmp.r, color0tmp.g, color0tmp.b);
        color1tmp = culori.a98("#28A745");
        color1 = createVector(color1tmp.r, color1tmp.g, color1tmp.b);
        color2tmp = culori.a98("#DC3545");
        color2 = createVector(color2tmp.r, color2tmp.g, color2tmp.b);
        color3tmp = culori.a98("#FFC107");
        color3 = createVector(color3tmp.r, color3tmp.g, color3tmp.b);     
    
    } else if (colorSpace.value() == "P3") {
        color0tmp = culori.p3("#007BFF");
        color0 = createVector(color0tmp.r, color0tmp.g, color0tmp.b);
        color1tmp = culori.p3("#28A745");
        color1 = createVector(color1tmp.r, color1tmp.g, color1tmp.b);
        color2tmp = culori.p3("#DC3545");
        color2 = createVector(color2tmp.r, color2tmp.g, color2tmp.b);
        color3tmp = culori.p3("#FFC107");
        color3 = createVector(color3tmp.r, color3tmp.g, color3tmp.b);     
    
    } else if (colorSpace.value() == "ProPhoto") {
        color0tmp = culori.prophoto("#007BFF");
        color0 = createVector(color0tmp.r, color0tmp.g, color0tmp.b);
        color1tmp = culori.prophoto("#28A745");
        color1 = createVector(color1tmp.r, color1tmp.g, color1tmp.b);
        color2tmp = culori.prophoto("#DC3545");
        color2 = createVector(color2tmp.r, color2tmp.g, color2tmp.b);
        color3tmp = culori.prophoto("#FFC107");
        color3 = createVector(color3tmp.r, color3tmp.g, color3tmp.b);   
        
    } else if (colorSpace.value() == "REC2020") {
        color0tmp = culori.rec2020("#007BFF");
        color0 = createVector(color0tmp.r, color0tmp.g, color0tmp.b);
        color1tmp = culori.rec2020("#28A745");
        color1 = createVector(color1tmp.r, color1tmp.g, color1tmp.b);
        color2tmp = culori.rec2020("#DC3545");
        color2 = createVector(color2tmp.r, color2tmp.g, color2tmp.b);
        color3tmp = culori.rec2020("#FFC107");
        color3 = createVector(color3tmp.r, color3tmp.g, color3tmp.b);   
           
    } else if (colorSpace.value() == "HSL") {
        color0tmp = culori.hsl("#007BFF");
        color0 = createVector(color0tmp.h, color0tmp.s, color0tmp.l);
        color1tmp = culori.hsl("#28A745");
        color1 = createVector(color1tmp.h, color1tmp.s, color1tmp.l);
        color2tmp = culori.hsl("#DC3545");
        color2 = createVector(color2tmp.h, color2tmp.s, color2tmp.l);
        color3tmp = culori.hsl("#FFC107");
        color3 = createVector(color3tmp.h, color3tmp.s, color3tmp.l);   
    
    } else if (colorSpace.value() == "HSV") {
        color0tmp = culori.hsv("#007BFF");
        color0 = createVector(color0tmp.h, color0tmp.s, color0tmp.v);
        color1tmp = culori.hsv("#28A745");
        color1 = createVector(color1tmp.h, color1tmp.s, color1tmp.v);
        color2tmp = culori.hsv("#DC3545");
        color2 = createVector(color2tmp.h, color2tmp.s, color2tmp.v);
        color3tmp = culori.hsv("#FFC107");
        color3 = createVector(color3tmp.h, color3tmp.s, color3tmp.v);  

    } else if (colorSpace.value() == "HSI") {
        color0tmp = culori.hsi("#007BFF");
        color0 = createVector(color0tmp.h, color0tmp.s, color0tmp.i);
        color1tmp = culori.hsi("#28A745");
        color1 = createVector(color1tmp.h, color1tmp.s, color1tmp.i);
        color2tmp = culori.hsi("#DC3545");
        color2 = createVector(color2tmp.h, color2tmp.s, color2tmp.i);
        color3tmp = culori.hsi("#FFC107");
        color3 = createVector(color3tmp.h, color3tmp.s, color3tmp.i);  

    } else if (colorSpace.value() == "HWB") {
        color0tmp = culori.hwb("#007BFF");
        color0 = createVector(color0tmp.h, color0tmp.w, color0tmp.b);
        color1tmp = culori.hwb("#28A745");
        color1 = createVector(color1tmp.h, color1tmp.w, color1tmp.b);
        color2tmp = culori.hwb("#DC3545");
        color2 = createVector(color2tmp.h, color2tmp.w, color2tmp.b);
        color3tmp = culori.hwb("#FFC107");
        color3 = createVector(color3tmp.h, color3tmp.w, color3tmp.b);  

    } else if (colorSpace.value() == "LAB") {
        color0tmp = culori.lab("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.a, color0tmp.b);
        color1tmp = culori.lab("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.a, color1tmp.b);
        color2tmp = culori.lab("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.a, color2tmp.b);
        color3tmp = culori.lab("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.a, color3tmp.b);  

    } else if (colorSpace.value() == "LCH") {
        color0tmp = culori.lch("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.c, color0tmp.h);
        color1tmp = culori.lch("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.c, color1tmp.h);
        color2tmp = culori.lch("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.c, color2tmp.h);
        color3tmp = culori.lch("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.c, color3tmp.h); 
        
    } else if (colorSpace.value() == "LAB65") {
        color0tmp = culori.lab65("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.a, color0tmp.b);
        color1tmp = culori.lab65("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.a, color1tmp.b);
        color2tmp = culori.lab65("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.a, color2tmp.b);
        color3tmp = culori.lab65("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.a, color3tmp.b); 

    } else if (colorSpace.value() == "LCH65") {
        color0tmp = culori.lch65("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.c, color0tmp.h);
        color1tmp = culori.lch65("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.c, color1tmp.h);
        color2tmp = culori.lch65("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.c, color2tmp.h);
        color3tmp = culori.lch65("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.c, color3tmp.h); 
        
    } else if (colorSpace.value() == "LUV") {
        color0tmp = culori.luv("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.u, color0tmp.v);
        color1tmp = culori.luv("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.u, color1tmp.v);
        color2tmp = culori.luv("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.u, color2tmp.v);
        color3tmp = culori.luv("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.u, color3tmp.v); 
        
    } else if (colorSpace.value() == "LCHUV") {
        color0tmp = culori.lchuv("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.c, color0tmp.h);
        color1tmp = culori.lchuv("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.c, color1tmp.h);
        color2tmp = culori.lchuv("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.c, color2tmp.h);
        color3tmp = culori.lchuv("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.c, color3tmp.h); 
        
    } else if (colorSpace.value() == "DLAB") {
        color0tmp = culori.dlab("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.a, color0tmp.b);
        color1tmp = culori.dlab("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.a, color1tmp.b);
        color2tmp = culori.dlab("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.a, color2tmp.b);
        color3tmp = culori.dlab("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.a, color3tmp.b); 

    } else if (colorSpace.value() == "DLCH") {
        color0tmp = culori.dlch("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.c, color0tmp.h);
        color1tmp = culori.dlch("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.c, color1tmp.h);
        color2tmp = culori.dlch("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.c, color2tmp.h);
        color3tmp = culori.dlch("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.c, color3tmp.h); 

    } else if (colorSpace.value() == "OkLab") {
        color0tmp = culori.oklab("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.a, color0tmp.b);
        color1tmp = culori.oklab("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.a, color1tmp.b);
        color2tmp = culori.oklab("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.a, color2tmp.b);
        color3tmp = culori.oklab("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.a, color3tmp.b);

    } else if (colorSpace.value() == "OkLch") {
        color0tmp = culori.oklch("#007BFF");
        color0 = createVector(color0tmp.l, color0tmp.c, color0tmp.h);
        color1tmp = culori.oklch("#28A745");
        color1 = createVector(color1tmp.l, color1tmp.c, color1tmp.h);
        color2tmp = culori.oklch("#DC3545");
        color2 = createVector(color2tmp.l, color2tmp.c, color2tmp.h);
        color3tmp = culori.oklch("#FFC107");
        color3 = createVector(color3tmp.l, color3tmp.c, color3tmp.h);

    } else if (colorSpace.value() == "JAB") {
        color0tmp = culori.jab("#007BFF");
        color0 = createVector(color0tmp.j, color0tmp.a, color0tmp.b);
        color1tmp = culori.jab("#28A745");
        color1 = createVector(color1tmp.j, color1tmp.a, color1tmp.b);
        color2tmp = culori.jab("#DC3545");
        color2 = createVector(color2tmp.j, color2tmp.a, color2tmp.b);
        color3tmp = culori.jab("#FFC107");
        color3 = createVector(color3tmp.j, color3tmp.a, color3tmp.b);

    } else if (colorSpace.value() == "JCH") {
        color0tmp = culori.jch("#007BFF");
        color0 = createVector(color0tmp.j, color0tmp.c, color0tmp.h);
        color1tmp = culori.jch("#28A745");
        color1 = createVector(color1tmp.j, color1tmp.c, color1tmp.h);
        color2tmp = culori.jch("#DC3545");
        color2 = createVector(color2tmp.j, color2tmp.c, color2tmp.h);
        color3tmp = culori.jch("#FFC107");
        color3 = createVector(color3tmp.j, color3tmp.c, color3tmp.h);

    } else if (colorSpace.value() == "YIQ") {
        color0tmp = culori.yiq("#007BFF");
        color0 = createVector(color0tmp.y, color0tmp.i, color0tmp.q);
        color1tmp = culori.yiq("#28A745");
        color1 = createVector(color1tmp.y, color1tmp.i, color1tmp.q);
        color2tmp = culori.yiq("#DC3545");
        color2 = createVector(color2tmp.y, color2tmp.i, color2tmp.q);
        color3tmp = culori.yiq("#FFC107");
        color3 = createVector(color3tmp.y, color3tmp.i, color3tmp.q);

    } else if (colorSpace.value() == "XYZ") {
        color0tmp = culori.xyz("#007BFF");
        color0 = createVector(color0tmp.x, color0tmp.y, color0tmp.z);
        color1tmp = culori.xyz("#28A745");
        color1 = createVector(color1tmp.x, color1tmp.y, color1tmp.z);
        color2tmp = culori.xyz("#DC3545");
        color2 = createVector(color2tmp.x, color2tmp.y, color2tmp.z);
        color3tmp = culori.xyz("#FFC107");
        color3 = createVector(color3tmp.x, color3tmp.y, color3tmp.z);

    } else if (colorSpace.value() == "XYZ65") {
        color0tmp = culori.xyz65("#007BFF");
        color0 = createVector(color0tmp.x, color0tmp.y, color0tmp.z);
        color1tmp = culori.xyz65("#28A745");
        color1 = createVector(color1tmp.x, color1tmp.y, color1tmp.z);
        color2tmp = culori.xyz65("#DC3545");
        color2 = createVector(color2tmp.x, color2tmp.y, color2tmp.z);
        color3tmp = culori.xyz65("#FFC107");
        color3 = createVector(color3tmp.x, color3tmp.y, color3tmp.z);

    } else if (colorSpace.value() == "CubeHelix") {
        color0tmp = culori.cubehelix("#007BFF");
        color0 = createVector(color0tmp.h, color0tmp.s, color0tmp.l);
        color1tmp = culori.cubehelix("#28A745");
        color1 = createVector(color1tmp.h, color1tmp.s, color1tmp.l);
        color2tmp = culori.cubehelix("#DC3545");
        color2 = createVector(color2tmp.h, color2tmp.s, color2tmp.l);
        color3tmp = culori.cubehelix("#FFC107");
        color3 = createVector(color3tmp.h, color3tmp.s, color3tmp.l);

    }
    

    if (hideUI.checked()) {
        slider.hide();
        select.hide();
        drawConstructionLines.hide();
        drawConstructionPoints.hide();
        drawControlPoints.hide();
        colorSpace.hide();
    } else {
        slider.show();
        select.show();
        drawConstructionLines.show();
        drawConstructionPoints.show();
        drawControlPoints.show();
        colorSpace.show();
    }

    let t = slider.value();

    if (move0WithMouse) {
        if (mouseX >= 0 && mouseX <= windowWidth) {
            p0.x = mouseX;
        }
        if (mouseY >= 0 && mouseY <= windowHeight) {
            p0.y = mouseY;
        }
    } else if (move1WithMouse) {
        if (mouseX >= 0 && mouseX <= windowWidth) {
            p2.x = mouseX;
        }
        if (mouseY >= 0 && mouseY <= windowHeight) {
            p2.y = mouseY;
        }
    } else if (moveControl0WithMouse) {
        if (mouseX >= 0 && mouseX <= windowWidth) {
            p1.x = mouseX;
        }
        if (mouseY >= 0 && mouseY <= windowHeight) {
            p1.y = mouseY;
        }
    } else if (moveControl1WithMouse) {
        if (mouseX >= 0 && mouseX <= windowWidth) {
            p3.x = mouseX;
        }
        if (mouseY >= 0 && mouseY <= windowHeight) {
            p3.y = mouseY;
        }
    }
    
    if (drawQuadratic) {
        drawQuadraticBezierCurve(t);
    } else {
        drawCubicBezierCurve(t);
    }
}