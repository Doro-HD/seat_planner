<script lang="ts">
	import type { PageProps } from './$types';

	import { Button } from '$lib/components/shad/ui/button';

	import PlanBoard from '$lib/components/PlanBoard.svelte';
	import Table from '../Table.svelte';
	import Absolute from './Absolute.svelte';

	const { data }: PageProps = $props();
</script>

<div class="flex h-screen flex-col gap-y-2">
	<header class="border-b-2 p-2 shadow">
		<Button variant="link" href="/planner/create">Edit plan</Button>
	</header>

	<main class="grow p-2">
		<PlanBoard class="relative h-full">
			{#each data.tables as table (table.id)}
				<Absolute positionX={table.positionX} positionY={table.positionY}>
					<Table>{table.humanId}</Table>
				</Absolute>
			{/each}
		</PlanBoard>
	</main>
</div>
