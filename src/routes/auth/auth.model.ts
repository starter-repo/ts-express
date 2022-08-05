export type AuthSuccess = {
  success: true
  statusCode: number
  authToken: string
}

export type AuthFailure = {
  success: false
  statusCode: number
  message: string
}
