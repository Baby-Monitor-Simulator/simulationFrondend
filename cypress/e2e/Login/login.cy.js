describe('Login', () => {
    it('Should show errors when leaving all field blank', () => {
      cy.visit('localhost:4173')
      cy.get('[data-cy="submit"]').click()
    })
    it('Should send you to next page when login in',()=>{
        cy.visit('localhost:4173')
        cy.get('[data-cy="email"]').type('Adminbm@example.com')
        cy.get('[data-cy="password"]').type('myadminpassword') //niet save!!!
        cy.get('[data-cy="submit"]').click()
        cy.url().should('eq', 'http://localhost:4173/')
    })
  })