let slider;
let select;
let drawConstructionLines;
let drawConstructionPoints;
let drawControlPoints;
let hideUI;
let oklabCheck;
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
    if (oklabCheck.checked()) {
        var tmpColor = culori.rgb({mode: "oklab",
                                   l: color.x,
                                   a: color.y,
                                   b: color.z});
        tmpColor.r = map(tmpColor.r, 0, 1, 0, 255);
        tmpColor.g = map(tmpColor.g, 0, 1, 0, 255);
        tmpColor.b = map(tmpColor.b, 0, 1, 0, 255);
        stroke(tmpColor.r, tmpColor.g, tmpColor.b);
    } else {
        stroke(color.x, color.y, color.z);
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

    oklabCheck = createCheckbox(" OkLab", true);
    oklabCheck.position(20, 200);

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

    if (oklabCheck.checked()) {
        color0OkLab = culori.oklab("#007BFF");
        color0 = createVector(color0OkLab.l, color0OkLab.a, color0OkLab.b);
        color1OkLab = culori.oklab("#28A745");
        color1 = createVector(color1OkLab.l, color1OkLab.a, color1OkLab.b);
        color2OkLab = culori.oklab("#DC3545");
        color2 = createVector(color2OkLab.l, color2OkLab.a, color2OkLab.b);
        color3OkLab = culori.oklab("#FFC107");
        color3 = createVector(color3OkLab.l, color3OkLab.a, color3OkLab.b);
    } else {
        color0 = createVector(0, 123, 255);
        color1 = createVector(40, 167, 69);
        color2 = createVector(220, 53, 69);
        color3 = createVector(255, 193, 7);
    }

    if (hideUI.checked()) {
        slider.hide();
        select.hide();
        drawConstructionLines.hide();
        drawConstructionPoints.hide();
        drawControlPoints.hide();
        oklabCheck.hide();
    } else {
        slider.show();
        select.show();
        drawConstructionLines.show();
        drawConstructionPoints.show();
        drawControlPoints.show();
        oklabCheck.show();
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