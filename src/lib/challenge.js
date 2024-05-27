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
		if (set.has(target) && !elementsHistory.has(target)) {
			connections.push([k, set]);
		}
	}

	return connections;
}

/**
 * Find the shortest path (bottom-up)
 *
 * @param {Map<string, Set<string>>} graph
 * @param {string} firstElement
 * @param {string} lastElement
 */
function findShortestPathBottomUp(graph, firstElement, lastElement) {
	let found = false;
	const path = [lastElement]; // maybe a set
	let currentElement = lastElement;
	const elementsHistory = new Set();

	const initialConnections = getConnectionsBefore(graph, lastElement, elementsHistory);
	let connectionsStack = [...initialConnections];
	elementsHistory.add(lastElement);
	console.log('initialConnections', initialConnections);

	while (!found) {
		let currentConnection = connectionsStack.pop();
		console.log('connectionsStack', connectionsStack);
		console.log('currentConnection', currentConnection);

		if (!currentConnection) continue;

		const [currentKey, currentSet] = currentConnection;

		if (!currentSet.has(currentElement)) continue;

		currentElement = currentKey;
		path.push(currentKey);

		const nextConnections = getConnectionsBefore(graph, currentElement, elementsHistory);
		// connectionsStack.concat(nextConnections);
		connectionsStack = [...connectionsStack, ...nextConnections];

		console.log('nextConnections', nextConnections);
		console.log('connectionsStack', connectionsStack);

		// path.push(firstElement);
		found = true;
	}

	return path.reverse();
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

	findShortestPathBottomUp(graph, first, last);

	const result = 'provisional result';

	return result;
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
