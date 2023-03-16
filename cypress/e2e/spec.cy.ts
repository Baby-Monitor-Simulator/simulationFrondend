// import testDataTxt from "../fixtures/map.txt"

describe('Test File Input', () => {
  it('Upload File & Parse Data', () => {
    cy.visit("http://127.0.0.1:4173/")
    cy.get('#input-1').click();
    cy.get('[type="file"]').selectFile('cypress/fixtures/map.txt')
    cy.get('.mdi-cloud-upload').click();
  })
})