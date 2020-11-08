varying vec2 vUv;
uniform float u_time;
uniform sampler2D u_t;

void main() {
  vUv = uv;

  vec3 distortion = position;
  distortion.z += sin((position.x * 4.) + (u_time * 2.)) * .1 ;

  vec3 finalposition = vec3(distortion);
  vec4 mvPosition = modelViewMatrix * vec4(finalposition, 1.0);

 // gl_PointSize = 2.;
  gl_Position = projectionMatrix * mvPosition;
}