<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		positionX: number;
		positionY: number;
		children: Snippet;
	};
	const { positionX, positionY, children }: Props = $props();
</script>

<div class="absolute w-fit" style="top: {positionY}px; left: {positionX}px">
	{@render children()}
</div>
