describe('The Profile Index Page', () => {
  it('displays user info correctly', () => {
    cy.visit('/profile')

    cy.contains('Personal Information').should('be.visible')

    cy.get('img')
      .should('have.attr', 'src', '/images/avatar.png')
      .should('have.attr', 'alt', 'Avatar')
      .should('be.visible')

    cy.contains('Hi, Running_Snail').should('be.visible')
    cy.contains('Running-snail@test.com').should('be.visible')
    cy.contains('12345678901').should('be.visible')
    cy.contains('Male').should('be.visible')
    cy.contains('1992-05-13').should('be.visible')
  })
  it('custom command', () => {
    cy.login('login name', 'login password').then((response) => {
      expect(response).to.equal('login name login password')
    })
  })
  it('screenshot', () => {
    cy.visit('/profile')

    cy.matchImageSnapshot('profile-index')
  })
})
