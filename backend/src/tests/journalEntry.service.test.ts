import { expect, test, describe } from 'vitest';
import { getJournalEntries } from '../services/journalEntry.service.js';

describe('JournalEntry Service', () => {
  test('should list journal entries with lines', async () => {
    const entries = await getJournalEntries();
    expect(Array.isArray(entries)).toBe(true);
    
    if (entries.length > 0) {
      expect(entries[0]).toHaveProperty('lines');
      expect(Array.isArray(entries[0].lines)).toBe(true);
    }
  });
});
