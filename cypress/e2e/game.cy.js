describe('Word Game', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the game and displays a hint', () => {
    cy.get('#hint').should('contain.text', 'Hint:');
    cy.get('#timer').should('contain.text', 'Time left');
    cy.get('#score').should('contain.text', 'Score');
  });

  it('allows the user to type a guess and submit', () => {
    cy.get('#input').type('apple');
    cy.get('#submit-btn').click();
    cy.get('#message').should('not.be.empty');
  });

  it('resets the game with New Word button', () => {
    cy.get('#new-btn').click();
    cy.get('#input').should('have.value', '');
  });

  it('changes difficulty and resets timer', () => {
    cy.get('#medium-btn').click();
    cy.get('#timer').should('contain.text', '20');
    cy.get('#hard-btn').click();
    cy.get('#timer').should('contain.text', '10');
  });
});
