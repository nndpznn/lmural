<script>
    //import {browser} from '$app/environment';
    import 'js-draw/bundledStyles';

    import {onMount} from 'svelte'

    // thanks stackoverflow
    // https://stackoverflow.com/questions/69874742/sveltekit-console-error-window-is-not-defined-when-i-import-library
    onMount(async () => {
        const draw_lib = (await import('js-draw'))
        
        const editor = new draw_lib.Editor(document.body);
        const primaries = editor.toolController.getPrimaryTools();
        editor.toolController.removeAndDestroyTools(primaries);
        const toolbar = editor.addToolbar(true);
    });
</script>

<h1>boop</h1>