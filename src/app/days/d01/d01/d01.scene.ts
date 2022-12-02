import { Scene } from '../../../core/engine/scene';
import {
  BoxGeometry, Color,
  DirectionalLight,
  Mesh, MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  Vector3,
} from 'three';
import { Elf } from './elf.type';

export class D01Scene extends Scene {

  protected rotationSpeed: number = .25;
  protected camera!: PerspectiveCamera;
  protected elves: Elf[] = [];

  public override setup(): void {
    this.camera = new PerspectiveCamera(65, 1.6, 0.1, 100);
    this.camera.position.x = 10;
    this.camera.position.y = 7;
    this.camera.lookAt(0, 0, 0);
    this.add(this.camera);
    this.engineService.setMainCamera(this.camera);

    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(1, 5, 1);
    light.lookAt(0, 0, 0);
    this.add(light);
    const light2 = new DirectionalLight(0xffffff, .75);
    light2.position.set(-9, 5, -9);
    light.lookAt(0, 0, 0);
    this.add(light2);

    const planeGeometry = new BoxGeometry(18, .1, 18);
    const planeMaterial = new MeshBasicMaterial({color: 0xe3e3e3});
    const planeCube = new Mesh(planeGeometry, planeMaterial);
    this.add(planeCube);

    this.createElves();
  }

  public override start(): void {
    // console.log('scene start');
  }

  public override update(): void {
    // console.log('scene update', this.deltaTime);

    const x = this.camera.position.x;
    const y = this.camera.position.y;
    const z = this.camera.position.z;

    const speed = this.rotationSpeed * this.deltaTime;

    this.camera.position.x = x * Math.cos(speed) + z * Math.sin(speed);
    this.camera.position.z = z * Math.cos(speed) - x * Math.sin(speed);

    this.camera.lookAt(new Vector3(0, 0, 0));
  }

  public setElves(elves: Elf[]): void {
    this.elves = elves;
  }

  protected createElves(): void {
    const geometry = new BoxGeometry(.75, 4, .75);
    geometry.translate(0, 1, 0);
    const materialNormal = new MeshPhongMaterial({color: 0x276851});
    const materialRank1 = new MeshPhongMaterial({color: 0xe9cd67});
    const materialRank2 = new MeshPhongMaterial({color: 0xcd3741});
    const materialRank3 = new MeshPhongMaterial({color: 0xcd3741});

    let index: number = 0;

    for (let x = -8; x < 8; x++) {
      for (let z = -8; z < 8; z++) {
        const elf = this.elves[index]
        const positionX = x + 0.5;
        const positionZ = z + 0.5;

        let material = materialNormal;
        if (elf.ranking === 1) {
          material = materialRank1;
        } else if (elf.ranking === 2) {
          material = materialRank2;
        } else if (elf.ranking === 3) {
          material = materialRank3;
        }
        const cube = new Mesh(geometry, material);
        cube.scale.y = elf.scale;
        cube.position.x = positionX;
        cube.position.z = positionZ;
        this.add(cube);
        index++;
      }
    }
  }
}
