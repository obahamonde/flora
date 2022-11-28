<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null)
const devices = ref<MediaDeviceInfo[]>([]);
const audioInput = ref<string>()
const videoInput = ref<string>()
const stream = ref<MediaStream>()
const videoName = ref<string>("")
const { state, setState } = useState()

onMounted(async () => {
    devices.value = await navigator.mediaDevices.enumerateDevices();
    videoRef.value = document.querySelector('video') as HTMLVideoElement
});

const foo = ref(false)

const constraints = computed(() => {
    const audio = audioInput.value;
    const video = videoInput.value;
    return {
        audio: audio ? { deviceId: audio } : false,
        video: video ? { deviceId: video } : false,
    };
});

const recorder = computed(() => {
    if (stream.value) {
        return new MediaRecorder(stream.value);
    }
});

const start = async () => {
    stream.value = await navigator.mediaDevices.getUserMedia(constraints.value);
    recorder.value?.start();
    recorder.value!.ondataavailable = (e) => {
        setState({
            blob: e.data,
            url: URL.createObjectURL(e.data),
        });
    };
};

const stop = () => {
    if (stream.value) {
        stream.value.getTracks().forEach((track) => track.stop());
        stream.value = null as any;
    };
}

const share = async () => {
    stream.value = await navigator.mediaDevices.getDisplayMedia(
        {
            audio: {
                deviceId: audioInput.value,
            },
            video: true
        }


    ) as MediaStream
    const el = videoRef.value as HTMLVideoElement
    el.srcObject = stream.value
    el.play()
    recorder.value?.start();
    recorder.value!.ondataavailable = (e) => {
        setState({
            blob: e.data,
            url: URL.createObjectURL(e.data),
        });
    };
}

const post = async () => {
    const formData = new FormData();
    formData.append("file", state.blob);
    const { data } = await useFetch(
        `api/upload?key=${state.user.sub}/videos/${videoName.value}.mkv`,
        {
            method: "POST",
            body: formData,
        }
    ).text()
    state.url = data;
}

watchEffect(() => {
            if (stream.value) {
                const el = videoRef.value as HTMLVideoElement;
                el.srcObject = stream.value;
                el.play();
            }
            else if (state.blob) {
                const el = videoRef.value as HTMLVideoElement;
                el.src = state.url;
                el.play();
            }
});
        
</script>

<template>
    <div>
        <div class="col center gap-8 mt-24 w-60 tl fade-in-left fixed bg-light p-4 rounded m-2" v-if="foo">
            <h1 class="text-subtitle">Audio</h1>
            <div v-if="devices.map(d => d.kind).includes('audioinput')">
                <select v-model="audioInput" class="text-input">
                    <option v-for="device in devices.filter(d => d.kind === 'audioinput')" :value="device.deviceId"
                        class="text-caption">
                        {{ device.label }}
                    </option>
                </select>
            </div>
            <h1 class="text-subtitle">Video</h1>
            <div v-if="devices.map(d => d.kind).includes('videoinput')">
                <select v-model="videoInput" class="text-input">
                    <option v-for="device in devices.filter(d => d.kind === 'videoinput')" :value="device.deviceId"
                        class="text-caption">
                        {{ device.label }}
                    </option>
                </select>
            </div>
            <a v-if="state.url" :href="state.url" download="tutorial.mp4" class="btn-post">Download</a>
            <div v-if="!stream">
                <button @click="start()" class="btn-post">Start</button>
                <button @click="share()" class="btn-get text-xs py-3">Share screen</button>
            </div>
            <button v-else @click="stop()" class="btn-del">Stop</button>
            <input type="text" v-model="videoName" class="text-input" placeholder="Video Title" v-if="state.blob">
            <button v-if="state.blob" @click="post()" class="btn-put">Post</button>
        </div>
        <video id="video" ref="videoRef" muted autoplay class="h-24 bl m-4 fixed w-auto rounded sh" @click="foo = !foo"
            v-if="stream"></video>
        <Ico v-if="!stream" icon="mdi-webcam" class="x3 text-caption m-4 bl cp scale fixed" @click="foo = !foo" />
    </div>
</template>
