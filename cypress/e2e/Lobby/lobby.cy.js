describe('Lobby', () => {
    it("Send to lobby create screen",()=>{
        cy.login("Adminbm@example.com","myadminpassword")
        cy.get('[data-cy="createLobby"]').click()
        cy.url().should('include', '/lobby/Create')
    })

    
  })