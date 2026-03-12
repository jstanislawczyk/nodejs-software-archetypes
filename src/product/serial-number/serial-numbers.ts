import { ImeiSerialNumber } from './imei-serial-number.js';
import type { SerialNumber } from './serial-number.js';
import { TextualSerialNumber } from './textual-number.js';
import { VinSerialNumber } from './vin-serial-number.js';

export class SerialNumbers {
  static of(value: string): SerialNumber {
    return TextualSerialNumber.of(value);
  }

  static vin(value: string): SerialNumber {
    return VinSerialNumber.of(value);
  }

  static imei(value: string): SerialNumber {
    return ImeiSerialNumber.of(value);
  }
}
