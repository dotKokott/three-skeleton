#pragma glslify: noise = require(glsl-noise/simplex/2d)

uniform float val;

void main() {
  float brightness = noise(gl_FragCoord.xy) * val;

  gl_FragColor = vec4(vec3(brightness), 1.);
}
