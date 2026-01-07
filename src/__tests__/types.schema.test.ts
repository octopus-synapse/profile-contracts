/**
 * Types Schema Tests
 *
 * Tests for centralized type definitions.
 * These types represent API contracts between frontend and backend.
 */

import {
  UserSchema,
  UserProfileSchema,
  CheckUsernameResponseSchema,
  UserStatsSchema,
  AuthTokensSchema,
  AuthResponseSchema,
  RefreshTokenResponseSchema,
  ResumeSchema,
  ResumeExperienceSchema,
  ResumeEducationSchema,
  ResumeSkillSchema,
  ResumeLanguageSchema,
  ApiResponseSchema,
  ApiErrorResponseSchema,
  PaginatedResponseSchema,
  PaginationQuerySchema,
} from '../types';
import { z } from 'zod';

describe('User Types', () => {
  describe('UserSchema', () => {
    const validUser = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'user@example.com',
      name: 'John Doe',
      username: 'johndoe',
      usernameUpdatedAt: '2025-01-01T00:00:00.000Z',
      role: 'USER',
      image: 'https://example.com/avatar.png',
      hasCompletedOnboarding: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    };

    it('should validate complete user', () => {
      expect(() => UserSchema.parse(validUser)).not.toThrow();
    });

    it('should accept nullable fields as null', () => {
      const user = {
        ...validUser,
        name: null,
        username: null,
        usernameUpdatedAt: null,
        image: null,
      };
      expect(() => UserSchema.parse(user)).not.toThrow();
    });

    it('should accept APPROVER role', () => {
      const user = { ...validUser, role: 'APPROVER' };
      expect(() => UserSchema.parse(user)).not.toThrow();
    });

    it('should reject invalid role', () => {
      const user = { ...validUser, role: 'SUPERUSER' };
      expect(() => UserSchema.parse(user)).toThrow();
    });

    it('should reject invalid UUID', () => {
      const user = { ...validUser, id: 'not-a-uuid' };
      expect(() => UserSchema.parse(user)).toThrow();
    });

    it('should reject invalid email', () => {
      const user = { ...validUser, email: 'invalid' };
      expect(() => UserSchema.parse(user)).toThrow();
    });
  });

  describe('UserProfileSchema', () => {
    it('should extend UserSchema with profile fields', () => {
      const profile = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'user@example.com',
        name: 'John Doe',
        username: 'johndoe',
        usernameUpdatedAt: null,
        role: 'USER',
        image: null,
        hasCompletedOnboarding: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
        bio: 'Software developer',
        location: 'San Francisco',
        website: 'https://johndoe.dev',
        company: 'Tech Corp',
        title: 'Senior Engineer',
        phone: '+1 555 123 4567',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe',
      };
      expect(() => UserProfileSchema.parse(profile)).not.toThrow();
    });
  });

  describe('CheckUsernameResponseSchema', () => {
    it('should validate available response', () => {
      const response = { available: true, nextChangeDate: null };
      expect(() => CheckUsernameResponseSchema.parse(response)).not.toThrow();
    });

    it('should validate unavailable response with date', () => {
      const response = {
        available: false,
        nextChangeDate: '2025-06-01T00:00:00.000Z',
      };
      expect(() => CheckUsernameResponseSchema.parse(response)).not.toThrow();
    });
  });

  describe('UserStatsSchema', () => {
    it('should validate stats', () => {
      const stats = {
        totalResumes: 5,
        publicProfiles: 2,
        lastActive: '2025-01-07T10:00:00.000Z',
      };
      expect(() => UserStatsSchema.parse(stats)).not.toThrow();
    });

    it('should reject negative counts', () => {
      const stats = { totalResumes: -1, publicProfiles: 0, lastActive: null };
      expect(() => UserStatsSchema.parse(stats)).toThrow();
    });
  });
});

describe('Auth Types', () => {
  describe('AuthTokensSchema', () => {
    it('should validate tokens', () => {
      const tokens = {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'refresh-token-123',
        expiresIn: 3600,
      };
      expect(() => AuthTokensSchema.parse(tokens)).not.toThrow();
    });

    it('should allow optional refreshToken', () => {
      const tokens = {
        accessToken: 'access-token',
        expiresIn: 3600,
      };
      expect(() => AuthTokensSchema.parse(tokens)).not.toThrow();
    });

    it('should reject non-positive expiresIn', () => {
      const tokens = { accessToken: 'token', expiresIn: 0 };
      expect(() => AuthTokensSchema.parse(tokens)).toThrow();
    });
  });

  describe('AuthResponseSchema', () => {
    it('should validate complete auth response', () => {
      const response = {
        user: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          email: 'user@example.com',
          name: 'John',
          role: 'USER',
        },
        tokens: {
          accessToken: 'token',
          expiresIn: 3600,
        },
      };
      expect(() => AuthResponseSchema.parse(response)).not.toThrow();
    });

    it('should accept APPROVER role in response', () => {
      const response = {
        user: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          email: 'approver@example.com',
          name: null,
          role: 'APPROVER',
        },
        tokens: { accessToken: 'token', expiresIn: 3600 },
      };
      expect(() => AuthResponseSchema.parse(response)).not.toThrow();
    });
  });

  describe('RefreshTokenResponseSchema', () => {
    it('should validate refresh response', () => {
      const response = { accessToken: 'new-token', expiresIn: 3600 };
      expect(() => RefreshTokenResponseSchema.parse(response)).not.toThrow();
    });
  });
});

