const workflowUrl =
  'http://localhost:3000/apps/datafence/incident-management/workflow';

const login = () => {
  cy.login('benzbenz900@gmail.com', 'tthh', '123456789');
};

beforeEach(() => {
  login();
  cy.viewport('macbook-15');
});

describe('workflow home page', () => {
  beforeEach(() => {
    cy.visit(workflowUrl);
  });

  it('should go to workflow home page', () => {
    cy.url().should('equal', workflowUrl);

    cy.contains('Workflow').should('exist');
  });

  it('should can click at the workflow item to navigate to detail', () => {
    const links = cy.get('tr').find('a');
    const firstLink = links.first();

    firstLink.click();

    firstLink.invoke('attr', 'href').then((href) => {
      cy.url().should('contain', href);
    });
  });
});

describe('workflow create', () => {
  beforeEach(() => {
    cy.visit(workflowUrl + '/create');
  });

  it('should go to workflow create page', () => {
    cy.url().should('equal', workflowUrl + '/create');

    cy.contains('Add Workflow').should('exist');
  });

  it.only('should ', () => {
    //
  });
});

export {};
