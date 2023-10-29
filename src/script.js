import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

//add texture loader
const textureLoader = new THREE.TextureLoader();
    //create environment map loader to put box around solar system with dynamic image of Milky Way
const cubeTextureLoader = new THREE.CubeTextureLoader()
cubeTextureLoader.setPath('/textures/cubeMap/')

//add textures
const sunTexture = textureLoader.load('/textures/2k_sun.jpg');
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
const jupiterTexture = textureLoader.load("/textures/2k_jupiter.jpg");
const saturnTexture = textureLoader.load("/textures/2k_saturn.jpg");
const uranusTexture = textureLoader.load("/textures/2k_uranus.jpg");
const neptuneTexture = textureLoader.load("/textures/2k_neptune.jpg");
const plutoTexture = textureLoader.load("/textures/2k_pluto.jpg");
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
    //environment map.  order of 6 panes loaded into background cube map must be in order +x, -x, +y, -y, +z, -z.  This can be specified in program that we create box diagram in. www.matheowis.github.io/HDRI-to-CubeMap
const backgroundCubemap = cubeTextureLoader
.load( [
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
] );

scene.background = backgroundCubemap;

//geometry
//create one generic sphere that we'll scale up and down to match the planet sizes
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

//material
  //sun material uses basic material because light is constant in it
const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture})

  //planet materials use standard materials because light affects them
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});
const plutoMaterial = new THREE.MeshStandardMaterial({
  map: plutoTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});
  

//create sun
const sun = new THREE.Mesh(sphereGeometry, sunMaterial)
sun.scale.setScalar(30)
scene.add(sun);

//create planets array
const planets = [
  {
    name: "Mercury",
    radius: 0.3,
    distance: 40,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 45,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 50,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 2,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 65,
    speed: 0.005,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 11,
    distance: 200,
    speed: 0.01,
    material: jupiterMaterial,
    moons: [
      {
        name: "Io",
        radius: 0.07,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Europa",
        radius: 0.07,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
      {
        name: "Ganymede",
        radius: 0.08,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Callisto",
        radius: 0.07,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Saturn",
    radius: 10,
    distance: 300,
    speed: 0.01,
    material: saturnMaterial,
    moons: [
      {
        name: "Titan",
        radius: 0.05,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Iapetus",
        radius: 0.03,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
      {
        name: "Rhea",
        radius: 0.03,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Dione",
        radius: 0.02,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
      {
        name: "Tethys",
        radius: 0.01,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Uranus",
    radius: 4,
    distance: 400,
    speed: 0.008,
    material: uranusMaterial,
    moons: [
      {
        name: "Titania",
        radius: 0.01,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Oberon",
        radius: 0.01,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
      {
        name: "Miranda",
        radius: 0.01,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Ariel",
        radius: 0.01,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
      {
        name: "Umbriel",
        radius: 0.01,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Neptune",
    radius: 4,
    distance: 500,
    speed: 0.0085,
    material: neptuneMaterial,
    moons: [
      {
        name: "Triton",
        radius: 0.15,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Proteus",
        radius: 0.002,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
      {
        name: "Nereid",
        radius: 0.002,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Pluto",
    radius: 0.4,
    distance: 550,
    speed: 0.001,
    material: plutoMaterial,
    moons: [
      {
        name: "Charon",
        radius: 0.5,
        distance: 2,
        speed: 0.02,
      },
      
    ],
  },
];

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material)
  //set scale
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  return planetMesh;

}

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
}

//create planet Meshes
const planetMeshes = planets.map(planet => {
  //create mesh for each planet
  const planetMesh = createPlanet(planet);
  //add it to scene 
  scene.add(planetMesh)
  //loop thru each moon and create moon.  Need to do the same things for the moons that we did for the planets
  planet.moons.forEach(moon => {
    //create mesh for each moon
    const moonMesh = createMoon(moon);
    //add moon to planet
    planetMesh.add(moonMesh);
  })
  return planetMesh;
  
})

//add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight);

    //add point light in center as sun
const pointLight = new THREE.PointLight('white', 1)

scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1400
);
camera.position.z = 900;
camera.position.y = 300;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 500;
controls.minDistance = 20

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// render loop
const renderloop = () => {
  //animation
  planetMeshes.forEach((planet, planetIndex) => {
    //in order to access original atributes of planets like speed, we need to call the original planets array at the current index being looped thru
    planet.rotation.y += planets[planetIndex].speed*.5

    //planet orbits
    planet.position.x = Math.sin(planet.rotation.y)*planets[planetIndex].distance
    planet.position.z = Math.cos(planet.rotation.y)*planets[planetIndex].distance

    //moon orbits.  use nested loop to access moons object for each planet
    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
      moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
      moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
    })
  })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();
