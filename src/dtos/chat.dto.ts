/**
 * Chat DTOs
 *
 * Data Transfer Objects for chat/messaging operations.
 * Real-time messaging between users for professional networking.
 */

import { z } from "zod";

// ============================================================================
// Message DTOs
// ============================================================================

/**
 * Send Message Schema
 */
export const SendMessageSchema = z.object({
  recipientId: z.string().min(1, "Recipient ID is required"),
  content: z.string().min(1, "Message cannot be empty").max(5000, "Message too long"),
});

export type SendMessage = z.infer<typeof SendMessageSchema>;

/**
 * Send Message to Conversation Schema
 */
export const SendMessageToConversationSchema = z.object({
  conversationId: z.string().min(1, "Conversation ID is required"),
  content: z.string().min(1, "Message cannot be empty").max(5000, "Message too long"),
});

export type SendMessageToConversation = z.infer<typeof SendMessageToConversationSchema>;

/**
 * Mark Message as Read Schema
 */
export const MarkMessageReadSchema = z.object({
  messageId: z.string().min(1, "Message ID is required"),
});

export type MarkMessageRead = z.infer<typeof MarkMessageReadSchema>;

/**
 * Mark Conversation as Read Schema
 */
export const MarkConversationReadSchema = z.object({
  conversationId: z.string().min(1, "Conversation ID is required"),
});

export type MarkConversationRead = z.infer<typeof MarkConversationReadSchema>;

/**
 * Get Messages Query Schema
 */
export const GetMessagesQuerySchema = z.object({
  conversationId: z.string().min(1, "Conversation ID is required"),
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export type GetMessagesQuery = z.infer<typeof GetMessagesQuerySchema>;

/**
 * Get Conversations Query Schema
 */
export const GetConversationsQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export type GetConversationsQuery = z.infer<typeof GetConversationsQuerySchema>;

// ============================================================================
// Block User DTOs
// ============================================================================

/**
 * Block User Schema
 */
export const BlockUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  reason: z.string().max(500, "Reason too long").optional(),
});

export type BlockUser = z.infer<typeof BlockUserSchema>;

/**
 * Unblock User Schema
 */
export const UnblockUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export type UnblockUser = z.infer<typeof UnblockUserSchema>;

// ============================================================================
// WebSocket Event DTOs
// ============================================================================

/**
 * WebSocket Message Event (sent to clients)
 */
export const WsMessageEventSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  isRead: z.boolean(),
});

export type WsMessageEvent = z.infer<typeof WsMessageEventSchema>;

/**
 * WebSocket Typing Event
 */
export const WsTypingEventSchema = z.object({
  conversationId: z.string(),
  userId: z.string(),
  isTyping: z.boolean(),
});

export type WsTypingEvent = z.infer<typeof WsTypingEventSchema>;

/**
 * WebSocket Read Receipt Event
 */
export const WsReadReceiptEventSchema = z.object({
  conversationId: z.string(),
  messageId: z.string(),
  readBy: z.string(),
  readAt: z.string().datetime(),
});

export type WsReadReceiptEvent = z.infer<typeof WsReadReceiptEventSchema>;

/**
 * WebSocket User Online Status Event
 */
export const WsUserStatusEventSchema = z.object({
  userId: z.string(),
  isOnline: z.boolean(),
  lastSeen: z.string().datetime().optional(),
});

export type WsUserStatusEvent = z.infer<typeof WsUserStatusEventSchema>;

// ============================================================================
// Response DTOs
// ============================================================================

/**
 * Message Response Schema
 */
export const MessageResponseSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  content: z.string(),
  isRead: z.boolean(),
  readAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  sender: z.object({
    id: z.string(),
    displayName: z.string().nullable(),
    photoURL: z.string().nullable(),
  }),
});

export type MessageResponse = z.infer<typeof MessageResponseSchema>;

/**
 * Conversation Response Schema
 */
export const ConversationResponseSchema = z.object({
  id: z.string(),
  participant: z.object({
    id: z.string(),
    displayName: z.string().nullable(),
    photoURL: z.string().nullable(),
    username: z.string().nullable(),
  }),
  lastMessage: z.object({
    content: z.string(),
    senderId: z.string(),
    createdAt: z.string().datetime(),
    isRead: z.boolean(),
  }).nullable(),
  unreadCount: z.number().int().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ConversationResponse = z.infer<typeof ConversationResponseSchema>;

/**
 * Paginated Messages Response Schema
 */
export const PaginatedMessagesResponseSchema = z.object({
  messages: z.array(MessageResponseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});

export type PaginatedMessagesResponse = z.infer<typeof PaginatedMessagesResponseSchema>;

/**
 * Paginated Conversations Response Schema
 */
export const PaginatedConversationsResponseSchema = z.object({
  conversations: z.array(ConversationResponseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});

export type PaginatedConversationsResponse = z.infer<typeof PaginatedConversationsResponseSchema>;

/**
 * Blocked User Response Schema
 */
export const BlockedUserResponseSchema = z.object({
  id: z.string(),
  blockedAt: z.string().datetime(),
  reason: z.string().nullable(),
  user: z.object({
    id: z.string(),
    displayName: z.string().nullable(),
    photoURL: z.string().nullable(),
    username: z.string().nullable(),
  }),
});

export type BlockedUserResponse = z.infer<typeof BlockedUserResponseSchema>;

/**
 * Unread Count Response Schema
 */
export const UnreadCountResponseSchema = z.object({
  totalUnread: z.number().int().min(0),
  byConversation: z.record(z.string(), z.number().int().min(0)),
});

export type UnreadCountResponse = z.infer<typeof UnreadCountResponseSchema>;
