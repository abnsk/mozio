describe('empty spec', () => {
  it('passes', () => {
    cy.visit("http://127.0.0.1:5173/?route=Marseille&date=2022-10-30&passenger=4")
    cy.get('input[name="passengerCount"]').should('have.value', '4')
    cy.get('input[name="tripDate"]').should('have.value', '2022-10-30')

    cy.get('.react-select__single-value').should('contain', 'Marseille')
    cy.get('.btn-blue').click()
    cy.get('.btn-blue').should('be.disabled')

    cy.get("[name='tripDate']+.errorMessage").should('contain', 'Trip date must be after today.')
  })
})