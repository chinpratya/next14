"use strict";
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/cypress/add-commands");
// -- This is a parent command --
Cypress.Commands.add('login', function (email, organization, password) {
    var log = Cypress.log({
        displayName: 'AUTH0 LOGIN',
        message: ["\uD83D\uDD10 Authenticating | ".concat(email)],
        autoEnd: false,
    });
    log.snapshot('before');
    cy.session(email, function () {
        cy.visit('http://localhost:3000/auth/login');
        cy.get('input[name="email"]', {
            timeout: 10000,
        }).type(email);
        cy.get('button[id="email"]').click();
        cy.get('input[id="organization"').type(organization);
        cy.get('button[id="organization"]').click();
        cy.origin('https://usermanagement.onefence.co', { args: { password: password } }, function (_a) {
            var password = _a.password;
            cy.get('input[type="password"]').type(password);
            cy.get('button[type="submit"]').click();
        });
        cy.url({ timeout: 10000 }).should('equal', 'http://localhost:3000/apps');
    }, {
        validate: function () {
            //   cy.getAllLocalStorage().then((result) => {
            //     expect(
            //       result['http://localhost:3000']
            //     ).to.have.property('auth');
            //   });
            cy.wrap(window.localStorage)
                .invoke('getItem', 'auth')
                .should('exist');
        },
    });
    log.snapshot('after');
    log.end();
});
