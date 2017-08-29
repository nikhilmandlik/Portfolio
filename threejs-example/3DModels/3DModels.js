var ambientLight = 0;
var camera, scene, controls, renderer;
var container, stats;
var directionalLight = 0;
var mouseX = 0, mouseY = 0;
var objectpositiony = 0;
var a = new THREE.Vector3(0, 50, 0);

function init(cameraz, objy, modelname) {
    var oldmodel = document.getElementById('chartId');
    var parentDiv = oldmodel.parentNode;
    var windowSize = getWindowSize();

    container = document.createElement('chartId');
    container.setAttribute('id','chartId');
    parentDiv.replaceChild(container, oldmodel);

    camera = new THREE.PerspectiveCamera(50, 1, 1, 20000);
    camera.position.z = cameraz;
    camera.position.y = 0;
    objectpositiony = objy;

    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 3.0;
    controls.zoomSpeed = 1.5;
    controls.panSpeed = 1;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
    controls.addEventListener('change', render);

    // scene
    scene = new THREE.Scene();
    directionalLight = 0x36373A;
    ambientLight = 0x999999;

    var ambient = new THREE.AmbientLight(0x999999);
    scene.add(ambient);

    var directionalLight1 = new THREE.DirectionalLight(directionalLight);
    directionalLight1.position.set(50, 50, 50).normalize();
    scene.add(directionalLight1);

    var directionalLight2 = new THREE.DirectionalLight(directionalLight);
    directionalLight2.position.set(-50, -50, -50).normalize();
    scene.add(directionalLight2);

    var directionalLight3 = new THREE.DirectionalLight(directionalLight);
    directionalLight3.position.set(-50, 50, 50).normalize();
    scene.add(directionalLight3);

    var directionalLight4 = new THREE.DirectionalLight(directionalLight);
    directionalLight4.position.set(50, -50, -50).normalize();
    scene.add(directionalLight4);

    if (modelname == 'Natalie'){
        var objlocation1 = '3DModels/Natalie/Natalie.OBJ';
        var objlocation2 = '3DModels/Natalie/Hairs.obj';
        var texturelocation1 = '3DModels/Natalie/Natalie.jpg';
        var texturelocation2 = '3DModels/Natalie/Hairs.jpg';

        // model 1
        var loader1 = new THREE.OBJLoader();
        loader1.addEventListener('load', function (event) {
            var object1 = event.content;
            for (var i = 0, l = object1.children.length; i < l; i ++) {
                object1.children[ i ].material.map = texture1;
            }
            object1.position.y = objectpositiony;
            scene.add(object1);
        });
        loader1.load(objlocation1);

        // texture 1
        var texture1 = new THREE.Texture();
        var loader1 = new THREE.ImageLoader();
        loader1.addEventListener('load', function (event) {
            texture1.image = event.content;
            texture1.needsUpdate = true;
        });
        loader1.load(texturelocation1);

        // model 2
        var loader2 = new THREE.OBJLoader();
        loader2.addEventListener('load', function (event) {
            var object5 = event.content;
            for (var i = 0, l = object5.children.length; i < l; i ++) {
                object5.children[ i ].material.map = texture2;
            }
            object5.position.y = objectpositiony;
            scene.add(object5);
        });
        loader2.load(objlocation2);

        // texture 2
        var texture2 = new THREE.Texture();
        var loader2 = new THREE.ImageLoader();
        loader2.addEventListener('load', function (event) {
            texture2.image = event.content;
            texture2.needsUpdate = true;
        });
        loader2.load(texturelocation2);
    }
    if (modelname == 'Hiranyakashipu'){
        var texturelocation1 = '3DModels/Hiranyakashipu/Armor.png';
        var texturelocation2 = '3DModels/Hiranyakashipu/SkinCloths.png';
        var objlocation1 = '3DModels/Hiranyakashipu/Armor.obj';
        var objlocation2 = '3DModels/Hiranyakashipu/SkinCloths.obj';

        // model 1
        var loader1 = new THREE.OBJLoader();
        loader1.addEventListener('load', function (event) {
            var object1 = event.content;
            for (var i = 0, l = object1.children.length; i < l; i ++) {
                object1.children[ i ].material.map = texture1;
            }
            object1.position.y = objectpositiony;
            scene.add(object1);
        });
        loader1.load(objlocation1);

        // texture 1
        var texture1 = new THREE.Texture();
        var loader1 = new THREE.ImageLoader();
        loader1.addEventListener('load', function (event) {
            texture1.image = event.content;
            texture1.needsUpdate = true;
        });
        loader1.load(texturelocation1);

        // model 2
        var loader2 = new THREE.OBJLoader();
        loader2.addEventListener('load', function (event) {
            var object2 = event.content;
            for (var i = 0, l = object2.children.length; i < l; i ++) {
                object2.children[ i ].material.map = texture2;
            }
            object2.position.y = objectpositiony;
            scene.add(object2);
        });
        loader2.load(objlocation2);

        // texture 2
        var texture2 = new THREE.Texture();
        var loader2 = new THREE.ImageLoader();
        loader2.addEventListener('load', function (event) {
            texture2.image = event.content;
            texture2.needsUpdate = true;
        });
        loader2.load(texturelocation2);
    }
    if (modelname == 'Mace'){
        var texturelocation1 = '3DModels/Hiranyakashipu/Mace.png';
        var objlocation1 = '3DModels/Hiranyakashipu/Mace.obj';

        // model 1
        var loader1 = new THREE.OBJLoader();
        loader1.addEventListener('load', function (event) {
            var object1 = event.content;
            for (var i = 0, l = object1.children.length; i < l; i ++) {
                object1.children[ i ].material.map = texture1;
            }
            object1.position.y = objectpositiony;
            scene.add(object1);
        });
        loader1.load(objlocation1);

        // texture 1
        var texture1 = new THREE.Texture();
        var loader1 = new THREE.ImageLoader();
        loader1.addEventListener('load', function (event) {
            texture1.image = event.content;
            texture1.needsUpdate = true;
        });
        loader1.load(texturelocation1);
    }

    if (modelname == 'Help'){
        var texturelocation1 = '3DModels/Help/Help.jpg';
        var objlocation1 = '3DModels/Help/Help.obj';

        // model 1
        var loader1 = new THREE.OBJLoader();
        loader1.addEventListener('load', function (event) {
            var object1 = event.content;
            for (var i = 0, l = object1.children.length; i < l; i ++) {
                object1.children[ i ].material.map = texture1;
            }
            object1.position.y = objectpositiony;
            scene.add(object1);
        });
        loader1.load(objlocation1);

        // texture 1
        var texture1 = new THREE.Texture();
        var loader1 = new THREE.ImageLoader();
        loader1.addEventListener('load', function (event) {
            texture1.image = event.content;
            texture1.needsUpdate = true;
        });
        loader1.load(texturelocation1);
    }

    renderer = new THREE.WebGLRenderer({ clearAlpha: 1, clearColor: 0xaaaaaa, antialias: true });
    renderer.setSize(windowSize, windowSize);
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, true);
    animate();
}

function getWindowSize() {
    var size = Math.min(window.innerWidth, window.innerHeight);
    size = Math.max(400, size);
    return size;
}

function onWindowResize() {
    var windowSize = getWindowSize();
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    camera.lookAt(a);
    renderer.setSize(windowSize, windowSize);
    controls.handleResize();
    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
}

function render() {
    renderer.render(scene, camera);

    if (stats) {
        stats.update();
    }
}

function Help() {
    var cameraz = 17;
    var objy = -6;
    init(cameraz, objy, 'Hiranyakashipu');
}

function Natalie() {
    var cameraz = 30;
    var objy = -10;
    init(cameraz,objy,'Natalie');
}

function Hiranyakashipu() {
    var cameraz = 17;
    var objy = -6;
    init(cameraz, objy, 'Hiranyakashipu');
}

function Mace() {
    var cameraz = 14;
    var objy = -5;
    init(cameraz, objy, 'Mace');
}


// Navigation
var backButton = document.querySelector('.back-button');
backButton.addEventListener('click', goBack);

function goBack() {
    document.location.href  = "/";
}
