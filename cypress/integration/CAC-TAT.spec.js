/// <reference types="Cypress" />

//const { each } = require("cypress/types/bluebird")

// Representação do ID = # e de classe é = .

// O bloco describe define a suíte de testes
describe('Central de Atendimento ao Cliente TAT', function() {

    // beforeEach, basicamente indica que todo teste que será realizado, antes eles devem passar pelo o que está dentro desse looping.
    beforeEach(() => {

        cy.visit('./src/index.html')

      })

// o bloco it, define um caso de teste.
    it('verifica o título da aplicação', function() {

        // "SHOULD" utilizado para fazer validações
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')  
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        const longTest = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste.'
        // "SHOULD" utilizado para fazer validações
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
        .type(longTest, {delay: 0})
        .should('have.value', longTest) 

        cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

        cy.get('span[class="success"]')
        .should('be.visible')
    })    

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

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
        .type('kesleyconstantino')
        .should('have.value', 'kesleyconstantino') 

        cy.get('textarea[name="open-text-area"]')
        .should('be.visible')
        .type('Teste Automação')
        .should('have.value', 'Teste Automação') 

        cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

        cy.get('span[class="error"]')
        .should('be.visible') 
    })

    it('Validar que o campo telefone só aceita o digitos de valores numéricos', function() {

        // "SHOULD" utilizado para fazer validações
        cy.get('input[id="phone"]')
        .should('be.visible')
        .type('abcdefghijklmnopqrstuvwxyz`[{]}~^,<.>:;?/!@#$%¨¨&*()_+=-ºª§¬¢£³¹²³£¢')
        .should('have.value', '')  
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        // "SHOULD" utilizado para fazer validações
        cy.fillMandatoryFields()

        cy.get('input[id="phone-checkbox"]')
        .should('be.visible')
        .check()

        cy.get('span[class="phone-label-span required-mark"]')
        .should('be.visible')

        cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

        cy.get('span[class="error"]')
        .should('be.visible') 
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        // "SHOULD" utilizado para fazer validações
        cy.get('input[name="firstName"]')
        .should('be.visible')
        .type('Kesley')
        .should('have.value', 'Kesley')  
        .clear().should('have.value', '')

        cy.get('input[name="lastName"]')
        .should('be.visible')
        .type('de Lima')
        .should('have.value', 'de Lima') 
        .clear().should('have.value', '')

        cy.get('input[id="email"]')
        .should('be.visible')
        .type('kesleyconstantino@gmail.com')
        .should('have.value', 'kesleyconstantino@gmail.com') 
        .clear().should('have.value', '')

        cy.get('textarea[name="open-text-area"]')
        .should('be.visible')
        .type('Teste Automação')
        .should('have.value', 'Teste Automação') 
        .clear().should('have.value', '')

        cy.get('input[id="phone"]')
        .should('be.visible')
        .type('11949221373')
        .should('have.value', '11949221373')
        .clear().should('have.value', '')  
 
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

        cy.get('span[class="error"]')
        .should('be.visible') 
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {

        cy.fillMandatoryFields()
        
        cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

        cy.get('span[class="success"]')
        .should('be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto', function() {

        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {

        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function() {

        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

    })

    it('marca o tipo de atendimento "Feedback"', function() {

        cy.get('input[value="feedback"]')
        .check()
        .should('be.checked')
        .should('have.value', 'feedback')

    })
    
    it('marca cada tipo de atendimento', function() {

        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {

        cy.get('input[type="checkbox"]')
            .check().should('be.checked')
            .last().uncheck().should('not.be.checked')

        // cy.get('#check input[type="checkbox"]')
        // .should('have.length', 2)
        // .each(function($check) {
        //     cy.wrap($check).check()
        //     cy.wrap($check).should('be.checked')
        // })
        // .last().uncheck().should('not.be.checked')

        // cy.get('#check input[type="checkbox"]')
        // .as('checkboxes')
        // .check()
  
        // cy.get('@checkboxes')
        // .each(checkbox => {
        //   expect(checkbox[0].checked).to.equal(true)
        // })
        // .last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {

        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .should('not.have.value')
            .then(input => {
                expect(input[0].files[0].name).to.eq('example.json')
            })
        })

    it('seleciona um arquivo simulando um drag-and-drop', function() {

        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should('not.have.value')
            .then(input => {
                expect(input[0].files[0].name).to.eq('example.json')
            })
         })
           
     it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {

        cy.fixture('example.json', null).as('example')

        cy.get('#file-upload')  
        .should('not.have.value').selectFile('@example')
             .then(input => {
                 expect(input[0].files[0].name).to.eq('example.json')
             })
         })
     it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
     })

     it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
            
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target')
        .click()
     })

  })
  