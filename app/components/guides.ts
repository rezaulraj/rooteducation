import type { GuideData } from "./CountryGuide";
import { australia } from "./AustraliaGuide";
import { cyprus } from "./CyprusGuide";
import { hungary } from "./HungaryGuide";
import { malta } from "./MaltaGuide";
import { nz } from "./NewZealandGuide";
import { romania } from "./RomaniaGuide";
import { uk } from "./UKGuide";
import { guide as belgium } from "./countries/belgium";
import { guide as canada } from "./countries/canada";
import { guide as finland } from "./countries/finland";
import { guide as greece } from "./countries/greece";
import { guide as ireland } from "./countries/ireland";
import { guide as italy } from "./countries/italy";
import { guide as lithuania } from "./countries/lithuania";
import { guide as malaysia } from "./countries/malaysia";
import { guide as norway } from "./countries/norway";
import { guide as southKorea } from "./countries/south-korea";
import { guide as spain } from "./countries/spain";
import { guide as sweden } from "./countries/sweden";
import { guide as usa } from "./countries/usa";

/** Every country's study guide, by its /study-abroad slug. */
export const GUIDES: Record<string, GuideData> = {
  uk, usa, canada, australia, "new-zealand": nz, ireland, malaysia, "south-korea": southKorea, romania, hungary,
  malta, cyprus, sweden, finland, norway, belgium, spain, italy, greece, lithuania,
};
