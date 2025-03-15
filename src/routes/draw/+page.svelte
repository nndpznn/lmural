<script lang="ts">
    import 'js-draw/bundledStyles';
    import { goto } from '$app/navigation';
    import {fade} from 'svelte/transition'

    let started_drawing = $state(false);
    let music_on = $state(true)
    let sound_on = $state(true)

    // thanks stackoverflow
    // https://stackoverflow.com/questions/69874742/sveltekit-console-error-window-is-not-defined-when-i-import-library
    //onMount();

    async function startMural(ev: MouseEvent) {
        const draw_lib = (await import('js-draw'))
        
        const editor = new draw_lib.Editor(document.getElementsByClassName("draw").item(0) as HTMLElement, {
            wheelEventsEnabled: false,
        });
        editor.dispatch(
            editor.setBackgroundStyle({
                color: draw_lib.Color4.fromHex("ffffff"),
                type: draw_lib.BackgroundComponentBackgroundType.SolidColor,
            }),
        );
        editor.getRootElement().style.margin = 'auto'
        editor.getRootElement().style.height = '548px'
        editor.getRootElement().style.width = '500px'
        const textTools = editor.toolController.getMatchingTools(draw_lib.TextTool);
        editor.toolController.removeAndDestroyTools(textTools);
        const selectionTools = editor.toolController.getMatchingTools(draw_lib.SelectionTool);
        editor.toolController.removeAndDestroyTools(selectionTools);
        const panZoomTools = editor.toolController.getMatchingTools(draw_lib.PanZoomTool);
        editor.toolController.removeAndDestroyTools(panZoomTools);
        const penTools = editor.toolController.getMatchingTools(draw_lib.PenTool).slice(1, 3);
        editor.toolController.removeAndDestroyTools(penTools);
        
        const toolbar = editor.addToolbar(true);
        toolbar.addSaveButton(() => {
            const svgElem = editor.toSVG();
            console.log('Saved SVG to:', svgElem.outerHTML);
        });
        started_drawing = true;

        if (sound_on) {
            const start_sound = document.getElementById("sound_start");
            if (start_sound) (start_sound as HTMLAudioElement).play();
        }
        if (music_on){
            setTimeout(() => {
                const tunes = document.getElementById("tunes");
                if (tunes) (tunes as HTMLAudioElement).play();
            }, 1500);
        }
    }

    function quitMural(ev: MouseEvent) {goto('/')}

    function finishMural(ev: MouseEvent) {
        if (sound_on) {
            const finish_sound = document.getElementById("sound_finish");
            if (finish_sound) (finish_sound as HTMLAudioElement).play();
        }
        const tunes = document.getElementById("tunes");
        if (tunes) {
            setInterval(() => {
                (tunes as HTMLAudioElement).volume -= 0.05;
            }, 100);
        }

        // FINISH THIS
    }

    function toggleMusic(ev: MouseEvent) {
        music_on = !music_on;
        const tunes = document.getElementById("tunes");
        if (music_on && started_drawing) {
            if (tunes) (tunes as HTMLAudioElement).play();
        }
        else {
            if (tunes) (tunes as HTMLAudioElement).pause();
        }
    }
    function toggleSound(ev: MouseEvent) {sound_on = !sound_on}

</script>

<!-- Background animation covering the whole screen -->
<div id="canvas"></div>

<audio loop id="tunes">
    <source src="/type_script.ogg" type="audio/ogg">
</audio>
<audio id="sound_start">
    <source src="/type_start.wav" type="audio/wav">
</audio>
<audio id="sound_finish">
    <source src="/type_finish.wav" type="audio/wav">
</audio>

<h2>Draw your tile!</h2>
<div class="draw"></div>

{#if !started_drawing}
    <span class="buttons">
    <button class="btn btn-primary" onclick={startMural} in:fade>Start Drawing!</button>
    </span>
{:else}
    <span class="buttons">
        <button class="btn btn-primary" onclick={quitMural} transition:fade>Quit Drawing!</button>
        <button class="btn btn-primary" onclick={finishMural} transition:fade>Finish!</button>
    </span>
{/if}
<span class = "buttons">
    <button class="btn btn-primary" onclick={toggleMusic} transition:fade>{music_on ? "Disable Music" : "Enable Music"}</button>
    <button class="btn btn-primary" onclick={toggleSound} transition:fade>{sound_on ? "Disable Sound" : "Enable Sound"}</button>
</span>

<style>
    * {
        text-align: center;
        margin: auto;
    }

    h2 {
        font-size: larger;
        padding: 40px
    }

    .buttons {
        padding: 40px;
        display: flex;
        width: 500px;
        margin: auto;
    }

    /* Make background animation full-screen */
    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(36, 70, 182) url("/background_overlay.png") top left;
        background-size: auto;
        background-repeat: repeat;
        animation: panning 10s infinite linear;
        z-index: -1;
    }

    .draw {
        margin: auto;
        width: 50%;
        height: 25%;
    }

    @keyframes panning {
        0% {
            background-position: 0px 0px;
        }
        50% {
            background-position: 400px 200px;
        }
        100% {
            background-position: 0px 600px;
        }
    }
</style>