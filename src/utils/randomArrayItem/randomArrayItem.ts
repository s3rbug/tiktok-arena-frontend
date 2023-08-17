export function randomArrayItem<T>(items: T[]) {
	return items[Math.floor(Math.random() * items.length)]
}
