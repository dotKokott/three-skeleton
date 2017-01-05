uniform float time;
varying vec3 vNorm;

void main()	{
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}
