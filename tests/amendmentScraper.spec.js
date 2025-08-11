import { test } from '@playwright/test';
import { AmendmentPage } from '../src/pages/amendmentPage.js';
import { formatAmendmentData } from '../src/utils/formatAmendmentData.js';
import { saveAmendmentData } from '../src/utils/saveArticleData.js';
import config from '../config.js';

[
    { name: 'First Amendment', url: config.first_amendment_url, amendmentNumber: 1 },
    { name: 'Second Amendment', url: config.second_amendment_url, amendmentNumber: 2 },
    { name: 'Third Amendment', url: config.third_amendment_url, amendmentNumber: 3 },
    { name: 'Fourth Amendment', url: config.fourth_amendment_url, amendmentNumber: 4 },
    { name: 'Fifth Amendment', url: config.fifth_amendment_url, amendmentNumber: 5 },
    { name: 'Sixth Amendment', url: config.sixth_amendment_url, amendmentNumber: 6 },
    { name: 'Seventh Amendment', url: config.seventh_amendment_url, amendmentNumber: 7 },
    { name: 'Eighth Amendment', url: config.eighth_amendment_url, amendmentNumber: 8 },
    { name: 'Ninth Amendment', url: config.ninth_amendment_url, amendmentNumber: 9 },
    { name: 'Tenth Amendment', url: config.tenth_amendment_url, amendmentNumber: 10 },
    { name: 'Eleventh Amendment', url: config.eleventh_amendment_url, amendmentNumber: 11 },
    { name: 'Twelfth Amendment', url: config.twelfth_amendment_url, amendmentNumber: 12 },
    { name: 'Thirteenth Amendment', url: config.thirteenth_amendment_url, amendmentNumber: 13 },
    { name: 'Fourteenth Amendment', url: config.fourteenth_amendment_url, amendmentNumber: 14 },
    { name: 'Fifteenth Amendment', url: config.fifteenth_amendment_url, amendmentNumber: 15 },
    { name: 'Sixteenth Amendment', url: config.sixteenth_amendment_url, amendmentNumber: 16 },
    { name: 'Seventeenth Amendment', url: config.seventeenth_amendment_url, amendmentNumber: 17 },
    { name: 'Eighteenth Amendment', url: config.eighteenth_amendment_url, amendmentNumber: 18 },
    { name: 'Nineteenth Amendment', url: config.nineteenth_amendment_url, amendmentNumber: 19 },
    { name: 'Twentieth Amendment', url: config.twentieth_amendment_url, amendmentNumber: 20 },
    { name: 'Twenty-First Amendment', url: config.twenty_first_amendment_url, amendmentNumber: 21 },
    { name: 'Twenty-Second Amendment', url: config.twenty_second_amendment_url, amendmentNumber: 22 },
    { name: 'Twenty-Third Amendment', url: config.twenty_third_amendment_url, amendmentNumber: 23 },
    { name: 'Twenty-Fourth Amendment', url: config.twenty_fourth_amendment_url, amendmentNumber: 24 },
    { name: 'Twenty-Fifth Amendment', url: config.twenty_fifth_amendment_url, amendmentNumber: 25 },
    { name: 'Twenty-Sixth Amendment', url: config.twenty_sixth_amendment_url, amendmentNumber: 26 },
    { name: 'Twenty-Seventh Amendment', url: config.twenty_seventh_amendment_url, amendmentNumber: 27 },

].forEach(({ name, url, amendmentNumber }) => {
    test(`Scrape and save ${name}`, async ({ page }) => {
    await page.goto(url);

    const amendmentPage = new AmendmentPage(page);
    const rawSections = await amendmentPage.scrape();

    const structuredData = formatAmendmentData(amendmentNumber, rawSections, url);

    saveAmendmentData(structuredData);

    console.log(`✅ ${name} scrape and export complete.`);
    });
});