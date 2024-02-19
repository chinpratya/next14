import { Meta, Story } from '@storybook/react';

import {
  CodePreview,
  CodePreviewProps,
} from './code-preview';

const codePreview = `-----BEGIN CERTIFICATE REQUEST-----
  MIIDBTCCAe0CAQAwgYQxCzAJBgNVBAYTAlpNMQ8wDQYDVQQIDAZ6eGN6eGMxDzANBgNVBAcMBnp4Y3p4YzEPMA0GA1UECg
  A2TM0KyzbykRYossDD7k5FF0wKsp0QEKc0dAW5r/PaUsEwRbg/gCGXHHsRbxnktWM9VEHQaoA msqoZylg8x+p5DjLdxuC
  tZDVnmRSDrOL6VCEA1Epe/QuQdGni6oYnwUjIolon1Bjl0wQdVZjG0b7drdc6H9 TL0KtLnFHCzhVN6HssNqZ9LLSq/GZ7
  13e9UphDHPNMKq2bBM NhPHkdgMfOCF+DBpCCh6LYeYfJUq2MupXP2jsqxCw8w1rSPEOft/pc6okdSQxdwGRFi1GYlWn+z
  dVXEOujpFGcu7dDbXTffLSM0xjEv
 -----END CERTIFICATE REQUEST-----`;

export default {
  title: 'Share/CodePreview',
  component: CodePreview,
} as Meta;

const Template: Story<CodePreviewProps> = (args) => (
  <CodePreview {...args} />
);

export const Default = Template.bind({});

Default.args = {
  code: codePreview,
};
