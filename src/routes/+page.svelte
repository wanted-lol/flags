<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$components/ui/card';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$components/ui/table';
	import type { IFlag } from '$lib/interfaces';

	export let data: any;

	const badges: any = data.props.badges;

	const flagsToBadges = (flags: number): IFlag[] => {
		let res: IFlag[] = [];

		for (const badge of badges) {
			if ((flags & (1 << badge.flag)) !== 0) {
				res.push(badge);
			}
		}

		return res;
	};

	const toggleBadge = (badge: IFlag) => {
		if ((search & (1 << badge.flag)) !== 0) {
			search &= ~(1 << badge.flag);
		} else {
			search |= 1 << badge.flag;
		}
	};

	let search: number = 0;
	let result: IFlag[] = [];

	$: result = flagsToBadges(search);
</script>

<div class="flex flex-col mt-20 space-y-4">
	<div class="container">
		<Card>
			<CardHeader>
				<CardTitle>Search Flags</CardTitle>
			</CardHeader>
			<CardContent class="flex items-center justify-between space-x-4">
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label for="flags">Flag Number</Label>
					<Input type="number" id="flags" placeholder="0" bind:value={search} />
				</div>
			</CardContent>
		</Card>
	</div>
	<div class="container">
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Flag</TableHead>
					<TableHead>Icon</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead class="text-right">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each badges as badge}
					{#if result.find((item) => item.flag === badge.flag)}
						<TableRow class="bg-secondary">
							<TableCell class="font-medium">{badge.flag}</TableCell>
							<TableCell>
								<img src={badge.url} alt={badge.name} class="w-8 h-8 rounded-full" />
							</TableCell>
							<TableCell>{badge.name}</TableCell>
							<TableCell>{badge.description}</TableCell>
							<TableCell class="text-right">
								<Button on:click={() => toggleBadge(badge)}>
									{#if (search & (1 << badge.flag)) !== 0}
										Remove
									{:else}
										Add
									{/if}
								</Button>
							</TableCell>
						</TableRow>
					{:else}
						<TableRow>
							<TableCell class="font-medium">{badge.flag}</TableCell>
							<TableCell>
								<img src={badge.url} alt={badge.name} class="w-8 h-8 rounded-full" />
							</TableCell>
							<TableCell>{badge.name}</TableCell>
							<TableCell>{badge.description}</TableCell>
							<TableCell class="text-right">
								<Button on:click={() => toggleBadge(badge)}>
									{#if (search & (1 << badge.flag)) !== 0}
										Remove
									{:else}
										Add
									{/if}
								</Button>
							</TableCell>
						</TableRow>
					{/if}
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
