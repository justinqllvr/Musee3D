var canvas = document.getElementById("musee");

var engine = new BABYLON.Engine(canvas, true);



var createScene = function () {

    var scene = new BABYLON.Scene(engine); //On crée une nouvelle scène
    scene.clearColor = new BABYLON.Color3(0, 0.1, 0); //Couleur par défaut quand il n'y a pas d'élement (soit la couleur au fond)

    //Création d'une caméra avec les paramètres : string nom_camera, Vector3 position, scene
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 3, -10), scene); //0, 3, -10

    camera.setTarget(BABYLON.Vector3.Zero()); //On fait regarder la caméra vers l'origine de la scène.

    camera.attachControl(canvas, false); //On attache les contrôles de la scène via le canvas qu'on a crée tout à l'heure dans musee.html


    //gestion des contrôles 
    camera.keysLeft = [81, 37]; //Q et <-
    camera.keysUp = [90, 38]; //Z et Flèche du haut
    camera.keysRight = [68, 39]; //D et ->
    camera.keysDown = [83, 40]; //S et flèche du bas

    camera.speed = 1;

    camera.checkCollisions = true;

    scene.gravity = new BABYLON.Vector3(0, 0, 0);
    camera.applyGravity = true;

    // //appliquer un effet à la caméra 
    // var postProcess0 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), 0, 1.0, camera);
    //gestion du curseur 

    var pointerlockchange = function () {
        var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || false;
        if (!controlEnabled) {
            camera.detachControl(canvas);
            islocked = false;
        }
        else {
            camera.attachControl(canvas);
            islocked = true;
        }
    };

    camera.angularSensibility = 10000;


    var islocked = false;
    scene.onPointerDown = function (evt) {
        if (!islocked) //Si la souris n'est pas bloqué...
        {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
            //Test des requêtes de divers navigateurs
            if (canvas.requestPointerLock) //Si la requête aboutie,
                canvas.requestPointerLock(); //On appelle la fonction
        }
        //En testant ici si evt === 0, 1 ou 2, on peut déterminer quel clic a été pressé, et on peut effectuer
        //des actions liées à un clic.
    };

    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    //Création de l'enceinte 
    var loader = new BABYLON.AssetsManager(scene);
    var salle = loader.addMeshTask("nom", "", "obj/", "museev4.glb");

    salle.onSuccess = function (t) {
        t.loadedMeshes.forEach(function (m) { //On édite ici chaque maillage de l'objet
            m.position.y = 0; //Pour le monter en hauteur
            m.position.x = 10; //Et on le décale un peu pour que quand on commence, il soit bien placé.
            m.checkCollisions = true; //Ajout de la détection des collisions, expliqué plus tard.
            m.material = mat_sol;
        });
    };

    loader.load();


    //Gestion des collisions par une sphere crée sur nous même
    var hitbox = BABYLON.Mesh.CreateSphere("hitbox", 10, 10, scene);
    hitbox.position = new BABYLON.Vector3(0, 3, -10);
    hitbox.parent = camera;
    hitbox.checkCollisions = true;
    //Paramètres : string nom, Vector3 orientation_lumière, scene
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene); //On crée une nouvelle lumière générale orientée vers le haut

    light.intensity = .5; //On diminue un peu l'intensité de la lumière

    //Paramètres : string nom, int nombre_sous-divisions, int diamètre, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene); //On rajoute une sphère pour voir du visuel (et qui sera le centre de la salle d'exposition).

    sphere.position.y = 1; //On fait monter un peu la sphère.

    sphere.checkCollisions = true;

    sphere.alpha = 0.1;
    var materialFilFer = new BABYLON.StandardMaterial("FildeFer", scene);
    materialFilFer.wireframe = true;
    sphere.material = materialFilFer;

    //Paramètres : string nom, int longueur (axe x), int largeur (axe z), int sous-divisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 2, scene); //On crée un sol (petit certes) qui servira plus tard
    ground.checkCollisions = true;

    //gestion des textures et matériaux
    var mat_sol = new BABYLON.StandardMaterial("sol", scene);
    mat_sol.diffuseTexture = new BABYLON.Texture("texture/sol.png", scene);
    mat_sol.bumpTexture = new BABYLON.Texture("texture/sol2.jpg", scene);
    ground.material = mat_sol;

    //permet de resize les textures
    mat_sol.diffuseTexture.uScale = 16.0 * 1.5;
    mat_sol.diffuseTexture.vScale = 16.0;
    mat_sol.bumpTexture.uScale = 16.0 * 1.5;
    mat_sol.bumpTexture.vScale = 16.0;

    //créé une vidéo
    var videoMesh = BABYLON.MeshBuilder.CreatePlane("videoMesh", {height: 16, width: 9}, scene);
    var videoMat = new BABYLON.StandardMaterial("vidFac", scene);
    videoMat.diffuseTexture = new BABYLON.VideoTexture("videosFac", ["texture/video/Motion.mp4"], scene, false);
    videoMat.backFaceCulling = false; //active l'option de texture en regardant par derrière
    videoMat.diffuseColor = new BABYLON.Color3(1, 1, 1); //couleur pour la video
    videoMat.specularColor = new BABYLON.Color3(0, 0, 0); //reflets pour la video
    videoMat.diffuseTexture.video.loop = true; //on applique le matériau à l'objet + on joue en boucle la vidéo
    videoMesh.material = videoMat;
    videoMat.diffuseTexture.uScale = 1;
    videoMat.diffuseTexture.vScale = 2;
    //permet de faire tourner la sphere
    scene.beforeRender = function() {
        sphere.rotation.x -= 1/200;
        sphere.rotation.y -= 1/100;
    }
    loader.onFinish = function () {
        engine.runRenderLoop(function () {
            // hitbox.position = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
            scene.render();
        });
    };

    
    return scene; //Et on renvoie la scène pour pouvoir l'afficher plus tard.    
}

var scene = createScene();

window.addEventListener('resize', function () { engine.resize() });