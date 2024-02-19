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

import '@testing-library/cypress/add-commands';

// -- This is a parent command --
Cypress.Commands.add(
  'login',
  (email, organization, password) => {
    const log = Cypress.log({
      displayName: 'AUTH0 LOGIN',
      message: [`🔐 Authenticating | ${email}`],
      autoEnd: false,
    });

    log.snapshot('before');

    cy.session(
      email,
      () => {
        cy.visit('http://localhost:3000/auth/login');

        cy.get('input[name="email"]', {
          timeout: 10000,
        }).type(email);
        cy.get('button[id="email"]').click();

        cy.get('input[id="organization"').type(
          organization
        );
        cy.get('button[id="organization"]').click();

        cy.origin(
          'https://usermanagement.onefence.co',
          { args: { password } },
          ({ password }) => {
            cy.get('input[type="password"]').type(
              password
            );
            cy.get('button[type="submit"]').click();
          }
        );

        cy.url({ timeout: 10000 }).should(
          'equal',
          'http://localhost:3000/apps'
        );
      },
      {
        validate: () => {
          //   cy.getAllLocalStorage().then((result) => {
          //     expect(
          //       result['http://localhost:3000']
          //     ).to.have.property('auth');
          //   });
          cy.wrap(window.localStorage)
            .invoke('getItem', 'auth')
            .should('exist');
        },
      }
    );

    log.snapshot('after');
    log.end();
  }
);
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(
        email: string,
        organization: string,
        password: string
      ): Chainable<void>;
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

export {};
