<template>
  <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: false, target }" resize shadow>
    <Camera :position="{ x: 100, y: 200, z: 300 }" />
    <Scene ref="scene" background="#cccccc">
      <HemisphereLight />

      <DirectionalLight
        :position="{ x: 0, y: 200, z: 100 }"
        cast-shadow :shadow-camera="{ top: 180, bottom: -120, left: -120, right: 120 }"
      />
      <FbxModel src="/models/dancing_npc.fbx" @load="onLoad" />
    </Scene>
  </Renderer>
</template>

<script>
// Model from mixamo.com
import { AnimationMixer, Clock, Fog, Vector3 } from 'three';
import {
  AmbientLight,
  Camera,
  DirectionalLight,
  FbxModel,
  HemisphereLight,
  Renderer,
  Scene,
} from 'troisjs';

export default {
  components: {
    AmbientLight,
    Camera,
    DirectionalLight,
    FbxModel,
    HemisphereLight,
    Renderer,
    Scene,
  },
  data() {
    return {
      target: new Vector3(0, 100, 0),
    };
  },
  mounted() {
    const scene = this.$refs.scene.scene;
    scene.fog = new Fog(0xff0055, 200, 1000);
  },
  methods: {
    onLoad(object) {
      this.mixer = new AnimationMixer(object);
      const action = this.mixer.clipAction(object.animations[0]);
      action.play();

      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.clock = new Clock();
      this.$refs.renderer.onBeforeRender(this.updateMixer);
    },
    updateMixer() {
      this.mixer.update(this.clock.getDelta());
    },
  },
};
</script>
