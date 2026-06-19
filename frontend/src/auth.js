// Headers voor schrijf-acties: stuurt het opgeslagen token mee
export function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('cms_token') || ''}`,
  }
}
