"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var workflowUrl = 'http://localhost:3000/apps/datafence/incident-management/workflow';
var login = function () {
    cy.login('benzbenz900@gmail.com', 'tthh', '123456789');
};
beforeEach(function () {
    login();
    cy.viewport('macbook-15');
});
describe('workflow home page', function () {
    beforeEach(function () {
        cy.visit(workflowUrl);
    });
    it('should go to workflow home page', function () {
        cy.url().should('equal', workflowUrl);
        cy.contains('Workflow').should('exist');
    });
    it('should can click at the workflow item to navigate to detail', function () {
        var links = cy.get('tr').find('a');
        var firstLink = links.first();
        firstLink.click();
        firstLink.invoke('attr', 'href').then(function (href) {
            cy.url().should('contain', href);
        });
    });
});
describe('workflow create', function () {
    beforeEach(function () {
        cy.visit(workflowUrl + '/create');
    });
    it('should go to workflow create page', function () {
        cy.url().should('equal', workflowUrl + '/create');
        cy.contains('Add Workflow').should('exist');
    });
    it.only('should ', function () {
        //
    });
});
