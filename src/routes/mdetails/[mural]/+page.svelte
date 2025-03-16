<script lang="ts">
    import { page } from '$app/stores';

    let muralObject = null;

    $: {
        const params = new URLSearchParams($page.url.search);
        const muralData = params.get("data");
        if (muralData) {
            muralObject = JSON.parse(decodeURIComponent(muralData));
        }
    }
</script>

