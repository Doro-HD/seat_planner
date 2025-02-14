<script lang="ts">
	import type { Snippet } from 'svelte';
	import { draggable } from '@neodrag/svelte';

	type Props = {
		positionX: number;
		positionY: number;
		children: Snippet;
	};
	let { positionX = $bindable(), positionY = $bindable(), children }: Props = $props();

	const initialX = positionX;
	const initialY = positionY;
</script>

<div
	class="absolute w-fit"
	use:draggable={{
		bounds: 'parent',
		grid: [20, 20],
		position: { x: initialX, y: initialY },
		onDrag: ({ offsetX, offsetY }) => {
			positionX = offsetX;
			positionY = offsetY;
		}
	}}
>
	{@render children()}
</div>
