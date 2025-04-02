describe('Login', () => {
    it('Should show errors when leaving all field blank', () => {
      cy.visit('localhost:4173')
      cy.get('[data-cy="submit"]').click()
    })
    it('Should send you to next page when login in',()=>{
        cy.visit('localhost:4173')
        const email = Cypress.env('EMAIL');
        const password = Cypress.env('PASSWORD');
        cy.get('[data-cy="email"]').type(email)
        cy.get('[data-cy="password"]').type(password)
        cy.get('[data-cy="submit"]').click()
        cy.url().should('eq', 'http://localhost:4173/')
    })
  })