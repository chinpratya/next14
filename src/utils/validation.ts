import { Rule } from 'antd/lib/form';
import { ReactElement } from 'react';

class Validation {
  static required(
    message: string | ReactElement | unknown
  ): Rule {
    return {
      required: true,
      message: message as string,
    };
  }

  static password(fieldName: string): Rule {
    return {
      pattern: new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
      ),
      message: `${fieldName} must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character`,
    };
  }

  static password8(fieldName: string): Rule {
    return {
      pattern: new RegExp('^(?=.{8,})'),
      message: `${fieldName} must be at least 8 characters`,
    };
  }

  static special(fieldName: string): Rule {
    return {
      pattern: new RegExp('^(?=.*[!@#$%^&*])(?=.{8,})'),
      message: `${fieldName} must be at contain at least one special character`,
    };
  }

  static oneUppercase(fieldName: string): Rule {
    return {
      pattern: new RegExp('^(?=.*[A-Z])(?=.{8,})'),
      message: `${fieldName} must be at contain at least one uppercase letter`,
    };
  }

  static oneLowercase(fieldName: string): Rule {
    return {
      pattern: new RegExp('^(?=.*[a-z])(?=.{8,})'),
      message: `${fieldName} must be at contain at least one lowercase letter`,
    };
  }

  static oneLetter(fieldName: string): Rule {
    return {
      pattern: new RegExp('^(?=.*[a-zA-Z])(?=.{8,})'),
      message: `${fieldName} must be at contain at least one letter`,
    };
  }

  static oneNumber(fieldName: string): Rule {
    return {
      pattern: new RegExp('^(?=.*[0-9])(?=.{8,})'),
      message: `${fieldName} must be at contain at least one number`,
    };
  }

  static notContain(
    fieldName: string,
    value?: string
  ): Rule {
    if (!value) {
      return {
        pattern: new RegExp('^(?!.*\\s).*$'),
        message: `${fieldName} must not contain spaces`,
      };
    }
    return {
      pattern: new RegExp(`^(?!.*${value}).*$`),
      message: `${fieldName} must not contain ${value}`,
    };
  }

  static email(): Rule {
    return {
      type: 'email',
      message: `กรุณากรอกอีเมล์ให้ถูกต้อง`,
    };
  }

  static minLength(fieldName: string, min: number): Rule {
    return {
      min,
      message: `Must be at least ${min} characters`,
    };
  }

  static maxLength(fieldName: string, max: number): Rule {
    return {
      max,
      message: `Must be no more than ${max} characters`,
    };
  }

  static minValue(fieldName: string, min: number): Rule {
    return {
      type: 'number',
      min,
      message: `${fieldName} must be greater than or equal to ${min}`,
    };
  }

  static maxValue(fieldName: string, max: number): Rule {
    return {
      type: 'number',
      max,
      message: `${fieldName} must be less than or equal to ${max}`,
    };
  }

  static idCard(fieldName: string): Rule {
    return {
      pattern: /^[A-Z]{2}[0-9]{6}[A-Z]{1}[0-9]{2}$/,
      message: `${fieldName} must be a valid ID card number`,
    };
  }

  static passport(fieldName: string): Rule {
    return {
      pattern: /^[A-Z]{2}[0-9]{7}$/,
      message: `${fieldName} must be a valid passport number`,
    };
  }

  static number(fieldName: string): Rule {
    return {
      pattern: new RegExp('^[0-9]+$'),
      message: `${fieldName} must be a valid number`,
    };
  }

  static phone(message?: string): Rule {
    return {
      pattern: new RegExp('^[0-9]+$'),
      message:
        message ?? `กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง`,
    };
  }

  static url(): Rule {
    return {
      pattern: new RegExp(
        '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?$'
      ),
      message: `กรุณากรอก URL ให้ถูกต้อง`,
    };
  }

  static domainName(): Rule {
    return {
      pattern: new RegExp(
        '^([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?$'
      ),
      message: `กรุณากรอก URL ให้ถูกต้อง`,
    };
  }

  static trim(message?: string | ReactElement): Rule {
    return {
      pattern: new RegExp('^(?!\\s)(.*\\S)$'),
      message:
        message ?? 'ห้ามขึ้นต้นและลงท้ายด้วยช่องว่าง',
    };
  }

  // Add more validation functions as needed for your application
}

export const validation = Validation;

export default Validation;
