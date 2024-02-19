import { z } from 'zod';

import {
  ActivityDisclosureActorResponseSchema,
  ActivityDisclosureActorSchema,
  ActivityDisclosurePurposeResponseSchema,
  ActivityDisclosurePurposeSchema,
  ActivityDisclosurePurposeDestinationSchema,
  ActivityDisclosurePurposeDestinationResponseSchema,
  ActivityDestinationPersonalProtectionMeasuresResponseSchema,
  ActivityDestinationPersonalProtectionMeasuresSchema,
  ProtectioninfoSchema,
} from '../schemas';

export type ActivityDisclosureActor = z.infer<
  typeof ActivityDisclosureActorSchema
>;

export type ActivityDisclosureActorResponse = z.infer<
  typeof ActivityDisclosureActorResponseSchema
>;

export type ActivityDisclosurePurpose = z.infer<
  typeof ActivityDisclosurePurposeSchema
>;

export type ActivityDisclosurePurposeResponse = z.infer<
  typeof ActivityDisclosurePurposeResponseSchema
>;

export type ActivityDisclosurePurposeDestination =
  z.infer<
    typeof ActivityDisclosurePurposeDestinationSchema
  >;

export type ActivityDisclosurePurposeDestinationResponse =
  z.infer<
    typeof ActivityDisclosurePurposeDestinationResponseSchema
  >;

export type ActivityDestinationPersonalProtectionMeasuresResponse =
  z.infer<
    typeof ActivityDestinationPersonalProtectionMeasuresResponseSchema
  >;

export type ActivityDestinationPersonalProtectionMeasures =
  z.infer<
    typeof ActivityDestinationPersonalProtectionMeasuresSchema
  >;

export type Protectioninfo = z.infer<
  typeof ProtectioninfoSchema
>;
