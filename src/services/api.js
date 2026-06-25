import {
	normalizeDiagnosis,
	normalizeMentoria,
	normalizeOrder,
	normalizeProduct,
	normalizeTrilha,
	normalizeUser,
} from './adapters'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1'
const AUTH_STORAGE_KEY = 'ema_access_token'

function buildHeaders(extraHeaders = {}) {
	const token = localStorage.getItem(AUTH_STORAGE_KEY)
	const authHeader = token ? { Authorization: `Bearer ${token}` } : {}
	return {
		'Content-Type': 'application/json',
		...authHeader,
		...extraHeaders,
	}
}

async function apiRequest(path, options = {}) {
	const response = await fetch(`${API_BASE}${path}`, {
		...options,
		headers: buildHeaders(options.headers),
	})

	const isJson = response.headers.get('content-type')?.includes('application/json')
	const data = isJson ? await response.json() : null

	if (!response.ok) {
		const message = data?.message || `Erro HTTP ${response.status}`
		throw new Error(message)
	}

	return data
}

export function saveAuthToken(token) {
	localStorage.setItem(AUTH_STORAGE_KEY, token)
}

export function clearAuthToken() {
	localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function getAuthToken() {
	return localStorage.getItem(AUTH_STORAGE_KEY)
}

export function registerUser(payload) {
	return apiRequest('/auth/register', {
		method: 'POST',
		body: JSON.stringify(payload),
	})
}

export async function loginUser(payload) {
	const data = await apiRequest('/auth/login', {
		method: 'POST',
		body: JSON.stringify(payload),
	})

	if (data?.access_token) {
		saveAuthToken(data.access_token)
	}
	return data
}

export function getCurrentUser() {
	return apiRequest('/auth/me').then((data) => normalizeUser(data))
}

export function listProducts() {
	return apiRequest('/produtos').then((data) => (Array.isArray(data) ? data.map(normalizeProduct) : []))
}

export function createProduct(payload) {
	return apiRequest('/produtos', {
		method: 'POST',
		body: JSON.stringify(payload),
	}).then((data) => normalizeProduct(data))
}

export function listTrilhas() {
	return apiRequest('/trilhas').then((data) => (Array.isArray(data) ? data.map(normalizeTrilha) : []))
}

export function listMentorias() {
	return apiRequest('/mentorias').then((data) => (Array.isArray(data) ? data.map(normalizeMentoria) : []))
}

export function createMentoria(payload) {
	return apiRequest('/mentorias', {
		method: 'POST',
		body: JSON.stringify(payload),
	}).then((data) => normalizeMentoria(data))
}

export function listUsers() {
	return apiRequest('/usuarios').then((data) => (Array.isArray(data) ? data.map(normalizeUser) : []))
}

export function listOrders() {
	return apiRequest('/pedidos').then((data) => (Array.isArray(data) ? data.map(normalizeOrder) : []))
}

export function createDiagnosis(payload) {
	return apiRequest('/aprendizagem/diagnosticos', {
		method: 'POST',
		body: JSON.stringify(payload),
	}).then((data) => normalizeDiagnosis(data))
}

export function listDiagnoses() {
	return apiRequest('/aprendizagem/diagnosticos').then((data) => (Array.isArray(data) ? data.map(normalizeDiagnosis) : []))
}
