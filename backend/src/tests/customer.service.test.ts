import { expect, test, describe } from 'vitest';
import { createCustomer, getCustomers, getCustomer } from '../services/customer.service.js';

describe('Customer Service', () => {
  test('should create and list a customer', async () => {
    const newCustomer = await createCustomer({
      name: 'Test Customer A',
      phone: '987-654-3210',
      address: '456 Client Ave',
    });

    expect(newCustomer).toHaveProperty('id');
    expect(newCustomer.name).toBe('Test Customer A');

    const customers = await getCustomers();
    const found = customers.find(c => c.id === newCustomer.id);
    expect(found).toBeDefined();

    const singleCustomer = await getCustomer(newCustomer.id);
    expect(singleCustomer?.name).toBe('Test Customer A');
  });
});
