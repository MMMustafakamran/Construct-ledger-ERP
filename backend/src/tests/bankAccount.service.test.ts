import { expect, test, describe } from 'vitest';
import { getBankAccounts, getBankAccount } from '../services/bankAccount.service.js';

describe('BankAccount Service', () => {
  test('should list bank accounts', async () => {
    const accounts = await getBankAccounts();
    expect(Array.isArray(accounts)).toBe(true);
    
    if (accounts.length > 0) {
      const account = await getBankAccount(accounts[0].id);
      expect(account?.id).toBe(accounts[0].id);
    }
  });
});
