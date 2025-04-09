describe('Lobby', () => {
    it("Send to lobby create screen",()=>{
        cy.login()
        cy.wait(2000)
        cy.get('[data-cy="createLobby"]').click()
        cy.url().should('include', '/lobby/Create')
    })

    it('Should select a scenario and submit the form', () => {
        cy.login()
        cy.get('[data-cy="createLobby"]').click()
        
        // Select a scenario by its value
        cy.get('select#scenario').select('6737477f3e8f67658a3fc674');  // Replace with the actual ID you want to select
        
        // Optionally, check the value of the select dropdown
        cy.get('select#scenario').should('have.value', '6737477f3e8f67658a3fc674');  // Ensure the correct value is selected
        
        // Click the submit button
        cy.get('[data-cy="submit"]').click();
        
        // assert go to lobby with id
        cy.url().should('match', /\/lobby\/\d+/);
      })
    
    
  })