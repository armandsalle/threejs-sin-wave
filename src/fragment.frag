uniform sampler2D u_t;
varying vec2 vUv;

void main() {
  vec4 tt = texture2D(u_t, vUv);
  gl_FragColor = tt;
}