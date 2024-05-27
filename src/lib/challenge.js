/**
 * @param {string[]} elements
 *  @param {string[]} connections
 */
export function createAndPopulateGraph(elements, connections) {
	/** @type {Map<string, Set<string>>} */
	const graph = new Map();

	// init
	for (let el of elements) {
		graph.set(el, new Set());
	}

	// populate the graph
	for (let con of connections) {
		const [a, b] = con.split('-');
		graph.get(a)?.add(b);
	}

	return graph;
}

/** @param {string} input */
export function ShortestPath(input) {
	const { numOfElements, elements, connections } = parseInput(input);
	const graph = createAndPopulateGraph(elements, connections);

	const first = elements[0];
	const last = elements[elements.length - 1];

	console.log(graph, first, last);

	return 'provisional result';
}

/**
 * @param {string} input
 * @return {{
 *   numOfElements: number;
 *   elements: string[];
 *   connections: string[]
 * }} parse result
 *
 * format: ["A","B","C"]
 * it assumes the input's format is always correct
 */
export function parseInput(input) {
	const s = input.replace('[', '').replace(']', '');

	const elements = s.split(',');

	/** @type {string[]} */
	const result = [];

	elements.forEach((el) => {
		result.push(String(el.trim().replaceAll('"', '')));
	});

	let i = 0;

	for (; i < result.length; i++) {
		if (result[i].includes('-')) {
			break;
		}
	}

	return {
		numOfElements: Number(result[0]),
		elements: result.slice(1, i),
		connections: result.slice(i)
	};
}
