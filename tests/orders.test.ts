import { describe, it, expect } from 'vitest';
import { db } from '../src/lib/data/mock-db';

describe('SILVEX Orders & Inventory Flow', () => {
  it('should create an order and record inventory movements', () => {
    const initialOrdersCount = db.orders.findAll().length;

    const sampleOrder = db.orders.create({
      email: 'test.client@estate.com',
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      currency: 'USD',
      subtotal: 4850,
      discountAmount: 0,
      shippingAmount: 0,
      taxAmount: 388,
      totalAmount: 5238,
      shippingMethod: 'White Glove Installation',
      shippingAddress: {
        id: 'addr-test',
        firstName: 'Test',
        lastName: 'Client',
        street: '100 Ocean Blvd',
        city: 'Miami',
        state: 'FL',
        postalCode: '33139',
        country: 'US',
      },
      items: [
        {
          id: 'item-1',
          productId: 'prod-solara-sectional',
          productTitle: 'Solara Teak Grand 5-Piece Outdoor Sectional',
          variantTitle: 'Natural Golden Teak / Sandstone Sunbrella®',
          sku: 'SLX-SOL-SEC-01-SND',
          imageUrl: '',
          price: 4850,
          quantity: 1,
          totalPrice: 4850,
        },
      ],
    });

    expect(sampleOrder.orderNumber).toBeDefined();
    expect(db.orders.findAll().length).toBe(initialOrdersCount + 1);

    // Check inventory movement was logged
    const movements = db.inventory.getAllMovements();
    const latestMovement = movements.find((m) => m.referenceId === sampleOrder.id);
    expect(latestMovement).toBeDefined();
    expect(latestMovement?.quantity).toBe(-1);
  });

  it('should validate promo codes correctly', () => {
    const promo = db.discounts.findByCode('SILVEX10');
    expect(promo).toBeDefined();
    expect(promo?.value).toBe(10);
    expect(promo?.type).toBe('PERCENTAGE');
  });
});
