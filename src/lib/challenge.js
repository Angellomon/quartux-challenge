const SEP_CHAR = '-';

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

/**
 * Get connections before the target
 *
 * @param {Map<string, Set<string>>} graph
 * @param {string} target
 * @param {Set<string>} elementsHistory
 */
function getConnectionsBefore(graph, target, elementsHistory) {
	/** @type {[string, Set<string>][]} */
	const connections = [];

	for (let [k, set] of graph) {
		if (set.has(target)) {
			connections.push([k, set]);
		}
	}

	return connections.filter((c) => !elementsHistory.has(c[0]));
}

/**
 * @param {Set<string>} paths
 * @param {string} element
 * @returns {string[]}
 */
function getStartPaths(paths, element) {
	/** @type {string[]} */
	const result = [];
	paths.forEach((p) => {
		if (p[0] === element) {
			result.push(p);
		}
	});
	return result;
}

/**
 * Find the shortest path
 *
 * @param {Map<string, Set<string>>} graph
 * @param {string} firstElement
 * @param {string} lastElement
 */
function shortestPath(graph, firstElement, lastElement) {
	if (firstElement == lastElement) return;

	const queue = [
		{
			element: firstElement
		}
	];

	/** @type {Map<string, boolean>} */
	const visitedElements = new Map();
	visitedElements.set(firstElement, true);

	let tail = 0;

	/** @type {Record<string, string>} */
	const predecessors = {};

	while (tail < queue.length) {
		const currentElement = queue.shift();

		if (!currentElement) break;

		let result = '';

		graph.get(currentElement.element)?.forEach((el) => {
			if (visitedElements.get(el)) return;

			visitedElements.set(el, true);

			if (el == lastElement) {
				const path = [el];

				let curr = currentElement.element;

				while (curr != firstElement) {
					path.push(curr);
					curr = predecessors[curr];
				}

				path.push(curr);
				path.reverse();

				result = path.join('-');
			}

			predecessors[el] = currentElement.element;
			queue.push({
				element: el
			});
		});

		if (result) return result;
	}

	return '-1';
}

/**
 * Find the shortest path (bottom-up)
 *
 * @param {Map<string, Set<string>>} graph
 * @param {string} firstElement inital element
 * @param {string} lastElement search element
 */
function breathFirstSearch(graph, firstElement, lastElement) {
	if (!graph.has(firstElement)) return [];

	const visited = new Map();
	visited.set(firstElement, true);

	const queue = [
		{
			element: firstElement,
			count: 0
		}
	];
	let tail = 0;

	while (queue.length > tail) {
		const currentElement = queue.shift();
		let count = currentElement?.count || 0;
		if (!currentElement) break;

		console.log(currentElement);
		graph.get(currentElement.element)?.forEach((el) => {
			if (!visited.has(el)) {
				visited.set(el, true);
				queue.push({
					element: el,
					count
				});
			}
		});
	}
}

/**
 * @param {string} input
 * @returns {string}
 */
export function ShortestPath(input) {
	const { numOfElements, elements, connections } = parseInput(input);
	const graph = createAndPopulateGraph(elements, connections);

	const first = elements[0];
	const last = elements[elements.length - 1];

	console.log(graph, first, last);

	let result = shortestPath(graph, first, last);
	console.log('result', result);
	// breathFirstSearch(graph, first, last);

	return result || '';
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
