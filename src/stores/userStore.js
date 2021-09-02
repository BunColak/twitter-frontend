import {writable} from 'svelte/store'

const persisted = localStorage.getItem('twitter-user')

export const user = writable(persisted ? JSON.parse(persisted) : null)