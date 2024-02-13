      it.only('testa a página da política de privacidade de forma independente', function() {
        
        cy.visit('./src/privacy.html')

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')  

        cy.get('#title')
        .should('have.text', 'CAC TAT - Política de privacidade')

        cy.get('#white-background')
        .should('contain.text', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
        .should('contain.text', 'Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
        .should('contain.text', 'No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')
        
        cy.contains('Talking About Testing').should('be.visible')

})