describe('Resume Types', () => {
  describe('ResumeExperienceSchema', () => {
    it('should validate experience', () => {
      const experience = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        resumeId: '550e8400-e29b-41d4-a716-446655440001',
        company: 'Tech Corp',
        position: 'Engineer',
        location: 'San Francisco',
        startDate: '2020-01-15',
        endDate: null,
        current: true,
        description: 'Building products',
        achievements: ['Led team of 5', 'Shipped v2.0'],
        order: 0,
      };
      expect(() => ResumeExperienceSchema.parse(experience)).not.toThrow();
    });
  });

  describe('ResumeEducationSchema', () => {
    it('should validate education', () => {
      const education = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        resumeId: '550e8400-e29b-41d4-a716-446655440001',
        institution: 'MIT',
        degree: 'BSc',
        field: 'Computer Science',
        location: 'Cambridge, MA',
        startDate: '2014-09',
        endDate: '2018-05',
        current: false,
        description: null,
        gpa: '3.8',
        order: 0,
      };
      expect(() => ResumeEducationSchema.parse(education)).not.toThrow();
    });
  });

  describe('ResumeSkillSchema', () => {
    it('should validate skill with level', () => {
      const skill = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        resumeId: '550e8400-e29b-41d4-a716-446655440001',
        name: 'TypeScript',
        level: 'EXPERT',
        category: 'Programming',
        order: 0,
      };
      expect(() => ResumeSkillSchema.parse(skill)).not.toThrow();
    });

    it('should reject invalid skill level', () => {
      const skill = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        resumeId: '550e8400-e29b-41d4-a716-446655440001',
        name: 'TypeScript',
        level: 'MASTER',
        category: null,
        order: 0,
      };
      expect(() => ResumeSkillSchema.parse(skill)).toThrow();
    });
  });

  describe('ResumeLanguageSchema', () => {
    it('should validate language', () => {
      const language = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        resumeId: '550e8400-e29b-41d4-a716-446655440001',
        name: 'English',
        level: 'NATIVE',
        cefrLevel: null,
        order: 0,
      };
      expect(() => ResumeLanguageSchema.parse(language)).not.toThrow();
    });

    it('should validate CEFR levels', () => {
      const language = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        resumeId: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Spanish',
        level: 'INTERMEDIATE',
        cefrLevel: 'B1',
        order: 1,
      };
      expect(() => ResumeLanguageSchema.parse(language)).not.toThrow();
    });
  });
});

describe('API Types', () => {
  describe('ApiResponseSchema', () => {
    it('should create typed response schema', () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      const response = { success: true, data: 'hello', message: 'OK' };
      expect(() => StringResponseSchema.parse(response)).not.toThrow();
    });

    it('should work with complex data types', () => {
      const UserResponseSchema = ApiResponseSchema(UserSchema);
      const response = {
        success: true,
        data: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          email: 'user@example.com',
          name: 'John',
          username: 'john',
          usernameUpdatedAt: null,
          role: 'USER',
          image: null,
          hasCompletedOnboarding: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
      };
      expect(() => UserResponseSchema.parse(response)).not.toThrow();
    });
  });

  describe('ApiErrorResponseSchema', () => {
    it('should validate error response', () => {
      const error = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: { field: 'email', issue: 'required' },
        },
      };
      expect(() => ApiErrorResponseSchema.parse(error)).not.toThrow();
    });
  });

  describe('PaginatedResponseSchema', () => {
    it('should create typed paginated schema', () => {
      const PaginatedStringsSchema = PaginatedResponseSchema(z.string());
      const response = {
        items: ['a', 'b', 'c'],
        total: 100,
        page: 1,
        limit: 20,
        totalPages: 5,
        hasNext: true,
        hasPrevious: false,
      };
      expect(() => PaginatedStringsSchema.parse(response)).not.toThrow();
    });
  });

  describe('PaginationQuerySchema', () => {
    it('should apply defaults', () => {
      const result = PaginationQuerySchema.parse({});
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.sortOrder).toBe('desc');
    });

    it('should coerce strings to numbers', () => {
      const result = PaginationQuerySchema.parse({ page: '5', limit: '50' });
      expect(result.page).toBe(5);
      expect(result.limit).toBe(50);
    });

    it('should reject page < 1', () => {
      expect(() => PaginationQuerySchema.parse({ page: 0 })).toThrow();
    });

    it('should reject limit > 100', () => {
      expect(() => PaginationQuerySchema.parse({ limit: 200 })).toThrow();
    });
  });
});
