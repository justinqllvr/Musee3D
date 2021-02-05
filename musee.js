var canDisplay = false;
var canvas = document.getElementById("musee");
var engine = new BABYLON.Engine(canvas, true);
var canControl = true;

var createScene = function () {

    var scene = new BABYLON.Scene(engine); //On crée une nouvelle scène
    scene.clearColor = new BABYLON.Color3(255, 255, 255); //Couleur par défaut quand il n'y a pas d'élement (soit la couleur au fond)

    //Création d'une caméra avec les paramètres : string nom_camera, Vector3 position, scene
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 3, -15), scene);
    camera.setTarget(new BABYLON.Vector3(0, 0, -70)); //On fait regarder la caméra vers l'origine de la scène.
    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.attachControl(canvas, false);
    camera.position = new BABYLON.Vector3(-1, 2, 80);

    BABYLON.Engine.audioEngine.setGlobalVolume(0);




    var hitbox = BABYLON.Mesh.CreateSphere("hitbox", 16, 1, scene);
    var mat_hitbox = new BABYLON.StandardMaterial("hitbox", scene);
    mat_hitbox.alpha = 0;
    hitbox.material = mat_hitbox;

    //Paramètres : string nom, Vector3 orientation_lumière, scene
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene); //On crée une nouvelle lumière générale orientée vers le haut
    light.intensity = 1; //On diminue un peu l'intensité de la lumière

    //Paramètres : string nom, int longueur (axe x), int largeur (axe z), int sous-divisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 250, 250, 2, scene); //On crée un sol (petit certes) qui servira plus tard
    var mat_sol = new BABYLON.StandardMaterial("sol", scene);
    mat_sol.diffuseTexture = new BABYLON.Texture("texture/marbre.jpg", scene);
    mat_sol.bumpTexture = new BABYLON.Texture("texture/marbre.jpg", scene);
    mat_sol.diffuseTexture.uScale = 50.0 * 1.5;
    mat_sol.diffuseTexture.vScale = 50.0;
    mat_sol.bumpTexture.uScale = 50.0 * 1.5;
    mat_sol.bumpTexture.vScale = 50.0;
    ground.checkCollisions = true;
    ground.material = mat_sol;






    // Peintures principales (avec interaction)

    var fransHals = BABYLON.MeshBuilder.CreatePlane("fransHals", { height: 3.75, width: 3.12, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    fransHals.position = new BABYLON.Vector3(-1, 3.5, 63.8);
    fransHals.rotation.y = 3.14;
    var fransHalsMAT = new BABYLON.StandardMaterial("fransHalsMAT", scene);
    fransHalsMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/main/franshals.jpg", scene, false);
    fransHals.material = fransHalsMAT;

    var anonymeFlamand = BABYLON.MeshBuilder.CreatePlane("anonymeFlamand", { height: 6.54, width: 5.4, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    anonymeFlamand.position = new BABYLON.Vector3(-1, 3.5, 29.1);
    anonymeFlamand.rotation.y = 3.14;
    var anonymeFlamandMAT = new BABYLON.StandardMaterial("anonymeFlamandMAT", scene);
    anonymeFlamandMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/main/anonymeflamand.jpg", scene, false);
    anonymeFlamand.material = anonymeFlamandMAT;

    var hendrickTerBrugghen = BABYLON.MeshBuilder.CreatePlane("hendrickTerBrugghen", { height: 6.27, width: 5.08, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    hendrickTerBrugghen.position = new BABYLON.Vector3(-13.7, 3.5, 32.5);
    hendrickTerBrugghen.rotation.y = 1.57;
    var hendrickTerBrugghenMAT = new BABYLON.StandardMaterial("hendrickTerBrugghenMAT", scene);
    hendrickTerBrugghenMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/main/hendrickterbrugghen.jpeg", scene, false);
    hendrickTerBrugghen.material = hendrickTerBrugghenMAT;

    var vanGoyen = BABYLON.MeshBuilder.CreatePlane("vanGoyen", { height: 2.94, width: 4.14, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    vanGoyen.position = new BABYLON.Vector3(-14, 3.5, 5.1);
    vanGoyen.rotation.y = 3.14;
    var vanGoyenMAT = new BABYLON.StandardMaterial("vanGoyenMAT", scene);
    vanGoyenMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/main/janvangoyen.jpeg", scene, false);
    vanGoyen.material = vanGoyenMAT;

    var melchiorDhondecoeter = BABYLON.MeshBuilder.CreatePlane("melchiorDhondecoeter", { height: 4.08, width: 3.3, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    melchiorDhondecoeter.position = new BABYLON.Vector3(-24.6, 4, -13);
    melchiorDhondecoeter.rotation.y = -1.57;
    var melchiorDhondecoeterMAT = new BABYLON.StandardMaterial("melchiorDhondecoeterMAT", scene);
    melchiorDhondecoeterMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/main/melchiordhondecoeter.jpg", scene, false);
    melchiorDhondecoeter.material = melchiorDhondecoeterMAT;

    var bakhuizen = BABYLON.MeshBuilder.CreatePlane("bakhuizen", { height: 5.04, width: 5.04, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    bakhuizen.position = new BABYLON.Vector3(8.1, 3.5, -29);
    bakhuizen.rotation.y = 1.57;
    var bakhuizenMAT = new BABYLON.StandardMaterial("bakhuizenMAT", scene);
    bakhuizenMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/main/bakhuizen.jpg", scene, false);
    bakhuizen.material = bakhuizenMAT;

    var courrege = BABYLON.MeshBuilder.CreatePlane("courrege", { height: 7.8, width: 11.76, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    courrege.position = new BABYLON.Vector3(-1, 5, -41);
    courrege.rotation.y = 3.14;
    var courregeMAT = new BABYLON.StandardMaterial("courregeMAT", scene);
    courregeMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/main/courrege.jpg", scene, false);
    courrege.material = courregeMAT;

    var maitreChandelle = BABYLON.MeshBuilder.CreatePlane("maitreChandelle", { height: 7.78, width: 10.2, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    maitreChandelle.position = new BABYLON.Vector3(-12.4, 4.5, -58);
    maitreChandelle.rotation.y = -1.57;
    var maitreChandelleMAT = new BABYLON.StandardMaterial("maitreChandelleMAT", scene);
    maitreChandelleMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/main/chandelle.jpg", scene, false);
    maitreChandelle.material = maitreChandelleMAT;

    var pierrePaulRubens = BABYLON.MeshBuilder.CreatePlane("pierrePaulRubens", { height: 10.2, width: 10.3, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    pierrePaulRubens.position = new BABYLON.Vector3(-1, 5.5, -92.8);
    pierrePaulRubens.rotation.y = 3.14;
    var pierrePaulRubensMAT = new BABYLON.StandardMaterial("pierrePaulRubensMAT", scene);
    pierrePaulRubensMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/main/pierrepaulrubens.jpg", scene, false);
    pierrePaulRubens.material = pierrePaulRubensMAT;






    // Peintures secondaires (sans interaction)

    var hansClot = BABYLON.MeshBuilder.CreatePlane("hansClot", { height: 5.4, width: 14.52, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    hansClot.position = new BABYLON.Vector3(-1, 5, 83.9);
    var hansClotMAT = new BABYLON.StandardMaterial("hansClotMAT", scene);
    hansClotMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/hans_clot.jpg", scene, false);
    hansClot.material = hansClotMAT;

    var saintJust = BABYLON.MeshBuilder.CreatePlane("saintJust", { height: 11.46, width: 8.04, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    saintJust.position = new BABYLON.Vector3(20, 5.8, 83.9);
    var saintJustMAT = new BABYLON.StandardMaterial("saintJustMAT", scene);
    saintJustMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/saint_just.jpg", scene, false);
    saintJust.material = saintJustMAT;

    var tizianoVecellio = BABYLON.MeshBuilder.CreatePlane("tizianoVecellio", { height: 11.58, width: 8.58, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    tizianoVecellio.position = new BABYLON.Vector3(-22, 5.8, 83.9);
    var tizianoVecellioMAT = new BABYLON.StandardMaterial("tizianoVecellioMAT", scene);
    tizianoVecellioMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/tiziano_vecellio.jpg", scene, false);
    tizianoVecellio.material = tizianoVecellioMAT;

    var giorgioVasari = BABYLON.MeshBuilder.CreatePlane("giorgioVasari", { height: 6.24, width: 4.74, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    giorgioVasari.position = new BABYLON.Vector3(31.6, 5.8, 75);
    giorgioVasari.rotation.y = 1.57;
    var giorgioVasariMAT = new BABYLON.StandardMaterial("giorgioVasariMAT", scene);
    giorgioVasariMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/giorgio_vasari.jpg", scene, false);
    giorgioVasari.material = giorgioVasariMAT;

    var paoloCaliari = BABYLON.MeshBuilder.CreatePlane("paoloCaliari", { height: 4.62, width: 5.76, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    paoloCaliari.position = new BABYLON.Vector3(-34, 5.8, 75);
    paoloCaliari.rotation.y = -1.57;
    var paoloCaliariMAT = new BABYLON.StandardMaterial("paoloCaliariMAT", scene);
    paoloCaliariMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/paolo_caliari.jpg", scene, false);
    paoloCaliari.material = paoloCaliariMAT;

    var laviniaFontana = BABYLON.MeshBuilder.CreatePlane("laviniaFontana", { height: 7.14, width: 6.6, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    laviniaFontana.position = new BABYLON.Vector3(26, 6, 63.1);
    laviniaFontana.rotation.y = 2.5;
    var laviniaFontanaMAT = new BABYLON.StandardMaterial("laviniaFontanaMAT", scene);
    laviniaFontanaMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/lavinia_fontana.jpg", scene, false);
    laviniaFontana.material = laviniaFontanaMAT;

    var janBrueghel = BABYLON.MeshBuilder.CreatePlane("janBrueghel", { height: 2.4, width: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    janBrueghel.position = new BABYLON.Vector3(-29.3, 4, 63.8);
    janBrueghel.rotation.y = 0.65;
    var janBrueghelMAT = new BABYLON.StandardMaterial("janBrueghelMAT", scene);
    janBrueghelMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/jan_brueghel.jpg", scene, false);
    janBrueghel.material = janBrueghelMAT;

    var giuseppeVermiglio = BABYLON.MeshBuilder.CreatePlane("giuseppeVermiglio", { height: 10.9, width: 7.6, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    giuseppeVermiglio.position = new BABYLON.Vector3(-24.6, 5.5, 49.5);
    giuseppeVermiglio.rotation.y = -1.57;
    var giuseppeVermiglioMAT = new BABYLON.StandardMaterial("giuseppeVermiglioMAT", scene);
    giuseppeVermiglioMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/giuseppe_vermiglio.jpg", scene, false);
    giuseppeVermiglio.material = giuseppeVermiglioMAT;

    var aubinVouet = BABYLON.MeshBuilder.CreatePlane("aubinVouet", { height: 7.05, width: 5.37, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    aubinVouet.position = new BABYLON.Vector3(22.2, 5.5, 49.5);
    aubinVouet.rotation.y = 1.57;
    var aubinVouetMAT = new BABYLON.StandardMaterial("aubinVouetMAT", scene);
    aubinVouetMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/aubin_vouet.jpg", scene, false);
    aubinVouet.material = aubinVouetMAT;

    var giovanniDo = BABYLON.MeshBuilder.CreatePlane("giovanniDo", { height: 4.98, width: 6.42, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    giovanniDo.position = new BABYLON.Vector3(11.3, 3.5, 32.7);
    giovanniDo.rotation.y = -1.57;
    var giovanniDoMAT = new BABYLON.StandardMaterial("giovanniDoMAT", scene);
    giovanniDoMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/giovanni_do.jpg", scene, false);
    giovanniDo.material = giovanniDoMAT;





    //Partie Justin
    var PierreLacour = BABYLON.MeshBuilder.CreatePlane("PierreLacour", { height: 8.28, width: 13.6, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    PierreLacour.position = new BABYLON.Vector3(7.2, 5, -76);
    PierreLacour.rotation.y = 1.57;
    var PierreLacourMAT = new BABYLON.StandardMaterial("PierreLacourMAT", scene);
    PierreLacourMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/pierre_lacour.jpg", scene, false);
    PierreLacour.material = PierreLacourMAT;

    var jbGreuze = BABYLON.MeshBuilder.CreatePlane("jbGreuze", { height: 2.742, width: 2.25, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    jbGreuze.position = new BABYLON.Vector3(-17, 5, -76);
    jbGreuze.rotation.y = 3.14;
    var jbGreuzeMAT = new BABYLON.StandardMaterial("jbGreuzeMAT", scene);
    jbGreuzeMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/jb_greuze.jpg", scene, false);
    jbGreuze.material = jbGreuzeMAT;

    var henriHorace = BABYLON.MeshBuilder.CreatePlane("henriHorace", { height: 4.83, width: 6.06, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    henriHorace.position = new BABYLON.Vector3(10, 5, -57.5);
    henriHorace.rotation.y = -1.57;
    var henriHoraceMAT = new BABYLON.StandardMaterial("henriHoraceMAT", scene);
    henriHoraceMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/henri_horace.jpg", scene, false);
    henriHorace.material = henriHoraceMAT;


    var JeanRestout = BABYLON.MeshBuilder.CreatePlane("JeanRestout", { height: 11, width: 7.35, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    JeanRestout.position = new BABYLON.Vector3(-1, 5.75, -66.6);
    JeanRestout.rotation.y = 3.14;
    var JeanRestoutMAT = new BABYLON.StandardMaterial("JeanRestoutMAT", scene);
    JeanRestoutMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/jean_restout.jpg", scene, false);
    JeanRestout.material = JeanRestoutMAT;

    var jmNatier = BABYLON.MeshBuilder.CreatePlane("jmNatier", { height: 3.6, width: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    jmNatier.position = new BABYLON.Vector3(-15, 5, -48.1);
    jmNatier.rotation.y = 3.14;
    var jmNatierMAT = new BABYLON.StandardMaterial("jmNatierMAT", scene);
    jmNatierMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/jm_nattier.jpg", scene, false);
    jmNatier.material = jmNatierMAT;

    var gabrielAllegrain = BABYLON.MeshBuilder.CreatePlane("gabrielAllegrain", { height: 7.74, width: 9.73, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    gabrielAllegrain.position = new BABYLON.Vector3(-24.5, 5, -35);
    gabrielAllegrain.rotation.y = -1.57;
    var gabrielAllegrainMAT = new BABYLON.StandardMaterial("gabrielAllegrainMAT", scene);
    gabrielAllegrainMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/gabriel_allegrain.jpg", scene, false);
    gabrielAllegrain.material = gabrielAllegrainMAT;

    var westAmandier = BABYLON.MeshBuilder.CreatePlane("westAmandier", { height: 5.58, width: 2.16, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    westAmandier.position = new BABYLON.Vector3(22, 5, -36);
    westAmandier.rotation.y = 1.57;
    var westAmandierMAT = new BABYLON.StandardMaterial("westAmandierMAT", scene);
    westAmandierMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/west_amandier.png", scene, false);
    westAmandier.material = westAmandierMAT;

    var westLevres = BABYLON.MeshBuilder.CreatePlane("westLevres", { height: 5.58, width: 2.16, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    westLevres.position = new BABYLON.Vector3(22, 5, -33);
    westLevres.rotation.y = 1.57;
    var westLevresMAT = new BABYLON.StandardMaterial("westLevresMAT", scene);
    westLevresMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/west_levres.png", scene, false);
    westLevres.material = westLevresMAT;

    var giovanniBattista = BABYLON.MeshBuilder.CreatePlane("giovanniBattista", { height: 4.08, width: 7.8, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    giovanniBattista.position = new BABYLON.Vector3(12, 5, -48.1);
    giovanniBattista.rotation.y = 3.14;
    var giovanniBattistaMAT = new BABYLON.StandardMaterial("giovanniBattistaMAT", scene);
    giovanniBattistaMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/giovanni_battista.jpg", scene, false);
    giovanniBattista.material = giovanniBattistaMAT;

    var interrogatoireGaleriens = BABYLON.MeshBuilder.CreatePlane("interrogatoireGaleriens", { height: 6.96, width: 8.58, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    interrogatoireGaleriens.position = new BABYLON.Vector3(-16, 3.55, -20.16);
    interrogatoireGaleriens.rotation.y = -3.14;
    var interrogatoireGaleriensMAT = new BABYLON.StandardMaterial("interrogatoireGaleriensMAT", scene);
    interrogatoireGaleriensMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/interrogatoire_galeriens.png", scene, false);
    interrogatoireGaleriens.material = interrogatoireGaleriensMAT;

    var embarquementGaleriencs = BABYLON.MeshBuilder.CreatePlane("embarquementGaleriencs", { height: 6.96, width: 8.58, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    embarquementGaleriencs.position = new BABYLON.Vector3(15, 3.55, -20.15);
    embarquementGaleriencs.rotation.y = -3.14;
    var embarquementGaleriencsMAT = new BABYLON.StandardMaterial("embarquementGaleriencsMAT", scene);
    embarquementGaleriencsMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/embarquement_galeriens.png", scene, false);
    embarquementGaleriencs.material = embarquementGaleriencsMAT;

    var antonioBelluci = BABYLON.MeshBuilder.CreatePlane("antonioBelluci", { height: 6.84, width: 9.66, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    antonioBelluci.position = new BABYLON.Vector3(-1, 3.55, -32.3);
    antonioBelluci.rotation.y = 3.14;
    var antonioBelluciMAT = new BABYLON.StandardMaterial("antonioBelluciMAT", scene);
    antonioBelluciMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/antonio_bellucci.jpg", scene, false);
    antonioBelluci.material = antonioBelluciMAT;

    var portraitFemme = BABYLON.MeshBuilder.CreatePlane("portraitFemme", { height: 3.99, width: 3.222, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    portraitFemme.position = new BABYLON.Vector3(-10.6, 3.55, -29);
    portraitFemme.rotation.y = -1.57;
    var portraitFemmeMAT = new BABYLON.StandardMaterial("portraitFemmeMAT", scene);
    portraitFemmeMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/portrait_femme.png", scene, false);
    portraitFemme.material = portraitFemmeMAT;

    var portraitHomme = BABYLON.MeshBuilder.CreatePlane("portraitHomme", { height: 3.99, width: 3.222, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    portraitHomme.position = new BABYLON.Vector3(17, 5.75, -75.6);
    portraitHomme.rotation.y = 3.14;
    var portraitHommeMAT = new BABYLON.StandardMaterial("portraitHommeMAT", scene);
    portraitHommeMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/portrait_homme.png", scene, false);
    portraitHomme.material = portraitHommeMAT;

    var martyreSaintGeorges = BABYLON.MeshBuilder.CreatePlane("martyreSaintGeorges", { height: 11, width: 9, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    martyreSaintGeorges.position = new BABYLON.Vector3(22, 5.8, -60.6);
    martyreSaintGeorges.rotation.y = 1.57;
    var martyreSaintGeorgesMAT = new BABYLON.StandardMaterial("martyreSaintGeorgesMAT", scene);
    martyreSaintGeorgesMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/martyre_saintgeorges.jpg", scene, false);
    martyreSaintGeorges.material = martyreSaintGeorgesMAT;

    var janvanNoordt = BABYLON.MeshBuilder.CreatePlane("janvanNoordt", { height: 6.93, width: 5.97, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    janvanNoordt.position = new BABYLON.Vector3(22, 4, -13);
    janvanNoordt.rotation.y = 1.57;
    var janvanNoordtMAT = new BABYLON.StandardMaterial("janvanNoordtMAT", scene);
    janvanNoordtMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/janvan_Noordt.jpg", scene, false);
    janvanNoordt.material = janvanNoordtMAT;

    var jacobSalomonsz = BABYLON.MeshBuilder.CreatePlane("jacobSalomonsz", { height: 4.2, width: 5.52, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    jacobSalomonsz.position = new BABYLON.Vector3(17, 5, -103);
    jacobSalomonsz.rotation.y = 3.14;
    var jacobSalomonszMAT = new BABYLON.StandardMaterial("jacobSalomonszMAT", scene);
    jacobSalomonszMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/jacob_salomonsz.jpg", scene, false);
    jacobSalomonsz.material = jacobSalomonszMAT;

    var pieterVerelst = BABYLON.MeshBuilder.CreatePlane("pieterVerelst", { height: 3.03, width: 4.17, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    pieterVerelst.position = new BABYLON.Vector3(-21, 5, -103);
    pieterVerelst.rotation.y = 3.14;
    var pieterVerelstMAT = new BABYLON.StandardMaterial("pieterVerelstMAT", scene);
    pieterVerelstMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/pieter_verelst.jpg", scene, false);
    pieterVerelst.material = pieterVerelstMAT;

    var pieterFransz = BABYLON.MeshBuilder.CreatePlane("pieterVerelst", { height: 6.18, width: 5.1, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    pieterFransz.position = new BABYLON.Vector3(-24.5, 4, -0.5);
    pieterFransz.rotation.y = 1.57;
    var pieterFranszMAT = new BABYLON.StandardMaterial("pieterFranszMAT", scene);
    pieterFranszMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/pieter_fransz.jpg", scene, false);
    pieterFransz.material = pieterFranszMAT;

    var janDavidsz = BABYLON.MeshBuilder.CreatePlane("janDavidsz", { height: 3.54, width: 2.88, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    janDavidsz.position = new BABYLON.Vector3(22, 4, -0.5);
    janDavidsz.rotation.y = -1.57;
    var janDavidszMAT = new BABYLON.StandardMaterial("janDavidszMAT", scene);
    janDavidszMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/jan_davidsz.jpg", scene, false);
    janDavidsz.material = janDavidszMAT;

    var tobie = BABYLON.MeshBuilder.CreatePlane("tobie", { height: 7.68, width: 10.02, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    tobie.position = new BABYLON.Vector3(-24.5, 5, -60);
    tobie.rotation.y = 1.57;
    var tobieMAT = new BABYLON.StandardMaterial("tobieMAT", scene);
    tobieMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/tobie.jpg", scene, false);
    tobie.material = tobieMAT;

    var renaudArmide = BABYLON.MeshBuilder.CreatePlane("renaudArmide", { height: 9.66, width: 6.84, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    renaudArmide.position = new BABYLON.Vector3(22, 5.5, 13);
    renaudArmide.rotation.y = 1.57;
    var renaudArmideMAT = new BABYLON.StandardMaterial("renaudArmideMAT", scene);
    renaudArmideMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/renaud_armide.jpg", scene, false);
    renaudArmide.material = renaudArmideMAT;

    var disputeDesPhilosophes = BABYLON.MeshBuilder.CreatePlane("disputeDesPhilosophes", { height: 7.0, width: 10.3, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    disputeDesPhilosophes.position = new BABYLON.Vector3(14.55, 3.55, 13.05);
    disputeDesPhilosophes.rotation.y = 1.57;
    var disputeDesPhilosophesMAT = new BABYLON.StandardMaterial("disputeDesPhilosophesMAT", scene);
    disputeDesPhilosophesMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/dispute_des_philosophes.png", scene, false);
    disputeDesPhilosophes.material = disputeDesPhilosophesMAT;

    var disputeDestheologiens = BABYLON.MeshBuilder.CreatePlane("disputeDestheologiens", { height: 7.0, width: 10.3, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    disputeDestheologiens.position = new BABYLON.Vector3(-24.5, 4, 13.05);
    disputeDestheologiens.rotation.y = -1.57;
    var disputeDestheologiensMAT = new BABYLON.StandardMaterial("disputeDestheologiensMAT", scene);
    disputeDestheologiensMAT.diffuseTexture = new BABYLON.Texture("texture/paintings/others/dispute_des_theologiens.png", scene, false);
    disputeDestheologiens.material = disputeDestheologiensMAT;
    janDavidsz.material = pieterFranszMAT;



    var startButton = document.getElementById('start-button');
    var startButtonDiv = document.getElementsByClassName('start-button')[0];

    // Vidéo d'introduction
    var videoIntro = BABYLON.MeshBuilder.CreatePlane("videoIntro", { height: 7.8, width: 11.76, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    var videoIntroTexture = new BABYLON.VideoTexture("videosFac", ["texture/video/V2.mp4"], scene, false);
    var videoIntroMAT = new BABYLON.StandardMaterial("mat", scene);
    videoIntroMAT.diffuseTexture = videoIntroTexture;
    videoIntroMAT.backFaceCulling = false;
    videoIntroMAT.diffuseColor = new BABYLON.Color3(1, 1, 1);
    videoIntroMAT.specularColor = new BABYLON.Color3(0, 0, 0);
    videoIntro.material = videoIntroMAT;
    videoIntro.position = new BABYLON.Vector3(-1, 5, 75);
    videoIntro.rotation.y = 3.14;
    videoIntroTexture.video.autoplay = false;
    videoIntroTexture.video.loop = false;
    
    canControl = false;
    camera.position.y = 5;
    camera.position.z = 84;
    camera.setTarget(new BABYLON.Vector3(-1, 5, 75));

    var introFond = BABYLON.MeshBuilder.CreatePlane("introFond", { height: 10, width: 20, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    var introFondMAT = new BABYLON.StandardMaterial("introFond", scene);
    introFondMAT.diffuseColor = new BABYLON.Color3(0, 0, 0);
    introFondMAT.specularColor = new BABYLON.Color3(0, 0, 0);
    introFond.material = introFondMAT;
    introFond.position = new BABYLON.Vector3(-1, 5, 74);

    startButton.onclick = function() {
        videoIntroTexture.video.play();
        startButtonDiv.style.display = 'none';
        BABYLON.Engine.audioEngine.useCustomUnlockedButton = true;
        BABYLON.Engine.audioEngine.unlock();
        BABYLON.Engine.audioEngine.setGlobalVolume(1);
        gsap.to(introFondMAT, { duration: 1, delay: 41, alpha: 0});
        gsap.to(videoIntroMAT, { duration: 1, delay: 41, alpha: 0});
        gsap.to(camera.position, { duration: 1, delay: 43, x: -1, y: 2, z: 80 });
        gsap.to(camera.target, {
            duration: 1, delay: 43, x: 0, y: 0, z: -70, onUpdate: function () {
                camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
            }
        });
        setTimeout(function() {
            canControl = true;
        }, 40000);
    };


    //barrières invisibles
    var zoneBarriere1 = BABYLON.MeshBuilder.CreatePlane("zoneBarriere1", { height: 20, width: 20, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneBarriere1.position = new BABYLON.Vector3(-1, 0.2, 22);
    var invisibleMat = new BABYLON.StandardMaterial("invisible", scene);
    invisibleMat.alpha = 0;
    zoneBarriere1.material = invisibleMat;
    zoneBarriere1.checkCollisions = true;
    zoneBarriere1.rotation.x = 3.14;

    var zoneBarriere2 = BABYLON.MeshBuilder.CreatePlane("zoneBarriere2", { height: 20, width: 20, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneBarriere2.position = new BABYLON.Vector3(-1, 0.2, 4.9);
    var invisibleMat = new BABYLON.StandardMaterial("invisible", scene);
    invisibleMat.alpha = 0;
    zoneBarriere2.material = invisibleMat;
    zoneBarriere2.checkCollisions = true;
    zoneBarriere2.rotation.x = 3.14;

    var zoneBarriere3 = BABYLON.MeshBuilder.CreatePlane("zoneBarriere2", { height: 20, width: 55, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneBarriere3.position = new BABYLON.Vector3(-1, 0.2, -33);
    var invisibleMat = new BABYLON.StandardMaterial("invisible", scene);
    invisibleMat.alpha = 0;
    zoneBarriere3.material = invisibleMat;
    zoneBarriere3.checkCollisions = true;
    zoneBarriere3.rotation.x = 3.14;

    var zoneBarriere4 = BABYLON.MeshBuilder.CreatePlane("zoneBarriere2", { height: 20, width: 55, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneBarriere4.position = new BABYLON.Vector3(-1, 0.2, -48);
    var invisibleMat = new BABYLON.StandardMaterial("invisible", scene);
    invisibleMat.alpha = 0;
    zoneBarriere4.material = invisibleMat;
    zoneBarriere4.checkCollisions = true;
    zoneBarriere4.rotation.x = 3.14;

    var zoneBarriere5 = BABYLON.MeshBuilder.CreatePlane("zoneBarriere2", { height: 20, width: 55, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneBarriere5.position = new BABYLON.Vector3(-1, 0.2, -19.7);
    var invisibleMat = new BABYLON.StandardMaterial("invisible", scene);
    invisibleMat.alpha = 0;
    zoneBarriere5.material = invisibleMat;
    zoneBarriere5.checkCollisions = true;
    zoneBarriere5.rotation.x = 3.14;



    // Interaction 1
    var zoneInteraction1 = BABYLON.MeshBuilder.CreatePlane("zoneInteraction1", { height: 3, width: 60, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneInteraction1.position = new BABYLON.Vector3(-1, 0.2, 63);
    zoneInteraction1.rotation.x = 1.57;
    invisibleMat.alpha = 0;
    zoneInteraction1.material = invisibleMat;

    var sonInteraction1 = new BABYLON.Sound("sonInteraction1", "sound/Bonjour.mp3", scene, null, {
        loop: false,
        autoplay: false,
        maxDistance: 30
    });
    sonInteraction1.attachToMesh(fransHals);

    //Interaction 2 - avec le son
    var IntroInteraction2 = BABYLON.MeshBuilder.CreatePlane("IntroInteraction2", { height: 3, width: 40, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    IntroInteraction2.position = new BABYLON.Vector3(-1, 0.2, 33);
    IntroInteraction2.rotation.y = 0.8;
    invisibleMat.alpha = 0.2;
    IntroInteraction2.material = invisibleMat;

    sonInteraction1.attachToMesh(fransHals);
    var zoneInteraction2 = BABYLON.Mesh.CreateSphere("musicsphere", 22, 10, scene);
    zoneInteraction2.material = zoneInteraction2MAT;
    zoneInteraction2.position = new BABYLON.Vector3(-19, 0, 32.5);
    var zoneInteraction2MAT = new BABYLON.StandardMaterial("zoneInteraction2MAT", scene);
    zoneInteraction2MAT.diffuseColor = BABYLON.Color3.Purple();
    zoneInteraction2MAT.backFaceCulling = false;
    zoneInteraction2MAT.alpha = 0;
    zoneInteraction2.material = zoneInteraction2MAT;

    var sonInteraction2 = new BABYLON.Sound("Luth", "sound/Luth.mp3", scene,
        null, { loop: true, autoplay: true, spatialSound: true, maxDistance: 25 });

    sonInteraction2.attachToMesh(hendrickTerBrugghen);

    // Interaction 3
    var zoneInteraction3 = BABYLON.MeshBuilder.CreatePlane("zoneInteraction3", { height: 2, width: 60, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneInteraction3.position = new BABYLON.Vector3(-1, 0.2, 20);
    zoneInteraction3.rotation.x = 1.57;
    zoneInteraction3.material = invisibleMat;

    var potDeFleurs = BABYLON.MeshBuilder.CreatePlane("potDeFleurs", { height: 5, width: 1.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    potDeFleurs.position = new BABYLON.Vector3(5, 2.4, 5.1);
    potDeFleurs.rotation.y = 3.14;
    var potDeFleursMAT = new BABYLON.StandardMaterial("potDeFleursMAT", scene);
    var t = new BABYLON.Texture("texture/objects/pot.png", scene, false);
    t.hasAlpha= true;
    potDeFleursMAT.diffuseTexture = t;
    potDeFleursMAT.useAlphaFromDiffuseTexture = true;
    potDeFleurs.material = potDeFleursMAT;


    // //Interaction 4 -  Eglise
    // var zoneInteraction4 = BABYLON.Mesh.CreateSphere("musicsphere", 22, 10, scene);
    // zoneInteraction4.material = zoneInteraction2MAT;
    // zoneInteraction4.position = new BABYLON.Vector3(-14, 0, 10);

    // var sonInteraction4 = new BABYLON.Sound("Clocher", "sound/Clocher.mp3", scene,
    //     null, { loop: true, autoplay: true, spatialSound: true, maxDistance: 25 });

    // sonInteraction4.attachToMesh(vanGoyen);

    // Interaction 5 - Oiseau
    var zoneInteraction5 = BABYLON.MeshBuilder.CreatePlane("zoneInteraction5", { height: 15, width: 15, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneInteraction5.position = new BABYLON.Vector3(-12, 0.2, -13);
    zoneInteraction5.rotation.x = 1.57;
    zoneInteraction5.material = invisibleMat;

    var oiseau = BABYLON.MeshBuilder.CreatePlane("oiseau", { height: 3.2, width: 4.6, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    oiseau.position = new BABYLON.Vector3(-20, 0.05, -13);
    oiseau.rotation.x = 1.57;
    oiseau.rotation.y = -1.57;
    var oiseauMAT = new BABYLON.StandardMaterial("oiseauMAT", scene);
    var t = new BABYLON.Texture("texture/objects/oiseau.png", scene, false);
    t.hasAlpha = true;
    oiseauMAT.diffuseTexture = t;
    oiseauMAT.useAlphaFromDiffuseTexture = true;
    oiseau.material = oiseauMAT;



    var sonInteraction5 = new BABYLON.Sound("sonInteraction5", "sound/Chute_pigeon.mp3", scene, null, {
        loop: false,
        autoplay: false,
        maxDistance: 30
    });
    sonInteraction5.attachToMesh(oiseau);

    //Interaction 6 - Tempête
    // var IntroInteraction6 = BABYLON.MeshBuilder.CreatePlane("IntroInteraction2", { height: 3, width: 60, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    // IntroInteraction6.position = new BABYLON.Vector3(-1, 0.2, -15);
    // IntroInteraction6.rotation.y = 3.14;
    // invisibleMat.alpha = 0.2;
    // IntroInteraction6.material = invisibleMat;

    var zoneInteraction6 = BABYLON.MeshBuilder.CreatePlane("zoneInteraction6", { height: 13, width: 20, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneInteraction6.material = invisibleMat;
    zoneInteraction6.rotation.x = 1.57;
    zoneInteraction6.position = new BABYLON.Vector3(-1, 0, -27);
    var sonInteraction6 = new BABYLON.Sound("Clocher", "sound/Tempete.mp3", scene,
        null, { loop: false, autoplay: false, spatialSound: true, maxDistance: 20 });

    sonInteraction6.attachToMesh(bakhuizen);

    //Interaction 7 -  Venus
    var zoneInteraction7 = BABYLON.Mesh.CreateSphere("musicsphere", 22, 15, scene);
    zoneInteraction7.material = zoneInteraction2MAT;
    zoneInteraction7.position = new BABYLON.Vector3(-1, 0, -40);

    var videoVenus = BABYLON.MeshBuilder.CreatePlane("videoVenus", { height: 7.8, width: 11.76, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    var videoVenusTexture = new BABYLON.VideoTexture("videosFac", ["texture/video/Venus_v2.mp4"], scene, false);
    var videoVenusMAT = new BABYLON.StandardMaterial("mat", scene);
    videoVenusMAT.diffuseTexture = videoVenusTexture;
    videoVenusMAT.backFaceCulling = false;
    videoVenusMAT.diffuseColor = new BABYLON.Color3(1, 1, 1);
    videoVenusMAT.specularColor = new BABYLON.Color3(0, 0, 0);
    videoVenus.material = videoVenusMAT;
    videoVenus.position = new BABYLON.Vector3(-1, 5, 150);
    videoVenusTexture.video.pause();
    // videoVenusMat.opacityTexture = 0.3;

    // sonInteraction7.attachToMesh(bakhuizen);

    //Interaction 9 -  Ganymède
    var zoneInteraction9 = BABYLON.Mesh.CreateSphere("musicsphere", 22, 15, scene);
    zoneInteraction9.material = zoneInteraction2MAT;
    zoneInteraction9.position = new BABYLON.Vector3(-1, 0, -80);

    var videoGanymede = BABYLON.MeshBuilder.CreatePlane("videoVenus", { height: 7.8, width: 11.76, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    var videoGanymedeTexture = new BABYLON.VideoTexture("videosFac", ["texture/video/Venus_v2.mp4"], scene, false);
    var videoGanymedeMAT = new BABYLON.StandardMaterial("videoGanymedeMAT", scene);
    videoGanymedeMAT.diffuseTexture = videoGanymedeTexture;
    videoGanymedeMAT.backFaceCulling = false;
    videoGanymedeMAT.diffuseColor = new BABYLON.Color3(1, 1, 1);
    videoGanymedeMAT.specularColor = new BABYLON.Color3(0, 0, 0);
    videoGanymede.material = videoGanymedeMAT;
    videoGanymede.position = new BABYLON.Vector3(-1, 5, 150);
    videoGanymedeTexture.video.pause();

    // Interaction 8 - Fleche
    var zoneInteraction8 = BABYLON.MeshBuilder.CreatePlane("zoneInteraction8", { height: 20, width: 15, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    zoneInteraction8.position = new BABYLON.Vector3(-7, 0.2, -59);
    zoneInteraction8.rotation.x = 1.57;
    zoneInteraction8.material = invisibleMat;

    var fleche = BABYLON.MeshBuilder.CreatePlane("fleche", { height: 4, width: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    fleche.position = new BABYLON.Vector3(15, 4.7, -57);
    fleche.rotation.x = -1.57;
    fleche.rotation.z = 1.57;
    var flecheMAT = new BABYLON.StandardMaterial("flecheMAT", scene);
    var t = new BABYLON.Texture("texture/objects/fleche.png", scene, false);
    t.hasAlpha = true;
    flecheMAT.diffuseTexture = t;
    flecheMAT.useAlphaFromDiffuseTexture = true;
    flecheMAT.backFaceCulling = false;
    fleche.material = flecheMAT;



    var sonInteraction8 = new BABYLON.Sound("sonInteraction8", "sound/Fleche_lent.mp3", scene, null, {
        loop: false,
        autoplay: false,
        maxDistance: 30
    });
    sonInteraction8.attachToMesh(fleche);

    //Les sons de la petite fille 
    //son 1
    var sonFille1 = new BABYLON.Sound("sonFille1", "sound/papa_vient_voir__.mp3", scene, null, {
        loop: false,
        autoplay: false,
        maxDistance: 75,
        spatialSound: true,
    });
    sonFille1.position = new BABYLON.Vector3(-30, 0.2, 60);
    //son 2
    var sonFille2 = new BABYLON.Sound("sonFille1", "sound/papaaa.mp3", scene, null, {
        loop: false,
        autoplay: false,
        maxDistance: 40,
        spatialSound: true,
    });
    sonFille2.position = new BABYLON.Vector3(6, 0.2, 10);
    //son 3
    var sonFille3 = new BABYLON.Sound("sonFille1", "sound/papa_ou_es_tu_.mp3", scene, null, {
        loop: false,
        autoplay: false,
        maxDistance: 40,
        spatialSound: true,
    });
    sonFille3.attachToMesh(bakhuizen);
    //son 4
    var sonFille4 = new BABYLON.Sound("sonFille1", "sound/par_ici.mp3", scene, null, {
        loop: false,
        autoplay: false,
        maxDistance: 40,
        spatialSound: true,
    });
    sonFille4.attachToMesh(maitreChandelle);

    var sonFille5 = new BABYLON.Sound("sonFille1", "sound/wouaaa_comme_il_est_beau_ce_tableau_.mp3", scene, null, {
        loop: false,
        autoplay: false,
        maxDistance: 50,
        spatialSound: true,
    });
    sonFille5.attachToMesh(pierrePaulRubens);
    
    //bruit blanc
    var bruitBlanc = new BABYLON.Sound("bruitBlanc", "sound/Bruit_blanc.mp3", scene, null, {
        loop: true,
        autoplay: true,
        maxDistance: 50,
        spatialSound: false,
    });
    bruitBlanc.position = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
    bruitBlanc.newVolume = 10;



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

    var loader = new BABYLON.AssetsManager(scene);
    var salle = loader.addMeshTask("nom", "", "obj/", "museeV16.obj");
    salle.onSuccess = function (t) {
        t.loadedMeshes.forEach(function (m) { //On édite ici chaque maillage de l'objet
            m.position.y = 0; //Pour le monter en hauteur
            m.position.x = 0; //Et on le décale un peu pour que quand on commence, il soit bien placé.
            // m.rotation.z = -3.14;
            m.checkCollisions = true; //Ajout de la détection des collisions, expliqué plus tard.
        });
    };

    loader.load();

    var isShading = false;
    var canPlaySoundCounter = 0;
    var stopPlayLuthSoundCounter = 0;
    var disappearPotCounter = 0;
    var stopPlayClocherSoundCounter = 0;
    var canPlaySoundPigeonCounter = 0;
    var stopPlayTempeteSoundCounter = 0;
    var playVenusVideoCounter = 0;
    var playGanymedeVideoCounter = 0;
    var canStrikeFlecheCounter = 0;
    var textLuthCounter = 0;
    var textTempeteCounter = 0;


    //pour le flou
    // var vecteurFlouHorizontal =  new BABYLON.Vector2(1.0, 0)
    // var postProcess0 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), 32, 1.0, camera);
    // var postProcess1 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), 32, 1.0, camera);
    var postProcess0 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), 32, 1.0, camera);
    var postProcess1 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), 32, 1.0, camera);
    camera.detachPostProcess(postProcess0);
    camera.detachPostProcess(postProcess1);


    loader.onFinish = function () {
        engine.runRenderLoop(function () {
            hitbox.position = new BABYLON.Vector3(camera.position.x, 0.2, camera.position.z);
            // canDisplayMotion = hitbox.intersectsMesh(sphereModal, false);
            // if ((canDisplayMotion) && guiMotion.style.display != "block") //Boucle pour savoir s'il faut afficher le texte pour dire qu'on peut interagir ou non
            //     pressE.style.display = "block";
            // else
            //     pressE.style.display = "none"


            // Interaction 1
            canPlaySound = hitbox.intersectsMesh(zoneInteraction1, false);
            if (canPlaySound && canPlaySoundCounter == 0) {
                canPlaySoundCounter++;
            } else if (canPlaySound && canPlaySoundCounter == 1) {
                zoneInteraction1.position.y = 50;
                sonInteraction1.play();
                gsap.to(modalGui, { duration: 1, delay: 0.5, opacity: 1, bottom: 0 });
                gsap.to(camera.target, {
                    duration: 1, delay: 0.2, x: (camera.target.x - 25), y: 3.5, z: (camera.target.z - 25), onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                gsap.to(camera.target, {
                    duration: 1, delay: 1.2, x: (camera.target.x + 25), y: 3.5, z: (camera.target.z + 25), onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                gsap.to(camera.position, { duration: 2, delay: 3, x: -1, z: 70 });
                gsap.to(camera.target, {
                    duration: 2, delay: 3, x: -1, y: 3.5, z: 63.8, onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                canControl = false;
                setTimeout(function () {
                    gsap.to(modalGui, { duration: 1, opacity: 0, bottom: '-300px' });
                }, 7000);
                setTimeout(function () {
                    canControl = true;
                }, 7000);
                setTimeout(function () {
                    canControl = true;
                    sonFille1.play();
                }, 7000);
            }


            // Interaction 2
            stopSoundLuth = hitbox.intersectsMesh(zoneInteraction2, false);
            if (stopSoundLuth && stopPlayLuthSoundCounter == 0) {
                stopPlayLuthSoundCounter++;
            } else if (stopSoundLuth && stopPlayLuthSoundCounter == 1) {
                zoneInteraction2.position.y = 500;
                setTimeout(function () {
                    sonInteraction2.stop();
                    sonInteraction2.autoplay = false;
                    sonInteraction2.loop = false;
                }, 5000);
                zoneBarriere1.position.x = 150;
                gsap.to(camera.position, { duration: 1, x: -20, z: 32.5 });
                gsap.to(camera.target, {
                    duration: 1, x: -13.7, y: 3.5, z: 32.5, onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                modalGuiText.innerHTML = "Quelle toile magnifique...";
                gsap.to(modalGui, { duration: 1, delay: 1, opacity: 1, bottom: 0 });
                setTimeout(function () {
                    gsap.to(modalGui, { duration: 1, opacity: 0, bottom: '-300px' });
                }, 5000);
                setTimeout(function () {
                    sonFille2.play();
                }, 4000);
            }

            textLuth = hitbox.intersectsMesh(IntroInteraction2, false);
            if (textLuth && textLuthCounter == 0) {
                textLuthCounter++;
            } else if (textLuth && textLuthCounter == 1) {
                IntroInteraction2.position.y = 500;
                modalGuiText.innerHTML = "Mais d'où vient cette musique ?";
                gsap.to(modalGui, { duration: 1, delay: 0, opacity: 1, bottom: 0 });
                setTimeout(function () {
                    gsap.to(modalGui, { duration: 1, opacity: 0, bottom: '-300px' });
                }, 4000);
            }


            // Interaction 3
            canDisappearPot = hitbox.intersectsMesh(zoneInteraction3, false);
            if (canDisappearPot && disappearPotCounter == 0) {
                disappearPotCounter++;
            } else if (canDisappearPot && disappearPotCounter == 1) {
                zoneInteraction3.position.y = 50;
                zoneBarriere2.position.x = 150;
                gsap.to(potDeFleursMAT, {
                    duration: 2, delay: 2, alpha: 0, onComplete: function () {
                        potDeFleurs.setEnabled(false);
                    }
                });
                gsap.to(camera.target, {
                    duration: 2, delay: 0, x: 5, y: 2.5, z: 5.1, onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                canControl = false;
                modalGuiText.innerHTML = "C'est moi ou ce pot vient de disparaître...";
                gsap.to(modalGui, { duration: 1, delay: 4, opacity: 1, bottom: 0 });
                setTimeout(function () {
                    gsap.to(modalGui, { duration: 1, opacity: 0, bottom: '-300px' });
                }, 7000);
                setTimeout(function () {
                    canControl = true;
                }, 5000);
            }

            // Interaction 5
            canPlaySoundPigeon = hitbox.intersectsMesh(zoneInteraction5, false);
            if (canPlaySoundPigeon && canPlaySoundPigeonCounter == 0) {
                canPlaySoundPigeonCounter++;
            } else if (canPlaySoundPigeon && canPlaySoundPigeonCounter == 1) {
                zoneInteraction5.position.y = 50;
                sonInteraction5.play();
                gsap.to(camera.target, {
                    duration: 2, delay: 1, x: -20, y: 0.05, z: -13, onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                canControl = false;
                modalGuiText.innerHTML = "Comment cet oiseau est-il arrivé ici ?";
                gsap.to(modalGui, { duration: 1, delay: 3, opacity: 1, bottom: 0 });
                setTimeout(function () {
                    gsap.to(modalGui, { duration: 1,delay: 5, opacity: 0, bottom: '-300px' });
                }, 7000);
                setTimeout(function () {
                    canControl = true;
                    modalGuiText.innerHTML = "Emma ?";
                }, 7000);
                setTimeout(() => {
                    sonFille3.play();
                }, 5000);
                setTimeout(function () {
                    canControl = true;
                    modalGuiText.innerHTML = "Ici, j'arrive !";
                    sonInteraction6.play();
                    sonInteraction6.autoplay = true;
                    sonInteraction6.loop = true;
                    zoneBarriere5.position.x = 500;
                }, 9500);
            }

            //interraction 6
            stopTempeteSound = hitbox.intersectsMesh(zoneInteraction6, false);
            if (stopTempeteSound && stopPlayTempeteSoundCounter == 0) {
                stopPlayTempeteSoundCounter++;
            } else if (stopTempeteSound && stopPlayTempeteSoundCounter == 1) {
                zoneInteraction6.position.y = 500;
                zoneBarriere3.position.x = 150;
                setTimeout(() => {
                    camera.attachPostProcess(postProcess0);
                    camera.attachPostProcess(postProcess1);
                }, 3000);
                
                gsap.to(camera.position, { duration: 1, x: -2, z: -27 });
                gsap.to(camera.target, {
                    duration: 1, x: 3, y: 2.8, z: -28, onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                canControl = false;
                modalGuiText.innerHTML = "Non... serais-ce ce que je pense ?!";
                gsap.to(modalGui, { duration: 1, delay: 1, opacity: 1, bottom: 0 });
                setTimeout(function () {
                    gsap.to(modalGui, { duration: 1,delay: 10, opacity: 0, bottom: '-300px' });
                    modalGuiText.innerHTML = "Ca recommence, je le savais !";
                    canControl = true;
                }, 5000);
                setTimeout(() => {
                    sonInteraction6.stop();
                    sonInteraction6.autoplay = false;
                    sonInteraction6.loop = false;
                    camera.detachPostProcess(postProcess0);
                    camera.detachPostProcess(postProcess1);   
                    modalGuiText.innerHTML = "J'avais comme la sensation d'être bloqué dans le tableau...";
                }, 12000);
            }

            // Interaction 7
            Playvenusvideo = hitbox.intersectsMesh(zoneInteraction7, false);
            if (Playvenusvideo && playVenusVideoCounter == 0) {
                playVenusVideoCounter++;
            } else if (Playvenusvideo && playVenusVideoCounter == 1) {
                zoneBarriere4.position.x = 150;
                zoneInteraction7.position.y = 500;
                setTimeout(() => {
                    videoVenusTexture.video.play();
                    videoVenus.position.z = -40.99;
                }, 1000);
                setTimeout(() => {
                    videoVenusTexture.video.pause();
                    videoVenus.position.y = 500;
                }, 6000);

                gsap.to(camera.position, { duration: 1, x: -1, z: -34 });
                gsap.to(camera.target, {
                    duration: 1, x: -1, y: 4, z: -40, onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                modalGuiText.innerHTML = "Le tableau !!!?";
                gsap.to(modalGui, { duration: 1, delay: 2, opacity: 1, bottom: 0 });
                setTimeout(function () {
                    gsap.to(modalGui, { duration: 1, delay: 7, opacity: 0, bottom: '-300px' });
                }, 5000);
                setTimeout(() => {
                    sonFille4.play()
                }, 5500);
                setTimeout(() => {
                    modalGuiText.innerHTML = "Emma ce n'est plus drôle, revient !";
                }, 7500);
            }

            // Interaction 8
            canStrikeFleche = hitbox.intersectsMesh(zoneInteraction8, false);
            if (canStrikeFleche && canStrikeFlecheCounter == 0) {
                canStrikeFlecheCounter++;
            } else if (canStrikeFleche && canStrikeFlecheCounter == 1) {
                zoneInteraction8.position.y = 500;
                setTimeout(function () {
                    sonInteraction8.play();
                }, 1300);
                gsap.to(fleche.position, { duration: 1, delay: 1, x: -10.5, y: 4.7, z: -57, ease: "power3.in" });
                gsap.to(camera.target, {
                    duration: 2, x: -10.5, y: 4.7, z: -57, onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                canControl = false;
                setTimeout(() => {
                    modalGuiText.innerHTML = "Ouf, je l'ai échappée belle..";
                }, 2000);
                
                gsap.to(modalGui, { duration: 1, delay: 2, opacity: 1, bottom: 0 });
                setTimeout(function () {
                    canControl = true;
                }, 5000);
                setTimeout(function () {
                    gsap.to(modalGui, { duration: 1, opacity: 0, bottom: '-300px' });
                }, 5000);
                setTimeout(function () {
                    sonFille5.play();
                }, 4000);
            }

            // Interaction 9
            PlayGanymedevideo = hitbox.intersectsMesh(zoneInteraction9, false);
            if (PlayGanymedevideo && playGanymedeVideoCounter == 0) {
                playGanymedeVideoCounter++;
            } else if (PlayGanymedevideo && playGanymedeVideoCounter == 1) {
                zoneInteraction9.position.y = 500;
                setTimeout(() => {
                    videoGanymedeTexture.video.play();
                    videoGanymede.position.z = -92.7;
                }, 1000);
                setTimeout(() => {
                    videoGanymedeTexture.video.pause();
                    videoGanymede.position.y = 500;
                }, 6000);

                gsap.to(camera.position, { duration: 1, x: -1, z: -80 });
                gsap.to(camera.target, {
                    duration: 1, x: -1, y: 4, z: -92, onUpdate: function () {
                        camera.setTarget(new BABYLON.Vector3(camera.target.x, camera.target.y, camera.target.z));
                    }
                });
                modalGuiText.innerHTML = "Comment est-ce possible ?";
                gsap.to(modalGui, { duration: 1, delay: 1, opacity: 1, bottom: 0 });
                setTimeout(function () {
                    gsap.to(modalGui, { duration: 1, opacity: 0, bottom: '-300px' });
                }, 5000);
            }



            if (canControl) {
                camera.attachControl(canvas, false); //On attache les contrôles de la scène via le canvas qu'on a crée tout à l'heure dans musee.html
                camera.keysLeft = [81, 37]; //Q et <-
                camera.keysUp = [90, 38]; //Z et Flèche du haut
                camera.keysRight = [68, 39]; //D et ->
                camera.keysDown = [83, 40]; //S et flèche du bas
                camera.speed = 0.5;
                camera.angularSensibility = 15000;
            } else {
                camera.detachControl(canvas);
                camera.keysLeft = []; //Q et <-
                camera.keysUp = []; //Z et Flèche du haut
                camera.keysRight = []; //D et ->
                camera.keysDown = []; //S et flèche du bas
                camera.speed = 0;
            }

            scene.render();
        });
    };

    window.addEventListener("keypress", function (e) {
        // if (e.key == "e" && canDisplayMotion)
        //     fenetreModal.style.display = "block";
        if (e.key == "f") {
            document.getElementsByTagName('body')[0].requestFullscreen();
            document.getElementsByTagName('body')[0].style.cursor = 'none';
        }
        if (e.key == "g" || e.key == "escape") {
            document.exitFullscreen();
            document.getElementsByTagName('body')[0].style.cursor = 'auto';
        }
    });

    return scene; //Et on renvoie la scène pour pouvoir l'afficher plus tard.    
}

var scene = createScene();

window.addEventListener('resize', function () { engine.resize() });

var fenetreModal = document.getElementById('fenetreModal'); //On récupère la fenêtre modale du fichier musee.html
var span = document.getElementsByClassName("close")[0] //On récupère la croix de la fenêtre modale
span.onclick = function () { fenetreModal.style.display = "none"; } //On cache la fenêtre modale si on clique sur la croix
window.onclick = function (event) {
    if (event.target == fenetreModal)
        fenetreModal.style.display = "none";
}//Si on clique sur la partie sombre, la fenêtre modale se fermera.

var modalGui = document.getElementById('modalgui-content');
var modalGuiText = document.getElementById('modalgui-text');