import * as phy from 'physics-lib'

const boxShape = new BoxShape()
const material = new Material()
material.albedoColor = Color3.Black()
material.emissiveColor = Color3.White()


function spawn(x: number, y: number, z: number, rigid: boolean) {
  const cube = new Entity()
  const physics = new phy.PhysicsComponent()
  const transform = new Transform()
  transform.position.set(x, y, z)

  physics.rigid = rigid

  physics.mass = physics.rigid ? 10000 : Math.random() * 100

  cube.addComponentOrReplace(physics)
  cube.addComponentOrReplace(transform)
  cube.addComponentOrReplace(material)

  if (physics.rigid) {
    cube.addComponentOrReplace(boxShape)
  } else {
    cube.addComponentOrReplace(boxShape)
    transform.scale.set(0.01 + physics.mass / 1000, 0.01 + physics.mass / 1000, 0.01 + physics.mass / 1000)
  }

  engine.addEntity(cube)

  physics.velocity.x = z > 5 ? 0.02 : -0.02
}

/// --- Spawn a cube ---


spawn(8, 1, 8, true)

engine.addSystem(new phy.GravitySystem())
engine.addSystem(new phy.BoundaryCheckSystem())

for (let x = 0; x < 8; x++) {
  for (let z = 0; z < 8; z++) {
    spawn(Math.random() + 7.5, 5 + Math.random() / 2, Math.random() * 15 + 1, false)
  }
}