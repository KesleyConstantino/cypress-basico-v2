Cypress.Commands.add('fillMandatoryFields', function(){

    cy.get('input[name="firstName"]')
    .should('be.visible')
    .type('Kesley')
    .should('have.value', 'Kesley')  

    cy.get('input[name="lastName"]')
    .should('be.visible')
    .type('de Lima')
    .should('have.value', 'de Lima') 

    cy.get('input[id="email"]')
    .should('be.visible')
    .type('kesleyconstantino@gmail.com')
    .should('have.value', 'kesleyconstantino@gmail.com') 

    cy.get('textarea[name="open-text-area"]')
    .should('be.visible')
    .type('Teste Automatizado')
    .should('have.value', 'Teste Automatizado') 


})