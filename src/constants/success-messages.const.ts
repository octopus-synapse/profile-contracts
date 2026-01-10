/**
 * Success Messages Constants
 * Standardized success messages for consistent API responses.
 * Single source of truth for all success messages across frontend and backend.
 */

export const SUCCESS_MESSAGES = {
  // Auth
  USER_REGISTERED: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',

  // Resources
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',

  // Onboarding
  ONBOARDING_COMPLETED: 'Onboarding completed successfully',
} as const;

export type SuccessMessage = typeof SUCCESS_MESSAGES[keyof typeof SUCCESS_MESSAGES];

