<script lang="ts">
	import type { PageProps } from './$types';

	import { Button } from '$lib/components/shad/ui/button';

	import PlanBoard from '$lib/components/PlanBoard.svelte';
	import Draggable from '$lib/components/Draggable.svelte';
	import Table from '../Table.svelte';

	const { data }: PageProps = $props();

	type TDraggableTable = {
		id: string;
		humanId: string;
		positionX: number;
		positionY: number;
	};

	let tables: TDraggableTable[] = $state(data.tables);

	const tableSection = 'A';
	let tableNum = $state(tables.length);

	function addTable() {
		const table: TDraggableTable = {
			id: crypto.randomUUID(),
			humanId: tableSection + tableNum,
			positionX: 0,
			positionY: 0
		};
		tables.push(table);

		tableNum += 1;
	}

	async function savePlan() {
		const response = await fetch('/planner/create', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'post',
			body: JSON.stringify({ tables })
		});
		const _responseBody = await response.json();
	}

	async function clearPlan() {
		try {
			await fetch('/planner/create', {
				method: 'delete'
			});
			tables = [];
		} catch {}
	}
</script>

<div class="flex h-screen flex-col gap-y-2">
	<header class="flex justify-between border-b-2 p-2 shadow">
		<div>
			<Button onclick={addTable}>Add Table</Button>
			<Button onclick={savePlan}>Save plan</Button>
			<Button variant="link" href="/planner/view">View plan</Button>
		</div>

		<Button variant="destructive" onclick={clearPlan}>Clear</Button>
	</header>

	<main class="grow p-2">
		<PlanBoard class="h-full">
			{#each tables as table (table.id)}
				<Draggable bind:positionX={table.positionX} bind:positionY={table.positionY}>
					<Table>{table.humanId}</Table>
				</Draggable>
			{/each}
		</PlanBoard>
	</main>
</div>
