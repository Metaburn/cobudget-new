// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";
import signup from "../utils/signup";
import { createRound } from "../utils/round";

require("cypress-terminal-report/src/installLogsCollector")();


describe("INIT", () => {
    it("registers a user", () => {
        signup();
        createRound(Cypress.env("roundSlug"));
    });
});
