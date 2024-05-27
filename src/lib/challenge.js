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

	connectionsStack.forEach((c) => elementsHistory.add(c[0]));
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
		nextConnections.forEach((c) => elementsHistory.add(c[0]));
		// connectionsStack.concat(nextConnections);
		connectionsStack = [...connectionsStack, ...nextConnections];

		console.log('nextConnections', nextConnections);
		console.log('connectionsStack', connectionsStack);
		console.log('elementsHistory', elementsHistory);

		// path.push(firstElement);
		found = elementsHistory.has(firstElement);
	}

	path.push(firstElement);

	console.log('path', path);

	return path.reverse();
}

/**
 * Find the shortest path (bottom-up)
 *
 * @param {Map<string, Set<string>>} graph
 * @param {string} firstElement inital element
 * @param {string} lastElement search element
 */
function getPossiblePaths(graph, firstElement, lastElement) {
	const elementsStack = [];
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

	// findShortestPathBottomUp(graph, first, last);
	getPossiblePaths(graph, first, last);

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
