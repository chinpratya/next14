describe('signin', () => {
  it('should authenticate into the apps', () => {
    cy.viewport('macbook-15');
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.login(
      'benzbenz900@gmail.com',
      'tthh',
      '123456789'
    );

    cy.visit('http://localhost:3000/apps');

    cy.location('pathname', { timeout: 10000 }).should(
      'eq',
      '/apps'
    );
  });
});

export {};
