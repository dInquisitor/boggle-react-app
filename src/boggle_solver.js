/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

/**
 * Code review: Adewale Folorunsho
 * SID: @02882123
 * /

/**
 * Name: Ibukunoluwa Esan
 * SID: @02925127
 */

class TrieNode {
	constructor(value) {
		this.value = value;
		this.isWord = false;
		this.word = null;
		this.children = new Map();
	}
}
class Trie {
	constructor() {
		this.root = new TrieNode("*");
	}
	insertWord(word) {
		let node = this.root;
		for(let i = 0; i < word.length; ++i) {
			let c = word[i];
			if(c === "q" && (i + 1) < word.length && word[i + 1] === "u") {
				c = "qu";
				i += 1;
			}
			if(c === "s" && (i + 1) < word.length && word[i + 1] === "t") {
				c = "st";
				i += 1;
			}
			if(!node.children.has(c)) {
				node.children.set(c, new TrieNode(c));
			}
			node = node.children.get(c);
		}
		node.isWord = true;
		node.word = word;
	}
}


exports.findAllSolutions = function(grid, dictionary) {
	let solutions = new Set();
	if(grid.length === 0 || dictionary.length === 0) {
		return [];
	}
  
	// Ensure there are no standalone q and s tiles, q is followed by u and s is followed by t
	for(let i = 0; i < grid.length; ++i) {
		for(let j = 0; j < grid[0].length; ++j) {
			const letter = (grid[i][j]).toLowerCase();
			if (letter === "q" || letter === "s" || (letter.length > 1 && letter !== "qu" && letter !== "st")) {
				return [];
			}
		}
	}
  
	const trie = new Trie();
	for(const word of dictionary) {
		trie.insertWord(word.toLowerCase());
	}
	const moves = [-1, 0, 1];
	const inBounds = (row, col) => row > -1 && row < grid.length && col > -1 && col < grid[0].length;
	const helper = (row, col, node, visited) => {
		if(!inBounds(row, col)) {
			return;
		}
		if(visited.has(`${row}|${col}`)) {
			return;
		}
		const letter = (grid[row][col]).toLowerCase();
		if(node.children.has(letter)) {
			node = node.children.get(letter);
			if(node.isWord && node.word.length > 2) {
				solutions.add(node.word);
			}
			for(const x of moves) {
				for(const y of moves) {
					if(!(x === 0 && y === 0)) {
						helper(row + x, col + y, node, new Set([...visited, `${row}|${col}`]));
					}
				}
			}
		}
	};
  
	// Go through the matrix and recursively match characters with trie
	for(let i = 0; i < grid.length; ++i) {
		for(let j = 0; j < grid[0].length; ++j) {
			const letter = (grid[i][j]).toLowerCase();
			if(trie.root.children.has(letter)) {
				let node = trie.root.children.get(letter);
				for(const x of moves) {
					for(const y of moves) {
						if(!(x === 0 && y === 0)) {
							helper(i + x, j + y, node, new Set([`${i}|${j}`]));
						}
					}
				}
			}
		}
	}
	return [...solutions];
};

// var grid = [
// 	["t", "w", "y", "r"],
// 	["e", "n", "p", "h"],
// 	["g", "z", "qu", "r"],
// 	["o", "n", "t", "a"]
// ];
// var dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat", "pry", "qua", "quart", "quartz", "rat", "tar", "tarp", "ten", "went", "wet", "arty", "egg", "not", "quar"];
// console.log(exports.findAllSolutions(grid, dictionary));
