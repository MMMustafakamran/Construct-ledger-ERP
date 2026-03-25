import { expect, test, describe } from 'vitest';
import { createVendor, getVendors, getVendor } from '../services/vendor.service.js';

describe('Vendor Service', () => {
  test('should create and list a vendor', async () => {
    const newVendor = await createVendor({
      name: 'Test Vendor A',
      phone: '123-456-7890',
      address: '123 Test St',
    });

    expect(newVendor).toHaveProperty('id');
    expect(newVendor.name).toBe('Test Vendor A');

    const vendors = await getVendors();
    const found = vendors.find(v => v.id === newVendor.id);
    expect(found).toBeDefined();

    const singleVendor = await getVendor(newVendor.id);
    expect(singleVendor?.name).toBe('Test Vendor A');
  });
});
