import { z } from 'zod';

export const bannerSettingContentSchema = z.object({
  cookie_policy_link: z.string(),
  perf_cookie_policy_link: z.string(),
  settings: z.string(),
  deny: z.string(),
  save: z.string(),
  description: z.string(),
  title: z.string(),
  privacy_policy_link: z.string(),
  perf_privacy_policy_link: z.string(),
  accept: z.string(),
  privacy_statement: z.string(),
  modal_title: z.string(),
  policy_description2: z.string(),
  banner_accept: z.string(),
  always_on: z.string(),
  policy_description: z.string(),
  cookie_detail: z.string(),
  cookie_statement: z.string(),
  perf_cookie_statement: z.string(),
  perf_cookie_policy: z.string(),
  cookie_policy: z.string(),
  perf_description: z.string(),
});
export const bannerSettingSchema = z.object({
  perf_primary_color: z.string(),
  color_mode: z.string(),
  perf_popup_position: z.string(),
  primary_color: z.string(),
  version: z.string(),
  perf_color_mode: z.string(),
  perf_text_color: z.string(),
  text_link_color: z.string(),
  popup_position: z.string(),
  background_color: z.string(),
  perf_text_link_color: z.string(),
  perf_style: z.string(),
  style: z.string(),
  brand_logo_url: z.string(),
  perf_show_brand_logo: z.boolean(),
  show_brand_logo: z.boolean(),
  according_festival: z.boolean(),
  text_color: z.string(),
  opacity: z.number(),
  button_color: z.string(),
  lang: z.string(),
  perf_background_color: z.string(),
  icon_logo: z.string(),
  icon_position: z.string(),
  perf_brand_logo_url: z.string(),
  on_display: z.boolean(),
  enable_deny: z.boolean(),
  perf_button_color: z.string(),
  text: z.record(z.string(), bannerSettingContentSchema),
});