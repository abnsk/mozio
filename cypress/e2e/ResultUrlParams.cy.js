describe('empty spec', () => {
    it('passes', () => {
        cy.visit("http://127.0.0.1:5173/result?route=Marseille,Paris&date=2023-10-30&passenger=4")
        cy.wait(1250) // we are using a fixed value here. In a test env you would follow async request and wait until they are completed
        cy.get("[data-test='total-value']").should("contain", "661 km")
    })
})