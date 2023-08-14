export function randomArrayItem(items: unknown[]) {
	return items[Math.floor(Math.random() * items.length)]
}
