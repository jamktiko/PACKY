describe('check if navigation works and if pages render', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.wait(4000);
    cy.get('p').contains('The next generation of technology');
    cy.wait(200);

    cy.get('header').find('button').click();
    cy.get('a').contains('Stack Builder').click();
    cy.get('button').contains('Next').click();
    cy.wait(200);
    cy.get('button').contains('Web App').and('be.visible');

    //cy.get('header').find('button').click();
    // cy.get('a').contains('Library').click();
    // cy.wait(200);
    // cy.get('li').contains('React').and('be.visible');

    // cy.get('header').find('button').click();
    // cy.get('a').contains('Compare').click();
    // cy.wait(200);
    // cy.get('h2').contains('Select First Technology').and('be.visible');
    cy.wait(200);
    cy.get('header').find('button').click();
    cy.get('a').contains('About').click();
    cy.wait(200);

    // cy.get('header').find('button').click();
    // cy.get('a').contains('Contact').click();

    cy.get('header').find('button').click();
    cy.get('a').contains('Index').click();

    cy.get('img');
    // cy.contains('Technology Library').click();

    // cy.get('header').find('a').click();
    // cy.get('img');
    cy.contains('PACKY StackBuilder').click();

    // cy.get('header').find('a').click();
    // cy.get('img');
    // cy.contains('Pricing & Information').click();
  });
});
/*
describe('technology library Test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.wait(4000);
    cy.get('img');
    cy.contains('Technology Library').click();
    cy.wait(200);
    cy.get("input[type='text']").type('React');
    cy.get('li').contains('React').and('be.visible');
    cy.get("input[type='text']").clear();

    cy.get("input[type='text']").type('Svelte');
    cy.get('li').contains('Svelte').and('be.visible');
    cy.get("input[type='text']").clear().type('👻');
    cy.get('p').contains('No data available').and('be.visible');
  });
});
*/
describe('Stackbuilder Test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.wait(4000);
    cy.viewport(1550, 947);

    cy.contains('PACKY StackBuilder').click();
    cy.wait(1000);

    cy.get("input[type='text']").type('React');
    cy.get('li').contains('React').and('be.visible');
    cy.get("input[type='text']").clear();

    cy.get("input[type='text']").type('Svelte');
    cy.get('li').contains('Svelte').and('be.visible');
    cy.get("input[type='text']").clear().type('👻');
    cy.get('ul').should('not.visible');

    cy.get('button').contains('Next').click();
    cy.get('button').contains('Go back').click();
    cy.get('button').contains('Next').click();
    cy.get('button').eq(32).click();
    cy.get('button').contains('Authentication').click();
    cy.get('button').eq(31).click();

    //cy.get('div').contains('h1', 'Choose feature').click();
    cy.contains('h1', 'Choose feature')
      .parent('div')
      .within(() => {
        cy.get('button').click();
      });

    cy.get('button').contains('Finish').click();

    cy.wait(600);
    cy.get('html').trigger('mousedown', 775, 473);
    cy.get('html').trigger('mousemove', 375, 473);
    cy.get('html').trigger('mouseup');
    cy.wait(600);
    cy.get('html').trigger('mousedown', 375, 473);
    cy.get('html').trigger('mousemove', 775, 473);
    cy.get('html').trigger('mouseup');
    cy.wait(600);

    cy.get('button.slick-next').click();
    cy.wait(600);
    cy.get('button.slick-prev').click();

    cy.get('button.toggle-output').eq(3).click();

    cy.get('button').contains('Reset').click();

    cy.get('button').contains('Go back').click();

    cy.get('a')
      .contains('React')
      .should('have.attr', 'href', 'https://react.dev/');
    cy.get("input[type='checkbox']").check();
    cy.get("input[type='checkbox']").eq(1).uncheck();
    cy.get("input[type='checkbox']").uncheck();
  });
});
