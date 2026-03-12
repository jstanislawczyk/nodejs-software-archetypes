import { ImeiSerialNumber } from './imei-serial-number.ts';
import type { SerialNumber } from './serial-number.ts';
import { TextualSerialNumber } from './textual-number.ts';
import { VinSerialNumber } from './vin-serial-number.ts';

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
