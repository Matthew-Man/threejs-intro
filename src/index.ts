import {
  Scene,
  Mesh,
  MeshStandardMaterial,
  BoxBufferGeometry,
  Color,
  ConeGeometry,
  TorusGeometry,
} from "three";
import { setupCamera } from "./setupCamera";
import { setupHelpers } from "./setupHelpers";
import { setupLights } from "./setupLights";
import { setupOrbitControls } from "./setupOrbitControls";
import { setupRenderer } from "./setupRenderer";

export function setupThreeJSScene() {
  let dimensions = { w: window.innerWidth, h: window.innerHeight };

  const camera = setupCamera(dimensions);

  const renderer = setupRenderer(camera, dimensions);

  const controls = setupOrbitControls(camera, renderer.domElement);

  let scene = new Scene();

  setupLights(scene);

  setupHelpers(scene);

  //shape(s)
  const geometry = new BoxBufferGeometry(10, 10, 10);
  const material = new MeshStandardMaterial({
    color: 0xff00ff,
  });

  let myShape: Mesh = new Mesh(geometry, material);
  myShape.position.y = 20;
  scene.add(myShape);

  // skyscraper
  const skyscraperGeometry = new BoxBufferGeometry(10, 50, 10);
  const skyscraperMaterial = new MeshStandardMaterial({
    color: new Color("skyblue"),
  });

  let skyscraperShape: Mesh = new Mesh(skyscraperGeometry, skyscraperMaterial);
  skyscraperShape.position.set(-40, 25, -40);
  scene.add(skyscraperShape);

  // cone
  const coneRadius = 10;
  const coneHeight = 15;
  const coneRadialSegments = 16;
  const coneGeometry = new ConeGeometry(
    coneRadius,
    coneHeight,
    coneRadialSegments,
  );
  const coneMaterial = new MeshStandardMaterial({
    color: new Color("green"),
    wireframe: true,
  });

  let coneShape: Mesh = new Mesh(coneGeometry, coneMaterial);
  coneShape.position.set(40, coneHeight / 2, -40);
  scene.add(coneShape);

  // doughnut
  const doughnutRadius = 10;
  const doughnutTubeRadius = 4;
  const doughnutRadialSegments = 8;
  const doughnutTubularSegments = 24;
  const doughnutGeometry = new TorusGeometry(
    doughnutRadius,
    doughnutTubeRadius,
    doughnutRadialSegments,
    doughnutTubularSegments,
  );
  const doughnutMaterial = new MeshStandardMaterial({
    color: new Color("orange"),
  });

  let doughnutShape: Mesh = new Mesh(doughnutGeometry, doughnutMaterial);
  doughnutShape.position.set(0, 0, 40);
  doughnutShape.rotation.x = Math.PI / 2;
  scene.add(doughnutShape);

  animate();

  function animate() {
    myShape.rotation.y += 0.01;
    myShape.rotation.x += 0.02;

    renderer.render(scene, camera);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    requestAnimationFrame(animate);
  }
}

setupThreeJSScene();
