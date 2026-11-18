import { safeStorage } from './storage';

export interface DeliverySlot {
  id: string;
  name: string;
  timeWindow: string;
  isExpress?: boolean;
  isAvailable: boolean;
}

export interface FastDeliverySettings {
  deliveryCharge: number;
  expressSurcharge: number;
  freeDeliveryAbove?: number;
  slots: DeliverySlot[];
}

export const DEFAULT_DELIVERY_SLOTS: DeliverySlot[] = [
  {
    id: 'slot-morning',
    name: 'Morning Delivery',
    timeWindow: '10:00 AM - 01:00 PM',
    isExpress: false,
    isAvailable: true,
  },
  {
    id: 'slot-afternoon',
    name: 'Afternoon Delivery',
    timeWindow: '02:00 PM - 05:00 PM',
    isExpress: false,
    isAvailable: true,
  },
  {
    id: 'slot-evening',
    name: 'Evening Celebration Slot',
    timeWindow: '06:00 PM - 09:00 PM',
    isExpress: false,
    isAvailable: true,
  },
  {
    id: 'slot-express',
    name: 'Super Express Fast Delivery',
    timeWindow: 'Within 2 Hours ⚡',
    isExpress: true,
    isAvailable: true,
  },
];

export const DEFAULT_FAST_DELIVERY_SETTINGS: FastDeliverySettings = {
  deliveryCharge: 99,
  expressSurcharge: 50,
  freeDeliveryAbove: 2000,
  slots: DEFAULT_DELIVERY_SLOTS,
};

const STORAGE_KEY = 'mahesh_bakery_fast_delivery_settings';

export function getFastDeliverySettings(): FastDeliverySettings {
  try {
    const raw = safeStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_FAST_DELIVERY_SETTINGS,
        ...parsed,
        slots: Array.isArray(parsed.slots) && parsed.slots.length > 0 ? parsed.slots : DEFAULT_DELIVERY_SLOTS,
      };
    }
  } catch (e) {
    console.warn('Error reading fast delivery settings:', e);
  }
  return DEFAULT_FAST_DELIVERY_SETTINGS;
}

export function saveFastDeliverySettings(settings: FastDeliverySettings): void {
  try {
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    // Trigger custom event so any open page syncs immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('mahesh_delivery_settings_updated'));
    }
  } catch (e) {
    console.error('Error saving fast delivery settings:', e);
  }
}
