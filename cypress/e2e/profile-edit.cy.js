describe('The Profile Index Page', () => {
  it('displays user info correctly', () => {
    cy.visit('/profile/edit')

    cy.contains('Edit Personal Information').should('be.visible')

    cy.get('img')
      .should('have.attr', 'src', '/images/avatar.png')
      .should('have.attr', 'alt', 'Avatar')
      .should('be.visible')

    cy.get('input[name="username"]')
      .should('have.attr', 'placeholder', 'Please enter your username')
      .should('have.attr', 'value', 'Running_Snail')
      .should('be.visible')
    cy.contains(
      '3~15 characters, start with a letter, and only contain letters, numbers, and underscores'
    ).should('be.visible')

    cy.get('input[name="email"]')
      .should('have.attr', 'placeholder', 'Please enter your email')
      .should('have.attr', 'value', 'Running-snail@test.com')
      .should('be.visible')
    cy.contains('Please enter your email').should('be.visible')

    cy.get('input[name="phone"]')
      .should('have.attr', 'placeholder', 'Please enter your phone number')
      .should('have.attr', 'value', '12345678901')
      .should('be.visible')
    cy.contains('Please enter your phone number').should('be.visible')

    cy.get('input[name="password"]')
      .should('have.attr', 'placeholder', 'Please enter your password')
      .should('have.attr', 'type', 'password')
      .should('have.attr', 'value', '123456789')
      .should('be.visible')
    cy.contains('8~20 characters. Spaces are not allowed').should('be.visible')

    cy.contains('Female').should('be.visible')
    cy.contains('Male').should('be.visible')
    cy.contains('Other').should('be.visible')

    cy.get('input[value="05/13/1992"]').should('exist')

    cy.contains('Cancel').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })
  it('validate form', () => {
    cy.visit('/profile/edit')

    cy.get('input[name="username"]').clear()
    cy.get('input[name="email"]').clear()
    cy.get('input[name="phone"]').clear()
    cy.get('input[name="password"]').clear()

    cy.get('button[type="submit"]').click()
    cy.contains('Username is required').should('be.visible')
    cy.contains('Email is required').should('be.visible')
    cy.contains('Phone number is required').should('be.visible')
    cy.contains('Verification code is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')

    cy.get('input[name="username"]').type('my new username')
    cy.contains('Username is required').should('not.exist')
    cy.contains('Invalid username').should('be.visible')
    cy.get('input[name="username"]').clear().type('my_new_username')
    cy.contains('Invalid username').should('not.exist')

    cy.get('input[name="email"]').type('test')
    cy.contains('Email is required').should('not.exist')
    cy.contains('Invalid email').should('be.visible')
    cy.get('input[name="email"]').type('@test.com')
    cy.contains('Invalid email').should('not.exist')

    cy.get('input[name="phone"]').type('123456')
    cy.contains('Phone number is required').should('not.exist')
    cy.contains('Invalid phone number').should('be.visible')
    cy.get('input[name="phone"]').type('78900')
    cy.contains('Invalid phone number').should('not.exist')

    cy.get('input[name="verificationCode"]').type('123')
    cy.contains('Verification code is required').should('not.exist')
    cy.contains('Invalid verification code').should('be.visible')
    cy.get('input[name="verificationCode"]').type('456')
    cy.contains('Invalid verification code').should('not.exist')

    cy.get('input[name="password"]').type('123456')
    cy.contains('Password is required').should('not.exist')
    cy.contains('Please enter a password of 8~20 characters. Spaces are not allowed').should(
      'be.visible'
    )
    cy.get('input[name="password"]').type('78900')
    cy.contains('Please enter a password of 8~20 characters. Spaces are not allowed').should(
      'not.exist'
    )
  })
})
