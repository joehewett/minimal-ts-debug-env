var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { chromium } from 'playwright-core';
const ANCHOR_API_KEY = '';
// Test Summary:
// This test demonstrates browser automation using Playwright and Anchor:
// 1. Creates an Anchor session with proper configuration
// 2. Connects to the same browser instance twice via CDP
// 3. Navigates first browser to google.com
// 4. Navigates second browser to bing.com
// Expected outcome: In the live view of the browser at live.anchorbrowser.io, we should first see the Google page, then the Bing page (in the same tab)
// Outcome: We see the Google page, then the Bing page (in the same tab)
// Result: This test passes
function f() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create browser configuration
            const browserConfiguration = {
                session: {
                    proxy: {
                        type: "anchor_residential",
                        active: true
                    }
                },
                browser: {
                    adblock: { active: true },
                    captcha_solver: { active: true },
                    headless: { active: false }
                }
            };
            // Create Anchor session
            console.log('Creating Anchor session...');
            const response = yield fetch('https://api.anchorbrowser.io/v1/sessions', {
                method: 'POST',
                headers: {
                    'anchor-api-key': ANCHOR_API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(browserConfiguration),
            });
            if (!response.ok) {
                throw new Error(`Failed to create session: ${response.statusText}`);
            }
            const result = yield response.json();
            const { id } = result.data;
            console.log('Created Anchor session successfully');
            // Connect to browser using Playwright
            console.log('Connecting to browser using Playwright...');
            const browser1 = yield chromium.connectOverCDP(`wss://connect.anchorbrowser.io?apiKey=${ANCHOR_API_KEY}&sessionId=${id}`);
            const browser2 = yield chromium.connectOverCDP(`wss://connect.anchorbrowser.io?apiKey=${ANCHOR_API_KEY}&sessionId=${id}`);
            try {
                const contexts1 = browser1.contexts();
                const contexts2 = browser2.contexts();
                // Navigate browser 1 to https://www.google.com
                const page1 = contexts1[0].pages()[0];
                yield page1.goto('https://www.google.com');
                console.log('Navigated to Google');
                // Navigate browser 2 to https://www.bing.com
                const page2 = contexts2[0].pages()[0];
                yield page2.goto('https://www.bing.com');
                console.log('Navigated to Bing');
                console.log('Test completed successfully!');
            }
            finally {
                // Cleanup
                yield browser1.close();
                yield browser2.close();
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
f();
//# sourceMappingURL=index.js.map