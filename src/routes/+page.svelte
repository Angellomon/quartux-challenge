<script>
	import './main.css';

	const inputs = [
		'["4","A","B","C","D","A-B","B-D","B-C","C-D"]',
		'["7","A","B","C","D","E","F","G","A-B","A-E","B-C","B-D","C-D","D-F","E-D","F-G"]'
	];

	let selectedInput = '';

	export let form;
</script>

<main>
	<h1 class="text-3xl font-bold mb-6">Quartux Coding Challenge</h1>

	<h3 class="text-xl font-bold mb-2">Shortest Path</h3>

	<p class="mb-4">
		Have the function <span class="function"
			>ShortestPath( <span class="params">strArr</span> )</span
		>
		take <span class="params">strArr</span> which will be an array of strings which models a
		non-looping <i>Graph</i>. The structure of the array will be as follows: The first element in
		the array will be the number of nodes <b>N</b> (points) in the array as a string. The next
		<b>N</b>
		elements will be nodes that can be anything (A, B, C ... Brick Street, Main Street .. etc). Then
		after the <b>Nth</b> element, the rest of the elements in the array will be the connections between
		all of the nodes. They will look like this: (A-B, B-C .. Black Street-Main Street .. etc.). Although,
		there may exist no connection at all.
	</p>

	<p class="mb-4">
		An example of <span class="params">strArr</span> may be
		<span class="example">{inputs[0]}</span>. Your program should return the shortest path from the
		<b>first</b>
		Node to the <b>last</b> Node in the array separated by dashes. So in the example above the
		output should be <b>A-B-D</b>. Here is another example with
		<span class="params">strArr</span>
		being
		<span class="example">{inputs[1]}</span>. The output should for this array should be
		<b>A-E-D-F-G</b>
	</p>

	<section class="inputs">
		{#each inputs as input}
			<div>
				<button
					class="font-mono font-bold px-4 py-2 border border-black rounded bg-white hover:bg-black hover:text-white"
					on:click={() => {
						selectedInput = input;
					}}>{input}</button
				>
			</div>
		{/each}
	</section>

	<form method="post" action="?/challenge">
		<input
			class="my-4 px-4 py-2 border border-black rounded bg-white"
			bind:value={selectedInput}
			placeholder="input"
			name="input"
			type="text"
		/>
		<input
			class="my-4 px-4 py-2 border border-white rounded bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border-black"
			type="submit"
			value="submit"
		/>
	</form>

	{#if form?.result}
		<div class="flex flex-row">
			<span class="text-white px-4 py-2 border bg-black border-black rounded">
				Result:
				{form.result}
			</span>
		</div>
	{/if}
</main>

<style lang="postcss">
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	main {
		padding: 3rem;
	}

	span.function {
		@apply text-blue-500;
		@apply font-mono;
		@apply font-bold;
	}

	span.params {
		@apply text-pink-500;
		@apply font-mono;
		@apply font-bold;
	}

	span.example {
		@apply text-slate-700;
		@apply bg-slate-100;
		@apply font-mono;
		@apply font-bold;
		@apply px-2;
		@apply py-1;
		@apply rounded;
	}
</style>
