<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from './utils';

	type Props = {
		class?: string;
		children: Snippet;
	};
	const { class: className, children }: Props = $props();
</script>

<div class={cn('border-8 border-black', className)}>
	<div class="h-full w-full">
		{@render children()}
	</div>
</div>
